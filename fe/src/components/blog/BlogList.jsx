import React from "react";
import PreviewBlog from "./PreviewBlog";

const BlogList = ({
  blogsData,
  isLoading,
  handleNavigateBlogDetail,
  handleAcceptBlog,
  loadingAcceptBlog,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {!isLoading &&
        blogsData.data.blogs.map((blog, index) => (
          <PreviewBlog
            key={index}
            blog={blog}
            handleNavigateBlogDetail={handleNavigateBlogDetail}
            handleAcceptBlog={handleAcceptBlog}
            loadingAcceptBlog={loadingAcceptBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;
