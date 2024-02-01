"use server";
import { auth, signIn, signOut } from "@/auth";
import { Session } from "next-auth";
import { ServiceError } from "./definitions";

export interface ISessionUserService {
  login(formData: FormData): Promise<void | ServiceError>;
  getUserSession(): Promise<Session | ServiceError | null>;
  logout(): Promise<void | ServiceError>;
}

class SessionUserServices implements ISessionUserService {
  async login(formData: FormData) {
    const { email, password } = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
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
const login = async (formData: FormData) => userSession.login(formData);
const logout = async () => userSession.logout();

export { getSession, login, logout };
