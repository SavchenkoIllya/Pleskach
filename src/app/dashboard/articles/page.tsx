import { Button } from "@/app/ui/button";
import { CreateArticleForm } from "@/app/ui/dashboard/create-article-form";
import { Card } from "@/app/ui/card";
import { getArticles } from "@/app/lib/action";
import { Article } from "@/app/page";

export default async function Articles() {
  const articles = (await getArticles()) as Article[];

  return (
    <div className="p-4 flex flex-col h-[100%]">
      <Button>Create new article</Button>
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
