"use server";
import { IArticle, ServiceError } from "./definitions";
import { getSession } from "./Session.service";
import { getCurrentDate } from "./utils";
import { Session } from "next-auth";
import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

interface IArticleForm extends Partial<IArticle> {
  tags?: string | string[] | null;
  tagsArray?: string[] | null;
  is_published?: boolean;
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
}

class ArticleService implements IArticlesService {
  private async parseArticleData(
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

    const { title, content, is_published } = formData;

    const date = getCurrentDate();
    return { userName, title, content, is_published, date, tags };
  }

  async createArticles(formData: IArticleForm): Promise<void | ServiceError> {
    const { userName, title, content, is_published, date, tags } =
      (await this.parseArticleData(formData)) as IArticleForm;

    try {
      const matchedUser = await sql`
        SELECT * FROM users
        WHERE name = ${userName}
        `;
      const userId = matchedUser.rows[0].id;

      await sql`
        INSERT INTO articles (title, author_id, content, is_published, creation_date, tags_array)
        VALUES(${title}, ${userId}, ${content}, ${is_published}, ${date}, ${tags as any})
        `;
    } catch (error) {
      console.log(error);
      return { message: "Cannot create new article" };
    }
  }

  async updateArticle(
    id: number,
    formData: IArticleForm,
  ): Promise<void | ServiceError> {
    const { title, content, is_published, date, tags } =
      (await this.parseArticleData(formData)) as IArticleForm;

    try {
      await sql`
        UPDATE articles
        SET title = ${title},
            content = ${content},
            is_published = ${is_published},
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
    revalidatePath("/dashboard/articles");
  }
}

const articles = new ArticleService();

const getArticles = async () => {
  noStore();
  return await articles.getArticles();
};

const getArticleById = async (id: number) => {
  noStore();
  return await articles.getArticleById(id);
};

const createArticle = async (formData: IArticleForm) =>
  await articles.createArticles(formData);

const updateArticle = async (id: number, formData: IArticleForm) =>
  await articles.updateArticle(id, formData);

const deleteArticle = async (id: number) => {
  await articles.deleteArticle(id);
  redirect("/dashboard/articles");
};

export {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
