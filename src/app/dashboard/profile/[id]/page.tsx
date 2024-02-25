import { UserForm } from "@/app/ui/dashboard/user-profile";
import { Header } from "@/app/ui/ui/dashboard/header";
import Link from "next/link";

async function UpdateUser(props) {
  const { searchParams } = props;
  const user = { ...searchParams };
  const size = 20;
  return (
    <>
      <Header>
        <Link
          href="/dashboard/profile"
          className="btn-dashboard-primary m-0 flex items-center gap-4 leading-8 shadow-lg shadow-accent/50 transition-all"
        >
          <svg
            width={size}
            height={size}
            fill="white"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
          </svg>
          <span>Back</span>
        </Link>
      </Header>
      <div className="bg-dashboard-wrapper soft-shadow m-auto mt-4 w-fit rounded-lg py-8 text-gray-600 md:min-w-[500px]">
        <UserForm user={user as any} />
      </div>
    </>
  );
}

export default UpdateUser;
