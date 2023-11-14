import React from "react";

const HeaderPreview = ({ templateData }) => {
  console.log(templateData);
  return (
    <div className="w-full flex flex-col justify-start">
      <div className="flex gap-2">
        <label htmlFor="">Name:</label>
        <p>{templateData?.name}</p>
      </div>
      <div className="flex gap-2">
        <label htmlFor="">Rating:</label>
        <p>{templateData?.rating}</p>
      </div>
      <div className="flex gap-2">
        <label htmlFor="">Author:</label>
        <p>{templateData?.user.name}</p>
      </div>
    </div>
  );
};

export default HeaderPreview;
