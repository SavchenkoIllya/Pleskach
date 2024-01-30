"use client";
import Logout from "../logout";
import { Navigation } from "./navigation";
import { LogoElement } from "./logo-element";
// import { ShowUser } from "./user-item";
import { SidebarWrapper } from "./sidebar-wrapper";
import { Session } from "next-auth";
import { IComponentProps } from "../types/types";
import { useEffect, useState } from "react";
import { getSession } from "@/app/lib/action";

interface ISidebarProps extends IComponentProps {
  session?: Session;
}

export default function Sidebar({ session }: ISidebarProps) {
  const [user, setUser] = useState<Session>();
  useEffect(() => {
    const handleSession = async () => {
      try {
        const session = await getSession();
        setUser(session as Session);
      } catch (error) {
        console.log(error);
      }
    };
    handleSession();
  }, []);

  return (
    <div className="md:self-center">
      <SidebarWrapper className={"fixed top-0 overflow-y-auto"}>
        <LogoElement />

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <Navigation />

          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">
              {!!user && user.user?.name}
            </h2>
            <Logout />
          </div>
        </div>
      </SidebarWrapper>
    </div>
  );
}
