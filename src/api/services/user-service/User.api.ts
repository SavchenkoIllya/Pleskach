"use server";
import { UserService } from "./User.service";
import { IUser } from "./types/definitions";
import { revalidatePath } from "next/cache";

const user = new UserService();

const getUsers = async () => user.getAllUsers();
const updateUser = async (id: number, formData: Partial<IUser>) => {
  const validatedInputs = user.validateUser(formData);
  if ("errors" in validatedInputs) {
    return { message: validatedInputs.errors };
  }
  user.updateUser(id, validatedInputs as Partial<IUser>);
  revalidatePath("/dashboard/profile");
};

const createUser = async (formData: Partial<IUser>) => {
  const validatedInputs = user.validateUser(formData);
  if ("errors" in validatedInputs) {
    throw new Error(validatedInputs.message!);
  }
  user.createUser(validatedInputs as Partial<IUser>);
  revalidatePath("/dashboard/profile");
};

export { getUsers, updateUser, createUser };
