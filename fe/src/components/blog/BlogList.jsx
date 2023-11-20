import React from "react";
import PreviewBlog from "./PreviewBlog";

const BlogList = ({
  blogsData,
  isLoading,
  handleNavigateBlogDetail,
  searchText,
  user,
}) => {
  const filterBlogs = () => {
    const search = searchText.toLowerCase();
    return blogsData.filter((blog) =>
      blog.title.toLowerCase().includes(search)
    );
  };

  const displayedBlogs = searchText ? filterBlogs() : blogsData;

  return (
    <div className="flex flex-col gap-4">
      {!isLoading &&
        displayedBlogs.map((blog, index) => (
          <PreviewBlog
            key={index}
            blog={blog}
            author={blog.user.name}
            handleNavigateBlogDetail={handleNavigateBlogDetail}
            user={user}
          />
        ))}
    </div>
  );
};

export default BlogList;
