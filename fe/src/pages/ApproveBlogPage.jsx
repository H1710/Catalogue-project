import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProcessingBlogRoute, acceptBlogRoute } from "../utils/APIRoute";
import { getAPI, patchAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/blog/BlogList";

const ApproveBlogPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate("");
  const { data: blogsData, isLoading: loadingBlogData } = useQuery({
    queryKey: ["blogs", page],
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

  const { mutate: acceptBlog, isLoading: loadingAcceptBlog } = useMutation({
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

  const handleNavigateBlogDetail = useCallback((blogId) => {
    navigate(`/blog/${blogId}`);
  }, []);

  const handleAcceptBlog = useCallback((blogId) => {
    acceptBlog({ blogId });
  }, []);
  return (
    <div className=" w-full h-screen flex flex-col justify-between">
      {blogsData && (
        <BlogList
          blogsData={blogsData}
          isLoading={loadingBlogData}
          handleNavigateBlogDetail={handleNavigateBlogDetail}
          handleAcceptBlog={handleAcceptBlog}
          loadingAcceptBlog={loadingAcceptBlog}
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

export default ApproveBlogPage;
