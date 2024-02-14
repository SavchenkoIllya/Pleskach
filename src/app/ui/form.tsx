"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./button";
// import { createPost } from "../lib/utils";
import { createPost } from "../lib/Posts.service";
import { useEffect, useState } from "react";
// import useTimeout from "../utils/hooks/useTimeout";

type Inputs = {
  name: string;
  telephone: string;
  problem: string;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [fetchError, setError] = useState<string>("");
  const [fetchSuccess, setSuccess] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      await createPost(data);
      // setSuccess(
      //   "Your message was successfully sent. Wait when doctor contact you.",
      // );
      // reset({
      //   name: "",
      //   telephone: "",
      //   problem: "",
      // });
    } catch (error) {
      console.error("error", error);
      setError("Your message wasn't sent");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex w-fit max-w-[1000px] flex-col gap-4 rounded-3xl  p-8 "
      noValidate
    >
      <div className="items-center justify-between gap-4 lg:flex-nowrap">
        <label htmlFor="name" className="text-[#E5B5FF]">
          Введите своё ФИО
        </label>
        <input
          id="name"
          className="w-[100%] rounded-xl border bg-transparent border-[#E5B5FF] p-2 text-[#f7e7ff95] outline-none"
          type="text"
          {...register("name", {
            required: "Это поле необходимо",
            minLength: { value: 3, message: "Введите больше 3-х символов" },
          })}
          aria-invalid={errors.name ? "true" : "false"}
        />
      </div>
      {errors.name && (
        <p role="alert" className="self-center text-sm text-red-700">
          {errors.name?.message}
        </p>
      )}
      <div id="name-error" aria-live="polite" aria-atomic="true">
        <p className="self-end text-sm text-red-700"></p>
      </div>
      <div className="items-center justify-between gap-4 lg:flex-nowrap">
        <label htmlFor="telephone" className="text-[#E5B5FF]">
          Введите свой номер телефона
        </label>
        <input
          className="w-[100%] rounded-xl border  p-2 text-plane-text outline-none bg-transparent border-[#E5B5FF]"
          type="tel"
          id="telephone"
          required
          {...register("telephone", {
            required: "Это поле необходимо",
            pattern: {
              value: /^((\+7|\+8|7|8)*(9)+([0-9]){9})$/,
              message: "Неправильный формат телефонного номера",
            },
          })}
          aria-invalid={errors.telephone ? "true" : "false"}
        />
      </div>
      {errors.telephone && (
        <p role="alert" className="self-center text-sm text-red-700">
          {errors.telephone?.message}
        </p>
      )}
      <div className="flex w-[100%] flex-col flex-nowrap  justify-between gap-4 self-start">
        <label htmlFor="problem" className="text-[#E5B5FF]">
          Опишите свою проблему
        </label>
        <textarea
          id="problem"
          className="h-[200px] w-[100%] resize-none rounded-xl border bg-transparent border-[#E5B5FF] p-2 text-plane-text outline-none"
          {...register("problem")}
        />
      </div>
      {!!fetchError && (
        <p className="self-center text-sm text-red-500">{fetchError}</p>
      )}
      {!!fetchSuccess && (
        <p className="self-center text-sm text-white">{fetchSuccess}</p>
      )}
      <Button
        type="submit"
        className="btn-dashboard-outline rounded-lg border-[#E5B5FF] bg-transparent text-[#E5B5FF!important]"
      >
        Отправить
      </Button>
    </form>
  );
};
