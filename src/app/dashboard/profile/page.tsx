import { getUser } from "@/app/lib/action";
import { User } from "@/app/lib/definitions";
import { Text } from "@/app/ui/text";
import Link from "next/link";
import { Suspense } from "react";

export default async function Profile() {
  const data = (await getUser()) as User[];
  const user: User = data[0];

  return (
    <>
      <Suspense
        fallback={
          <div className="container px-6 py-10 mx-auto animate-pulse">
            <h1 className="w-40 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <p className="w-64 h-2 mx-auto mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p className="w-48 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          </div>
        }
      >
        <div className="p-4 flex justify-center items-center gap-4 flex-col">
          <div
            className={`flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-sky-600 
       rounded-xl shadow-xl shadow-accent/50`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-white">
                Your profile
              </h2>
              <Link
                href={{
                  pathname: `/dashboard/profile/${user.id}/edit`,
                  query: { user: JSON.stringify(user) },
                }}
              >
                <div className="bg-white p-2 transition rounded-full hover:bg-sky-700 fill-sky-600  hover:fill-white">
                  <svg
                    width={25}
                    height={25}
                    className=""
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="1" id="_1">
                      <path d="M403.67,187.94a68,68,0,0,1-9.16-.63c-17.89-2.4-35.5-11.48-49.57-25.55h0c-14.07-14.08-23.15-31.68-25.56-49.58-2.57-19.12,2.93-37.07,15.11-49.25s30.13-17.69,49.25-15.11c17.9,2.41,35.51,11.48,49.58,25.56s23.15,31.68,25.56,49.57c2.57,19.13-2.94,37.08-15.11,49.26C433.56,182.41,419.29,187.94,403.67,187.94Zm-37.52-47.4c9.31,9.32,21.11,15.53,32.37,17,9.91,1.34,18.45-1,24-6.59s7.93-14.12,6.59-24c-1.51-11.26-7.72-23.06-17-32.37C394,76.47,368.16,71.69,355.7,84.14s-7.67,38.29,10.45,56.4Z" />
                      <path d="M189.36,402.24a68,68,0,0,1-9.15-.62c-17.9-2.41-35.51-11.48-49.58-25.56s-23.15-31.68-25.56-49.57c-2.57-19.13,2.94-37.08,15.11-49.26a15,15,0,0,1,21.22,21.22c-5.59,5.58-7.93,14.12-6.6,24,1.52,11.26,7.73,23.06,17,32.37C170,373,195.79,377.75,208.25,365.3a15,15,0,1,1,21.21,21.21C219.25,396.72,205,402.24,189.36,402.24Z" />
                      <path d="M71.69,450a15,15,0,0,1-14.64-18.25c.26-1.17,6.46-29,15.07-59.7,16.16-57.6,25.91-72.67,32.6-79.36L334.49,62.93A15,15,0,1,1,355.7,84.14L125.94,313.91c-.91.9-9.27,10.43-24.94,66.25-3.51,12.51-6.65,24.69-9.1,34.64,10-2.47,22.21-5.61,34.75-9.14,55.72-15.64,65.24-24,66.14-24.9L422.55,151a15,15,0,0,1,21.22,21.21L214,402c-6.69,6.69-21.75,16.44-79.36,32.61-30.65,8.6-58.53,14.8-59.7,15.06A15,15,0,0,1,71.69,450Z" />
                      <path d="M391.63,135.07a15,15,0,0,1-10.61-4.4l-5-5a15,15,0,0,1,21.21-21.21l5,5a15,15,0,0,1-10.6,25.61Z" />
                    </g>
                  </svg>
                </div>
              </Link>
            </div>
            <div className="text-xs">
              <div className="flex flex-col my-4">
                <Text>Name and Surname</Text>
                <Text className="text-sm">{user.name}</Text>
              </div>
              <div className="flex flex-col my-4">
                <Text>Telephone</Text>
                <Text className="text-sm">{user.phone}</Text>
              </div>
              <div className="flex flex-col my-4">
                <Text>What'sApp</Text>
                <Text className="text-sm">{user.whatsapp_link}</Text>
              </div>
              <div className="flex flex-col my-4">
                <Text>Telegram</Text>
                <Text className="text-sm">{user.telgram_link}</Text>
              </div>
              <div className="flex flex-col my-4">
                <Text>E-mail</Text>
                <Text className="text-sm">{user.email}</Text>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
