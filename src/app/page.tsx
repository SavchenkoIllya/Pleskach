"use client";
import { Form } from "./ui/form";
// import { Header } from "./ui/header";
import WhatsAppIcon from "@/app/assets/WhatsApp.png";
import TelegramIcon from "@/app/assets/Telegram_logo.svg.webp";
import Image from "next/image";
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
const Spline = lazy(() => import("@splinetool/react-spline"));
import { getArticles } from "./lib/Articles.service";
import { Cormorant_Garamond } from "next/font/google";
import { IArticle } from "./lib/definitions";
import { MainCards } from "./ui/main-cards";
import cursor from "@/app/assets/cursor.png";
import clsx from "clsx";

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
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isTouched, setTouched] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const initialPosition = useRef<number>(717.93);
  const objectToAnimate = useRef<any>();
  const cardRef = useRef<HTMLDivElement>(null);
  const articlesViewPort = useRef<HTMLDivElement>(null);

  const gap = 40;

  const cardWidthClass = `w-[400px] md:w-[500px]`;

  const clouds = useRef<any>();
  const springConfig = {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  };

  const springAnimation = useSpring(scrollYProgress, springConfig);

  function onLoad(spline: any) {
    const obj = spline.findObjectByName("MOON");
    const splineClouds = spline.findObjectByName("CLOUDS");
    objectToAnimate.current = obj;
    clouds.current = splineClouds;
    setLoaded(true);
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

  // const articlesScale = useTransform(scrollYProgress, [0.5, 0.55], [1, 0.75]);

  const scale = useTransform(springAnimation, [0.5, 0.55], [0.5, 1]);

  function getViewportDifference() {
    let cardWidth = isLoaded ? cardRef.current!.offsetWidth : 0;
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log(latest);
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
    <Suspense fallback={<FallbackComponent />}>
      <main
        itemScope
        itemType="https://schema.org/MedicalWebPage"
        style={{
          cursor: "url(" + cursor + "), auto",
        }}
        ref={wrapperRef}
        className={`bg-[#19092B]`}
      >
        {/* Header */}

        <motion.header
          style={{ top: headerTop }}
          className="fixed top-0 z-10 w-[100vw] px-8 py-4"
        >
          <nav className="mx-auto flex max-w-[1080px] flex-col items-center justify-between rounded-2xl bg-transparent px-8 py-4  md:flex-row">
            <h2 className="text-amber-400"></h2>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  className="btn-dashboard-outline border-[#E5B5FF] text-[#E5B5FF]"
                  href={"tel:" + "+79855310868"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {+79855310868}
                </a>
              </li>
              <li>
                <a>
                  <Image
                    className="hidden h-[35px] w-[35px] md:block"
                    alt="WhatsApp icon"
                    src={WhatsAppIcon}
                  />
                </a>
              </li>
              <li>
                <a>
                  <Image
                    className="hidden h-[30px] w-[30px] md:block"
                    alt="Telegram icon"
                    src={TelegramIcon}
                  />
                </a>
              </li>
            </ul>
          </nav>
        </motion.header>

        {/* Fixed 3D background */}

        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 4,
          }}
          style={{
            height: "100dvh",
            position: "fixed",
            inset: 0,
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
            className="landing-content relative"
          >
            <motion.summary className="flex flex-col gap-4">
              <h1
                className={`h1-landing ${Cormorant.className} text-wrap md:text-nowrap`}
              >
                Pleskach Ekaterina
              </h1>
              <p className="text-[#E5B5FF] md:max-w-[60%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                iste, minus commodi obcaecati nihil repellat exercitationem.
                Quidem repellendus illo laborum quia praesentium non in dolorem.
                Quos, est omnis.
              </p>
              <button className="btn-landing">Contact with me</button>
            </motion.summary>
          </motion.div>
        </section>

        {/* Scroll for more content */}

        {!isTouched && (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              transform: [
                "translateY(10%)",
                "translateY(0%)",
                "translateY(10%)",
              ],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5],
              repeat: Infinity,
            }}
            exit={{ opacity: 0 }}
            className="block min-h-[10dvh] text-center text-[#E5B5FF]"
          >
            Scroll to begin your journey
          </motion.div>
        )}

        {/* Main specialization */}

        <section className="flex min-h-[60dvh] justify-end">
          <motion.div
            style={{ opacity: h2_opacity }}
            className="landing-content relative flex flex-col items-end"
          >
            <h2 className={`h1-landing ${Cormorant.className} text-nowrap`}>
              Somnology
            </h2>
            <p className="text-end text-[#E5B5FF] md:max-w-[60%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iste,
              minus commodi obcaecati nihil repellat exercitationem. Quidem
              repellendus illo laborum quia praesentium non in dolorem. Quos,
              est omnis.
            </p>
          </motion.div>
        </section>

        {/* Secondary specialization */}

        <section className="flex min-h-[100dvh] items-center justify-center">
          <motion.div
            style={{ opacity: h3_opacity }}
            className="landing-content relative flex flex-col items-center justify-center"
          >
            <h3 className={`h1-landing text-center ${Cormorant.className}`}>
              Cardiology expert
            </h3>
            <p className="text-center text-[#E5B5FF] md:max-w-[60%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iste,
              minus commodi obcaecati nihil repellat exercitationem. Quidem
              repellendus illo laborum quia praesentium non in dolorem. Quos,
              est omnis.
            </p>
            <motion.hr
              style={{ scale: h3_line_scale }}
              className="mt-16 h-[1px] w-[50%] border-amber-400"
            />
            <q className="mt-16 max-w-[60%] italic text-[#E5B5FF]">
              Ekaterina gave me second chanse to live..
            </q>
          </motion.div>
        </section>

        {/* Articles */}

        <section className="relative h-[300dvh]">
          <motion.div
            className="soft-shadow sticky top-0 z-[2] flex min-h-[100dvh] w-[100%] items-center justify-center rounded-3xl bg-[#FFF5FF]"
            style={{ scale }}
          >
            <div className="landing-content flex flex-col overflow-hidden">
              <h4 className={`h1-landing ${Cormorant.className} text-nowrap`}>
                Articles
              </h4>
              <p className="uppercase tracking-widest text-[#E5B5FF] md:-mt-8">
                Lorem ipsum dolor sit ame
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
                      className={cardWidthClass}
                      link={{
                        pathname: `/${article.id}`,
                        query: {
                          title: article.title,
                          content: article.content,
                        },
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
            className="landing-content"
          >
            <h5 className={`h1-landing ${Cormorant.className} text-nowrap`}>
              Contact me
            </h5>
            <motion.hr
              className="h-[1px] border-amber-400"
              style={{ width: lineWide }}
            ></motion.hr>
            <Form />
          </motion.footer>
        </motion.section>
      </main>
    </Suspense>
  );
}

const FallbackComponent = () => {
  return (
    <main className="flex h-[100dvh] w-[100dvw] items-center justify-center bg-[#19092B]">
      <h1 className={`h1-landing ${Cormorant.className}`}>Loading...</h1>
    </main>
  );
};
