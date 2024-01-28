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

class User {
  public user: IUser;
  constructor(user: IUser) {
    this.user = user;
  }
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
