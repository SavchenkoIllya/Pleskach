import { useEffect, useState } from "react";
import { getSession, logout } from "../lib/Session.service";
import { Session, User } from "next-auth";

export default function Logout() {
  const [session, setSession] = useState<User>();

  useEffect(() => {
    const result = getSession().then((res) => {
      if (res) {
        const result = res as Session;
        setSession(result.user);
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <p className="paragraph">{session?.name}</p>
      <form action={handleLogout}>
        <button className="group flex w-[100%] items-center rounded-lg p-2 text-left text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg
            className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
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
      </form>
    </div>
  );
}
