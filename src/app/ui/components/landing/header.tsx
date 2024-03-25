"use client";
import WhatsAppIcon from "@/app/ui/assets/WhatsApp.png";
import TelegramIcon from "@/app/ui/assets/Telegram_logo.svg.webp";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";
import { landing } from "@/app/locales/ru-RU/ru";

type HeaderComponent = React.FC<HTMLMotionProps<"header">>;

export const Header: HeaderComponent = (props) => {
  return (
    <motion.header
      {...props}
      className="fixed top-0 z-10 w-[100vw] bg-transparent px-8 py-4"
    >
      <nav className="mx-auto flex max-w-[1080px] flex-col items-center justify-between rounded-2xl bg-transparent px-8 py-4  md:flex-row">
        <h2 className="text-amber-400"></h2>
        <ul className="flex items-center gap-4">
          <li>
            <a
              className="landing__button"
              href={"tel:" + landing.header.telephone}
              target="_blank"
              rel="noreferrer"
            >
              {landing.header.telephone}
            </a>
          </li>
          <li>
            <a>
              <Image
                className="hidden h-[35px] w-[35px] md:block"
                alt="WhatsApp icon"
                src={WhatsAppIcon}
              />
            </a>
          </li>
          <li>
            <a>
              <Image
                className="hidden h-[30px] w-[30px] md:block"
                alt="Telegram icon"
                src={TelegramIcon}
              />
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};
