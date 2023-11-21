import React, { useState } from "react";
import CustomButton from "../common/Button";
import LiteQuillEditor from "../textEditor/LiteQuillEditor";
import {
  commentTemplateRoute,
  getTemplateCommentRoute,
} from "../../utils/APIRoute";
import { useMutation, useQuery } from "react-query";
import { getAPI, postAPI } from "../../utils/FetchData";
import { Button } from "@mui/material";
import MinidenticonImg from "../common/MinidenticonImg";
import { formatDate } from "../../utils/FormatDate";
const CommentPreview = ({ user, templateId, setOpenAuthForm }) => {
  const [body, setBody] = useState();
  const {
    data: comments,
    isLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comment", templateId],
    queryFn: () => {
      return getAPI(`${getTemplateCommentRoute}/${templateId}`);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });

  const { mutate: commentTemplate, isLoading: loadingCreateComment } =
    useMutation({
      mutationFn: (info) => {
        return postAPI(commentTemplateRoute, info);
      },
      onError: (error) => {
        // toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: (data) => {
        setBody("");
        refetchComments();
      },
    });

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
                  username={comment.user.email}
                  className="w-12 rounded-full object-cover cursor-pointer border border-[#ccc]"
                />
              )}
              <div className="flex flex-col gap-1">
                <p className="text-blue-700 font-bold">{comment.user.name}</p>
                <p className="text-gray-500 text-xs">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
            {/* <div className="flex items-center gap-3">
                <ThumbUpOffAltIcon className="w-2 h-2" />
                <ThumbDownOffAltIcon />
              </div> */}
            {/* {renderReplyComments(commentList, comment.id)} */}
          </div>
        </div>
      ));
  };
  return (
    <>
      {!user?.access_token ? (
        <Button
          onClick={() => setOpenAuthForm(true)}
          className="h-[50px] w-full"
          variant="outlined"
        >
          Login to comment
        </Button>
      ) : (
        <div className="">
          <LiteQuillEditor body={body} setBody={setBody} />
          <div className="w-full flex justify-end mt-4">
            <CustomButton
              text={"Comment"}
              classContent={
                "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
              }
              handleClick={() =>
                commentTemplate({
                  userId: user.id,
                  templateId,
                  content: body,
                })
              }
              isLoading={loadingCreateComment}
            />
          </div>
        </div>
      )}
      <div className="my-4 flex flex-col gap-4">
        {comments && comments?.data.comment ? (
          renderCommentTree(comments.data.comment)
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </>
  );
};

export default CommentPreview;
