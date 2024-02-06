import { getUsers } from "@/app/lib/User.service";
import { IUser } from "@/app/lib/definitions";
import { UserProfiles } from "@/app/ui/dashboard/user-profile";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/app/ui/ui/dashboard/header";

export default async function Profile() {
  let users: IUser[] = [];
  await getUsers().then((res) => {
    if (res instanceof Array && res.length > 0) {
      users = res;
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
            <Link
              href={"/dashboard/profile/create"}
              className="btn-dashboard-primary m-0 flex items-center gap-4 shadow-lg shadow-accent/50 transition-all hover:translate-y-1"
            >
              <span>Create new user</span>
              <span className="text-2xl">+</span>
            </Link>
          </Header>
          <UserProfiles users={users} />
        </>
      </Suspense>
    </>
  );
}
