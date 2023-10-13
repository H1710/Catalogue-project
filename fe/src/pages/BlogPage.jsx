import { Link } from "react-router-dom";
import PreviewBlog from "../components/blog/PreviewBlog";
import { Pagination } from "@mui/material";

function BlogPage() {
  const blog = {
    content: "",
    createdAt: "2023-10-07T11:39:21.097Z",
    description:
      "  Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable",
    title: "Lorem Ipsum is not simply random text. It has ",
    userId: 1,
  };
  return (
    <div className="col-span-full shadow-lg flex flex-col px-32">
      <Link to="/create-blog" className="flex items-center justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-[120px] rounded-full mb-[10px]">
          Create Blog
        </button>
      </Link>
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <Pagination
        className="h-20 flex items-center justify-end"
        count={10}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default BlogPage;
