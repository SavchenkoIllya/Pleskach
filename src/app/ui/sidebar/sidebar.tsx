"use client";
import Logout from "../logout";
import { Navigation } from "./navigation";
import { LogoElement } from "./logo-element";
// import { ShowUser } from "./user-item";
import { SidebarWrapper } from "./sidebar-wrapper";
import { Session } from "next-auth";
import { IComponentProps } from "../types/types";
import { useEffect, useState } from "react";
import { getMe } from "@/app/lib/action";

interface ISidebarProps extends IComponentProps {
  session?: Session;
}

type UserReq =
  | Session
  | {
      message: string | undefined;
    }
  | null;

export default function Sidebar({ session }: ISidebarProps) {
  const [user, setUser] = useState<UserReq>();

  useEffect(() => {
    const handleSession = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    handleSession();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="md:self-center">
      <SidebarWrapper className={"fixed top-0 overflow-y-auto"}>
        <LogoElement />

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <Navigation />

          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">
              {!!session && session.user?.name}
            </h2>
            <Logout />
          </div>
        </div>
      </SidebarWrapper>
    </div>
  );
}
