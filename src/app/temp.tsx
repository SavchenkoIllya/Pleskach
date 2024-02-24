// "use client";
// import { Form } from "./ui/form";
// import { Container } from "./ui/container";
// import { Header } from "./ui/header";
// import { useState, useRef, useEffect } from "react";

// import {
//   motion,
//   useScroll,
//   useMotionValueEvent,
//   useTransform,
//   useSpring,
// } from "framer-motion";
// import Spline from "@splinetool/react-spline";
// import { getArticles } from "./lib/Articles.service";
// import { Cormorant_Garamond } from "next/font/google";
// import Image from "next/image";
// import HeartPic from "@/app/assets/robina-weermeijer-NIuGLCC7q54-unsplash.jpg";
// import { IArticle } from "./lib/definitions";
// import { MainCards } from "./ui/main-cards";

// export interface Article {
//   id: number;
//   author_id: number;
//   title: string;
//   content: string;
//   is_published: boolean;
//   creation_date: Date;
//   updating_date?: Date;
//   tags_array: string[];
//   image: string;
// }

// const Cormorant = Cormorant_Garamond({ weight: "400", subsets: ["cyrillic"] });

// export default function Home() {
//   const [articles, setArticles] = useState<IArticle[]>([]);
//   const wrapperRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: wrapperRef });
//   const initialPosition = useRef<number>(717.93);
//   const objectToAnimate = useRef<any>();
//   const clouds = useRef<any>();

//   const springConfig = {
//     stiffness: 100,
//     damping: 20,
//     restDelta: 0.001,
//   };

//   function onLoad(spline: any) {
//     const obj = spline.findObjectByName("MOON");
//     const splineClouds = spline.findObjectByName("CLOUDS");
//     objectToAnimate.current = obj;
//     clouds.current = splineClouds;
//   }

//   useEffect(() => {
//     const fetchArticles = async () =>
//       await getArticles().then((res) => {
//         if (Array.isArray(res) && res.length > 0 && "id" in res[0]) {
//           setArticles(res);
//         }
//       });
//     fetchArticles();
//   }, []);

//   const thickPathX = useTransform(
//     scrollYProgress,
//     [0, 0.5],
//     [initialPosition.current, initialPosition.current - 1500],
//   );

//   const cloudSize = {
//     x: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
//     y: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
//     z: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
//   };
//   const cloudPosition = useTransform(scrollYProgress, [0.1, 0.25], [190, 400]);

//   const h1_opacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);
//   const h2_opacity = useTransform(scrollYProgress, [0.1, 0.125], [0, 1]);

//   const imageRotation = useTransform(
//     scrollYProgress,
//     [0.25, 0.3],
//     ["0deg", "-12deg"],
//   );
//   const imageMargin = useTransform(
//     scrollYProgress,
//     [0.25, 0.3],
//     ["-31rem", "0rem"],
//   );

//   // const temp_h3 = useSpring(scrollYProgress, springConfig);
//   const h3_scale = useTransform(temp_h3, [0.25, 0.3], [0.45, 1]);

//   // style={{rotate: "0deg", marginLeft: "-31rem"}}
//   // style={{rotate: "-12deg", marginLeft: "0rem"}}

//   // style={{scale: 0.45}}
//   // style={{scale: 1}}

//   const articlesScale = useTransform(scrollYProgress, [0.5, 0.55], [1, 0.75]);

//   const tempScale = useSpring(scrollYProgress, springConfig);
//   const scale = useTransform(tempScale, [0.5, 0.55], [0.5, 1]);

//   const x = useTransform(scrollYProgress, [0.55, 0.825], ["1%", "-90%"]);

//   const tempLine = useSpring(scrollYProgress, springConfig);

//   const lineWide = useTransform(tempLine, [0.9, 1], [0, 500]);
//   const zContacts = useTransform(scrollYProgress, [0.8, 0.81, 1], [-1, 0, 0]);
//   const contactsOpacity = useTransform(scrollYProgress, [0.81, 1], [0, 1]);

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     objectToAnimate.current.position.x = thickPathX.get();

//     console.log(scrollYProgress.get());

//     clouds.current.scale.x = cloudSize.x.get();
//     clouds.current.scale.y = cloudSize.y.get();
//     clouds.current.scale.z = cloudSize.z.get();
//     clouds.current.position.y = cloudPosition.get();
//   });

//   return (
//     <div ref={wrapperRef} className={`bg-[#19092B]`}>
//       <Header telephone="+79855310868" className="mt-2" />
//       <motion.div
//         animate={{ opacity: [0, 1] }}
//         transition={{
//           duration: 4,
//         }}
//         style={{ height: "100dvh", position: "fixed", inset: 0 }}
//       >
//         <Spline
//           onLoad={onLoad}
//           scene="https://prod.spline.design/UVyagmFo38kS7LEp/scene.splinecode"
//         />
//       </motion.div>

