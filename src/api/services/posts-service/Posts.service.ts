import { ServiceError } from "../../definitions";
import { getCurrentDate } from "../utils/utils";
import { POSTS_ON_PAGE } from "./utils/constants";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { PostSchema } from "./types/Schema";
import { IPostsService, IPosts, IPaginatedPosts } from "./types/definitions";
import { PostForm } from "./types/Schema";

// Think about any kind of auto-revalidation

export class PostsService implements IPostsService {
  private revalidation(pageNum: number) {
    revalidatePath(`/dashboard/posts/${pageNum}`);
  }

  private validatePost(formData: PostForm): Partial<IPosts> | ServiceError {
    const validatedFields = PostSchema.safeParse({
      name: formData.name,
      telephone: formData.telephone,
      problem: formData.problem,
    });

    if (!validatedFields.success) return validatedFields.error;

    const { name, telephone, problem } = PostSchema.parse({
      name: formData.name,
      telephone: formData.telephone,
      problem: formData.problem,
    });
    const date = getCurrentDate();

    return { name, telephone, problem, date };
  }

  async getPaginatedPosts(
    pageNum: number,
  ): Promise<IPaginatedPosts | ServiceError> {
    try {
      const posts = await sql`
        SELECT *
        FROM posts
        ORDER BY date DESC
        LIMIT ${POSTS_ON_PAGE}
        OFFSET (${pageNum} - 1) * ${POSTS_ON_PAGE};
        `;

      const postsAmount = await sql`
        SELECT COUNT(*) AS total_rows
        FROM posts;
        `;

      const data = await Promise.all([postsAmount, posts]);
      const totalPosts = data[1].rows[0].total_rows || 1;

      return {
        totalContent: totalPosts,
        contentOnPage: POSTS_ON_PAGE,
        data: data[1].rows as IPosts[],
      };
    } catch (error) {
      return { message: "error" };
    }
  }

  async createPost(formData: PostForm): Promise<void | ServiceError> {
    const validationResult = this.validatePost(formData);
    if ("name" in validationResult) {
      const { name, telephone, problem, date } = validationResult;
      try {
        await sql`
            INSERT INTO posts (name, telephone, problem, date)
            VALUES (${name}, ${telephone}, ${problem}, ${date as string})
            `;
      } catch (error) {
        throw new Error("Cannot create new post");
      }
    }
  }

  async markPostAsRead(
    postId: number,
    pageNum: number,
  ): Promise<void | ServiceError> {
    try {
      await sql`
        UPDATE posts
        SET is_read = true
        WHERE id = ${postId};
        `;
      this.revalidation(pageNum);
    } catch (error) {
      throw new Error("Cannot get Posts");
    }
  }

  async deletePost(
    postId: number,
    pageNum: number,
  ): Promise<void | ServiceError> {
    try {
      await sql`
        DELETE FROM posts
        WHERE id = ${postId};
        `;
      this.revalidation(pageNum);
    } catch (error) {
      throw new Error("Cannot delete Post");
    }
  }
}
