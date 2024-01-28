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
      className={"fixed w-[100vw] top-0 z-10 py-4 px-8" + " " + className}
      {...props}
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1080px] mx-auto bg-white rounded-2xl shadow-xl shadow-accent/15 py-4 px-8">
        <h2 className="text-plane-text">🌙 Сомнолог Екатерина Плескач</h2>
        <div className="flex items-center gap-4">
          <Button href={"tel:" + telephone} target="_blank" rel="noreferrer">
            {telephone}
          </Button>
          <Image
            className="hidden md:block w-[35px] h-[35px]"
            alt="WhatsApp icon"
            src={WhatsAppIcon}
          />
          <Image
            className="hidden md:block w-[30px] h-[30px]"
            alt="Telegram icon"
            src={TelegramIcon}
          />
        </div>
      </div>
    </header>
  );
};
