import React from "react";
import { Rating } from "@mui/material"
function generateStarIcons(rating) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);

  return <>{filledStars}{emptyStars}</>;
}

const HeaderPreview = ({ templateData }) => {
  console.log(templateData?.rating)
  return (
    <div className="w-full p-1 rounded-md mb-2"
      style={{
        background:
          "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
      }}>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <p id="name" className="text-white font-normal text-[30px]">{templateData?.name}</p>
        </div>

        <div className="flex">
          <div className="flex items-center">
            <p id="name" className="text-white font-normal text-[15px]">A5 - horizontal</p>
          </div>

          <div className="flex items-center ml-[15px]">
            <p id="author" className="text-white font-normal">{templateData?.user.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <p id="rating" className="text-yellow-500">
            <Rating name="half-rating-read" value={templateData?.rating} precision={0.5} readOnly />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderPreview;
