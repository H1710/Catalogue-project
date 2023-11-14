import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getBlogByUserId } from "../utils/APIRoute";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import BlogList from "../components/blog/BlogList";
import PreviewBlog from "../components/blog/PreviewBlog";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
    const user = useSelector((state) => state.auth.auth);
    const navigate = useNavigate();
    // console.log("user: ",user);
    const { data: userBlogList, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => {
            return getAPI(`${getBlogByUserId}/${user.id}`);
        },
        onSuccess: (data) => { },
        onError: (error) => {
            // toast.error(error.response.data.message, toastOptions);
        },
        // enabled: logged,
    });
    console.log("user blog list: ", userBlogList);
    
      const handleNavigateBlogDetail = (blogId) => {
        navigate(`/blog/${blogId}`);
      };
    return (
        <div className=" w-full flex flex-col justify-between gap-2 p-4">
            <div className="flex flex-col gap-4">
                {!isLoading &&
                    userBlogList.data.blog.map((blog, index) => (
                        <PreviewBlog
                            key={index}
                            blog={blog}
                            handleNavigateBlogDetail={handleNavigateBlogDetail}
                            // handleAcceptBlog={handleAcceptBlog}
                            // loadingAcceptBlog={loadingAcceptBlog}
                        />
                    ))}
            </div>
            </div>
        
    )
}

export default MyBlog;