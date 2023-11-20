import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { getProcessingTemplateRoute } from "../utils/APIRoute";
import { getAPI, patchAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProcessTemplateList from "../components/template/ProcessTemplateList";
import { ToastContainer, toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";

const ApproveTemplatePage = () => {
  const [page, setPage] = useState(1);
  const [user] = useOutletContext();
  const navigate = useNavigate("");
  const {
    data: templateList,
    isLoading: loadingTempData,
    isError: getTemplateError,
  } = useQuery({
    queryKey: ["templates", page, user?.id],
    queryFn: () => {
      return getAPI(`${getProcessingTemplateRoute}`, user?.access_token);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    // enabled: logged,
  });

  if (getTemplateError) return <NotFoundPage />;

  //   const handleNavigateBlogDetail = useCallback((tempId) => {
  //     navigate(`/blog/${tempId}`);
  //   }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-between p-4">
      {templateList && (
        <ProcessTemplateList
          templateList={templateList}
          isLoadingTemplateData={loadingTempData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ApproveTemplatePage;
