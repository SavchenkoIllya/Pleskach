export interface IPosts {
  id: number;
  name: string;
  telephone: string;
  problem: string;
  is_read: false;
  date: Date | string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  telgram_link?: string;
  whatsapp_link?: string;
}

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

export interface ServiceError {
  errors?: Record<string, string[]>;
  message?: string;
}
