import React, { useRef, useState } from "react";

import { getTemplateByIdRoute } from "../utils/APIRoute";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import HeaderPreview from "../components/previewDeisgn/HeaderPreview";
import ContentPreview from "../components/previewDeisgn/ContentPreview";
import CommentPreview from "../components/previewDeisgn/CommentPreview";

const PreviewDesignPage = () => {
  const rating = useRef(null)
  const { templateId } = useParams();
  const { data: templateData } = useQuery({
    queryKey: ["template", templateId],
    queryFn: () => {
      return getAPI(`${getTemplateByIdRoute}/${templateId}`);
    },
    onSuccess: (data) => {
      rating.current = (data?.data.data.template_ratings[0]?.rating)
      console.log("111111111111", data);
      if (rating.current == undefined) { rating.current = 0; }
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  console.log(rating.current)

  return (
    <div className="w-full px-32">
      <HeaderPreview templateData={templateData?.data.data} />

      <ContentPreview templateData={templateData?.data.data.template_pages} />

      {rating.current | rating.current === 0 && <CommentPreview templateData={templateData?.data.data} rating={rating.current} />}
    </div>
  );
};

export default PreviewDesignPage;
