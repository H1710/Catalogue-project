import Header from "../components/Header";

function BlogPage() {
  const blog = {
    content: "",
    createdAt: "2023-10-07T11:39:21.097Z",
    description: "asdjjansldb assadl bas asd ",
    title: "hhh",
    userId: 1,
  };
  return (
    <div>
      <div className="border border-gray-500 rounded h-[400px] px-3 py-1 gap-3 flex flex-col">
        <p className="text-4xl w-full h-[70px] font-medium leading-none text-gray-900 break-words inline-block overflow-hidden">
          {blog.title}
        </p>
        <div>
          <p className="h-[10px]">
            <small className="text-muted">
              Posted on {new Date(blog.createdAt).toLocaleString()} by{" "}
              <span className="text-green-300">HoangHuy</span>
            </small>
          </p>
        </div>
        <div className="flex items-start gap-4 mt-4">
          {blog.thumbnail && (
            <img
              src={URL.createObjectURL(blog.thumbnail)}
              className="w-[240px] h-[240px] object-cover"
              alt="thumbnail"
            />
          )}
          <p className="w-full h-[240px] break-words inline-block overflow-hidden text-justify">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
