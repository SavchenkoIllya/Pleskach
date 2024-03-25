"use client";
import { useForm } from "react-hook-form";
import { createPost } from "@/api/services/posts-service/Posts.api";
import { landing } from "@/app/locales/ru-RU/ru";
import {
  PostForm,
  PostSchema,
} from "@/api/services/posts-service/types/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>({ resolver: zodResolver(PostSchema) });

  const onSubmit = async (data) => {
    try {
      await createPost(data);
    } catch (error) {
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex w-fit max-w-[1000px] flex-col gap-4 rounded-3xl  p-8 "
      noValidate
    >
      <div className="flex flex-col items-center justify-between gap-2 lg:flex-nowrap">
        <label htmlFor="name" className="self-start text-accent">
          {landing.form.nameLabel}
        </label>
        <input
          id="name"
          className="landing__form__input w-[100%]"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <p role="alert" className="input__failure-message self-center">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center justify-between gap-2 lg:flex-nowrap">
        <label htmlFor="telephone" className="text-accent">
          {landing.form.telephoneLabel}
        </label>
        <input
          className="landing__form__input w-[100%]"
          type="tel"
          id="telephone"
          required
          {...register("telephone")}
        />
        {errors.telephone && (
          <p role="alert" className="input__failure-message self-center">
            {errors.telephone.message}
          </p>
        )}
      </div>
      <div className="flex w-[100%] flex-col flex-nowrap  justify-between gap-4 self-start">
        <label htmlFor="problem" className="text-accent">
          {landing.form.problemLabel}
        </label>
        <textarea
          id="problem"
          className="landing__form__input h-[200px] w-[100%] resize-none"
          {...register("problem")}
        />
        {errors.problem && (
          <p role="alert" className="input__failure-message self-center">
            {errors.problem.message}
          </p>
        )}
      </div>
      {errors.root && errors.root.message}
      <input
        type="submit"
        className="landing__button self-center"
        value={landing.form.send}
      />
    </form>
  );
};
