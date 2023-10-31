import React from "react";

const DesignNavbar = ({ state, setElement }) => {
  return (
    <div className="w-[80px] bg-white h-full shadow-lg text-gray-800 flex flex-col items-center  z-10">
      <div
        onClick={() => setElement("shape")}
        className={`${
          state === "shape" && "bg-gray-100"
        } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-600 hover:bg-gray-100`}
      >
        <span className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
              d="m6.5 4.25.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6 4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
            ></path>
          </svg>
        </span>
        <span className="text-xs font-medium">Shapes</span>
      </div>
      <div
        onClick={() => setElement("text")}
        className={`${
          state === "text" && "bg-gray-100"
        } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-600 hover:bg-gray-100`}
      >
        <span className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z"
            ></path>
          </svg>
        </span>
        <span className="text-xs font-medium">Text</span>
      </div>
      <div
        onClick={() => setElement("upload")}
        className={`${
          state === "upload" && "bg-gray-100"
        } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-600 hover:bg-gray-100`}
      >
        <span className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.75 13.81v7.44a.75.75 0 1 1-1.5 0v-7.4L9.49 15.6a.75.75 0 1 1-1.06-1.06l2.35-2.36c.68-.68 1.8-.68 2.48 0l2.35 2.36a.75.75 0 1 1-1.06 1.06l-1.8-1.8zM9 18v1.5H6.75v-.01A5.63 5.63 0 0 1 5.01 8.66a6 6 0 0 1 11.94-.4 5.63 5.63 0 0 1 .3 11.23v.01H15V18h1.88a4.12 4.12 0 1 0-1.5-7.97A4.51 4.51 0 0 0 11 4.5a4.5 4.5 0 0 0-4.43 5.29 4.13 4.13 0 0 0 .68 8.2V18H9z"
            ></path>
          </svg>
        </span>
        <span className="text-xs font-medium">Uploads</span>
      </div>
    </div>
  );
};

export default DesignNavbar;
