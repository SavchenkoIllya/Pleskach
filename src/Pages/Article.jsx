import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

import Header from "../Components/Header/Header";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import Heading from "../Components/Heading/Heading";
import Button from "../Components/Button/Button";
import styles from "./styles/ArticlePage.module.scss";

const Articles = () => {
  const location = useLocation();
  const { title, content, img } = location.state;

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
          <img src={img} />
          <div className={styles.textContent}>
            <Heading>{title}</Heading>
            <ReactMarkdown className={styles.text} children={content} />
          </div>
        </section>
      </PageWrapper>
    </>
  );
};

export default Articles;
