import { IUser } from "@/app/lib/definitions";
import { BackButton } from "@/app/ui/dashboard/back-button";
import { UserForm } from "@/app/ui/dashboard/user-profile";
import { Header } from "@/app/ui/ui/dashboard/header";

export default async function UpdateUser({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = { ...searchParams };

  return (
    <>
      <Header>
        <BackButton href="/dashboard/profile" />
      </Header>
      <div className="bg-dashboard-wrapper soft-shadow m-auto w-fit rounded-lg py-8 mt-4 text-gray-600 md:min-w-[500px]">
        <UserForm user={user as any} />
      </div>
    </>
  );
}
