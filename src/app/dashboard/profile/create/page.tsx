import { UserForm } from "@/app/ui/dashboard/user-profile";

export default async function CreateUser() {
  const onsubmit = async () => {
    console.log(123);
  };

  return (
    <div className="bg-dashboard-wrapper soft-shadow m-auto w-fit rounded-lg py-8 text-gray-600 md:min-w-[500px]">
      <UserForm />
    </div>
  );
}
