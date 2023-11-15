import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TemplateList = ({ templateList, isLoadingTemplateData }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content col-span-full select-none text-[18px] flex justify-start pb-2 font-bold">
        Template
      </div>
      <div className="w-full grid grid-cols-4 gap-8">
        {isLoadingTemplateData ? (
          <Skeleton width={849} height={280} className="rounded-md" />
        ) : (
          <>
            {templateList &&
              templateList.map((template, index) => (
                <div>
                  <div
                    className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-4"
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
                  <div>
                    <p className="font-semibold text-[14px] mt-[10px]">
                      {template.name}
                    </p>
                  </div>
                  <p className=" font-normal text-[14px] mt-2">
                    A5 - horizontal
                  </p>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default TemplateList;
