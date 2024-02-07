"use client";
import { useState, useEffect, useRef } from "react";
// import { deletePost, markPostAsRead } from "@/app/lib/utils";
import { deletePost, markPostAsRead } from "@/app/lib/Posts.service";
import clsx from "clsx";
import { useParams } from "next/navigation";
type DropdownProps = {
  id: number;
};

export default function Dropdown({ id }: DropdownProps) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { pageNumber } = params;

  const handleMark = (e: any) => {
    // e.preventDefault();
    console.log("marked");

    markPostAsRead(id, Number(pageNumber));
    // setOpened((prev) => !prev);
  };

  const handleDelete = (e: any) => {
    console.log("deleted");
    // e.preventDefault();
    deletePost(id, Number(pageNumber));
    // setOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpened(false);
      }
    };
    if (document) {
      const el = document.getElementById("dashboard-wrapper");

      if (isOpened) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpened]);

  const handleToggle = () => {
    setOpened(!isOpened);
    console.log("toggled");
  };

  return (
    <div
      // ref={dropdownRef}
      className="relative flex flex-col"
    >
      <button
        className="flex flex-col items-center justify-between"
        onClick={handleToggle}
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

      <div
        className={clsx(
          "soft-shadow absolute right-0 z-10 rounded-lg bg-white opacity-0",
          isOpened ? "block opacity-100" : "hidden",
        )}
      >
        <ul
          className="w-max rounded-lg text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <button
              onClick={handleMark}
              className="block w-[100%] rounded-t-lg px-4 py-2 text-left hover:bg-gray-100"
            >
              Mark as read
            </button>
          </li>
          <li>
            <button
              onClick={handleDelete}
              className="block w-[100%] rounded-b-lg bg-rose-700 px-4 py-2 text-left text-white hover:bg-rose-600 "
            >
              Delete
            </button>
          </li>
        </ul>
      </div>

      {/* {isOpened && ( */}
      {/* <>
        <div
          // ref={dropdownRef}
          id="dropdownDots"
          className={clsx(
            "absolute right-0 z-10 w-40 divide-gray-100 rounded-lg bg-white shadow transition",
            isOpened ? "opacity-100" : "opacity-0",
          )}
        >
          <ul
            className="rounded-lg text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <button
                onClick={handleMark}
                className="block w-[100%] rounded-t-lg px-4 py-2 text-left hover:bg-gray-100"
              >
                Mark as read
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="block w-[100%] rounded-b-lg bg-rose-700 px-4 py-2 text-left text-white hover:bg-rose-600 "
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </> */}
      {/* )} */}
    </div>
  );
}
