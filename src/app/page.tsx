import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import Image from "next/image";
import defaultDoctor from "./assets/Doctor-PNG-Images2.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { articles } from "./assets/articles";
import { Form } from "./ui/form";
import { Container } from "./ui/container";

export default function Home() {
  return (
    <>
      <section className="min-h-[100dvh] flex items-center justify-center bg-background">
        <Container className="my-20">
          <article className="flex flex-col-reverse items-center md:justify-between md:flex-row gap-4">
            <div className="my-auto flex flex-col gap-4 max-w-[500px] p-8 lg:p-0">
              <Heading className="text-heading">Zagolovok</Heading>
              <Text className="text-plane-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                iste, minus commodi obcaecati nihil repellat exercitationem.
                Quidem repellendus illo laborum quia praesentium non in dolorem.
                Quos, est omnis. Recusandae, ipsam, quasi libero est facere ad
                natus in corrupti culpa velit dolore aliquid? Necessitatibus
                consequuntur asperiores ratione aut quaerat temporibus
                laboriosam non? Magnam cum, mollitia dolorem doloremque
                provident dolores recusandae consectetur amet distinctio nisi,
                ea ipsa animi nesciunt itaque facere aspernatur sapiente. Et
                quis maxime aut dolorem pariatur nesciunt fugiat adipisci sint
                repellendus earum odio inventore amet at ab dolore, explicabo
                ut? Optio, reprehenderit modi consequuntur illum harum possimus
                deserunt nihil?
              </Text>
              <Button href="#">Contact with me</Button>
            </div>
            <Image
              className="relative object-contain max-w-[400px] mt-20 lg:max-w-[500px]"
              src={defaultDoctor}
              alt="default doctor's portrait photo"
            />
          </article>
        </Container>
      </section>
      <section className="py-16 bg-white">
        <Container>
          <Heading className="text-heading text-center mb-4">Stati</Heading>
          <article className="flex gap-8 flex-wrap justify-center">
            {articles.map((article, idx) => {
              return (
                <Card
                  key={idx}
                  link="#"
                  title={article.title}
                  imgSrc={article.image}
                  content={article.content}
                />
              );
            })}
          </article>
        </Container>
      </section>
      <section className="bg-background">
        <div className="max-w-[1080px] m-auto py-8">
          <Heading className="text-center my-8 text-heading">
            Обратная связь
          </Heading>
          <Form />
        </div>
      </section>
    </>
  );
}
