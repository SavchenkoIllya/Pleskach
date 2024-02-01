import { Button } from "@/app/ui/button";
// import { CreateArticleForm } from "@/app/ui/dashboard/create-article-form";
import { Card } from "@/app/ui/card";
import { getArticles } from "@/app/lib/utils";
import { Article } from "@/app/page";
import { DashboardButton } from "@/app/ui/dashboard-button";
import Link from "next/link";

export default async function Articles() {
  const articles = (await getArticles()) as Article[];

  return (
    <div className="flex h-[100%] flex-col p-4">
      <Link
        href={"/dashboard/articles/create"}
        className="btn-dashboard-primary flex items-center gap-4 shadow-lg shadow-accent/50 transition-all hover:translate-y-1"
      >
        <span>Create new article</span>
        <span className="text-2xl">+</span>
      </Link>
      <article className="mt-8 flex flex-wrap">
        {articles.map((article) => {
          return (
            <Card
              key={article.id}
              id={article.id}
              link={`/dashboard/articles/${article.id}/edit`}
              title={article.title}
              imgSrc={article.image}
              content={article.content}
            />
          );
        })}
      </article>
    </div>
  );
}
