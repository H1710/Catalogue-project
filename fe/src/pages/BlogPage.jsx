import { Link, useNavigate } from "react-router-dom";
import PreviewBlog from "../components/blog/PreviewBlog";
import { Button, Pagination, TextField } from "@mui/material";
import { getAllBlogRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { useState } from "react";
import { useQuery } from "react-query";
import SearchIcon from '@mui/icons-material/Search';

function BlogPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => {
      return getAPI(getAllBlogRoute);
    },
    onSuccess: (data) => { },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  }

  return (
    <div className="col-span-full shadow-lg flex flex-col min-h-[80vh] px-32 justify-between">
      <div className="flex items-center justify-center gap-2">
        <label className="relative">
          <input
            onChange={handleChange}
            className="w-[400px] rounded-lg pl-10"
            placeholder="Search..."
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon />
          </span>
        </label>
      </div>
      <div className="flex justify-end">
        <Link
          to="/create-blog"
          className="w-[120px] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4  rounded-md mb-[10px]"
        >
          Create Blog
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {!isLoading &&
          blogsData.data.blogs
            // .filter(blog => blog.title.includes(text))
            .filter((blog) => {
              const title = blog.title.toLowerCase();
              const search = text.toLowerCase();
              return title.includes(search);
            })
            .map((blog, index) => (
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
