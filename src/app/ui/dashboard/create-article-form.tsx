// import Hint from "./hint";

// const DEFAULT_CONTENT = "";

// export const CreateArticleForm = () => {
// const {
//   register,
//   handleSubmit,
//   setValue,
//   reset,
//   formState: { errors },
// } = useForm<ArticleInputs>();
// const [markdownSource, setMarkdownSource] = useState(DEFAULT_CONTENT);
// const [isChecked, setChecked] = useState<boolean>(true);

// const handleCheck = () => setChecked(!isChecked);

// const submit: SubmitHandler<ArticleInputs> = async (data) => {
//   try {
//     console.log(data);
//   } catch (error) {
//     console.log(errors);
//   }

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
// };

// useEffect(() => {
//   setValue("content", markdownSource);
// }, [markdownSource]);

// return (
//   <form
//     className="dark:bg-dashboard-wrapper mt-4 flex flex-col gap-4 rounded-2xl bg-none p-10 md:mt-8"
//     onSubmit={handleSubmit(submit)}
//   >
//     <h1 className="h2">Create new article</h1>
//     <div>
//       <label htmlFor="title" className="sr-only">
//         Title
//       </label>
//       <input
//         className="input"
//         id="title"
//         type="text"
//         placeholder="TItle"
//         {...register("title", { required: true })}
//       />
//     </div>

//     <Hint />

//     <div data-color-mode="light">
//       <MDEditor
//         value={markdownSource}
//         visibleDragbar={false}
//         className="rounded-xl"
//         previewOptions={{
//           rehypePlugins: [[rehypeSanitize]],
//         }}
//         onChange={
//           setMarkdownSource as (
//             value?: string | undefined,
//             event?: ChangeEvent<HTMLTextAreaElement> | undefined,
//             state?: ContextStore | undefined,
//           ) => void
//         }
//       />
//     </div>
//     <div className="flex h-min w-[100%] flex-col flex-nowrap items-center justify-between gap-4 self-start">
//       <label htmlFor="tags" className="sr-only">
//         Tags
//       </label>
//       <input
//         className="input"
//         type="text"
//         id="tags"
//         placeholder="Tags"
//         {...register("tags")}
//       />
//     </div>
//     <div className="flex h-min w-[100%] flex-nowrap items-center gap-4 self-start">
//       <label className="paragraph" htmlFor="publish">
//         Publish immediately?
//       </label>
//       <input
//         id="publish"
//         className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
//         type="checkbox"
//         checked={isChecked}
//         onClick={handleCheck}
//         {...register("published", { required: true })}
//       />
//     </div>
//     <button className="btn-dashboard-primary self-center" type="submit">
//       Send
//     </button>
//   </form>
// );
// };
