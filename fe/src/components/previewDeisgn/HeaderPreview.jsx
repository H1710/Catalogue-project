import React, { useState } from "react";
import { Rating } from "@mui/material";

const HeaderPreview = ({ templateData }) => {
  const [userRating, setUserRating] = useState(0);
  console.log(userRating);
  return (
    <div
      className="w-full p-1 rounded-md mb-2 mt-3"
      style={{
        background:
          "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
      }}
    >
      <div className="flex flex-col space-y-2 px-2">
        <div className="flex items-center">
          <p
            id="name"
            className="text-[#fef9c3] font-bold not-italic capitalize text-[23px]"
          >
            {templateData?.name}
          </p>
        </div>

        <div className="flex items-center">
          <p id="author" className="text-[#fef9c3]  italic capitalize">
            {templateData?.user.name}
          </p>
        </div>

        <div className="flex items-center">
          <p
            id="name"
            className="text-[#fef9c3] not-italic capitalize text-[15px]"
          >
            A5 - horizontal
          </p>
        </div>
        {/* <div className="flex">

        </div> */}

        {/* <div className="flex items-center">
          <p id="rating" className="text-yellow-500">
            <Rating name="half-rating-read" value={templateData?.rating} precision={0.1} readOnly />
          </p>
        </div> */}
        <Rating
          name="half-rating"
          defaultValue={3.7}
          precision={1}
          onChange={(event, newValue) => {
            setUserRating(newValue);
          }}
        />
      </div>
    </div>
  );
};

export default HeaderPreview;
