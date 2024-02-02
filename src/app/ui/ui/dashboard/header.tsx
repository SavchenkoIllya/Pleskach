"use client";
import { getSession, logout } from "@/app/lib/Session.service";
import { ChildrenProps } from "../../types/types";
import { Avatar } from "./avatar";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { User } from "next-auth";

export const Header = ({ children }: { children?: ChildrenProps }) => {
  //   const session = (await getSession()) as Session;
  const [session, setSession] = useState<User>();

  useEffect(() => {
    const result = getSession().then((res) => {
      if (res) {
        const result = res as Session;
        setSession(result.user);
      }
    });
  }, []);

  //   const user = session ? session.user?.name : "?";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex w-[100%] items-center justify-end gap-8 [text-align:-webkit-right]">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="soft-shadow flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white transition hover:translate-y-1 hover:scale-[1.005]"
        >
          <svg
            className="h-4 w-4 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
        </button>
        <Avatar username={session?.name as string} />
      </div>
    </header>
  );
};
