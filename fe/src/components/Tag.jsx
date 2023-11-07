import React from "react";

const Tag = ({ content }) => {
  return (
    <div className="px-[4px] hover:bg-gray-300 bg-gray-200 rounded flex items-center justify-center gap-2">
      <p>{content}</p>
    </div>
  );
};

export default Tag;
