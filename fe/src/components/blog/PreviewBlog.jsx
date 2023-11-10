import React from "react";
import Tag from "../Tag";
import CustomButton from "../common/Button";

const PreviewBlog = ({
  blog,
  handleAcceptBlog,
  handleNavigateBlogDetail,
  author,
  loadingAcceptBlog,
}) => {
  return (
    <div className=" py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input]">
      <p
        onClick={() => handleNavigateBlogDetail(blog.id)}
        className="text-xl w-full font-semibold py-[3px] leading-none text-[--primary-text] break-words overflow-hidden cursor-pointer"
        s
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

        <p className="w-full text-sm break-words inline-block overflow-hidden text-justify text-[--primary-text]">
          {blog.description}
        </p>
      </div>
      {blog?.status === "Processing" && (
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
          />
        </div>
      )}
    </div>
  );
};

export default PreviewBlog;
