import React from "react";
import CustomButton from "../common/Button";
const CommentPreview = () => {
  return (
    <div className="w-full p-2 rounded-md shadow-sm flex flex-col items-center justify-center">
      <textarea
        className="w-full border p-2 border-gray-300 rounded-md resize-none focus:outline-none"
        rows="3"
        placeholder="Write a comment..."
      ></textarea>
      <div className="flex justify-end w-full">
        <CustomButton
          text={"Comment"}
          classContent={
            "text-white  mt-2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 hover:from-purple-900 hover:via-purple-700 hover:to-purple-600"
          }
        ></CustomButton>
      </div>
    </div>
  );
};

export default CommentPreview;
