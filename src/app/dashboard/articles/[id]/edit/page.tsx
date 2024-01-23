import { getArticleById } from "@/app/lib/action";
import { Article } from "@/app/page";
import { EditArticleForm } from "@/app/ui/dashboard/edit-article-form";

export default async function EditArticle(req: {
  params: Record<string, any>;
}) {
  const { id } = req.params;
  const article = (await getArticleById(id)) as Article;

  return (
    <div className="p-4 flex flex-col justify-between items-center h-[100%]">
      <EditArticleForm data={article} />
    </div>
  );
}
