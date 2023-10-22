import React from "react";
import Tag from "../Tag";

const PreviewBlog = ({ blog }) => {
  console.log(blog);
  return (
    <div className=" py-2 gap-3 flex flex-col px-4 rounded border border-gray-400">
      <p className="text-xl w-full font-bold py-[3px] leading-none text-gray-900 break-words overflow-hidden">
        {blog.title}
      </p>
      <div>
        <small className="text-muted font-medium">
          Posted on {new Date(blog.createdAt).toLocaleString()} by{" "}
          <span className="text-blue-600 italic">HoangHuy</span>
        </small>
      </div>
      {blog?.tags &&
        blog.tags.length &&
        blog.tags[0] &&
        (typeof blog.thumbnail === "string" ? (
          <div className="flex gap-2 overflow-hidden h-[30px]">
            {blog.tags.map((tag, index) => tag && <Tag content={tag.name} />)}
          </div>
        ) : (
          <div className="flex gap-2 overflow-hidden h-[30px]">
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
        <p className="w-full break-words inline-block overflow-hidden text-justify text-gray-600">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default PreviewBlog;
