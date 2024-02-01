"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Button } from "@/app/ui/button";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useForm, SubmitHandler } from "react-hook-form";
// import { createArticle } from "@/app/lib/action";
// import { ArticleInputs } from "./create-article-form";
import { Article } from "@/app/page";
import { updateArticle, deleteArticle } from "@/app/lib/utils";

export const EditArticleForm = (props: { data: Article }) => {
  const article = props.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleInputs>();
  const [markdownSource, setMarkdownSource] = useState(article.content);
  const [showHint, setHint] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropDownButton = useRef<HTMLButtonElement>(null);
  const [isChecked, setChecked] = useState<boolean>(article.is_published);

  const handleCheck = () => setChecked(!isChecked);

  const submit: SubmitHandler<ArticleInputs> = async (data) => {
    try {
      await updateArticle(article.id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(article.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target?.contains(dropdownRef.current)) {
      setHint(false);
    }
  };

  useEffect(() => {
    setValue("content", markdownSource);
  }, [markdownSource]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    setValue("content", markdownSource);
    setValue("title", article.title);
    setValue("tags", article.tags_array.join(" "));
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      {/* Title */}
      <div className="flex flex-col flex-nowrap items-center justify-between w-[100%] h-min gap-4 self-start">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          className="outline-none w-[100%] border-solid border-2 border-transparent p-2 rounded-xl text-plane-text"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
      </div>

      {/* Popover */}
      <div>
        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 self-end">
          Show Hint
          <button
            className="z-[11]"
            ref={dropDownButton}
            data-popover-target="popover-description"
            data-popover-placement="bottom-end"
            type="button"
            onClick={() => setHint(true)}
            onMouseEnter={() => setHint(true)}
          >
            <svg
              className="w-5 h-5 ms-2 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Show information</span>
          </button>
        </p>

        {showHint && (
          <>
            <div
              className="z-[9] absolute w-[100dvh] h-[100%] inset-0"
              onMouseEnter={() => setHint(!showHint)}
              onClick={() => setHint(false)}
            ></div>

            <div
              ref={dropdownRef}
              data-popover
              id="popover-description"
              role="tooltip"
              className="absolute z-[11] inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Some basic markup rules
                </h3>
                <p>
                  Use # Your Heading – for headings Use ** Your text ** – for
                  bold text <br />
                  Use * Your text * – for italic text <br />
                  Use - item 1 <br />- item 2 – for lists
                </p>
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                >
                  More rules here
                  <svg
                    className="w-2 h-2 ms-1.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
              <div data-popper-arrow></div>
            </div>
          </>
        )}
      </div>
      <div data-color-mode="light">
        <input className="hidden" {...register("content")} />
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
        <label htmlFor="tags" className="sr-only">
          Tags
        </label>
        <input
          id="tags"
          className="outline-none w-[100%] border-solid border-2 border-transparent p-2 rounded-xl text-plane-text"
          type="text"
          placeholder="Tags"
          {...register("tags")}
        />
      </div>
      <div className="flex flex-nowrap items-center w-[100%] h-min gap-4 self-start">
        <label htmlFor="publish" className="text-plane-text">
          Publish immediately?
        </label>
        <input
          id="publish"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          type="checkbox"
          checked={isChecked}
          onClick={handleCheck}
          {...register("published", { required: true })}
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          style={{ background: "white", color: "#86B6F6" }}
          className="self-center"
        >
          Update
        </Button>
        <Button onClick={handleDelete} style={{ background: "#dc2626" }}>
          Delete article
        </Button>
      </div>
    </form>
  );
};
