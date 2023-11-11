import React from "react";
import Tag from "../Tag";
import BlogComment from "./BlogComment";
import { useQuery } from "react-query";
import { getAPI } from "../../utils/FetchData";
import { getBlogByIdRoute } from "../../utils/APIRoute";

const DisplayBlog = ({ blog, setOpenAuthForm }) => {
  return (
    <div className="w-full">
      <h2>{blog.avgRating}</h2>

      <div className="flex flex-col gap-2 flex-grow-2">
        <h2 className="text-xl w-full font-bold text-gray-900 ">
          {blog.title}
        </h2>

        <div className="">
          <small>
            {/* {typeof blog.user !== "string" && `By: ${blog.user.name}`} */}
          </small>

          <small className="">
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </div>
        {blog?.tags && blog.tags.length && blog.tags[0] && (
          <div className="flex gap-2 overflow-hidden h-[30px]">
            {blog.tags.map(
              (tag, index) => tag && <Tag key={index} content={tag.name} />
            )}
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
        {/* <img className="w-[300px]" src={blog.thumbnail} alt={blog.title} /> */}

        {/* {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
        </h5>
      )} */}
      </div>
    </div>
  );
};

export default DisplayBlog;
