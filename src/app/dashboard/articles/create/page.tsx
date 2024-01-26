import { CreateArticleForm } from "@/app/ui/dashboard/create-article-form";
import { Heading } from "@/app/ui/heading";

export default function CreateArticle() {
  return (
    <div className="p-4 flex flex-col items-center h-[100dvh]">
      <Heading className="text-gray-600 my-8">Create new article</Heading>
      <CreateArticleForm />
    </div>
  );
}
