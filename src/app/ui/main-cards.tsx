"use client";
// import Image from "next/image";
import Link from "next/link";
import { Heading } from "./heading";
// import { Text } from "./text";
import defaultPicture from "@/app/assets/Medical_Science_Kolleg.jpg";
import { Remark } from "react-remark";
import { IComponentProps } from "./types/types";

interface ICard extends IComponentProps, Partial<IArticle> {
  id: number;
  title: string;
  imgSrc?: string;
  link: any;
  content: string;
}

import { Cormorant_Garamond } from "next/font/google";
import { IArticle } from "../lib/definitions";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";
const Cormorant = Cormorant_Garamond({ weight: "400", subsets: ["cyrillic"] });

const MainCards = forwardRef<HTMLDivElement, ICard>((props, ref) => {
  const {
    title,
    imgSrc,
    link,
    content,
    id,
    tags_array,
    className,
    ...restProps
  } = props;

  const tags = ["#otsosi", "#cardiology"];
  // let restContent: string = content.split(")")[1];
  let image = content.split(")")[0].match(/https?:\/\/[^\s]+/)?.[0];

  return (
    <article
      ref={ref}
      className={twMerge(
        "relative rounded-lg  transition-transform ",
        clsx(className),
      )}
      {...restProps}
    >
      <Link href={link}>
        <img
          className="[object-position:50% 50%]
        w-[100%]
        rounded-lg
        [aspect-ratio:4/3] [object-fit:cover]
        "
          src={imgSrc || image || defaultPicture.src}
          alt=""
        />
      </Link>
      <div className="py-5">
        <div className="flex gap-2">
          {tags.map((el, idx) => {
            return (
              <p
                key={el}
                className="rounded-full bg-[#E5B5FF] px-2 py-1 text-xs uppercase text-[#19092B]"
              >
                {el}
              </p>
            );
          })}
        </div>
        <Link href={link}>
          <p
            className={`h1 relative mt-2 text-[1.5rem] leading-normal text-amber-400 ${Cormorant.className} line-clamp-2`}
          >
            {title}
          </p>
          {/* <Heading
            className="mb-2 h-[64px] tracking-tight text-heading [-webkit-box-orient:vertical] 
            [-webkit-line-clamp:2]   
            [overflow:hidden]"
          >
            {title}
          </Heading> */}
        </Link>
        {/* <div
          className="mb-3 h-[72px] 
                    text-plane-text 
                    [-webkit-box-orient:vertical]   
                    [overflow:hidden] [-webkit-line-clamp:3]
                    [display:-webkit-box]"
        >
          <Remark>{restContent ? restContent : content}</Remark>
        </div> */}
        <Link
          href={link}
          className="inline-flex items-center rounded-lg text-center text-sm font-medium text-[#E5B5FF] focus:outline-none focus:ring-4"
        >
          Read more
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
});

MainCards.displayName = "MainCards";
export { MainCards };
