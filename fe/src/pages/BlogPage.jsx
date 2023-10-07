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
      <div className="border border-gray-500 rounded h-full px-3 py-1 gap-3 grid grid-cols-4">
        <div className="col-start-1 col-span-1 flex items-center">
          {blog.thumbnail && (
            <img
              src={URL.createObjectURL(blog.thumbnail)}
              className="w-[300px] h-[200px] object-contain"
              alt="thumbnail"
            />
          )}
        </div>

        <div className="col-start-2 col-span-4 overflow-hidden">
          <p className="text-4xl w-full h-[40px] font-medium leading-none text-gray-900 break-words inline-block overflow-hidden">
            {blog.title}
          </p>
          <p className="w-full h-[120px] break-words inline-block overflow-hidden text-justify">
            {blog.description}
          </p>
          <p className="h-[10px]">
            <small className="text-muted">
              {new Date(blog.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
