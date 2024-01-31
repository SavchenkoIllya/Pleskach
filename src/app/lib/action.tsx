"use server";
import { auth, signIn, signOut } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { IArticle, IUser } from "./definitions";
import { Session } from "next-auth";
import { Error } from "./definitions";
import { z } from "zod";
import { POSTS_ON_PAGE } from "./projectConstants";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export interface ISessionUserService {
  login(formData: FormData): Promise<void | Error>;
  getUserSession(): Promise<Session | Error | null>;
  logout(): Promise<void | Error>;
}

class SessionUserServices implements ISessionUserService {
  async login(formData: FormData) {
    const { email, password } = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      await signIn("credentials", {
        email: email,
        password: password,
      });
    } catch (error) {
      return { message: "Error. Cannot authenticate this user" };
    }
  }

  async getUserSession() {
    try {
      const user = await auth();
      return user;
    } catch (error) {
      return { message: "Error. Cannot get current session" };
    }
  }

  async logout() {
    try {
      await signOut();
    } catch {
      return { message: "Error. Cannot logout" };
    }
  }
}

const userSession = new SessionUserServices();
/**
 *
 * @returns object that include information about user in field "user", and token expiration time
 */
const getSession = async () => userSession.getUserSession();
/**
 * Function that allows you to get current session information
 * @param formData email and password
 * @returns
 */
const login = async (formData: FormData) => userSession.login(formData);
const logout = async () => userSession.logout();

export { getSession, login, logout };

interface IUserService {
  getAllUsers(): Promise<IUser[] | Error>;
  createUser(user: Partial<IUser>): Promise<void | Error>;
  updateUser(id: number, user: Partial<IUser>): Promise<void | Error>;
  validateUser(formData: Partial<IUser>): Partial<IUser> | Error;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.coerce.string().email().min(5),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid number")
    .min(10, "Too short")
    .max(14, "Too long"),
  telgram_link: z.string().optional(),
  whatsapp_link: z.string().optional(),
});

const UpdateUser = UserSchema.omit({ id: true });

class UserService implements IUserService {
  async getAllUsers(): Promise<IUser[] | Error> {
    try {
      const data = await sql<IUser>`
      SELECT id, name, phone, email, telgram_link, whatsapp_link
      FROM users;
      `;
      const users = data.rows;
      return users;
    } catch (error) {
      return { message: "Error. Cannot fetch Users" };
    }
  }

  validateUser(formData: Partial<IUser>): Partial<IUser> | Error {
    const validatedFields = UpdateUser.safeParse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      telgram_link: formData.telgram_link,
      whatsapp_link: formData.whatsapp_link,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed.",
      };
    }

    const user = UpdateUser.parse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      telgram_link: formData.telgram_link,
      whatsapp_link: formData.whatsapp_link,
    });

    return user;
  }

  async updateUser(
    id: number,
    { name, phone, email, telgram_link, whatsapp_link }: Partial<IUser>,
  ): Promise<void | Error> {
    try {
      await sql`
        UPDATE users
        SET name = ${name},
            phone = ${phone},
            email = ${email},
            telegram_link = ${telgram_link},
            whatsapp_link = ${whatsapp_link}
        WHERE id=${id};
      `;
    } catch (error) {
      throw new Error("Error. Cannot update user");
    }
  }

  async createUser({
    name,
    phone,
    email,
    telgram_link,
    whatsapp_link,
  }: Partial<IUser>): Promise<void | Error> {
    try {
      await sql`
        INSERT INTO users (name, phone, email, telgram_link, whatsapp_link)
        VALUES(${name}, ${phone}, ${email}, ${telgram_link}, ${whatsapp_link})
      `;
    } catch (error) {
      return { message: "Error. Cannot create user" };
    }
  }
}

const user = new UserService();

