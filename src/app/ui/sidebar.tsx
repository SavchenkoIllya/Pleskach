import { auth } from "@/auth";
import Logout from "./logout";
import clsx from "clsx";
import { PROJECT_NAME } from "../lib/projectConstants";
import { Navigation } from "./navigation";

const LOGO_COLOR = "#0284c7";

export default function Sidebar() {
  return (
    <>
      <SidebarWrapper>
        <LogoElement />

        <div className="flex flex-col justify-between flex-1 mt-6">
          <Navigation />

          <div>
            <ShowUser />

            <nav className="mt-4 -mx-3 space-y-3 ">
              <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <div className="flex items-center gap-x-2 ">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Components</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors duration-300 transform bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-x-2 ">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span>Blog navigation</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <div className="flex items-center gap-x-2 ">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Design System</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <div className="flex items-center gap-x-2 ">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Wishlist components</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <div className="flex items-center gap-x-2 ">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Components</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
}

export const ShowUser = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold text-gray-800">
        {!!session && session.user?.name}
      </h2>
    </div>
  );
};

export const SidebarWrapper = ({ children }: any) => {
  return (
    <aside className="flex flex-col w-72 h-screen px-5 py-8 overflow-y-auto bg-[#F0F1FF] border-r rtl:border-r-0 rtl:border-l ">
      {children}
    </aside>
  );
};

export const LogoElement = ({ children, className }: any) => {
  return (
    <a
      className={clsx(
        "flex items-center text-gray-600 transition-colors duration-300 transform rounded-lg ",
        className
      )}
      href="#"
    >
      <div className="flex justify-center items-center gap-2">
        <svg
          data-name="015_HEALTH"
          id="_015_HEALTH"
          width={"50px"}
          viewBox="0 0 24 24"
          height={"50px"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={LOGO_COLOR}
            d="M12,21.373c-2.15527,0-7.46484-4.20117-9.45312-8.98926a.9999.9999,0,0,1,.92383-1.3833L7.46484,11,9.168,8.44531a.9996.9996,0,0,1,1.78027.23828l1.35352,4.06055.86621-1.29883A1.00027,1.00027,0,0,1,14,11h3a1,1,0,0,1,0,2H14.53516L12.832,15.55469a.9996.9996,0,0,1-1.78027-.23828L9.69824,11.25586,8.832,12.55469A1.00027,1.00027,0,0,1,8,13l-2.918.00049c2.10742,3.645,5.9873,6.32861,6.92188,6.37256.74023-.03516,3.916-2.07715,6.13379-5.16553,1.3252-1.8457,2.73047-4.65576,1.90039-7.55957a3.66738,3.66738,0,0,0-3.34863-2.64307,3.80662,3.80662,0,0,0-3.76074,2.73975,1.00046,1.00046,0,0,1-1.85742,0A3.81422,3.81422,0,0,0,7.31055,4.00488,3.66738,3.66738,0,0,0,3.96191,6.64795a6.5335,6.5335,0,0,0-.23926,1.41016.99971.99971,0,1,1-1.99609-.11523,8.51963,8.51963,0,0,1,.31152-1.84473A5.66991,5.66991,0,0,1,7.209,2.00732,5.53309,5.53309,0,0,1,12,4.3208a5.51264,5.51264,0,0,1,4.791-2.31348,5.66991,5.66991,0,0,1,5.1709,4.09082c1.08984,3.81738-.73242,7.33789-2.45312,9.61963C17.27637,18.67725,13.69727,21.373,12,21.373Z"
          />
        </svg>
        <h1 className="font-[800] text-md text-gray-700">{PROJECT_NAME}</h1>
      </div>
    </a>
  );
};
