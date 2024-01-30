"use server";
import { auth, signIn, signOut } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { IUser } from "./definitions";
import { Session } from "next-auth";
import { ErrorMessage } from "./definitions";
import { z } from "zod";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export async function getPosts() {
  noStore();
  try {
    const posts = await sql`
    SELECT * FROM posts
    ORDER BY date DESC;
    `;
    return posts.rows;
  } catch (error) {
    return { message: "Cannot get Posts" };
  }
}

const POSTS_ON_PAGE = 20;

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

export async function createArticle(formData: any) {
  const session = await auth();
  const notFormattedTags = formData.tags;
  const tags = notFormattedTags.split(" ").filter(function (e: string) {
    return e.replace(/(\r\n|\n|\r)/gm, "");
  });

  if (!session) {
    throw new Error("You are not authorized");
  }

  const userName = session?.user?.name;
  const { title, content, published } = formData;
  const date = getCurrentDate();

  try {
    const matchedUser = await sql`
    SELECT * FROM users
    WHERE name = ${userName}
    `;
    const userId = matchedUser.rows[0].id;

    await sql`
    INSERT INTO articles (title, author_id, content, is_published, creation_date, tags_array)
    VALUES(${title}, ${userId}, ${content}, ${published}, ${date}, ${tags})
    `;
  } catch (error) {
    return { message: "Cannot create new article" };
  }
}

export async function getArticles() {
  try {
    const reqArticles = await sql`
      SELECT * FROM articles
    `;
    const articles = reqArticles.rows;
    return articles;
  } catch (error) {
    return { message: "Cannot get articles" };
  }
}

export async function getArticleById(id: number) {
  try {
    const reqArticle = await sql`
        SELECT * FROM articles
        WHERE id=${id}
      `;
    const article = reqArticle.rows[0];
    return article;
  } catch (error) {
    return { message: "Cannot get article by this id" };
  }
}

export async function updateArticle(id: number, formData: any) {
  const notFormattedTags = formData.tags;
  const tags = notFormattedTags.split(" ").filter(function (e: string) {
    return e.replace(/(\r\n|\n|\r)/gm, "");
  });
  const { title, content, published } = formData;
  const date = getCurrentDate();

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
  revalidatePath("/dashboard/articles");
}

export async function deleteArticle(id: number) {
  try {
    await sql`
    DELETE FROM articles
    WHERE id=${id};
`;
  } catch (error) {
    return { message: "Cannot delete article by this id" };
  }
  redirect("/dashboard/articles");
}

// export async function getUser() {
//   noStore();
//   try {
//     const users = await sql`
//     SELECT id, name, phone, email, telgram_link, whatsapp_link
//     FROM users;
//     `;
//     return users.rows;
//   } catch (error) {
//     return { message: "Cannot get Users" };
//   }
// }

export interface ISessionUserService {
  login(formData: FormData): Promise<void | ErrorMessage>;
  getUserSession(): Promise<Session | ErrorMessage | null>;
  logout(): Promise<void | ErrorMessage>;
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
  getAllUsers(): Promise<IUser[] | ErrorMessage>;
  createUser(user: Partial<IUser>): Promise<void | ErrorMessage>;
  updateUser(id: number, user: Partial<IUser>): Promise<void | ErrorMessage>;
  validateUser(formData: FormData): Partial<IUser> | Error;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

type Error = {
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    phone?: string[] | undefined;
    telegram_link?: string[] | undefined;
    whatsapp_link?: string[] | undefined;
  };
  message?: string | null | undefined;
};

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
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
  async getAllUsers(): Promise<IUser[] | ErrorMessage> {
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

  validateUser(formData: FormData): Partial<IUser> | Error {
    const validatedFields = UpdateUser.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("phone"),
      telgram_link: formData.get("telgram_link"),
      whatsapp_link: formData.get("whatsapp_link"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Invoice.",
      };
    }

    const user = UpdateUser.parse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      telgram_link: formData.get("telgram_link"),
      whatsapp_link: formData.get("whatsapp_link"),
    });

    return user;
  }

  async updateUser(
    id: number,
    { name, phone, email, telgram_link, whatsapp_link }: Partial<IUser>,
  ): Promise<void | ErrorMessage> {
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
      revalidatePath("/dashboard/profile");
    } catch (error) {
      return { message: "Error. Cannot update user" };
    }
  }

  async createUser({
    name,
    phone,
    email,
    telgram_link,
    whatsapp_link,
  }: Partial<IUser>): Promise<void | ErrorMessage> {
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

class ValidationError implements Error {}

const user = new UserService();

const getUsers = async () => user.getAllUsers();
const updateUser = async (id: number, formData: FormData) => {
  const validatedInputs = user.validateUser(formData);
  
  // Todo: check this if statement is it works in way like I want
  // It's must check is validatedInputs gives Error
  return validatedInputs instanceof ValidationError
    ? validatedInputs
    : user.updateUser(id, validatedInputs as Partial<IUser>);
};

const createUser = async (formData: FormData) => {
  const validatedInputs = user.validateUser(formData);

  // Todo: check this if statement is it works in way like I want
  // It's must check is validatedInputs gives Error
  return validatedInputs instanceof ValidationError
    ? validatedInputs
    : user.createUser(validatedInputs as Partial<IUser>);
};

export { getUsers, updateUser, createUser };
