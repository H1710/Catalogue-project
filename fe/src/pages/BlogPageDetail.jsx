import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBlogByIdRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import DisplayBlog from "../components/blog/DisplayBlog";

const BlogPageDetail = () => {
  const { blogId } = useParams();
  const { data: detailsData, isLoading } = useQuery({
    queryKey: ["blog-detail", blogId],
    queryFn: () => {
      return getAPI(`${getBlogByIdRoute}/${blogId}`);
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
    <div className="col-span-full shadow-lg flex flex-col px-32">
      {detailsData && <DisplayBlog blog={detailsData.data.blog} />}
    </div>
  );
};

export default BlogPageDetail;