//       <section className="flex min-h-[100dvh] items-center justify-center">
//         <Container className="my-20">
//           <motion.article
//             animate={{ opacity: [0, 0, 1] }}
//             transition={{
//               duration: 4,
//             }}
//             className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between"
//           >
//             <motion.div
//               className="z-[10] my-auto flex flex-col gap-4 p-8 lg:p-0"
//               style={{ opacity: h1_opacity }}
//             >
//               <h1
//                 className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-wrap md:text-nowrap`}
//               >
//                 Pleskach Ekaterina
//               </h1>
//               <p className="max-w-[60%] text-[#E5B5FF]">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
//                 iste, minus commodi obcaecati nihil repellat exercitationem.
//                 Quidem repellendus illo laborum quia praesentium non in dolorem.
//                 Quos, est omnis.
//               </p>
//               <button className="btn-dashboard-outline border-[#E5B5FF] text-[#E5B5FF] transition-all duration-500 hover:bg-[#E5B5FF] hover:text-[#19092B]">
//                 Contact with me
//               </button>
//             </motion.div>
//           </motion.article>
//         </Container>
//       </section>
//       <section className="flex justify-end">
//         <Container className="my-20 p-8">
//           <div className="flex gap-4 ">
//             <motion.div
//               style={{ opacity: h2_opacity }}
//               className="relative flex flex-col items-end"
//             >
//               <h1
//                 className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
//               >
//                 Somnology
//               </h1>
//               <p className="max-w-[60%] text-end text-[#E5B5FF]">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
//                 iste, minus commodi obcaecati nihil repellat exercitationem.
//                 Quidem repellendus illo laborum quia praesentium non in dolorem.
//                 Quos, est omnis.
//               </p>
//             </motion.div>
//           </div>
//         </Container>
//       </section>
//       <section className="mt-48  flex items-center">
//         <Container className="my-8 px-8">
//           <div className="flex flex-row-reverse flex-wrap gap-10 md:flex-nowrap">
//             <motion.div
//               style={{ rotate: imageRotation, marginLeft: imageMargin }}
//               className="relative rounded-lg"
//             >
//               <Image
//                 src={HeartPic}
//                 alt="heart picture"
//                 // style={{rotate: "0deg", marginLeft: "-31rem"}}
//                 // style={{rotate: "-12deg", marginLeft: "0rem"}}
//                 className="md:[object-fit: fit] backlight h-[300px] rounded-lg object-cover md:h-[500px] "
//               />
//             </motion.div>

//             <motion.div
//               // style={{scale: 0.45}}
//               style={{ scale: h3_scale }}
//               className="relative z-0 -mr-14 flex flex-col"
//             >
//               <h1
//                 className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
//               >
//                 Cardiology expert
//               </h1>
//               <p className="text-[#E5B5FF]">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
//                 iste, minus commodi obcaecati nihil repellat exercitationem.
//                 Quidem repellendus illo laborum quia praesentium non in dolorem.
//                 Quos, est omnis.
//               </p>
//             </motion.div>
//           </div>
//         </Container>
//       </section>

//       <div className="relative h-[300dvh]">
//         <motion.section
//           className="sticky top-0 z-[2] min-h-[100dvh] w-[100%] rounded-3xl bg-[#FFF5FF]"
//           style={{ scale }}
//         >
//           <motion.article
//             style={{
//               scale: articlesScale,
//             }}
//             className="z-[0] my-0 flex flex-col flex-nowrap justify-start gap-8 overflow-hidden px-16 "
//           >
//             <div className="flex flex-col">
//               <h1
//                 className={`h1 text-[8rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
//               >
//                 Articles
//               </h1>
//               <p className="-mt-8 uppercase tracking-widest text-[#E5B5FF]">
//                 Lorem ipsum dolor sit ame
//               </p>
//             </div>
//             <motion.div
//               style={{ x }}
//               className="relative z-[1] my-0 flex flex-nowrap justify-start gap-10 px-16"
//             >
//               {articles.map((article, idx) => {
//                 return (
//                   <MainCards
//                     key={idx}
//                     id={article.id}
//                     link={{
//                       pathname: `/${article.id}`,
//                       query: { title: article.title, content: article.content },
//                     }}
//                     title={article.title}
//                     content={article.content}
//                     tags_array={article.tags_array}
//                   />
//                 );
//               })}
//               {articles.map((article, idx) => {
//                 return (
//                   <MainCards
//                     key={idx}
//                     id={article.id}
//                     link={{
//                       pathname: `/${article.id}`,
//                       query: { title: article.title, content: article.content },
//                     }}
//                     title={article.title}
//                     content={article.content}
//                     tags_array={article.tags_array}
//                   />
//                 );
//               })}
//             </motion.div>
//           </motion.article>
//         </motion.section>
//       </div>

//       <motion.section
//         style={{ zIndex: zContacts }}
//         className="sticky bottom-0 z-[-1] bg-gradient-to-br from-[#19092B] to-[#260f33]"
//       >
//         <motion.div
//           style={{ opacity: contactsOpacity }}
//           className="m-auto max-w-[1080px] py-8 "
//         >
//           <h1
//             className={`h1 text-[6rem] leading-normal text-amber-400 ${Cormorant.className} text-nowrap`}
//           >
//             Contact me
//           </h1>
//           <motion.div
//             className="h-[1px] bg-amber-400"
//             style={{ width: lineWide }}
//           ></motion.div>
//           <Form />
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// }
