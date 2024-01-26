"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ICONS_SIZE = "20px";

export const Navigation = () => {
  const [current, setCurrent] = useState<string[]>();
  const pathname = usePathname();

  const getCurrent = (label: string) =>
    pathname.split("/").includes(label?.toLowerCase());

  useEffect(() => {
    setCurrent(pathname.split("/"));
  }, []);

  return (
    <nav>
      <ul className="-mx-3 space-y-4">
        <NavElement
          isCurrent={getCurrent("articles")}
          href="/dashboard/articles"
        >
          <svg
            id="Layer_1"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            height={ICONS_SIZE}
            width={ICONS_SIZE}
          >
            <path d="M5,1v30h22V1H5z M8.6230469,3.9345703h3.6884766c0.5527344,0,1,0.4477539,1,1s-0.4472656,1-1,1H8.6230469  c-0.5527344,0-1-0.4477539-1-1S8.0703125,3.9345703,8.6230469,3.9345703z M23.3769531,22.6557617H8.6230469  c-0.5527344,0-1-0.4477539-1-1s0.4472656-1,1-1h14.7539063c0.5527344,0,1,0.4477539,1,1  S23.9296875,22.6557617,23.3769531,22.6557617z M23.3769531,18.8852539H8.6230469c-0.5527344,0-1-0.4477539-1-1s0.4472656-1,1-1  h14.7539063c0.5527344,0,1,0.4477539,1,1S23.9296875,18.8852539,23.3769531,18.8852539z M23.3769531,15.1147461H8.6230469  c-0.5527344,0-1-0.4477539-1-1s0.4472656-1,1-1h14.7539063c0.5527344,0,1,0.4477539,1,1  S23.9296875,15.1147461,23.3769531,15.1147461z M23.3769531,11.3442383H12.3115234c-0.5527344,0-1-0.4477539-1-1s0.4472656-1,1-1  h11.0654297c0.5527344,0,1,0.4477539,1,1S23.9296875,11.3442383,23.3769531,11.3442383z" />
          </svg>

          <span className={clsx("mx-2 text-sm font-medium")}>Articles</span>
        </NavElement>
        <NavElement isCurrent={getCurrent("profile")} href="/dashboard/profile">
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height={ICONS_SIZE}
            width={ICONS_SIZE}
          >
            <g id="info" />
            <g id="icons">
              <g id="user">
                <ellipse cx="12" cy="8" rx="5" ry="6" />
                <path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9    C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z" />
              </g>
            </g>
          </svg>
          <span className="mx-2 text-sm font-medium">User Preferences</span>
        </NavElement>
        <NavElement isCurrent={getCurrent("posts")} href="/dashboard/posts">
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height={ICONS_SIZE}
            width={ICONS_SIZE}
          >
            <g id="info" />
            <g id="icons">
              <path
                d="M20,3H4C1.8,3,0,4.8,0,7v10c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V7C24,4.8,22.2,3,20,3z M21.6,8.8l-7.9,5.3   c-0.5,0.3-1.1,0.5-1.7,0.5s-1.2-0.2-1.7-0.5L2.4,8.8C2,8.5,1.9,7.9,2.2,7.4C2.5,7,3.1,6.9,3.6,7.2l7.9,5.3c0.3,0.2,0.8,0.2,1.1,0   l7.9-5.3c0.5-0.3,1.1-0.2,1.4,0.3C22.1,7.9,22,8.5,21.6,8.8z"
                id="email"
              />
            </g>
          </svg>
          <span className="mx-2 text-sm font-medium">Letters</span>
        </NavElement>
      </ul>
    </nav>
  );
};

export const NavElement = ({ children, isCurrent, ...props }: any) => {
  return (
    <li>
      <Link
        aria-current={isCurrent}
        aria-disabled={isCurrent ? "true" : "false"}
        {...props}
        className={clsx(
          "flex items-center font-[700] hover:fill-sky-600 hover:text-blue-600 px-3 text-gray-500 py-2 transition-colors duration-300 transform rounded-lg transparent mr-4 ml-2",
          isCurrent &&
            "transition-all ease-in-out text-sky-600 [pointer-events: none] py-4 before:content-[' '] before:w-[0] before:absolute before:border-[5px] before:ml-[-1rem] before:h-[100%] before:border-sky-600 before:rounded-l-lg before:mr-4 bg-white hover:cursor-default",
          isCurrent ? "fill-sky-600" : "fill-gray-500"
        )}
      >
        <div className="ml-4 flex items-center">{children}</div>
      </Link>
    </li>
  );
};
