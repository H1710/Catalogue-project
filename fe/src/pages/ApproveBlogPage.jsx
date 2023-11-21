import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProcessingBlogRoute, acceptBlogRoute } from "../utils/APIRoute";
import { getAPI, patchAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import BlogList from "../components/blog/BlogList";
import { ToastContainer, toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";

const ApproveBlogPage = () => {
  const [page, setPage] = useState(1);
  const [user] = useOutletContext();
  const navigate = useNavigate("");
  const {
    data: blogsData,
    isLoading: loadingBlogData,
    isError: getBlogError,
  } = useQuery({
    queryKey: ["processing_blogs", page, user?.id],
    queryFn: () => {
      return getAPI(
        `${getProcessingBlogRoute}?page=${page}&sort=desc`,
        user?.access_token
      );
    },
    onSuccess: (data) => {},
    onError: (error) => {},
    // enabled: logged,
  });

  const handleNavigateBlogDetail = useCallback((blogId) => {
    navigate(`/blog/${blogId}`);
  }, []);
  if (getBlogError) return <NotFoundPage />;

  return (
    <div className=" w-full h-full flex flex-col justify-between mt-4 p-4">
      {blogsData && (
        <BlogList
          blogsData={blogsData?.data}
          isLoading={loadingBlogData}
          handleNavigateBlogDetail={handleNavigateBlogDetail}
          user={user}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ApproveBlogPage;
