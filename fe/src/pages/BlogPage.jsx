import {
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import PreviewBlog from "../components/blog/PreviewBlog";
import { Pagination } from "@mui/material";
import { getAcceptedBlogRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import CustomButton from "../components/common/Button";
import BlogList from "../components/blog/BlogList";
import SearchIcon from "@mui/icons-material/Search";

function BlogPage({}) {
  const [user, setOpenAuthForm] = useOutletContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { data: blogsData, isLoading: loadingBlogData } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => {
      return getAPI(`${getAcceptedBlogRoute}?page=${page}`);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  const handleCreateBlog = useCallback(() => {
    if (!user?.access_token) {
      setOpenAuthForm(true);
    } else {
      navigate("create", {
        state: {
          user: user,
        },
      });
    }
  }, [user]);

  const handleNavigateBlogDetail = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    setSearchText(text);
  };

  const handleChangePage = (e, value) => {
    navigate(`/blog?page=${value}`);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between gap-2 p-4 overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-2">
          <label className="relative">
            <input
              onChange={handleChange}
              className="w-[400px] h-[42px] rounded-md pl-10 border border-gray-300 focus:outline-none focus:border-[#5F3BFF] transition duration-300"
              placeholder="Search..."
            />
            {/* <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon />
          </span> */}
          </label>
          <button
            onClick={handleSearch}
            className="bg-[--bg-button] text-white px-4 py-2 rounded-md ml-2 transition duration-300 hover:bg-[#4D2DB6]"
          >
            Search
          </button>
        </div>
        <div className="w-full flex justify-end">
          <CustomButton
            text={"Create Blog"}
            classContent={
              "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
            }
            handleClick={handleCreateBlog}
          />
        </div>

        {blogsData && (
          <BlogList
            blogsData={blogsData?.data.rows}
            isLoading={loadingBlogData}
            handleNavigateBlogDetail={handleNavigateBlogDetail}
            searchText={searchText}
          />
        )}

        <Pagination
          className="h-20 flex justify-end"
          count={Math.ceil(blogsData?.data.count / 10)}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default BlogPage;
