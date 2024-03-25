import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { ISessionUserService } from "./types/definitions";
import { ILoginInputs } from "./types/definitions";

export class SessionUserServices implements ISessionUserService {
  async login(formData: ILoginInputs) {
    const { email, password } = formData;
    try {
      await signIn("credentials", {
        email: email,
        password: password,
      });
    } catch (error) {
      throw new Error("Error. Cannot authenticate this user");
    }
  }

  async getUserSession() {
    try {
      const user = await auth();
      return user;
    } catch (error) {
      throw new Error("Error. Cannot get current session");
    }
  }

  async logout() {
    try {
      await signOut();
      revalidatePath("/");
    } catch {
      throw new Error("Error. Cannot logout");
    }
  }
}
