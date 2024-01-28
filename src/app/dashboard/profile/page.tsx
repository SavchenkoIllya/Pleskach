import { getUser } from "@/app/lib/action";
import { IUser } from "@/app/lib/definitions";
import { UserProfile } from "@/app/ui/dashboard/user-profile";
import { Suspense } from "react";

export default async function Profile() {
  const data = (await getUser()) as IUser[];
  const user: IUser = data[0];

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
        <UserProfile user={user} key={123} />
      </Suspense>
    </>
  );
}
