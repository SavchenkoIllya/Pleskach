import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

import Header from "../Components/Header/Header";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import Heading from "../Components/Heading/Heading";
import Button from "../Components/Button/Button";
import styles from "./styles/ArticlePage.module.scss";
import { articles } from "../assets/articles";

const Articles = () => {
  const { title } = useParams();
  const [article, setArticle] = useState({ title: "", img: "", content: "" });

  useEffect(() => {
    let [filtered] = articles.filter((el) => el.title.toLowerCase() == title);
    setArticle({
      title: filtered.title,
      img: filtered.image,
      content: filtered.content,
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Header />
      <PageWrapper background="ffffff">
        <section className={styles.content}>
          <Link to={"/"}>
            <Button isBack={true}>&larr; Вернуться назад</Button>
          </Link>
          <img src={article.img} />
          <div className={styles.textContent}>
            <Heading>{article.title}</Heading>
            <ReactMarkdown className={styles.text} children={article.content} />
          </div>
        </section>
      </PageWrapper>
    </>
  );
};

export default Articles;
