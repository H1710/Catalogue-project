import { Link, useNavigate } from "react-router-dom";
import PreviewBlog from "../components/blog/PreviewBlog";
import { Pagination } from "@mui/material";
import { getAllBlogRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { useState } from "react";
import { useQuery } from "react-query";

function BlogPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => {
      return getAPI(getAllBlogRoute);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  return (

    <div className="col-span-full shadow-lg flex flex-col min-h-[80vh] px-32 justify-between">

      <div className="flex justify-end">
        <Link
          to="/create-blog"
          className="w-[120px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-md mb-[10px]"
        >
          Create Blog
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {!isLoading &&
          blogsData.data.blogs.map((blog, index) => (
            <div
              className="cursor-pointer"
              onClick={() => navigate(`${blog.id}`)}
              key={index}
            >
              <PreviewBlog blog={blog} />
            </div>
          ))}
      </div>
      <Pagination
        className="h-20 flex justify-end"
        count={10}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default BlogPage;
