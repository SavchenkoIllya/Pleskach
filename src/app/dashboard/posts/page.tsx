"use client";
import { useRouter } from "next/navigation";

export default function PostsDefault() {
  const router = useRouter();
  return router.push(`/dashboard/posts/1`);
}