const getUsers = async () => user.getAllUsers();
const updateUser = async (id: number, formData: Partial<IUser>) => {
  const validatedInputs = user.validateUser(formData);
  if ("errors" in validatedInputs) {
    throw new Error(validatedInputs.message!);
  }
  user.updateUser(id, validatedInputs as Partial<IUser>);
  revalidatePath("/dashboard/profile");
};

const createUser = async (formData: Partial<IUser>) => {
  const validatedInputs = user.validateUser(formData);
  if ("errors" in validatedInputs) {
    throw new Error(validatedInputs.message!);
  }
  user.createUser(validatedInputs as Partial<IUser>);
  revalidatePath("/dashboard/profile");
};

export { getUsers, updateUser, createUser };

export async function getPaginatedPosts(pageNum: number) {
  noStore();
  try {
    const posts = await sql`
    SELECT *
    FROM posts
    ORDER BY date DESC
    LIMIT ${POSTS_ON_PAGE}
    OFFSET (${pageNum} - 1) * ${POSTS_ON_PAGE};
    `;

    const postsAmount = sql`
    SELECT COUNT(*) AS total_rows
    FROM posts;
    `;

    const data = await Promise.all([postsAmount, posts]);
    const totalPosts = data[1].rows[0].total_rows || 1;

    return {
      totalContent: totalPosts,
      contentOnPage: POSTS_ON_PAGE,
      data: data[1].rows,
    };
  } catch (error) {
    return { message: "Cannot get Posts" };
  }
}

export async function deletePost(postId: number) {
  try {
    const posts = await sql`
    DELETE FROM posts
    WHERE id = ${postId};
    `;
    revalidatePath("/dashboard/profile");
    return posts.rows;
  } catch (error) {
    return { message: "Cannot delete Post" };
  }
}

export async function markPostAsRead(postId: number) {
  try {
    const posts = await sql`
    UPDATE posts
    SET is_read = true
    WHERE id = ${postId};
    `;
    revalidatePath("/dashboard/profile");
    return posts.rows;
  } catch (error) {
    return { message: "Cannot get Posts" };
  }
}

export async function createPost(formData: any) {
  if (!formData)
    return {
      message: "Problems with data from form. Failed to Create Post.",
    };
  const { name, telephone, problem } = formData;
  const date = getCurrentDate();
  try {
    await sql`
    INSERT INTO posts (name, telephone, problem, date)
    VALUES (${name}, ${telephone}, ${problem}, ${date})
    `;
  } catch (error) {
    return { message: "Cannot create new post" };
  }
}

interface IArticleForm extends Partial<IArticle> {
  tags?: string | string[] | undefined | null;
  tagsArray?: string[] | null | undefined;
  published?: true;
  userName?: string | undefined | null;
  date: string;
}

interface IArticlesService {
  createArticles(formData: IArticleForm): Promise<void | Error>;
  getArticles(): Promise<IArticle[] | Error>;
  getArticleById(id: number): Promise<IArticle | Error>;
  updateArticle(id: number, formData: IArticleForm): Promise<void | Error>;
  deleteArticle(id: number): Promise<void | Error>;
  parseArticleData(formData: IArticleForm): Promise<IArticleForm | Error>;
}

class ArticleService implements IArticlesService {
  async parseArticleData(
    formData: IArticleForm,
  ): Promise<IArticleForm | Error> {
    const session = (await getSession()) as Session;
    if (!session) {
      return new Error("You are not authorized");
    }
    const userName = session?.user?.name;
    // Todo check this functionality
    // const tagsToFormat = typeof formData.tags === "string" ? 1 : 2;
    const tags = tagsToFormat.split(" ").filter((e: string) => {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });

    const { title, content, published } = formData;
    const date = getCurrentDate();
    return { userName, title, content, published, date, tags };
  }

  async createArticles(formData: IArticleForm): Promise<void | Error> {}

