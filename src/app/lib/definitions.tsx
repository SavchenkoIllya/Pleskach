export type Posts = {
  id: number;
  name: string;
  telephone: string;
  problem: string;
  is_read: false;
  date: Date;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  telgram_link?: string;
  whatsapp_link?: string;
};