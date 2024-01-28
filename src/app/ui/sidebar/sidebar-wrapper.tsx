import { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { IComponentProps } from "../types/types";
import clsx from "clsx";

export const SidebarWrapper = ({
  children,
  className,
  ...rest
}: IComponentProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    if (isOpened) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpened]);

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <div className="block w-[100%]">
        <button
          onClick={handleClick}
          className={clsx(
            "bg-dashboard-wrapper absolute ml-2 mt-2 grow rounded-lg p-2 opacity-75 transition",
            isOpened ? "hidden" : "block md:hidden",
          )}
        >
          <svg
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            height={30}
            width={30}
            className="fill-sky-600"
          >
            <path d="M3 7C3 6.44771 3.44772 6 4 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H4C3.44772 8 3 7.55229 3 7Z" />
            <path d="M3 14C3 13.4477 3.44772 13 4 13H24C24.5523 13 25 13.4477 25 14C25 14.5523 24.5523 15 24 15H4C3.44772 15 3 14.5523 3 14Z" />
            <path d="M4 20C3.44772 20 3 20.4477 3 21C3 21.5523 3.44772 22 4 22H24C24.5523 22 25 21.5523 25 21C25 20.4477 24.5523 20 24 20H4Z" />
          </svg>
        </button>
      </div>
      <aside
        ref={dropdownRef}
        {...rest}
        className={clsx(
          "bg-dashboard-wrapper z-[99] m-0 flex h-[100dvh] w-72 flex-col overflow-y-auto px-5 py-8 transition-all md:m-4 md:h-[90dvh] md:rounded-xl rtl:border-l rtl:border-r-0",
          className,
          isOpened ? "fixed ml-0" : "-ml-72 md:ml-4",
        )}
      >
        {children}
      </aside>
    </>
  );
};
