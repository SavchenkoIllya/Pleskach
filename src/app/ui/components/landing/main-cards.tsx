/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import defaultPicture from "@/app/ui/assets/Medical_Science_Kolleg.jpg";
import { Cormorant_Garamond } from "next/font/google";
import { IArticle } from "@/api/services/articles-service/types/definitions";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

const Cormorant = Cormorant_Garamond({ weight: "400", subsets: ["cyrillic"] });

export interface CardsProps extends Partial<IArticle> {
  imgSrc?: string;
  className: string;
  link: { pathname?: URL | string };
}

const MainCards = forwardRef<HTMLDivElement, CardsProps>((props, ref) => {
  const {
    title,
    imgSrc,
    link: { pathname = "./#" },
    content,
    id,
    tags_array,
    className,
    ...restProps
  } = props;

  const tags = ["#otsosi", "#cardiology"];
  let image = content?.split(")")[0].match(/https?:\/\/[^\s]+/)?.[0];

  return (
    <article
      ref={ref}
      className={twMerge(
        "relative rounded-lg  transition-transform ",
        clsx(className),
      )}
      {...restProps}
    >
      <Link href={pathname}>
        <img
          className="landing__card__image"
          src={imgSrc || image || defaultPicture.src}
          alt=""
        />
      </Link>
      <div className="py-5">
        <div className="flex gap-2">
          {tags.map((el) => {
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
        <Link href={pathname}>
          <p
            className={`h1 relative mt-2 text-[1.5rem] leading-normal text-amber-400 ${Cormorant.className} line-clamp-2`}
          >
            {title}
          </p>
        </Link>
        <Link
          href={pathname}
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
