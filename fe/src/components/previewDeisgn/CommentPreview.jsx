import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import CustomButton from "../common/Button";
import axios from "axios";
import LiteQuillEditor from "../textEditor/LiteQuillEditor";
const CommentPreview = ({ rating, templateData }) => {
  const [body, setBody] = useState();
  return (
    <div className="w-full p-2 rounded-md shadow-sm flex flex-col items-center justify-center">
      <LiteQuillEditor body={body} setBody={setBody} />
      <div className="w-full flex justify-end mt-4">
        <CustomButton
          text={"Comment"}
          classContent={
            "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
          }
          // handleClick={() =>
          //   commentBlog({
          //     userId: user.id,
          //     blogId,
          //     content: body,
          //   })
          // }
          // isLoading={loadingCreate}
        />
      </div>
    </div>
  );
};

export default CommentPreview;
