import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

import Header from "../Components/Header/Header";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import Heading from "../Components/Heading/Heading";
import PlaneText from "../Components/PlaneText/PlaneText";
import Button from "../Components/Button/Button";
import ArticleCard from "../Components/ArticleCard/ArticleCard";
import Form from "../Components/Form/Form";

import styles from "./styles/MainPage.module.scss";
import photo from "../assets/Doctor-PNG-Images2.png";
import { gradient } from "./styles/variables";

const Main = () => {
  const [articles, setArticles] = useState([]);

  async function logArticles(src) {
    const response = await fetch(src);
    const articles = await response.json();
    return articles;
  }

  useEffect(() => {
    let articles = logArticles("http://192.168.178.29:3000/articles.json");
    articles.then((res) => {
      if (res) {
        setArticles((prev) => (prev = res.articles));
      }
    });
  }, []);

  const handleClick = () => {
    console.log("ok");
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Сомнолог Екатерина Плескач Новороссийск</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Header />
      <PageWrapper>
        <section className={styles.content}>
          <div className={styles.primary}>
            <Heading>
              Ваш <span>сомнолог</span> на каждый день
            </Heading>
            <PlaneText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iste,
              minus commodi obcaecati nihil repellat exercitationem. Quidem
              repellendus illo laborum quia praesentium non in dolorem. Quos,
              est omnis. Recusandae, ipsam, quasi libero est facere ad natus in
              corrupti culpa velit dolore aliquid? Necessitatibus consequuntur
              asperiores ratione aut quaerat temporibus laboriosam non? Magnam
              cum, mollitia dolorem doloremque provident dolores recusandae
              consectetur amet distinctio nisi, ea ipsa animi nesciunt itaque
              facere aspernatur sapiente. Et quis maxime aut dolorem pariatur
              nesciunt fugiat adipisci sint repellendus earum odio inventore
              amet at ab dolore, explicabo ut? Optio, reprehenderit modi
              consequuntur illum harum possimus deserunt nihil?
            </PlaneText>
            <Button action={handleClick}>Связаться со мной</Button>
          </div>
          {!isMobile ? (
            <div className={styles.secondary}>
              <img alt="doctor's avatar" src={photo} />
            </div>
          ) : null}
        </section>
      </PageWrapper>
      <PageWrapper background="fff">
        <section className={styles.articlesContent}>
          <Heading>
            Тут собраны самые свежие статьи по моей специальности
          </Heading>
          <div className={styles.articles}>
            {articles?.map((article, idx) => (
              <ArticleCard
                key={idx}
                title={article.title}
                content={article.content}
                img={article.image}
                id={idx}
              />
            ))}
          </div>
        </section>
        <div className={styles.formWrapper} style={{ background: gradient }}>
          <Form />
        </div>
      </PageWrapper>
    </>
  );
};

export default Main;
