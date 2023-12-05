import React, { useCallback } from "react";
import Tag from "../Tag";
import CustomButton from "../common/Button";
import { acceptBlogRoute, cancelBlogRoute } from "../../utils/APIRoute";
import { useMutation, useQueryClient } from "react-query";
import { patchAPI } from "../../utils/FetchData";
import { toast } from "react-toastify";

const PreviewBlog = ({ blog, handleNavigateBlogDetail, author, user }) => {
  const queryClient = useQueryClient();
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const { mutate: acceptBlog, isLoading: loadingAcceptBlog } = useMutation({
    mutationFn: (info) => {
      return patchAPI(acceptBlogRoute, info, user.access_token);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["processing_blogs"]);
      // toast.success(data.data.message, toastOptions);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { mutate: rejectBlog, isLoading: loadingRejectBlog } = useMutation({
    mutationFn: (info) => {
      return patchAPI(cancelBlogRoute, info, user.access_token);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["processing_blogs"]);
      // toast.success(data.data.message, toastOptions);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });
  const handleAcceptBlog = useCallback((blogId) => {
    acceptBlog({ blogId });
  }, []);
  const handleRejectBlog = useCallback((blogId) => {
    rejectBlog({ blogId });
  }, []);
  return (
    <div className="w-full py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input]">
      <p
        onClick={() => handleNavigateBlogDetail(blog.id)}
        className="text-xl font-semibold py-[3px] leading-none text-[--primary-text] break-words overflow-hidden cursor-pointer"
      >
        {blog.title}
      </p>
      <div>
        <small className="font-medium text-[--primary-text]">
          Posted on {new Date(blog.createdAt).toLocaleString()} by{" "}
          <span className="text-blue-600 italic">{author}</span>
        </small>
      </div>
      {blog?.tags &&
        blog.tags[0] &&
        (typeof blog.thumbnail === "string" ? (
          <div className="flex gap-2 overflow-hidden h-[30px] text-[--primary-text]">
            {blog.tags.map((tag, index) => tag && <Tag content={tag.name} />)}
          </div>
        ) : (
          <div className="flex gap-2 overflow-hidden h-[30px] text-[--primary-text]">
            {blog.tags.map((tag, index) => tag && <Tag content={tag} />)}
          </div>
        ))}

      <div className="flex items-start gap-8">
        {blog.thumbnail &&
          (typeof blog.thumbnail === "string" ? (
            <img
              src={blog.thumbnail}
              className="w-[180px] h-[180px] object-cover"
              alt="thumbnail"
            />
          ) : (
            <img
              src={URL.createObjectURL(blog.thumbnail)}
              className="w-[180px] h-[180px] object-cover"
              alt="thumbnail"
            />
          ))}

        <p className=" text-sm break-words inline-block overflow-hidden text-justify text-[--primary-text]">
          {blog.description}
        </p>
      </div>
      {blog?.status === "Processing" && user?.role?.name === "Admin" && (
        <div className="w-full flex justify-end gap-2">
          <CustomButton
            text={"Accept"}
            classContent={
              "bg-[--bg-button-success] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-success-hover]"
            }
            handleClick={() => handleAcceptBlog(blog.id)}
            isLoading={loadingAcceptBlog}
          />
          <CustomButton
            text={"Reject"}
            classContent={
              "bg-[--bg-button-danger] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-danger-hover]"
            }
            handleClick={() => handleRejectBlog(blog.id)}
            isLoading={loadingRejectBlog}
          />
        </div>
      )}
    </div>
  );
};

export default PreviewBlog;
