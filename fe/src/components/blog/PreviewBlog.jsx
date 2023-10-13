import React from "react";
import { Link } from "react-router-dom";

const PreviewBlog = ({ blog }) => {
  return (
    <div className="h-[306px] py-1 gap-3 flex flex-col px-4 rounded border border-gray-400 mb-[20px]">
      <p className="text-2xl w-full mt-2 font-bold leading-none text-gray-900 break-words inline-block overflow-hidden">
        {blog.title}
      </p>
      <div>
        <p className="h-[10px]">
          <small className="text-muted font-medium">
            Posted on {new Date(blog.createdAt).toLocaleString()} by{" "}
            <span className="text-blue-600 italic">HoangHuy</span>
          </small>
        </p>
      </div>
      <div className="flex items-start mt-6 gap-8">
        {blog.thumbnail ? (
          <img
            src={URL.createObjectURL(blog.thumbnail)}
            className="w-[180px] h-[180px] object-cover"
            alt="thumbnail"
          />
        ) : (
          <img
            src="https://img.freepik.com/free-vector/collection-hand-drawn-blog-elements_23-2147572816.jpg"
            className="w-[180px] h-[180px] object-cover"
            alt="thumbnail"
          />
        )}
        <p className="w-full h-[180px] break-words inline-block overflow-hidden text-justify text-gray-600">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default PreviewBlog;
