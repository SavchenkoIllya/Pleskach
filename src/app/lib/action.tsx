"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData: any) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    // if (error instanceof AuthError) {
    //   console.log(error);
    // }
    throw error;
  }
}
