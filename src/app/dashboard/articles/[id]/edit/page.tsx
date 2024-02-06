import { getArticleById, updateArticle } from "@/app/lib/Articles.service";
import { IArticle } from "@/app/lib/definitions";
import { BackButton } from "@/app/ui/dashboard/back-button";
import { ArticleForm } from "@/app/ui/ui/dashboard/article-form";
import { Header } from "@/app/ui/ui/dashboard/header";
import Link from "next/link";

export default async function EditArticle(req: {
  params: Record<string, any>;
}) {
  const { id } = req.params;
  const article: IArticle | undefined = await getArticleById(id).then((res) => {
    if ("author_id" in res) {
      return res;
    }
  });
  return (
    <div className="flex h-[100%] flex-col items-center p-4 pt-0">
      <Header>
        <BackButton href={"/dashboard/articles"} />
      </Header>
      <ArticleForm article={article} type="update" />
    </div>
  );
}
