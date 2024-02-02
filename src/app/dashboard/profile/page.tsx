// import { getUser } from "@/app/lib/action";
// import { getUsers } from "@/app/lib/action";
import { getUsers } from "@/app/lib/User.service";
import { IUser } from "@/app/lib/definitions";
import { UserProfile } from "@/app/ui/dashboard/user-profile";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/app/ui/ui/dashboard/header";

export default async function Profile() {
  let data: IUser[] = [];
  await getUsers().then((res) => {
    if (res instanceof Array && res.length > 0) {
      data = res;
    }
  });
  return (
    <>
      <Suspense
        fallback={
          <div className="container mx-auto animate-pulse px-6 py-10">
            <h1 className="mx-auto h-2 w-40 rounded-lg bg-gray-200 dark:bg-gray-700"></h1>
            <p className="mx-auto mt-6 h-2 w-64 rounded-lg bg-gray-200 dark:bg-gray-700"></p>
            <p className="mx-auto mt-4 h-2 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"></p>
          </div>
        }
      >
        <>
          <Header>
            <button className="btn-dashboard-primary m-0 flex items-center gap-4 shadow-lg shadow-accent/50 transition-all hover:translate-y-1">
              <span>Create new user</span>
              <span className="text-2xl">+</span>
            </button>
          </Header>

          {data.map((el: IUser) => (
            <UserProfile key={el.id} user={el} />
          ))}
        </>
      </Suspense>
    </>
  );
}
