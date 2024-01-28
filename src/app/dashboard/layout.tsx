import { auth } from "@/auth";
import Sidebar from "../ui/sidebar/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="bg-dashboard flex">
      <Sidebar session={session!} />
      <div className="mt-12 min-h-[100dvh] w-[100%] md:ml-80 md:mt-0">
        {children}
      </div>
    </div>
  );
}
