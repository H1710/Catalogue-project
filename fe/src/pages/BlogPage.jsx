import Header from "../components/Header";
import PreviewBlog from "../components/blog/PreviewBlog";

function BlogPage() {
  const blog = {
    content: "",
    createdAt: "2023-10-07T11:39:21.097Z",
    description:
      " Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. ",
    title:
      " has Contrary s ssssssssssto psssssssssssssssssssssopular belief, Lorem Ipsum is not simply random text. It has ",
    userId: 1,
  };
  return (
    <div className="mx-32 col-span-full shadow-lg mt-8 flex flex-col gap-12">
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
      <PreviewBlog blog={blog} />
    </div>
  );
}

export default BlogPage;
