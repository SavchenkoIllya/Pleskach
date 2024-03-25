"use server";
import { PostsService } from "./Posts.service";
import { PostForm } from "./types/Schema";

const post = new PostsService();

// Todo comments

const getPaginatedPosts = async (pageNum: number) =>
  await post.getPaginatedPosts(pageNum);

const createPost = async (fromData: PostForm) =>
  await post.createPost(fromData);

const markPostAsRead = async (postId: number, pageNum: number) =>
  await post.markPostAsRead(postId, pageNum);

const deletePost = async (postId: number, pageNum: number) =>
  await post.deletePost(postId, pageNum);

export { getPaginatedPosts, createPost, markPostAsRead, deletePost };
