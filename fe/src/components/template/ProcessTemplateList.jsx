import React from "react";
import PreviewTemplate from "./PreviewTemplate";
const ProcessTemplateList = ({ templateList, isLoadingTemplateData }) => {
  return (
    <div className="flex flex-col gap-4">
      {!isLoadingTemplateData &&
        templateList &&
        templateList?.data.templates.map((template, index) => (
          <PreviewTemplate key={index} template={template} />
        ))}
    </div>
  );
};
export default ProcessTemplateList;
