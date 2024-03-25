import { ServiceError } from "@/api/definitions";

export interface IArticle {
  id: number;
  author_id: number;
  title: string;
  content: string;
  is_published: boolean;
  creation_date: Date | string;
  updating_date?: Date | string;
  tags_array?: string[];
}

export interface IArticleForm extends Partial<IArticle> {
  tags?: string | string[] | null;
  tagsArray?: string[] | null;
  is_published?: boolean;
  userName?: string | null;
  date: string;
}

export interface IArticlesService {
  createArticles(formData: IArticleForm): Promise<void | ServiceError>;
  getArticles(): Promise<IArticle[] | ServiceError>;
  getArticleById(id: number): Promise<IArticle | ServiceError>;
  updateArticle(
    id: number,
    formData: IArticleForm,
  ): Promise<void | ServiceError>;
  deleteArticle(id: number): Promise<void | ServiceError>;
}
