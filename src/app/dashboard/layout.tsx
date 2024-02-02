import { auth } from "@/auth";
import { Sidebar } from "../ui/ui/dashboard/sidebar/sidebar";
import { Content } from "../ui/ui/dashboard/content";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div id="dashboard-wrapper" className="flex bg-gray-100 min-h-[100dvh]">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
