
import React, { useEffect } from "react";
import { Rating } from "@mui/material"
import CustomButton from "../common/Button"
import axios from "axios";
const CommentPreview = ({ rating, templateData }) => {
  const [value, setValue] = React.useState(rating);

  // const [value, setValue] = React.useState(templateData?.template_ratings[0].rating);
  useEffect(() => { }, [value])
  console.log(value)
  // console.log(templateData)
  const handleChange = (e, value) => {
    setValue(value)

    const res = axios.post("http://localhost:5000/api/v1/template/rating", {
      templateId: templateData.id, userId: templateData.authorId, rating: value
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  return <div className="w-full p-2 rounded-md shadow-sm flex flex-col items-center justify-center">
    <div className="ml-[470px]">
      <Rating name="size-medium" defaultValue={value} onChange={(e, value) => handleChange(e, value)} />
    </div>
    <textarea
      className="w-full border p-2 border-gray-300 rounded-md resize-none focus:outline-none"
      rows="3"
      placeholder="Write a comment..."
    ></textarea>
    <div className="flex justify-end w-full">
      <CustomButton text={"Comment"} classContent={"text-white  mt-2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 hover:from-purple-900 hover:via-purple-700 hover:to-purple-600"}></CustomButton>
 </div>
    </div>
  );
};

export default CommentPreview;
