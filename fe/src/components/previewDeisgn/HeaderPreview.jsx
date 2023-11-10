import React from "react";
import { Rating } from "@mui/material"
function generateStarIcons(rating) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);

  return <>{filledStars}{emptyStars}</>;
}

const HeaderPreview = ({ templateData }) => {
  console.log(typeof templateData?.rating)
  return (
    <div className="w-full bg-gray-100 p-2 rounded-md shadow-sm">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <label htmlFor="name" className="mr-2 font-semibold">Name:</label>
          <p id="name" className="text-gray-800">{templateData?.name}</p>
        </div>
        <div className="flex items-center">
          <label htmlFor="rating" className="mr-2 font-semibold">Rating:</label>
          <p id="rating" className="text-yellow-500">
            <Rating name="half-rating-read" value={templateData?.rating} precision={0.5} readOnly />
          </p>
        </div>
        <div className="flex items-center">
          <label htmlFor="author" className="mr-2 font-semibold">Author:</label>
          <p id="author" className="text-blue-500">{templateData?.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderPreview;
