import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getBlogByUserId } from "../utils/APIRoute";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import PreviewBlog from "../components/blog/PreviewBlog";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MyBlog = () => {
  const [user] = useOutletContext();
  const navigate = useNavigate();
  const { data: userBlogList, isLoading } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => {
      return getAPI(`${getBlogByUserId}/${user?.id}`, user?.access_token);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    // enabled: logged,
  });

  const handleNavigateBlogDetail = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className=" w-full flex flex-col justify-between gap-2 p-4">
      <div className="flex flex-col gap-4">
        {!isLoading &&
          userBlogList &&
          userBlogList.data.blog.map((blog, index) => (
            <PreviewBlog
              key={index}
              blog={blog}
              handleNavigateBlogDetail={handleNavigateBlogDetail}
              author={blog.user.name}
              // handleAcceptBlog={handleAcceptBlog}
              // loadingAcceptBlog={loadingAcceptBlog}
            />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBlog;
