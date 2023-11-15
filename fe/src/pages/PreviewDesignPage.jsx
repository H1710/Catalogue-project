import React, { useState } from "react";

import { getTemplateByIdRoute } from "../utils/APIRoute";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import HeaderPreview from "../components/previewDeisgn/HeaderPreview";
import ContentPreview from "../components/previewDeisgn/ContentPreview";
import CommentPreview from "../components/previewDeisgn/CommentPreview";

const PreviewDesignPage = () => {
  const { templateId } = useParams();
  const { data: templateData } = useQuery({
    queryKey: ["template", templateId],
    queryFn: () => {
      return getAPI(`${getTemplateByIdRoute}/${templateId}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  return (
    <div className="w-full px-32">
      <HeaderPreview templateData={templateData?.data.data} />

      <ContentPreview templateData={templateData?.data.data.template_pages} />

      <CommentPreview />
    </div>
  );
};

export default PreviewDesignPage;
