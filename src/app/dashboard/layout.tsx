import Sidebar from "../ui/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-white w-[100%]">{children}</div>
    </div>
  );
}
