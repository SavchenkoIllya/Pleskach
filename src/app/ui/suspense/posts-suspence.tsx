import clsx from "clsx";

export const PostSkeleton = () => {
  return (
    <div
      className={clsx(
        "flex flex-col w-full max-w-[500px] animate-pulse bg-[#F7F8FA] leading-1.5 p-4 border-gray-200 rounded-xl text-[#2A3256]"
      )}
    >
      <h1 className="w-40 h-2 bg-gray-200 rounded-lg"></h1>

      <p className="w-64 h-2 mt-6 bg-gray-200 rounded-lg"></p>
      <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg"></p>
      <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg"></p>
      <div className="flex justify-between">
        <p className="w-8 h-2 mt-4 bg-gray-200 rounded-lg"></p>
        <p className="w-8 h-2 mt-4 bg-gray-200 rounded-lg"></p>
      </div>
    </div>
  );
};