  async updateArticle(
    id: number,
    { title, content, published, date, tags }: IArticleForm,
  ): Promise<void | Error> {
    // const tags = tagsArray
    try {
      await sql`
      UPDATE articles
      SET title = ${title},
          content = ${content},
          is_published = ${published},
          updating_date = ${date},
          tags_array = ${tags}
      WHERE id=${id};
      `;
    } catch (error) {
      return { message: "Cannot update this article" };
    }
  }

  async getArticles(): Promise<IArticle[] | Error> {
    try {
      const reqArticles = await sql<IArticle>`
        SELECT * FROM articles
      `;
      const articles = reqArticles.rows;
      return articles;
    } catch (error) {
      return { message: "Cannot get articles" };
    }
  }

  async getArticleById(id: number): Promise<IArticle | Error> {
    try {
      const reqArticle = await sql<IArticle>`
          SELECT * FROM articles
          WHERE id=${id}
        `;
      const article = reqArticle.rows[0];
      return article;
    } catch (error) {
      return { message: "Cannot get article by this id" };
    }
  }

  async deleteArticle(id: number): Promise<void | Error> {
    try {
      await sql`
      DELETE FROM articles
      WHERE id=${id};
  `;
    } catch (error) {
      return { message: "Cannot delete article by this id" };
    }
    // redirect("/dashboard/articles");
  }
}

export async function createArticle(formData: any) {
  // const session = await auth();

  async function parseArticleData() {
    const session = (await getSession()) as Session;
    if (!session) {
      return new Error("You are not authorized");
    }
    const userName = session?.user?.name;
    const tagsToFormat = formData.tags;
    const tags = tagsToFormat.split(" ").filter(function (e: string) {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });
    const { title, content, published } = formData;
    const date = getCurrentDate();
    return { userName, title, content, published, date, tags };
  }

  // const userName = session?.user?.name;

  // try {
  //   const matchedUser = await sql`
  //   SELECT * FROM users
  //   WHERE name = ${userName}
  //   `;
  //   const userId = matchedUser.rows[0].id;

  //   await sql`
  //   INSERT INTO articles (title, author_id, content, is_published, creation_date, tags_array)
  //   VALUES(${title}, ${userId}, ${content}, ${published}, ${date}, ${tags})
  //   `;
  // } catch (error) {
  //   return { message: "Cannot create new article" };
  // }
}

export async function updateArticle(
  id: number,
  { title, tags, date, published, content }: any,
) {
  // const notFormattedTags = formData.tags;
  // const tags = notFormattedTags.split(" ").filter(function (e: string) {
  //   return e.replace(/(\r\n|\n|\r)/gm, "");
  // });
  // const { title, content, published } = formData;
  // const date = getCurrentDate();

  // try {
  //   await sql`
  //   UPDATE articles
  //   SET title = ${title},
  //       content = ${content},
  //       is_published = ${published},
  //       updating_date = ${date},
  //       tags_array = ${tags}
  //   WHERE id=${id};
  //   `;
  // } catch (error) {
  //   return { message: "Cannot update this article" };
  // }
  revalidatePath("/dashboard/articles");
}

// export async function getArticles() {
//   try {
//     const reqArticles = await sql`
//       SELECT * FROM articles
//     `;
//     const articles = reqArticles.rows;
//     return articles;
//   } catch (error) {
//     return { message: "Cannot get articles" };
//   }
// }

// export async function getArticleById(id: number) {
//   try {
//     const reqArticle = await sql`
//         SELECT * FROM articles
//         WHERE id=${id}
//       `;
//     const article = reqArticle.rows[0];
//     return article;
//   } catch (error) {
//     return { message: "Cannot get article by this id" };
//   }
// }

// export async function deleteArticle(id: number) {
//   try {
//     await sql`
//     DELETE FROM articles
//     WHERE id=${id};
// `;
//   } catch (error) {
//     return { message: "Cannot delete article by this id" };
//   }
//   redirect("/dashboard/articles");
// }
