"use client";
import { useState, useEffect, useRef } from "react";
import { deletePost, markPostAsRead } from "@/app/lib/utils";
import clsx from "clsx";

type DropdownProps = {
  id: number;
};

export default function Dropdown({ id }: DropdownProps) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMark = (e: any) => {
    e.preventDefault();
    markPostAsRead(id);
    setOpened((prev) => !prev);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    deletePost(id);
    setOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    if (isOpened) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpened]);

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className="flex flex-col relative">
      <button
        className="flex flex-col justify-between items-center"
        onClick={handleClick}
      >
        <svg
          height={25}
          width={25}
          fill="#2A3256"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="none" height="256" width="256" />
          <circle cx="128" cy="128" r="10" />
          <circle cx="64" cy="128" r="10" />
          <circle cx="192" cy="128" r="10" />
        </svg>
      </button>

      {/* {isOpened && ( */}
      <>
        <div
          ref={dropdownRef}
          id="dropdownDots"
          className={clsx(
            "z-10 bg-white transition absolute right-0 divide-gray-100 rounded-lg shadow w-40",
            isOpened ? "opacity-100 mt-0" : "opacity-0 -mt-8"
          )}
        >
          <ul
            className="text-sm text-gray-700 rounded-lg dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <button
                onClick={handleMark}
                className="block text-left w-[100%] px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                Mark as read
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="block px-4 text-white text-left w-[100%] py-2 hover:bg-rose-600 rounded-b-lg bg-rose-700 "
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </>
      {/* )} */}
    </div>
  );
}
