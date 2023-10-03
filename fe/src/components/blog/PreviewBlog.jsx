import React from "react";
import { Link } from "react-router-dom";

const PreviewBlog = ({ blog }) => {
  return (
    <div className="border border-gray-500 rounded h-[210px] p-2 gap-2 grid grid-cols-4">
      <div className="col-start-1 col-span-1">
        {blog.thumbnail && (
          <img
            src={URL.createObjectURL(blog.thumbnail)}
            className="w-full h-full max-h-[190px] object-cover"
            alt="thumbnail"
          />
        )}
      </div>

      <div className="col-start-2 col-span-4 overflow-hidden">
        <p className="text-4xl w-full h-[40px] font-medium leading-none text-gray-900 break-words inline-block overflow-hidden">
          {blog.title}
        </p>
        <p className="w-full h-[118px] break-words inline-block overflow-hidden">
          {blog.description}
        </p>
        <p className="h-[10px]">
          <small className="text-muted">
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default PreviewBlog;
