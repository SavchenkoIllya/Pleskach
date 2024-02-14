"use client";
import { Form } from "./ui/form";
import { Container } from "./ui/container";
import { Header } from "./ui/header";
import { useState, useRef, useEffect } from "react";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Spline from "@splinetool/react-spline";
import { getArticles } from "./lib/Articles.service";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import HeartPic from "@/app/assets/robina-weermeijer-NIuGLCC7q54-unsplash.jpg";
import { IArticle } from "./lib/definitions";
import { MainCards } from "./ui/main-cards";

export interface Article {
  id: number;
  author_id: number;
  title: string;
  content: string;
  is_published: boolean;
  creation_date: Date;
  updating_date?: Date;
  tags_array: string[];
  image: string;
}

const Cormorant = Cormorant_Garamond({ weight: "400", subsets: ["cyrillic"] });

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const initialPosition = useRef<number>(717.93);
  const objectToAnimate = useRef<any>();
  const clouds = useRef<any>();

  function onLoad(spline: any) {
    const obj = spline.findObjectByName("MOON");
    const splineClouds = spline.findObjectByName("CLOUDS");
    objectToAnimate.current = obj;
    clouds.current = splineClouds;
  }

  useEffect(() => {
    const fetchArticles = async () =>
      await getArticles().then((res) => {
        if (Array.isArray(res) && res.length > 0 && "id" in res[0]) {
          setArticles(res);
        }
      });
    fetchArticles();
  }, []);

  const thickPathX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [initialPosition.current, initialPosition.current - 1500],
  );

  const cloudSize = {
    x: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
    y: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
    z: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
  };
  const cloudPosition = useTransform(scrollYProgress, [0.1, 0.25], [190, 400]);

  const h1_opacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);
  const h2_opacity = useTransform(
    scrollYProgress,
    [0.175, 0.25, 0.45, 0.55],
    [0, 1, 1, 1],
  );

  const articlesY = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    ["12rem", "4rem"],
  );

  const articlesScale = useTransform(scrollYProgress, [0.5, 0.75], [1.25, 1]);
  const articlesBottom = useTransform(
    scrollYProgress,
    [0.75, 0.85],
    ["0rem", "6rem"],
  );

  // const h2_position = useTransform(
  //   scrollYProgress,
  //   [0.3, 0.5, 0.8, 1],
  //   [0, 1, 1, 0],
  // );

  const lineWide = useTransform(scrollYProgress, [0.9, 1], [0, 500]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    objectToAnimate.current.position.x = thickPathX.get();
    clouds.current.scale.x = cloudSize.x.get();
    clouds.current.scale.y = cloudSize.y.get();
    clouds.current.scale.z = cloudSize.z.get();
    clouds.current.position.y = cloudPosition.get();
    // console.log(scrollYProgress.get());
  });

  return (
    <div ref={wrapperRef} className={`overflow-x-hidden bg-[#19092B]`}>
      <Header telephone="+79855310868" className="mt-2" />
      <Spline
        onLoad={onLoad}
        style={{ height: "100dvh", position: "fixed", inset: 0 }}
        scene="https://prod.spline.design/UVyagmFo38kS7LEp/scene.splinecode"
      />

      <section className="flex min-h-[100dvh] items-center justify-center">
        <Container className="my-20">
          <article className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
            <motion.div
              className="z-[10] my-auto flex flex-col gap-4 p-8 lg:p-0"
              style={{ opacity: h1_opacity }}
            >
              <h1
                className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-wrap md:text-nowrap`}
              >
                Pleskach Ekaterina
              </h1>
              <p className="max-w-[60%] text-[#E5B5FF]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                iste, minus commodi obcaecati nihil repellat exercitationem.
                Quidem repellendus illo laborum quia praesentium non in dolorem.
                Quos, est omnis.
              </p>
              <button className="btn-dashboard-outline border-[#E5B5FF] text-[#E5B5FF]">
                Contact with me
              </button>
            </motion.div>
          </article>
        </Container>
      </section>
      <section className="flex justify-end">
        <Container className="my-20 p-8">
          <div className="flex gap-4 ">
            <motion.div
              style={{ opacity: h2_opacity }}
              className="flex flex-col items-end"
            >
              <h1
                className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
              >
                Somnology
              </h1>
              <p className="max-w-[60%] text-end text-[#E5B5FF]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                iste, minus commodi obcaecati nihil repellat exercitationem.
                Quidem repellendus illo laborum quia praesentium non in dolorem.
                Quos, est omnis.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="mt-48  flex items-center">
        <Container className="my-20 px-8">
          <div className="flex flex-row-reverse flex-wrap md:flex-nowrap gap-10">
            <motion.div className="relative rounded-lg">
              <Image
                src={HeartPic}
                alt="heart picture"
                className="object-cover md:[object-fit: fit] backlight h-[300px] md:h-[500px] md:-rotate-12 rounded-lg"
              />
            </motion.div>
            <motion.div
              // style={{ opacity: h2_opacity }}
              className="relative z-0 -mr-14 flex flex-col"
            >
              <h1
                className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
              >
                Cardiology expert
              </h1>
              <p className="text-[#E5B5FF]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                iste, minus commodi obcaecati nihil repellat exercitationem.
                Quidem repellendus illo laborum quia praesentium non in dolorem.
                Quos, est omnis.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="min-h-[100dvh]">
        <Container>
          <h1
            className={`h1 relative text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
          >
            Articles
          </h1>
          <p className="text-[#E5B5FF]">Lorem ipsum dolor sit ame</p>
        </Container>

        <motion.article
          style={{
            marginTop: articlesY,
            scale: articlesScale,
            marginBottom: articlesBottom,
          }}
          className="mt-16 flex flex-wrap justify-start gap-20"
        >
          {articles.map((article, idx) => {
            return (
              <MainCards
                key={idx}
                id={article.id}
                link={{
                  pathname: `/${article.id}`,
                  query: { title: article.title, content: article.content },
                }}
                title={article.title}
                content={article.content}
                tags_array={article.tags_array}
              />
            );
          })}
        </motion.article>
      </section>
      {/* <section className=" py-16">
          <Container>
            <Heading className="mb-4 text-center text-heading">Stati</Heading>
            <article className="flex flex-wrap justify-center gap-8">
              {articles.map((article, idx) => {
                return (
                  <Card
                    key={idx}
                    id={article.id}
                    link={{
                      pathname: `/${article.id}`,
                      query: { title: article.title, content: article.content },
                    }}
                    title={article.title}
                    imgSrc={article.image}
                    content={article.content}
                  />
                );
              })}
            </article>
          </Container>
        </section> */}

      <section className="relative bg-gradient-to-br from-[#19092B] to-[#260f33]">
        <div className="m-auto max-w-[1080px] py-8 ">
          <h1
            className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
          >
            Contact me
          </h1>
          <motion.div
            className="h-[1px] bg-amber-400"
            style={{ width: lineWide }}
          ></motion.div>
          <Form />
        </div>
      </section>
    </div>
  );
}
