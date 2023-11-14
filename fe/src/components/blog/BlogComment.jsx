import React, { useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { commentBlogRoute, getBlogCmtByIdRoute } from "../../utils/APIRoute";
import { getAPI, postAPI } from "../../utils/FetchData";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import LiteQuillEditor from "../textEditor/LiteQuillEditor";
import CustomButton from "../common/Button";
import MinidenticonImg from "../common/MinidenticonImg";

export default function BlogComment({ setOpenAuthForm, blogId, user }) {
  const [body, setBody] = useState("");
  const {
    data: comments,
    isLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comment", blogId],
    queryFn: () => {
      return getAPI(`${getBlogCmtByIdRoute}/${blogId}`);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });

  const { mutate: commentBlog, isLoading: loadingCreate } = useMutation({
    mutationFn: (info) => {
      return postAPI(commentBlogRoute, info);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      setBody("");
      refetchComments();
    },
  });

  console.log(comments);

  const renderCommentTree = (commentList) => {
    return commentList
      .filter((comment) => comment.replyCommentId === null)
      .map((comment) => (
        <div key={comment.id}>
          <div className="flex flex-col gap-2 border border-gray-300 py-3 px-5">
            <div className="flex gap-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  className="w-12 h-12 rounded-[5px] object-cover cursor-pointer"
                />
              ) : (
                <MinidenticonImg
                  username={comment.user.name}
                  className="w-12 rounded-full object-cover cursor-pointer border border-[#ccc]"
                />
              )}
              <div className="flex flex-col gap-1">
                <p className="text-blue-700 font-bold">{comment.user.name}</p>
                <p className="text-gray-500 text-xs">{comment.createdAt}</p>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
            <div className="flex items-center gap-3">
              <ThumbUpOffAltIcon />
              <ThumbDownOffAltIcon />
            </div>
            {renderReplyComments(commentList, comment.id)}
          </div>
        </div>
      ));
  };

  const renderReplyComments = (commentList, parentId) => {
    const replyComments = commentList.filter(
      (comment) => comment.replyCommentId === parentId
    );
    if (replyComments.length === 0) {
      return null;
    }

    return (
      <div className="pl-5 bg-info" style={{ backgroundColor: "lightblue" }}>
        {replyComments.map((comment) => (
          <div key={comment.id} className="border border-gray-300 py-3 px-5">
            <div className="flex items-center gap-3">
              <img
                className="w-[40px]"
                src={comment.user.avatar}
                alt={comment.user.name}
              />
              <div className="flex flex-col gap-1">
                <p className="text-blue-700 font-bold">{comment.user.name}</p>
                <p className="text-gray-500 text-xs">{comment.createdAt}</p>
              </div>
            </div>
            <h1>{comment.content}</h1>
            <div className="flex items-center gap-3">
              <ThumbUpOffAltIcon />
              <ThumbDownOffAltIcon />
            </div>
            {renderReplyComments(commentList, comment.id)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">Comments</h2>

        <div className="">
          <LiteQuillEditor body={body} setBody={setBody} />
          <div className="w-full flex justify-end mt-4">
            <CustomButton
              text={"Comment"}
              classContent={
                "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
              }
              handleClick={() =>
                commentBlog({
                  userId: user.id,
                  blogId,
                  content: body,
                })
              }
              // isLoading={loadingCreate}
            />
          </div>
        </div>

        {!user && (
          <Button
            onClick={() => setOpenAuthForm(true)}
            className="h-[50px] w-full"
            variant="outlined"
          >
            Login to comment
          </Button>
        )}
        <div className="mb-4 flex flex-col gap-4">
          {comments && comments.data.comment ? (
            renderCommentTree(comments.data.comment)
          ) : (
            <p>No comments available</p>
          )}
        </div>
      </div>
    </div>
  );
}
