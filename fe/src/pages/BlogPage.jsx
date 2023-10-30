import { Link, useNavigate } from "react-router-dom";
import PreviewBlog from "../components/blog/PreviewBlog";
import { Button, Pagination, TextField } from "@mui/material";
import { getAllBlogRoute, searchAllBlogRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SearchIcon from '@mui/icons-material/Search';

function BlogPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [blogs, setBlogs] = useState([]);
  const [text, setText] = useState('');
  const [filterBlog, setFilterBlog] = useState([]);
  const [isSearch, setIsSearch]= useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSearch = () => {
    if (text.trim() !== '') {
      // Thay đổi URL để sử dụng searchAllBlogRoute và thêm tham số search
      const search = encodeURIComponent(text); // Đảm bảo chuỗi tìm kiếm an toàn cho URL
      const url = `${searchAllBlogRoute}?page=${page}&sort=desc&search=${search}`;
      window.history.pushState({}, null, `?page=${page}&search=${search}`);
      // Gọi API tìm kiếm và cập nhật trạng thái sau khi hoàn thành
      getAPI(url)
        .then((response) => {
          const data = response.data;
          setFilterBlog(data.blogs);
          setTotalPages(data.totalPages);
          console.log("total page", data.totalPages);
          setPage(1); // Đặt lại trang về 1 sau khi thực hiện tìm kiếm.
          setIsSearch(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Nếu không có chuỗi tìm kiếm, sử dụng URL ban đầu để truy vấn
      fetchBlogs(page);
    }
  }
  


  const fetchBlogs = async (pageNumber) => {
    try {
      const response = await getAPI(`${getAllBlogRoute}?page=${pageNumber}&sort=desc`);
      const data = response.data;
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs(page); 
  }, [page]);

  // const handlePageChange = (event, value) => {
  //   setPage(value); 
  // };

  const handlePageChange = (event, value) => {
    setPage(value); 
    if (isSearch) {
      // Nếu đang ở trạng thái tìm kiếm, lấy trang tiếp theo của kết quả tìm kiếm
      const search = encodeURIComponent(text);
      const url = `${searchAllBlogRoute}?page=${value}&sort=desc&search=${search}`;
      getAPI(url)
        .then((response) => {
          const data = response.data;
          setFilterBlog(data.blogs);
          setTotalPages(data.totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Nếu không ở trạng thái tìm kiếm, lấy trang tiếp theo của tất cả các bài viết
      fetchBlogs(value);
    }
  };

  let url = `${getAllBlogRoute}?page=${page}&sort=desc`;
  console.log(url);
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => {
      return getAPI(`${getAllBlogRoute}?page=${page}&sort=desc`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  return (
    <div className="col-span-full shadow-lg flex flex-col min-h-[80vh] px-32 justify-between mt-4">
      <div className="flex items-center justify-center gap-2">
        <label className="relative">
          <input
            onChange={handleChange}
            className="w-[400px] rounded-lg pl-10"
            placeholder="Search..."
          />
          <span className="absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none">
            <SearchIcon />
          </span>
        </label>
          <Button onClick={handleSearch} variant="contained">Search</Button>
      </div>
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
          (isSearch ? filterBlog : blogsData.data.blogs).map((blog, index) => (
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
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default BlogPage;