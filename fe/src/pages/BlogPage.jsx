import Header from "../components/Header";
import PreviewBlog from "../components/blog/PreviewBlog";

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
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
    </div>
  );
}

export default BlogPage;
