import React, { useState } from 'react';
import { Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBlogCmtByIdRoute } from '../../utils/APIRoute';
import { getAPI } from '../../utils/FetchData';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import LoginForm from '../LoginForm';

export default function BlogComment() {
    const [loginForm, setLoginForm] = useState(false);
    const { blogId } = useParams();
    const { data: comments, isLoading } = useQuery({
        queryKey: ["comment", blogId],
        queryFn: () => {
            return getAPI(`${getBlogCmtByIdRoute}/${blogId}`);
        },
        onSuccess: (data) => {
            console.log(1111111111111111111111111111111111111);
            console.log({ comments });
        },
        onError: (error) => {
            // toast.error(error.response.data.message, toastOptions);
        },
    });

    const renderCommentTree = (commentList) => {
        return commentList
            .filter((comment) => comment.replyCommentId === null)
            .map((comment) => (
                <div key={comment.id}>
                    <div className='border border-gray-300 py-3 px-5'>
                        <div className='flex items-center gap-3'>
                            <img className='w-[40px]' src={comment.user.avatar} alt={comment.user.name} />
                            <div className='flex flex-col gap-1'>
                                <p className='text-blue-700 font-bold'>{comment.user.name}</p>
                                <p className='text-gray-500 text-xs'>{comment.createdAt}</p>
                            </div>
                        </div>
                        <h1>{comment.content}</h1>
                        <div className='flex items-center gap-3'>
                            <ThumbUpOffAltIcon />
                            <ThumbDownOffAltIcon />
                        </div>
                        {renderReplyComments(commentList, comment.id)}
                    </div>
                </div>
            ));
    };

    const renderReplyComments = (commentList, parentId) => {
        const replyComments = commentList.filter((comment) => comment.replyCommentId === parentId);
        if (replyComments.length === 0) {
            return null;
        }

        return (
            <div className='pl-5 bg-info' style={{ backgroundColor: 'lightblue' }}>
                {replyComments.map((comment) => (
                    <div key={comment.id} className='border border-gray-300 py-3 px-5'>
                        <div className='flex items-center gap-3'>
                            <img className='w-[40px]' src={comment.user.avatar} alt={comment.user.name} />
                            <div className='flex flex-col gap-1'>
                                <p className='text-blue-700 font-bold'>{comment.user.name}</p>
                                <p className='text-gray-500 text-xs'>{comment.createdAt}</p>
                            </div>
                        </div>
                        <h1>{comment.content}</h1>
                        <div className='flex items-center gap-3'>
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
            <div className='flex flex-col gap-3'>
                <h2 className="text-2xl font-bold">Comments</h2>
                <Button onClick={() => setLoginForm(true)} className="h-[50px] w-full" variant="outlined">
                    Login to comment
                </Button>
                {comments && comments.data.comment ? (
                    renderCommentTree(comments.data.comment)
                ) : (
                    <p>No comments available</p>
                )}
            </div>
            <LoginForm openLogin={loginForm} setOpenLogin={setLoginForm} />
        </div>
    );
}
