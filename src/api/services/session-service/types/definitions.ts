import { Session } from "next-auth";
import { ServiceError } from "@/api/definitions";
import { IUser } from "../../user-service/types/definitions";

export interface ILoginInputs extends Partial<IUser> {
  password: string;
}

export interface ISessionUserService {
  login(formData: ILoginInputs): Promise<void | ServiceError>;
  getUserSession(): Promise<Session | ServiceError | null>;
  logout(): Promise<void | ServiceError>;
}
