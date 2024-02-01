"use server";
import { IArticle, ServiceError } from "./definitions";
import { getSession } from "./Session.service";
import { getCurrentDate } from "./utils";
import { Session } from "next-auth";
import { sql } from "@vercel/postgres";

// create functional class implementation

interface IArticleForm extends Partial<IArticle> {
  tags?: string | string[] | null;
  tagsArray?: string[] | null;
  published?: true;
  userName?: string | null;
  date: string;
}

interface IArticlesService {
  createArticles(formData: IArticleForm): Promise<void | ServiceError>;
  getArticles(): Promise<IArticle[] | ServiceError>;
  getArticleById(id: number): Promise<IArticle | ServiceError>;
  updateArticle(
    id: number,
    formData: IArticleForm,
  ): Promise<void | ServiceError>;
  deleteArticle(id: number): Promise<void | ServiceError>;
  parseArticleData(
    formData: IArticleForm,
  ): Promise<IArticleForm | ServiceError>;
}

class ArticleService implements IArticlesService {
  async parseArticleData(
    formData: IArticleForm,
  ): Promise<IArticleForm | ServiceError> {
    const session = (await getSession()) as Session;
    if (!session) {
      return new Error("You are not authorized");
    }
    const userName = session?.user?.name;
    const tagsToFormat =
      typeof formData.tags === "string" ? (formData.tags as string) : "";
    const tags = tagsToFormat.split(" ").filter((e: string) => {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });

    const { title, content, published } = formData;
    const date = getCurrentDate();
    return { userName, title, content, published, date, tags };
  }

  async createArticles({
    userName,
    title,
    content,
    published,
    date,
    tags,
  }: IArticleForm): Promise<void | ServiceError> {
    try {
      const matchedUser = await sql`
        SELECT * FROM users
        WHERE name = ${userName}
        `;
      const userId = matchedUser.rows[0].id;

      // Find a solution for error type sting[] is not assignable for type Primitive
      await sql`
        INSERT INTO articles (title, author_id, content, is_published, creation_date, tags_array)
        VALUES(${title}, ${userId}, ${content}, ${published}, ${date}, ${tags as any})
        `;
    } catch (error) {
      return { message: "Cannot create new article" };
    }
  }

  async updateArticle(
    id: number,
    { title, content, published, date, tags }: IArticleForm,
  ): Promise<void | ServiceError> {
    tags = Array.isArray(tags) ? tags : [""];
    try {
      await sql`
        UPDATE articles
        SET title = ${title},
            content = ${content},
            is_published = ${published},
            updating_date = ${date},
            tags_array = ${tags as any}
        WHERE id=${id};
        `;
    } catch (error) {
      return { message: "Cannot update this article" };
    }
  }

  async getArticles(): Promise<IArticle[] | ServiceError> {
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

  async getArticleById(id: number): Promise<IArticle | ServiceError> {
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

  async deleteArticle(id: number): Promise<void | ServiceError> {
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
