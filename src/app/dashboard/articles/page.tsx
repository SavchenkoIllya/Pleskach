import { Button } from "@/app/ui/button";
import { CreateArticleForm } from "@/app/ui/dashboard/create-article-form";
import { Card } from "@/app/ui/card";
import { getArticles } from "@/app/lib/action";
import { Article } from "@/app/page";
import { DashboardButton } from "@/app/ui/dashboard-button";
import Link from "next/link";

export default async function Articles() {
  const articles = (await getArticles()) as Article[];

  return (
    <div className="p-4 flex flex-col h-[100%]">
      <DashboardButton
        as={Link}
        href={"/dashboard/articles/create"}
        className="flex items-center gap-4 shadow-xl shadow-accent/50 transition-all hover:translate-y-1"
      >
        <span>Create new article</span>
        <div className="bg-gradient-to-b from-sky-600 to-white/30 rounded-full p-[2px]">
          <div className="bg-sky-500 backdrop-blur-lg  text-white leading-[8px] font-bold p-2 transition-all ease-in-out rounded-full fill-sky-600 ">
            +
          </div>
        </div>
      </DashboardButton>
      <article className="flex flex-wrap mt-8">
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
