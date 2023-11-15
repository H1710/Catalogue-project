import React from "react";
import { Rating } from "@mui/material"
function generateStarIcons(rating, precision = 1) {
  // Calculate the total number of stars
  const totalStars = 5;

  // Calculate the number of filled and empty stars based on rating and precision
  const filledStarsCount = Math.min(Math.ceil(rating / precision), totalStars);
  const emptyStarsCount = Math.max(totalStars - filledStarsCount, 0);

  const filledStars = '★'.repeat(filledStarsCount);
  const emptyStars = '☆'.repeat(emptyStarsCount);

  return <>{filledStars}{emptyStars}</>;
}



const HeaderPreview = ({ templateData }) => {
  console.log(templateData?.rating)
  return (
    <div className="w-full p-1 rounded-md mb-2 mt-3"
      style={{
        background:
          "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
      }}>
      <div className="flex flex-col space-y-2 px-2">
        <div className="flex items-center">
          <p id="name" className="text-[#fef9c3] font-bold not-italic capitalize text-[23px]">{templateData?.name}</p>
        </div>

        <div className="flex items-center">
          <p id="author" className="text-[#fef9c3]  italic capitalize">{templateData?.user.name}</p>
        </div>

        <div className="flex items-center">
          <p id="name" className="text-[#fef9c3] not-italic capitalize text-[15px]">A5 - horizontal</p>
        </div>
        {/* <div className="flex">

        </div> */}

        {/* <div className="flex items-center">
          <p id="rating" className="text-yellow-500">
            <Rating name="half-rating-read" value={templateData?.rating} precision={0.1} readOnly />
          </p>
        </div> */}
        <div className="flex items-center text-yellow-500 text-[25px]">
          {generateStarIcons(templateData?.rating, 0.1)}
        </div>
      </div>
    </div>
  );
};

export default HeaderPreview;
