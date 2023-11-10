import React from "react";
import { Rating } from "@mui/material"
const CommentPreview = () => {
  return <div className="w-full bg-gray-100 p-2 rounded-md shadow-sm flex flex-col items-center justify-center">
    <div className="ml-[470px]"><Rating /></div>
    <textarea
      className="w-[600px] border p-1 border-gray-300 rounded-md resize-none focus:outline-none"
      rows="3"
      placeholder="Write a comment..."
    ></textarea>
  </div>


    ;
};

export default CommentPreview;
