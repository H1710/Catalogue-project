import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({ text, type, classContent, handleClick, isLoading }) => {
  return (
    <button
      onClick={handleClick}
      className={`${classContent} ${
        isLoading && " loading"
      } px-2 py-[6px] rounded `}
      disabled={isLoading}
      type={type}
    >
      {isLoading ? (
        <div className="flex justify-center items-center gap-4">
          <CircularProgress size={16} color="inherit" />
          Loading
        </div>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default CustomButton;
