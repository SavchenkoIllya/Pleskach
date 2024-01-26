"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { DashboardButton } from "@/app/ui/dashboard-button";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useForm, SubmitHandler } from "react-hook-form";
import { createArticle } from "@/app/lib/action";
import { Input } from "../form/input";
import { Label } from "../form/label";
import Hint from "./hint";

export type ArticleInputs = {
  title: string;
  content: string;
  tags: string;
  published: boolean;
};

const DEFAULT_CONTENT = "";

export const CreateArticleForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleInputs>();
  const [markdownSource, setMarkdownSource] = useState(DEFAULT_CONTENT);
  const [isChecked, setChecked] = useState<boolean>(true);

  const handleCheck = () => setChecked(!isChecked);

  const submit: SubmitHandler<ArticleInputs> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(errors);
    }

    // try {
    //   await createArticle(data);
    //   reset({
    //     title: "",
    //     content: "",
    //     tags: "",
    //     published: true,
    //   });
    //   setMarkdownSource(DEFAULT_CONTENT);
    // } catch (error) {}
  };

  useEffect(() => {
    setValue("content", markdownSource);
  }, [markdownSource]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <div>
        <Label htmlFor="title" className="sr-only">
          Title
        </Label>
        <Input id="title" placeholder="Title" {...register("title")} />
      </div>

      <Hint />

      <div data-color-mode="light">
        <MDEditor
          value={markdownSource}
          visibleDragbar={false}
          className="rounded-xl"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          onChange={
            setMarkdownSource as (
              value?: string | undefined,
              event?: ChangeEvent<HTMLTextAreaElement> | undefined,
              state?: ContextStore | undefined
            ) => void
          }
        />
      </div>
      <div className="flex flex-col flex-nowrap items-center justify-between w-[100%] h-min gap-4 self-start">
        <Label htmlFor="tags" className="sr-only">
          Tags
        </Label>
        <Input id="tags" type="text" placeholder="Tags" {...register("tags")} />
      </div>
      <div className="flex flex-nowrap items-center w-[100%] h-min gap-4 self-start">
        <Label htmlFor="publish">Publish immediately?</Label>
        <input
          id="publish"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          type="checkbox"
          checked={isChecked}
          onClick={handleCheck}
          {...register("published", { required: true })}
        />
      </div>
      <DashboardButton
        type="submit"
        className="self-center rounded-lg transition-colors duration-300 transform px-6 py-2  text-blue-600 hover:bg-blue-500"
      >
        Send
      </DashboardButton>
    </form>
  );
};
