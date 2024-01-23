"use client";
import { Remark } from "react-remark";
import { Heading } from "../ui/heading";
import { Container } from "../ui/container";
import { Header } from "../ui/header";

export default function ArticlePost(req: { searchParams: any }) {
  const { title, content } = req.searchParams;

  return (
    <>
      <Header telephone="+79855310868" className="mt-2" />
      <section className="min-h-[100dvh] bg-background">
        <Container className="my-20 p-8 text-plane-text">
          <Heading>{title}</Heading>
          <Remark>{content}</Remark>
        </Container>
      </section>
    </>
  );
}
