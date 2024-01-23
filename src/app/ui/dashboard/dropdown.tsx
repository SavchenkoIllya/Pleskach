"use client";
import { deletePost, markPostAsRead } from "@/app/lib/action";
import { useState, useEffect, useRef } from "react";

type DropdownProps = {
  id: number;
};

export default function Dropdown({ id }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target?.contains(dropdownRef.current)) {
      setIsOpen(false);
    }
  };

  const handleMark = (e: any) => {
    e.preventDefault();
    markPostAsRead(id);
    setIsOpen(false);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    deletePost(id);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="flex flex-col relative">
      <button
        className="flex flex-col justify-between items-center relative"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <svg
          height={25}
          width={25}
          fill="white"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="none" height="256" width="256" />
          <circle cx="128" cy="128" r="10" />
          <circle cx="64" cy="128" r="10" />
          <circle cx="192" cy="128" r="10" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={itemRef}
          id="dropdownDots"
          className="z-10 bg-white absolute right-0 divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="text-sm text-gray-700 rounded-lg dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <button
                onClick={handleMark}
                className="block text-left w-[100%] px-4 py-2 hover:bg-gray-100 rounded-t-lg dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Mark as read
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="block px-4 text-left w-[100%] py-2 hover:bg-rose-600 rounded-b-lg bg-rose-700 dark:hover:text-white"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
