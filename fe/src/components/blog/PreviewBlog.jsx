import React from "react";
import { Link } from "react-router-dom";

const PreviewBlog = ({ blog }) => {
  return (
    <div className="h-[326px] py-1 gap-3 flex flex-col px-4">
      <p className="text-2xl w-full font-medium leading-none text-gray-900 break-words inline-block overflow-hidden">
        {blog.title}
      </p>
      <div>
        <p className="h-[10px]">
          <small className="text-muted">
            Posted on {new Date(blog.createdAt).toLocaleString()} by{" "}
            <span className="text-green-300">HoangHuy</span>
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
        <p className="w-full h-[180px] break-words inline-block overflow-hidden text-justify">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default PreviewBlog;
