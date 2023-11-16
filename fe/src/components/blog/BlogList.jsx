import React from "react";
import PreviewBlog from "./PreviewBlog";

const BlogList = ({
  blogsData,
  isLoading,
  handleNavigateBlogDetail,
  handleAcceptBlog,
  loadingAcceptBlog,
  searchText, 
}) => {
  const filterBlogs = () => {
    const search = searchText.toLowerCase();
    return blogsData.data.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search)
    );
  };

  const displayedBlogs = searchText ? filterBlogs() : blogsData.data.blogs;

  return (
    <div className="flex flex-col gap-4">
      {!isLoading &&
        displayedBlogs.map((blog, index) => (
          <PreviewBlog
            key={index}
            blog={blog}
            author={blog.user.name}
            handleNavigateBlogDetail={handleNavigateBlogDetail}
            handleAcceptBlog={handleAcceptBlog}
            loadingAcceptBlog={loadingAcceptBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;