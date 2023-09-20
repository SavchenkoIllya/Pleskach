import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

import { useTransition } from "react-spring";

import Header from "../Components/Header/Header";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import Heading from "../Components/Heading/Heading";
import PlaneText from "../Components/PlaneText/PlaneText";
import Button from "../Components/Button/Button";
import ArticleCard from "../Components/ArticleCard/ArticleCard";
import Form from "../Components/Form/Form";
import Modal from "../Components/Modal/Modal";

import styles from "./styles/MainPage.module.scss";
import photo from "../assets/Doctor-PNG-Images2.png";
import { gradient } from "./styles/variables";
import { articles as content } from "../assets/articles";
import { isObjectEmpty } from "../utils/isObjectEmpty";

const Main = () => {
  const [articles] = useState(content);
  const [isOpened, setIsOpened] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleClick = () => {
    console.log("ok");
  };

  const transitions = useTransition(isOpened, {
    delay: 0,
    from: { opacity: 0, overflow: "auto" },
    enter: { opacity: 1, overflow: "hidden" },
    leave: { opacity: 0, overflow: "auto" },
  });

  const handleSubmit = (params, errors) => {
    if (!isObjectEmpty(errors)) {
      console.log("submit");
      console.log(params);
      setMessageText((prev) => (prev = "Ваше сообщение было отправлено"));
      setIsOpened((prev) => (prev = true));
      setTimeout(() => {
        setIsOpened((prev) => (prev = false));
      }, 3000);
    }
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
        <section className={styles.enterContent}>
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
                img={article.image}
                id={idx}
              />
            ))}
          </div>
        </section>
        <div className={styles.formWrapper} style={{ background: gradient }}>
          <Form onSubmit={handleSubmit} />
        </div>
      </PageWrapper>

      {transitions(({ ...rest }, item) =>
        item ? <Modal text={messageText} style={rest} /> : null
      )}
    </>
  );
};

export default Main;
