"use server";
import { auth, signIn, signOut } from "@/auth";
import { Session } from "next-auth";
import { ServiceError } from "./definitions";
import { IUser } from "./definitions";
import { revalidatePath } from "next/cache";

interface ILoginInputs extends Partial<IUser> {
  password: string;
}

export interface ISessionUserService {
  login(formData: ILoginInputs): Promise<void | ServiceError>;
  getUserSession(): Promise<Session | ServiceError | null>;
  logout(): Promise<void | ServiceError>;
}

class SessionUserServices implements ISessionUserService {
  async login(formData: ILoginInputs) {
    const { email, password } = formData;
    try {
      await signIn("credentials", {
        email: email,
        password: password,
      });
    } catch (error) {
      return { message: "Error. Cannot authenticate this user" };
    }
  }

  async getUserSession() {
    try {
      const user = await auth();
      return user;
    } catch (error) {
      return { message: "Error. Cannot get current session" };
    }
  }

  async logout() {
    try {
      await signOut();
    } catch {
      return { message: "Error. Cannot logout" };
    }
  }
}

const userSession = new SessionUserServices();
/**
 *
 * @returns object that include information about user in field "user", and token expiration time
 */
const getSession = async () => userSession.getUserSession();
/**
 * Function that allows you to get current session information
 * @param formData email and password
 * @returns
 */
const login = async (formData: ILoginInputs) => userSession.login(formData);
const logout = async () => {
  userSession.logout();
  revalidatePath("/");
};

export { getSession, login, logout };
