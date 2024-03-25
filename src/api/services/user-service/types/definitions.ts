import { ServiceError } from "@/api/definitions";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  telgram_link?: string;
  whatsapp_link?: string;
}

export interface IUserService {
  getAllUsers(): Promise<IUser[] | ServiceError>;
  createUser(user: Partial<IUser>): Promise<void | ServiceError>;
  updateUser(id: number, user: Partial<IUser>): Promise<void | ServiceError>;
  validateUser(formData: Partial<IUser>): Partial<IUser> | ServiceError;
}
