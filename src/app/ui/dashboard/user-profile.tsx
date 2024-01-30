"use client";
import { IUser } from "@/app/lib/definitions";
import { IComponentProps } from "../types/types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

interface IUserProfileProps extends IComponentProps {
  user: IUser;
}

export const UserProfile = ({ user, ...rest }: IUserProfileProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IUser>>();

  const convertedUsername = user.name
    .split(" ")
    .reduce((acc, el, idx) => (acc += el[0]), "");

  const handleToggle = () => {
    setIsEditing(!isEditing);
  };

  const submit = () => {};

  return (
    <div className="leading-1.5 m-auto my-16 flex w-[310px] max-w-[500px] flex-col rounded-xl border-gray-200 bg-sky-600 shadow-xl shadow-accent/50 lg:w-auto">
      <div className={clsx("w-fit border-b border-transparent  transition")}>
        <div
          className={clsx(
            "glass mx-auto -mt-8 mb-4 flex items-center gap-4 rounded-lg p-2 transition lg:mx-0 lg:-ml-16 lg:-mt-10 lg:p-8",
          )}
        >
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-fuchsia-800 text-4xl font-bold text-white/75">
            {convertedUsername}
          </div>
          <div>
            <h2 className="h2 max-w-[150px] text-xl text-white lg:max-w-fit lg:text-2xl">
              {user.name}
            </h2>
            <p className="descriptor text-white">Doctor</p>
          </div>
        </div>
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit(submit)}
          className="mx-6 mb-2 mt-6 flex max-w-md flex-col"
        >
          <div className="group relative z-0 mb-5 w-full">
            <label className="paragraph text-white" htmlFor="name">
              Name
            </label>
            <input
              className="input-outlined"
              type="name"
              id="name"
              placeholder=" "
              required
              value={user.name}
              {...register("name", { required: true })}
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label htmlFor="email">E-mail</label>
            <input
              className="input-outlined"
              type="email"
              id="email"
              placeholder=" "
              value={user.email}
              {...register("email", { required: true })}
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label htmlFor="phone">Phone</label>
            <input
              className="input-outlined"
              type="tel"
              id="phone"
              placeholder="+ 1 234 56 78 09"
              required
              value={user.phone}
              {...register("phone")}
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label htmlFor="what'sapp_link">What'sApp link</label>
            <input
              className="input-outlined"
              type="text"
              id="what'sapp_link"
              placeholder=" "
              value={user.whatsapp_link}
              {...register("whatsapp_link")}
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label htmlFor="telgram_link">Telegram link</label>
            <input
              className="input-outlined"
              type="text"
              id="telgram_link"
              placeholder=" "
              value={user.telgram_link}
              {...register("telgram_link")}
            />
          </div>
          <div className="mt-4 flex gap-8 self-center">
            <button className="btn-dashboard-outline" type="submit">
              Save
            </button>
            <button
              className="btn-dashboard-cancel text-white hover:text-white/75"
              style={{ backgroundColor: "rgb(220 38 38)" }}
              type="button"
              onClick={handleToggle}
            >
              Discard
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="btn-dashboard-outline m-8 mt-0 self-end"
          onClick={handleToggle}
        >
          Edit
        </button>
      )}
    </div>
  );
};
