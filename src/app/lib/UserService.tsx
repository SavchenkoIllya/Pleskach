"use server";
import { IUser } from "./definitions";
import { sql } from "@vercel/postgres";
import { ServiceError } from "./definitions";
import { revalidatePath } from "next/cache";
import { UserSchema } from "./Schemes";

interface IUserService {
  getAllUsers(): Promise<IUser[] | ServiceError>;
  createUser(user: Partial<IUser>): Promise<void | ServiceError>;
  updateUser(id: number, user: Partial<IUser>): Promise<void | ServiceError>;
  validateUser(formData: Partial<IUser>): Partial<IUser> | ServiceError;
}

const UpdateUser = UserSchema.omit({ id: true });

class UserService implements IUserService {
  async getAllUsers(): Promise<IUser[] | ServiceError> {
    try {
      const data = await sql<IUser>`
        SELECT id, name, phone, email, telgram_link, whatsapp_link
        FROM users;
        `;
      const users = data.rows;
      return users;
    } catch (error) {
      return { message: "Error. Cannot fetch Users" };
    }
  }

  validateUser(formData: Partial<IUser>): Partial<IUser> | ServiceError {
    const validatedFields = UpdateUser.safeParse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      telgram_link: formData.telgram_link,
      whatsapp_link: formData.whatsapp_link,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed.",
      };
    }

    const user = UpdateUser.parse({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      telgram_link: formData.telgram_link,
      whatsapp_link: formData.whatsapp_link,
    });

    return user;
  }

  async updateUser(
    id: number,
    { name, phone, email, telgram_link, whatsapp_link }: Partial<IUser>,
  ): Promise<void | ServiceError> {
    try {
      await sql`
          UPDATE users
          SET name = ${name},
              phone = ${phone},
              email = ${email},
              telgram_link = ${telgram_link},
              whatsapp_link = ${whatsapp_link}
          WHERE id=${id};
        `;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createUser({
    name,
    phone,
    email,
    telgram_link,
    whatsapp_link,
  }: Partial<IUser>): Promise<void | ServiceError> {
    try {
      await sql`
          INSERT INTO users (name, phone, email, telgram_link, whatsapp_link)
          VALUES(${name}, ${phone}, ${email}, ${telgram_link}, ${whatsapp_link})
        `;
    } catch (error) {
      //   return { message: "Error. Cannot create user" };
      throw new Error("Error. Cannot create user");
    }
  }
}

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
    return Error(validatedInputs.message!);
  }
  user.createUser(validatedInputs as Partial<IUser>);
  revalidatePath("/dashboard/profile");
};

export { getUsers, updateUser, createUser };
