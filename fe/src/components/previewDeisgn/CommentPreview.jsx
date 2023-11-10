import React from "react";
import { Rating } from "@mui/material"
import CustomButton from "../common/Button"
const CommentPreview = () => {
  return <div className="w-full bg-gray-100 p-2 rounded-md shadow-sm flex flex-col items-center justify-center">
    <div className="ml-[470px]"><Rating /></div>
    <textarea
      className="w-[600px] border p-1 border-gray-300 rounded-md resize-none focus:outline-none"
      rows="3"
      placeholder="Write a comment..."
    ></textarea>
    <CustomButton text={"Send"} classContent={"ml-[520px] mt-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none"}></CustomButton>
  </div>


    ;
};

export default CommentPreview;
