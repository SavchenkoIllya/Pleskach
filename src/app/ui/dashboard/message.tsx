import Dropdown from "./dropdown";

type MessageProps = {
  key?: any;
  id: number;
  name: string;
  telephone: string;
  problem: string;
  is_read: false;
  date: Date;
};

export const Message = ({
  id,
  name,
  telephone,
  problem,
  date,
  is_read,
}: MessageProps) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return (
    <div
      key={id}
      className={`flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 ${
        !is_read ? "bg-sky-600" : "bg-stone-700"
      } rounded-xl`}
    >
      <div className=" flex items-center justify-between space-x-2 rtl:space-x-reverse">
        <div className="flex align-baseline flex-col md:flex-row">
          <span className="text-sm pr-4 font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {telephone}
          </span>
        </div>
        <Dropdown id={id} />
      </div>

      <p className="text-sm font-normal py-2.5 text-gray-200">{problem}</p>
      <div className="flex justify-between ">
        <span className="text-sm font-normal text-gray-200">
          {is_read ? "Read" : "New"}
        </span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
