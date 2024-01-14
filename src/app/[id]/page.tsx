import Link from "next/link";
import { Button } from "../ui/button";
import { Container } from "../ui/container";

export default function Article() {
  return (
    <section className="min-h-[100dvh]">
      <Container className="my-36">
        <Button href="/" as={Link}>
          Назад
        </Button>
      </Container>
    </section>
  );
}
