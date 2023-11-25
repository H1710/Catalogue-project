import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getBlogByUserId } from "../utils/APIRoute";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import PreviewBlog from "../components/blog/PreviewBlog";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../components/common/Button";

const MyBlog = () => {
  const [user] = useOutletContext();
  const navigate = useNavigate();
  const { data: userBlogList, isLoading } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => {
      return getAPI(`${getBlogByUserId}/${user?.id}`, user?.access_token);
    },
    onSuccess: (data) => {
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    // enabled: logged,
  });

  const handleNavigateBlogDetail = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className=" w-full flex flex-col   gap-2 p-4 items-center">
      <div className="flex flex-col gap-4 items-center justify-start ">
      <CustomButton classContent="py-4 px-8 bg-green-600 w-[200px] rounded  text-white " text={'Accepted Blog'}/>
        {!isLoading &&
          userBlogList &&
          userBlogList.data.blog.filter(blog => blog.status === 'Accepted')
            .map((blog, index) => (
                <PreviewBlog
                  key={index}
                  blog={blog}
                  handleNavigateBlogDetail={handleNavigateBlogDetail}
                  author={blog.user.name}
                  user={user}
                  // handleAcceptBlog={handleAcceptBlog}
                  // loadingAcceptBlog={loadingAcceptBlog}
                />
              ))

          
          }
      </div>
      <div className="flex flex-col gap-4 items-center justify-start ">
        <CustomButton classContent="py-4 px-8 bg-yellow-600  rounded    text-white " text={'Processing Blog'}/>
        {!isLoading &&
          userBlogList &&
          userBlogList.data.blog.filter(blog => blog.status === 'Processing')
          .map((blog, index) => (
                <PreviewBlog
                  key={index}
                  blog={blog}
                  handleNavigateBlogDetail={handleNavigateBlogDetail}
                  author={blog.user.name}
                  user={user}
                  // handleAcceptBlog={handleAcceptBlog}
                  // loadingAcceptBlog={loadingAcceptBlog}
                />
              ))

          }
      </div>
      <div className="flex flex-col gap-4 items-center justify-start ">
      <CustomButton classContent="py-4 px-8 bg-rose-600 w-[200px] rounded   text-white " text={'Cancelled Blog'}/>
        {!isLoading &&
          userBlogList &&
          userBlogList.data.blog.filter(blog => blog.status === 'Cancelled')
          .map((blog, index) => (
                <PreviewBlog
                  key={index}
                  blog={blog}
                  handleNavigateBlogDetail={handleNavigateBlogDetail}
                  author={blog.user.name}
                  user={user}
                  // handleAcceptBlog={handleAcceptBlog}
                  // loadingAcceptBlog={loadingAcceptBlog}
                />
              ))

          }
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBlog;
