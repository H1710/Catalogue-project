import React from "react";
import Tag from "../Tag";

const DisplayBlog = ({ blog }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl w-full font-bold text-gray-900 ">{blog.title}</h2>

      <div className="">
        <small>
          {/* {typeof blog.user !== "string" && `By: ${blog.user.name}`} */}
        </small>

        <small className="">{new Date(blog.createdAt).toLocaleString()}</small>
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

      <hr className="my-1" />

      {/* {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
        </h5>
      )} */}
    </div>
  );
};

export default DisplayBlog;
