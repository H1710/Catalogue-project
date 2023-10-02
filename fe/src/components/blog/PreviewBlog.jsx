import React from "react";
import { Link } from "react-router-dom";

const PreviewBlog = ({ blog }) => {
  return (
    <div className="border border-black mb-3" style={{ minWidth: "280px" }}>
      <div className="p-2 gap-2 grid grid-cols-3 h-[160px]">
        <div className="col-start-1 col-span-1">
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === "string" ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    className="w-full h-full"
                    alt="thumbnail"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  className="w-full h-full"
                  alt="thumbnail"
                  style={{ objectFit: "cover" }}
                />
              )}
            </>
          )}
        </div>

        <div className="col-start-2 col-span-2 grid grid-rows-4 overflow-hidden">
          <p className="row-start-1 row-span-1 text-4xl font-medium leading-none text-gray-900 break-words inline-block overflow-hidden">
            {blog.title}
          </p>
          <p className="row-start-2 row-span-2 break-words inline-block overflow-hidden">
            {blog.description}
          </p>
          <p className="row-start-4 row-span-1">
            <small className="text-muted">
              {new Date(blog.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewBlog;
