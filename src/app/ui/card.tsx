"use client";
// import Image from "next/image";
import Link from "next/link";
import { Heading } from "./heading";
// import { Text } from "./text";
import defaultPicture from "@/app/assets/Medical_Science_Kolleg.jpg";
import { Remark } from "react-remark";
import { IComponentProps } from "./types/types";

interface ICard extends IComponentProps {
  id: number;
  title: string;
  imgSrc?: string;
  link: any;
  content: string;
}

export const Card = ({ title, imgSrc, link, content, id, ...props }: ICard) => {
  // let imgSource = content.match(/https?:\/\/[^\s]+/)?.[0];

  let restContent: string = content.split(")")[1];
  let image = content.split(")")[0].match(/https?:\/\/[^\s]+/)?.[0];

  // console.log(content.split(")")[0].match(/https?:\/\/[^\s]+/)?.[0]);

  // console.log(imgSource);
  // let isImage: boolean;
  // if (imgSource) {
  //   isImage = true;
  // }

  return (
    <article
      className="w-[300px] rounded-lg bg-background shadow-xl shadow-accent/15 transition-transform hover:scale-[1.025]"
      {...props}
    >
      <Link href={link}>
        <img
          className="[object-position:50% 50%]
        w-[100%]
        rounded-t-lg
        [aspect-ratio:4/3] [object-fit:cover]
        "
          src={imgSrc || image || defaultPicture.src}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link href={link}>
          <Heading
            className="mb-2 h-[64px] tracking-tight text-heading [-webkit-box-orient:vertical] 
            [-webkit-line-clamp:2]   
            [overflow:hidden]"
          >
            {title}
          </Heading>
        </Link>
        <div
          className="mb-3 h-[72px] 
                    text-plane-text 
                    [-webkit-box-orient:vertical]   
                    [overflow:hidden] [-webkit-line-clamp:3]
                    [display:-webkit-box]"
        >
          <Remark>{restContent ? restContent : content}</Remark>
        </div>
        <Link
          href={link}
          className="inline-flex items-center rounded-lg text-center text-sm font-medium text-accent focus:outline-none focus:ring-4"
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
};
