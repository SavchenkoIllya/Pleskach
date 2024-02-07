import clsx from "clsx";
import Dropdown from "./dropdown";
import { IPosts } from "@/app/lib/definitions";
import { IComponentProps } from "../types/types";

interface IMessageProps extends IPosts, IComponentProps {
  page: number;
}

export const Message = ({
  id,
  name,
  telephone,
  problem,
  date,
  is_read,
}: IMessageProps) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return (
    <div
      key={id}
      className={clsx(
        "soft-shadow leading-1.5 flex w-full max-w-[500px] flex-col rounded-xl bg-white p-4 text-[#2A3256]",
        is_read && "bg-sky-600",
      )}
    >
      <div className=" flex items-center justify-between space-x-2 rtl:space-x-reverse">
        <div className="flex flex-col align-baseline md:flex-row">
          <span className="pr-4 text-sm font-semibold ">{name}</span>
          <a
            href={`tel:${telephone}`}
            className="text-sm font-semibold transition-all hover:italic"
          >
            {telephone}
          </a>
        </div>
        <Dropdown id={id} />
      </div>

      <p className="py-2.5 text-sm font-normal ">{problem}</p>
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
        <div className={clsx("w-[15px] h-[15px] rounded-full", is_read ? "bg-sky-400" : "bg-green-400")}></div>
        <span className="text-sm font-normal text-[#7E8296]">
          {is_read ? "Read" : "New"} 
        </span>
        </div>
        <span className="text-sm font-normal text-[#7E8296]">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};