"use client";
import Image from "next/image";
import WhatsAppIcon from "../assets/WhatsApp.png";
import TelegramIcon from "../assets/Telegram_logo.svg.webp";
import { Button } from "./button";
import { IComponentProps } from "./types/types";

interface IHeaderProps extends IComponentProps {
  telephone: string;
}

export const Header = ({
  telephone,
  className = "",
  ...props
}: IHeaderProps) => {
  return (
    <header
      className={"fixed top-0 z-10 w-[100vw] px-8 py-4" + " " + className}
      {...props}
    >
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between rounded-2xl bg-transparent px-8 py-4  md:flex-row">
        <h2 className="text-amber-400"></h2>
        <div className="flex items-center gap-4">
          <a
            className="btn-dashboard-outline border-[#E5B5FF] text-[#E5B5FF]"
            href={"tel:" + telephone}
            target="_blank"
            rel="noreferrer"
          >
            {telephone}
          </a>
          <Image
            className="hidden h-[35px] w-[35px] md:block"
            alt="WhatsApp icon"
            src={WhatsAppIcon}
          />
          <Image
            className="hidden h-[30px] w-[30px] md:block"
            alt="Telegram icon"
            src={TelegramIcon}
          />
        </div>
      </div>
    </header>
  );
};
