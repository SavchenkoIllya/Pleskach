"use server";
import { auth, signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
// import type { NextApiRequest, NextApiResponse } from "next";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export async function authenticate(formData: any) {
  const { email, password } = formData;
  try {
    await signIn("credentials", {
      email: email,
      password: password,
    });
  } catch (error) {
    return { message: "Cannot authenticate this user" };
  }
}

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

export async function getUser() {
  noStore();
  try {
    const users = await sql`
    SELECT id, name, phone, email, telgram_link, whatsapp_link
    FROM users;
    `;
    return users.rows;
  } catch (error) {
    return { message: "Cannot get Users" };
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

    console.log("entity has been created");
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
  try {
    const udpArticle = await sql`
    UPDATE articles
    SET title = "title",
        email = 'новый_email@example.com'
    WHERE id=${id};
    `;
  } catch (error) {
    return { message: "Cannot update this article" };
  }
}

export async function deleteArticle(id: number) {
  try {
    const reqArticle = await sql`
    DELETE FROM articles
    WHERE id=${id};
`;
    revalidatePath("/dashboard/articles");
  } catch (error) {
    return { message: "Cannot delete article by this id" };
  }
}
