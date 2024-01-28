import { useState, useRef, useEffect } from "react";

const Hint = () => {
  const [showHint, setHint] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropDownButton = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target?.contains(dropdownRef.current)) {
      setHint(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <p className="descriptor flex items-center self-end">
        Show Hint
        <button
          className="z-[11]"
          ref={dropDownButton}
          data-popover-target="popover-description"
          data-popover-placement="bottom-end"
          type="button"
          onClick={() => setHint(true)}
          onMouseEnter={() => setHint(true)}
        >
          <svg
            className="ms-2 h-5 w-5 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Show information</span>
        </button>
      </p>

      {showHint && (
        <>
          <div
            className="absolute inset-0 z-[9] h-[100dvh] w-[100%]"
            onMouseEnter={() => setHint(!showHint)}
            onClick={() => setHint(false)}
          ></div>

          <div
            ref={dropdownRef}
            data-popover
            id="popover-description"
            role="tooltip"
            className="modal-bg absolute z-[11] inline-block w-72 rounded-lg "
          >
            <div className="space-y-2 p-3">
              <h3 className="h2 text-sm">Some basic markup rules</h3>
              <p className="paragraph">
                Use # Your Heading – for headings Use ** Your text ** – for bold
                text <br />
                Use * Your text * – for italic text <br />
                Use - item 1 <br />- item 2 – for lists
              </p>
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
              >
                More rules here
                <svg
                  className="ms-1.5 h-2 w-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </div>
            <div data-popper-arrow></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hint;
