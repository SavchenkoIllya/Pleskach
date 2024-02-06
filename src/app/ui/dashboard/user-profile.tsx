"use client";
import { IUser } from "@/app/lib/definitions";
import { IComponentProps } from "../types/types";
import { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { updateUser } from "@/app/lib/User.service";
import { UserSchema } from "@/app/lib/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "../ui/dashboard/avatar";
import Link from "next/link";
import { z } from "zod";

interface IUserProfilesProps extends IComponentProps {
  users: IUser[];
}

export const UserProfiles = ({ users, ...rest }: IUserProfilesProps) => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {users.map((el: IUser) => (
        <UserCard key={el.id} user={el} />
      ))}
    </div>
  );
};

interface IUserCardProps extends IComponentProps {
  user: IUser;
}

const UserCard = ({ user }: IUserCardProps) => {
  return (
    <div className={clsx("modal-bg soft-shadow flex gap-4 p-8")}>
      <Avatar username={user.name} />
      <div>
        <Link
          href={{
            pathname: `/dashboard/profile/${user.id}`,
            query: { ...user },
          }}
        >
          <h2 className="h2 w-[310px] max-w-[500px] text-xl hover:cursor-pointer hover:underline lg:w-auto lg:max-w-fit lg:text-2xl">
            {user.name}
          </h2>
        </Link>
        <p className="descriptor">Doctor</p>
      </div>
    </div>
  );
};

interface IUserFormProps extends IComponentProps {
  user?: IUser;
}

type UserFormFields = z.infer<typeof UserSchema>;

export const UserForm = ({ user }: IUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserFormFields>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      telgram_link: user?.telgram_link || "",
      whatsapp_link: user?.whatsapp_link || "",
    },
    resolver: zodResolver(UserSchema),
  });

  const submit = async (data: any) => {
    try {
      // submitCallback();
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
      console.log(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-6 mb-2 mt-6 flex max-w-md flex-col"
    >
      <div className="group relative z-0 mb-5 w-full">
        <label className="paragraph" htmlFor="name">
          Name
        </label>
        <input
          className="input-outlined"
          type="name"
          id="name_input"
          placeholder=" "
          required
          {...register("name")}
        />
        {errors.name && (
          <p className="my-2 text-center text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label htmlFor="email">E-mail</label>
        <input
          className="input-outlined"
          type="email"
          id="email_input"
          placeholder=" "
          {...register("email")}
        />
        {errors.email && (
          <p className="my-2 text-center text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label htmlFor="phone">Phone</label>
        <input
          className="input-outlined"
          type="tel"
          id="phone_input"
          placeholder="+ 1 234 56 78 09"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="my-2 text-center text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label htmlFor="whatsapp_link">What'sApp link</label>
        <input
          className="input-outlined"
          type="text"
          id="what'sapp_link"
          placeholder=" "
          {...register("whatsapp_link")}
        />
        {errors.whatsapp_link && (
          <p className="my-2 text-center text-red-500">
            {errors.whatsapp_link.message}
          </p>
        )}
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label htmlFor="telgram_link">Telegram link</label>
        <input
          className="input-outlined"
          type="text"
          id="telgram_link_id"
          placeholder=" "
          {...register("telgram_link")}
        />
        {errors.telgram_link && (
          <p className="my-2 text-center text-red-500">
            {errors.telgram_link.message}
          </p>
        )}
      </div>
      <div className="mt-4 flex gap-8 self-center">
        <button
          className="btn-dashboard-primary"
          disabled={isSubmitting ? true : false}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button
          className="btn-dashboard-cancel bg-red-500 text-white hover:bg-red-500 hover:text-white/75"
          type="button"
        >
          Discard
        </button>
      </div>
      {errors.root && errors.root.message}
    </form>
  );
};
