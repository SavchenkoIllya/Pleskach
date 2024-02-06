"use client";
import { Button } from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../lib/Session.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../lib/definitions";

interface ILoginInputs extends Partial<IUser> {
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const [fetchError, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginInputs> = async (data: ILoginInputs) => {
    try {
      await login(data);
      router.replace("/dashboard/profile");
    } catch (error) {
      console.error("error", error);
      setError("Error during authorization");
    }
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className=" z-50 m-auto items-center justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="relative max-h-full w-[400px] max-w-md p-4">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    {...register("password", { required: true })}
                  />
                </div>
                {!!fetchError && (
                  <div className="self-center text-sm text-red-500">
                    <p>{fetchError}</p>
                  </div>
                )}
                <Button className="self-center" type="submit">
                  Login to your account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
