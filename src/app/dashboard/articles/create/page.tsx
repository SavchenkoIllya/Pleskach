"use client";
import { useState, useEffect, ChangeEvent, useReducer } from "react";
import { DashboardButton } from "@/app/ui/dashboard-button";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useForm, SubmitHandler } from "react-hook-form";
import { createArticle } from "@/app/lib/utils";
import { Article } from "@/app/page";
import Hint from "@/app/ui/dashboard/hint";

const DEFAULT_CONTENT = "";
const MESSAGE_DELAY = 5000;

type ArticleInputs = Partial<Article> & { tags: string };

enum FormActionsTypes {
  SUCCEED = "SUCCEED",
  FAILED = "FAILED",
  CHECK = "CHECK",
  SET_MARKDOWN = "SET_MARKDOWN",
  SET_DEFAULT_STATE = "SET_DEFAULT_STATE",
}

interface FormAction {
  type: FormActionsTypes;
  payload?: string;
}

interface IFormState {
  status: "idle" | "failed" | "succeed";
  message: string;
  isChecked: boolean;
  markdownSource: string;
}

const initialFormState: IFormState = {
  status: "idle",
  message: "",
  isChecked: true,
  markdownSource: DEFAULT_CONTENT,
};

function formReducer(state: IFormState, action: FormAction): IFormState {
  const { type, payload } = action;
  switch (type) {
    case FormActionsTypes.SUCCEED: {
      return {
        ...state,
        status: "succeed",
        message: "Your article has been successfully created",
        markdownSource: DEFAULT_CONTENT,
      };
    }
    case FormActionsTypes.FAILED: {
      return {
        ...state,
        status: "failed",
        message: `Error, something wrong. ${payload || ""}`,
      };
    }
    case FormActionsTypes.CHECK: {
      return {
        ...state,
        isChecked: !state.isChecked,
      };
    }
    case FormActionsTypes.SET_MARKDOWN: {
      return {
        ...state,
        markdownSource: payload || DEFAULT_CONTENT,
      };
    }
    case FormActionsTypes.SET_DEFAULT_STATE: {
      return { ...initialFormState };
    }
    default:
      return state;
  }
}

export default function CreateArticle() {
  const {
    register,
    handleSubmit, 
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleInputs>();
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const handleCheck = () => {
    dispatch({ type: FormActionsTypes.CHECK });
  };
  let timeoutId: ReturnType<typeof setTimeout>;
  const submit: SubmitHandler<ArticleInputs> = async (data) => {
    try {
      await createArticle(data);
      dispatch({ type: FormActionsTypes.SUCCEED });
      reset({
        title: "",
        content: "",
        tags: "",
        is_published: true,
      });
      timeoutId = setTimeout(() => {
        dispatch({ type: FormActionsTypes.SET_DEFAULT_STATE });
      }, MESSAGE_DELAY);
    } catch (error: any) {
      dispatch({ type: FormActionsTypes.FAILED, payload: error?.message });
    }
  };

  useEffect(() => {
    setValue("content", state.markdownSource);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.markdownSource]);

  return (
    <div className="flex flex-col items-center p-4">
      <form
        className="dark:bg-dashboard-wrapper mt-4 flex flex-col gap-4 rounded-2xl bg-none p-4 md:mt-8 md:p-10"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="h2">Create new article</h1>
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            className="input"
            id="title"
            type="text"
            placeholder="TItle"
            {...register("title", { required: true })}
          />
        </div>

        <Hint />

        <div data-color-mode="light">
          <MDEditor
            value={state.markdownSource}
            visibleDragbar={false}
            className="rounded-xl"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            onChange={(value) => {
              dispatch({
                type: FormActionsTypes.SET_MARKDOWN,
                payload: value,
              });
            }}
          />
        </div>
        <div className="flex h-min w-[100%] flex-col flex-nowrap items-center justify-between gap-4 self-start">
          <label htmlFor="tags" className="sr-only">
            Tags
          </label>
          <input
            className="input"
            type="text"
            id="tags"
            placeholder="Tags"
            {...register("tags")}
          />
        </div>
        <div className="flex h-min w-[100%] flex-nowrap items-center gap-4 self-start">
          <label className="paragraph" htmlFor="publish">
            Publish immediately?
          </label>
          <input
            id="publish"
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
            type="checkbox"
            checked={state.isChecked}
            onClick={handleCheck}
            {...register("is_published", { required: true })}
          />
        </div>
        <button className="btn-dashboard-primary self-center" type="submit">
          Send
        </button>
        {state.status === "succeed" && (
          <p className="descriptor w-[100%] self-center rounded-lg bg-green-500 p-4 text-center text-white">
            {state.message}
          </p>
        )}
        {state.status === "failed" && (
          <p className="descriptor w-[100%] self-center rounded-lg bg-red-500 p-4 text-center text-white">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
