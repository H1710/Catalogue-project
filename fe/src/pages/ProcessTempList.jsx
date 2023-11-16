import React from "react";
import PreviewTemp from "./PreviewTemp";
const ProcessTemp = ({
    templateList,
    isLoadingTemplateData,
    handleAcceptTemp,
    handleRejectTemp,
    loadingAcceptTemp,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        {!isLoadingTemplateData &&
          templateList.data.templates.map((template, index) => (
            <PreviewTemp
              key={index}
              template={template}
              handleAcceptTemp={handleAcceptTemp}
              handleRejectTemp={handleRejectTemp}
              loadingAcceptTemp={loadingAcceptTemp}
            />
          ))}
      </div>
    );
  };
export default ProcessTemp;
