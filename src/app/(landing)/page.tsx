"use client";
import { Form } from "../ui/components/landing/form";
import { useState, useRef, useEffect, lazy, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));
import { getArticles } from "@/api/services/articles-service/Article.api";
import { Cormorant_Garamond } from "next/font/google";
import { IArticle } from "@/api/services/articles-service/types/definitions";
import { MainCards } from "../ui/components/landing/main-cards";
import clsx from "clsx";
import { Header } from "../ui/components/landing/header";
import { landing } from "../locales/ru-RU/ru";

const Cormorant = Cormorant_Garamond({ weight: "400", subsets: ["cyrillic"] });

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isTouched, setTouched] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const initialPosition = useRef<number>(717.93);
  const objectToAnimate = useRef<any>();
  const cardRef = useRef<HTMLDivElement>(null);
  const articlesViewPort = useRef<HTMLDivElement>(null);
  const gap = 40;
  const clouds = useRef<any>();

  const springConfig = {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  };
  const springAnimation = useSpring(scrollYProgress, springConfig);

  function onLoad(spline: any) {
    window?.scrollTo(0, 0);
    const obj = spline.findObjectByName("MOON");
    const splineClouds = spline.findObjectByName("CLOUDS");
    objectToAnimate.current = obj;
    clouds.current = splineClouds;
    setLoaded(true);
  }

  useEffect(() => {
    const fetchArticles = async () =>
      await getArticles()
        .then((res) => {
          if (Array.isArray(res) && res.length > 0 && "id" in res[0]) {
            setArticles(res);
          }
        })
        .catch((err) => console.log(err));
    fetchArticles();
  }, []);

  const headerTop = useTransform(springAnimation, [0, 0.1], [0, -200]);

  const thickPathX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24],
    [
      initialPosition.current,
      initialPosition.current - 1200,
      initialPosition.current - 1200,
    ],
  );

  const cloudSize = {
    x: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
    y: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
    z: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
  };
  const cloudPositionY = useTransform(scrollYProgress, [0.1, 0.12], [190, 400]);

  const cloudPositionX = useTransform(
    scrollYProgress,
    [0.24, 0.3],
    [initialPosition.current, initialPosition.current],
  );

  const bg_blur = useTransform(
    scrollYProgress,
    [0.24, 0.3],
    ["blur(0px)", "blur(10px)"],
  );
  const bg_scale = useTransform(scrollYProgress, [0.24, 0.3], ["1", "1.5"]);

  const h2_opacity = useTransform(scrollYProgress, [0.1, 0.125], [0, 1]);

  const h3_opacity = useTransform(springAnimation, [0.23, 0.28], [0, 1]);

  const h3_line_scale = useTransform(springAnimation, [0.27, 0.3], [0.25, 1]);

  const scale = useTransform(scrollYProgress, [0.5, 0.55], [0.5, 1]);

  function getViewportDifference() {
    let cardWidth = isLoaded ? cardRef.current?.offsetWidth || 0 : 0;
    return -(isLoaded &&
    articlesViewPort.current!.offsetWidth <
      cardWidth * articles.length + gap * (articles.length - 1)
      ? cardWidth * articles.length +
        gap * (articles.length - 1) -
        articlesViewPort.current!.offsetWidth
      : 0);
  }

  const x = useTransform(
    scrollYProgress,
    [0.55, 0.825],
    [0, getViewportDifference()],
  );

  const lineWide = useTransform(springAnimation, [0.9, 1], ["0%", "85%"]);
  const zContacts = useTransform(
    scrollYProgress,
    [0.8, 0.81],
    [-1, !isTouched ? -1 : 0],
  );
  const contactsOpacity = useTransform(scrollYProgress, [0.81, 1], [0, 1]);

  const handleScroll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 10000, behavior: "smooth" });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLoaded) {
      objectToAnimate.current.position.x = thickPathX.get();
      latest > 0.02 ? setTouched(true) : setTouched(false);
      clouds.current.scale.x = cloudSize.x.get();
      clouds.current.scale.y = cloudSize.y.get();
      clouds.current.scale.z = cloudSize.z.get();
      clouds.current.position.y = cloudPositionY.get();
      clouds.current.position.x = cloudPositionX.get();
    }
  });

  return (
    <article
      itemScope
      itemType="https://schema.org/MedicalWebPage"
      ref={wrapperRef}
      className="bg-landing-bg"
    >
      <Header style={{ top: headerTop }} />

      {/* Fixed 3D background */}
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 4,
        }}
        className="fixed inset-0 h-[100dvh]"
        style={{
          filter: bg_blur,
          scale: bg_scale,
        }}
      >
        <Spline
          onLoad={onLoad}
          scene="https://prod.spline.design/UVyagmFo38kS7LEp/scene.splinecode"
          style={{ height: "100dvh", width: "100dvw" }}
        />
      </motion.div>

      {/* Page summary */}

      <section
        className="flex min-h-[90dvh] items-center"
        aria-label="Ekaterina Bocharova summary"
      >
        <motion.div
          animate={{ opacity: [0, 0, 1] }}
          transition={{
            duration: 4,
          }}
          className="landing__container relative"
        >
          <motion.summary className="flex flex-col gap-4">
            <h1 className={`h1-landing m-0 ${Cormorant.className} text-wrap`}>
              {landing.name}
            </h1>
            <p className="landing__text md:max-w-[60%]">{landing.about}</p>
            <a
              href="#footer"
              onClick={handleScroll}
              className="landing__button"
            >
              {landing.contact}
            </a>
          </motion.summary>
        </motion.div>
      </section>

      {/* Scroll for more content */}

      {!isTouched && (
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            transform: ["translateY(10%)", "translateY(0%)", "translateY(10%)"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5],
            repeat: Infinity,
          }}
          exit={{ opacity: 0 }}
          className="landing__text block min-h-[10dvh] text-center"
        >
          {landing.scroll}
        </motion.div>
      )}

      {/* Main specialization */}

      <section className="flex min-h-[60dvh] justify-end">
        <motion.div
          style={{ opacity: h2_opacity }}
          className="landing__container relative flex flex-col items-end"
        >
          <h2
            className={`h1-landing ${Cormorant.className} max-w-[70%] text-right`}
          >
            {landing.somnologySection.title}
          </h2>
          <p className="landing__text text-end md:max-w-[60%]">
            {landing.somnologySection.description}
          </p>
        </motion.div>
      </section>

      {/* Secondary specialization */}

      <section className="flex min-h-[100dvh] items-center justify-center">
        <motion.div
          style={{ opacity: h3_opacity }}
          className="landing__container relative flex flex-col items-center justify-center"
        >
          <h3 className={`h1-landing text-center ${Cormorant.className}`}>
            {landing.appointmentSection.title}
          </h3>
          <p className="landing__text text-center md:max-w-[60%]">
            {landing.appointmentSection.text}
          </p>
          <motion.hr
            style={{ scale: h3_line_scale }}
            className="mt-16 h-[1px] w-[50%] border-amber-400"
          />
        </motion.div>
      </section>

      {/* Articles */}

      <section className="relative h-[300dvh]">
        <motion.div
          className="soft-shadow sticky top-0 z-[2] flex min-h-[100dvh] w-[100%] items-center justify-center rounded-3xl bg-[#FFF5FF]"
          style={{ scale }}
        >
          <div className="landing__container flex flex-col overflow-hidden">
            <h4 className={`h1-landing ${Cormorant.className} text-nowrap`}>
              {landing.articlesSection.title}
            </h4>
            <p className="uppercase tracking-widest text-accent md:-mt-8">
              {landing.articlesSection.descriptor}
            </p>
            <motion.div
              ref={articlesViewPort}
              style={{ x }}
              className="relative z-[1] my-8 flex flex-nowrap justify-start gap-10"
            >
              {articles.map((article) => {
                return (
                  <MainCards
                    ref={cardRef}
                    key={article.id}
                    id={article.id}
                    className="w-[400px] md:w-[500px]"
                    link={{
                      pathname: `/${article.id}`,
                    }}
                    title={article.title}
                    content={article.content}
                    tags_array={article.tags_array}
                  />
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}

      <motion.section
        style={{ zIndex: zContacts }}
        className={clsx(
          "sticky bottom-0 bg-gradient-to-br from-[#19092B] to-[#260f33]",
        )}
      >
        <motion.footer
          style={{ opacity: contactsOpacity }}
          className="landing__container"
          id="footer"
        >
          <h5 className={`h1-landing ${Cormorant.className} text-nowrap`}>
            {landing.form.contactMe}
          </h5>
          <motion.hr
            className="h-[1px] border-amber-400"
            style={{ width: lineWide }}
          ></motion.hr>
          <Form />
        </motion.footer>
      </motion.section>
    </article>
  );
}
