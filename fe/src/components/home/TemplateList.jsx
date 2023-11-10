import React from "react";
import { useNavigate } from "react-router-dom";

const TemplateList = ({ templateList, handleCloneTemplate }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content col-span-full select-none text-xl flex justify-start pb-2 font-semibold">
        Template
      </div>
      <div className="w-full grid grid-cols-4 gap-6">
        {templateList &&
          templateList.map((template, index) => (
            <div>
              <div
                className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
                key={index}
                onClick={() => {
                  navigate(`/design/preview/${template.id}`);
                }}
              >
                <div className="h-full w-full flex items-center justify-center group cursor-pointer rounded-md ">
                  <img
                    src={template.thumbnail}
                    alt=""
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              </div>
              <p className="font-semibold text-[14px] mt-2">{template.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default TemplateList;
