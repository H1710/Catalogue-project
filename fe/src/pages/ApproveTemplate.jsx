import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProcessingBlogRoute, acceptBlogRoute } from "../utils/APIRoute";
import { getAPI, patchAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/blog/BlogList";
import TemplateList from "../components/home/TemplateList";

const ApproveTemplate = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate("");
  const { data: templateList, isLoading: loadingTempData } = useQuery({
    queryKey: ["templates", page],
    queryFn: () => {
      return getAPI(`${getProcessingBlogRoute}?page=${page}&sort=desc`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { mutate: acceptTemplate, isLoading: loadingAcceptTemp } = useMutation({
    mutationFn: (info) => {
      return patchAPI(acceptBlogRoute, info);
    },
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

//   const handleNavigateBlogDetail = useCallback((tempId) => {
//     navigate(`/blog/${tempId}`);
//   }, []);

  const handleAcceptTemp = useCallback((tempId) => {
    acceptTemplate({ tempId });
  }, []);
  return (
    <div className=" w-full h-screen flex flex-col justify-between">
      {template && (
        <TemplateList
        templateList={templateList}
          isLoadingTemplateData={loadingTempData}
          handleAcceptTemp={handleAcceptTemp}
          loadingAcceptTemp={loadingAcceptTemp}
        />
      )}

      <Pagination
        className="h-20 flex justify-end"
        count={10}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default ApproveTemplate;
