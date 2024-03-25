import { ServiceError } from "../../definitions";
import { IArticle, IArticleForm } from "./types/definitions";
import { getSession } from "../session-service/Session.api";
import { getCurrentDate } from "../utils/utils";
import { Session } from "next-auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { IArticlesService } from "./types/definitions";

export class ArticleService implements IArticlesService {
  private async parseArticleData(
    formData: IArticleForm,
  ): Promise<IArticleForm | ServiceError> {
    const session = (await getSession()) as Session;
    if (!session) {
      throw new Error("You are not authorized");
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
      throw new Error("Cannot create new article");
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
      throw new Error("Cannot update this article");
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
      throw new Error("Cannot get articles");
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
      throw new Error("Cannot get article with provided id");
    }
  }

  async deleteArticle(id: number): Promise<void | ServiceError> {
    try {
      await sql`
        DELETE FROM articles
        WHERE id=${id};
    `;
    } catch (error) {
      throw new Error("Cannot delete article with provided id");
    }
    revalidatePath("/dashboard/articles");
  }
}
