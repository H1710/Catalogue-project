import React from "react";
import CustomButton from "../components/common/Button";

const PreviewTemp = ({
    template,
    handleAcceptTemp,
    loadingAcceptTemp
}) => {
  return (
    <div className=" py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input]">
        

      <div className="flex items-start gap-8">
        

        <p className="w-full text-sm break-words inline-block overflow-hidden text-justify text-[--primary-text]">
          {template.name}
        </p>
      </div>
      {template?.status === "Processing" && (
        <div className="w-full flex justify-end gap-2">
          <CustomButton
            text={"Accept"}
            classContent={
              "bg-[--bg-button-success] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-success-hover]"
            }
            handleClick={() => handleAcceptTemp(template.id)}
            isLoading={loadingAcceptTemp}
          />
          <CustomButton
            text={"Reject"}
            classContent={
              "bg-[--bg-button-danger] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-danger-hover]"
            }
          />
        </div>
      )}
    </div>
  );
};

export default PreviewTemp;
