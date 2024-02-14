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
        className="modal-bg z-50 m-auto items-center justify-center overflow-y-auto overflow-x-hidden soft-shadow border-0"
      >
        <div className="relative max-h-full w-[400px] max-w-md p-4">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-200">
              <h3 className="h2">Sign in to our platform</h3>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label htmlFor="email" className="paragraph mb-2 block">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input block w-full"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="paragraph mb-2 block">
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="input block w-full"
                    {...register("password", { required: true })}
                  />
                </div>
                {!!fetchError && (
                  <div className="self-center text-sm text-red-500">
                    <p>{fetchError}</p>
                  </div>
                )}
                <button
                  className="btn-dashboard-primary self-center"
                  type="submit"
                >
                  Login to your account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
