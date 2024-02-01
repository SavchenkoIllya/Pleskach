"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./button";
import { createPost } from "../lib/utils";
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
    try {
      await createPost(data);
      setSuccess(
        "Your message was successfully sent. Wait when doctor contact you."
      );
      reset({
        name: "",
        telephone: "",
        problem: "",
      });
    } catch (error) {
      console.error("error", error);
      setError("Your message wasn't sent");
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-8 m-auto w-fit max-w-[1000px] bg-accent rounded-3xl shadow-xl shadow-accent/15"
      noValidate
    >
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        <label htmlFor="name"> Введите своё ФИО</label>
        <input
          id="name"
          className="outline-none w-[100%] border-solid border-2 border-transparent p-2 rounded-xl text-plane-text"
          type="text"
          {...register("name", {
            required: "Это поле необходимо",
            minLength: { value: 3, message: "Введите больше 3-х символов" },
          })}
          aria-invalid={errors.name ? "true" : "false"}
        />
      </div>
      {errors.name && (
        <p role="alert" className="text-sm self-center text-red-700">
          {errors.name?.message}
        </p>
      )}
      <div id="name-error" aria-live="polite" aria-atomic="true">
        <p className="self-end text-sm text-red-700"></p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        <label htmlFor="telephone"> Введите свой номер телефона</label>
        <input
          className="w-[100%] border-solid border-2 border-transparent outline-none p-2 rounded-xl text-plane-text"
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
        <p role="alert" className="text-sm self-center text-red-700">
          {errors.telephone?.message}
        </p>
      )}
      <div className="flex flex-col flex-nowrap items-center justify-between w-[100%] gap-4 self-start">
        <label htmlFor="problem"> Опишите свою проблему</label>
        <textarea
          id="problem"
          className="outline-none border-solid border-2 border-transparent p-2 rounded-xl w-[100%] h-[200px] resize-none text-plane-text"
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
        style={{ background: "white", color: "#86B6F6" }}
        className="self-center"
      >
        Отправить
      </Button>
    </form>
  );
};
