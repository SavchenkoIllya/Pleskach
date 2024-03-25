"use server";
import { ArticleService } from "./Articles.service";
import { unstable_noStore as noStore } from "next/cache";
import { IArticleForm } from "./types/definitions";
import { redirect } from "next/navigation";

const articles = new ArticleService();

const getArticles = async () => {
  noStore();
  return await articles.getArticles();
};

const getArticleById = async (id: number) => {
  noStore();
  return await articles.getArticleById(id);
};

const createArticle = async (formData: IArticleForm) =>
  await articles.createArticles(formData);

const updateArticle = async (id: number, formData: IArticleForm) =>
  await articles.updateArticle(id, formData);

const deleteArticle = async (id: number) => {
  await articles.deleteArticle(id);
  redirect("/dashboard/articles");
};

export {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
