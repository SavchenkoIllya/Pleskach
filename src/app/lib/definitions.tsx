export interface IPosts {
  id: number;
  name: string;
  telephone: string;
  problem: string;
  is_read: false;
  date: Date;
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
  creation_date: Date;
  updating_date?: Date;
  tags_array?: string[];
}

export type Error = {
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    phone?: string[] | undefined;
    telegram_link?: string[] | undefined;
    whatsapp_link?: string[] | undefined;
  };
  message?: string | null | undefined;
};

export interface Session{
  
}