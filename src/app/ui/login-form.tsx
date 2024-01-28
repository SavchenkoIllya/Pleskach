"use client";
import { Button } from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { authenticate } from "../lib/action";
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

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      await authenticate(data);
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
        className=" overflow-y-auto overflow-x-hidden z-50 justify-center items-center m-auto"
      >
        <div className="relative p-4 w-[400px] max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <form
                className="space-y-4 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
