"use client";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "./heading";
import { Text } from "./text";

interface ICard {
  title: string;
  imgSrc: string;
  link: string;
  content: string;
  [propsName: string]: any;
}

export const Card = ({ title, imgSrc, link, content, ...props }: ICard) => {
  return (
    <article
      className="w-[300px] bg-background rounded-lg transition-transform hover:scale-[1.025] shadow-xl shadow-accent/15"
      {...props}
    >
      <Link href="#">
        <img
          className="rounded-t-lg w-[100%]
        [aspect-ratio:4/3]
        [object-fit:cover]
        [object-position:50% 50%]
        "
          src={imgSrc}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link href="#">
          <Heading
            className="mb-2 h-[64px] tracking-tight text-heading [-webkit-line-clamp:2] 
            [-webkit-box-orient:vertical]   
            [overflow:hidden]"
          >
            {title}
          </Heading>
        </Link>
        <Text
          className="mb-3 [display:-webkit-box] 
  [-webkit-line-clamp:3] 
  [-webkit-box-orient:vertical]   
  [overflow:hidden] text-plane-text
  h-[72px]"
        >
          {content}
        </Text>
        <Link
          href="#"
          className="inline-flex items-center text-sm font-medium text-center text-accent rounded-lg focus:ring-4 focus:outline-none"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
};