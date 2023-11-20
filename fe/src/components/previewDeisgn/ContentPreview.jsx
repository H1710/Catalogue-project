import React, { useState } from "react";
import PreviewComponent from "./PreviewComponent";
import { Rating } from "@mui/material";
const ContentPreview = ({ templateData }) => {
  const [page, setPage] = useState(0);
  return (
    <div className="m-w-[800px] m-h-[400px] flex justify-center items-center overflow-hidden my-4">
      <button
        onClick={() => page - 1 >= 0 && setPage(page - 1)}
        className="bg-[--bg-button] hover:bg-[--bg-button-hover] text-white rounded-full p-2"
        disabled={page === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div
        id="main_design"
        className="w-auto relative h-auto overflow-hidden border border-purple-800"
      >
        {templateData &&
          templateData[page].template_page_details.map((c, i) => (
            <PreviewComponent key={i} info={c} />
          ))}
      </div>
      <button
        onClick={() =>
          page < templateData.length - 1 && setPage((prev) => prev + 1)
        }
        className="bg-[--bg-button] hover:bg-[--bg-button-hover] text-white rounded-full p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ContentPreview;
