import clsx from "clsx";
import Dropdown from "./dropdown";
import { IPosts } from "@/app/lib/definitions";
import { IComponentProps } from "../types/types";

interface IMessageProps extends IPosts, IComponentProps {}

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
        "flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 rounded-xl text-[#2A3256]",
        !is_read ? "bg-sky-600" : "bg-message-read"
      )}
    >
      <div className=" flex items-center justify-between space-x-2 rtl:space-x-reverse">
        <div className="flex align-baseline flex-col md:flex-row">
          <span className="text-sm pr-4 font-semibold ">{name}</span>
          <a
            href={`tel:${telephone}`}
            className="text-sm font-semibold transition-all hover:italic"
          >
            {telephone}
          </a>
        </div>
        <Dropdown id={id} />
      </div>

      <p className="text-sm font-normal py-2.5 ">{problem}</p>
      <div className="flex justify-between ">
        <span className="text-sm font-normal text-[#7E8296]">
          {is_read ? "Read" : "New"}
        </span>
        <span className="text-sm font-normal text-[#7E8296]">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

// #F7F8FA
// #2A3256
