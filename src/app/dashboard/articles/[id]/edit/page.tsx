import { getArticleById, updateArticle } from "@/app/lib/Articles.service";
import { IArticle } from "@/app/lib/definitions";
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
    <div className="flex min-h-[100%] flex-col items-center p-4 pt-0">
      <Header>
        <Link
          href="/dashboard/articles"
          className="btn-dashboard-primary m-0 flex items-center gap-4 leading-8 shadow-lg shadow-accent/50 transition-all"
        >
          <svg
            width={20}
            height={20}
            fill="white"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
          </svg>
          <span>Back</span>
        </Link>
      </Header>
      <ArticleForm article={article} type="update" />
    </div>
  );
}
