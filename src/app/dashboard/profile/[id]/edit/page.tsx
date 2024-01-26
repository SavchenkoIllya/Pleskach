import { User } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { DashboardButton } from "@/app/ui/dashboard-button";
import { Input } from "@/app/ui/form/input";
import { Label } from "@/app/ui/form/label";
import Link from "next/link";

export default function EditUser(req: {
  params: { id: number };
  searchParams: any;
}) {
  const id = Number(req.params.id);
  const user: User = JSON.parse(req.searchParams.user);

  return (
    <div className="p-4 flex justify-center items-center gap-4 flex-col">
      <div
        className={`flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-sky-600 
   rounded-xl shadow-xl shadow-accent/50`}
      >
        <form className="flex flex-col max-w-md mx-6 mt-6 mb-2">
          <div className="relative z-0 w-full mb-5 group">
            <Label htmlFor="floating_email">Name</Label>
            <Input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              required
              value={user.name}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label htmlFor="floating_email">E-mail</Label>
            <Input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              value={user.email}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label htmlFor="floating_email">Phone</Label>
            <Input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              required
              value={user.phone}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label htmlFor="floating_email">What'sApp link</Label>
            <Input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              required
              value={user.whatsapp_link}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Label htmlFor="floating_email">Telegram link</Label>
            <Input
              type="email"
              name="floating_email"
              id="floating_email"
              placeholder=" "
              value={user.telgram_link}
              required
            />
          </div>
          <div className="mt-4 self-center flex gap-8">
            <DashboardButton className="m-0 w-fit bg-sky-400" type="submit">
              Save
            </DashboardButton>
            <DashboardButton
              as={Link}
              href="/dashboard/profile"
              className="m-0 w-fit"
              style={{ backgroundColor: "rgb(220 38 38)" }}
              type="submit"
            >
              Discard
            </DashboardButton>
          </div>
        </form>
      </div>
    </div>
  );
}
