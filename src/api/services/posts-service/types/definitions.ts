import { PostForm } from "./Schema";
import { ServiceError } from "@/api/definitions";

export interface IPosts {
  id: number;
  name: string;
  telephone: string;
  problem: string;
  is_read: false;
  date: Date | string;
}

export interface IPaginatedPosts {
  totalContent: number;
  contentOnPage: number;
  data: IPosts[] | null;
}

export interface IPostsService extends Partial<IPosts> {
  getPaginatedPosts(pageNum: number): Promise<IPaginatedPosts | ServiceError>;
  createPost(formData: PostForm): Promise<void | ServiceError>;
  markPostAsRead(postId: number, pageNum: number): Promise<void | ServiceError>;
  deletePost(postId: number, pageNum: number): Promise<void | ServiceError>;
}
