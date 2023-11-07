import React from "react";
import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { getBlogByIdRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import DisplayBlog from "../components/blog/DisplayBlog";

const BlogPageDetail = () => {
  const { blogId } = useParams();
  const [user, setOpenAuthForm] = useOutletContext();

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
    <div className="flex flex-col px-32 h-full">
      {detailsData && (
        <DisplayBlog
          blog={detailsData.data.blog}
          setOpenAuthForm={setOpenAuthForm}
        />
      )}
    </div>
  );
};

export default BlogPageDetail;
