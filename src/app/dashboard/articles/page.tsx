import { Card } from "@/app/ui/card";
import { getArticles } from "@/app/lib/Articles.service";
import Link from "next/link";
import { IArticle } from "@/app/lib/definitions";
import { Header } from "@/app/ui/ui/dashboard/header";
import { Suspense } from "react";

export default async function Articles() {
  let articles: IArticle[] = [];
  await getArticles().then((res) => {
    if (res instanceof Array && res.length > 0) {
      articles = res;
    }
  });

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Header>
          <Link
            href={"/dashboard/articles/create"}
            className="btn-dashboard-primary m-0 flex items-center gap-4 shadow-lg shadow-accent/50 transition-all"
          >
            <span>Create new article</span>
            <span className="text-2xl">+</span>
          </Link>
        </Header>
        <div className="flex flex-col p-4">
          <article className="mt-8 flex flex-wrap justify-center gap-8">
            {articles?.map((article) => {
              return (
                <Card
                  key={article.id}
                  id={article.id}
                  link={`/dashboard/articles/${article.id}/edit`}
                  title={article.title}
                  content={article.content}
                />
              );
            })}
          </article>
        </div>
      </Suspense>
    </>
  );
}
