import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import CommentsList, { CommentForm } from './../common/comments/';

import { useDispatch, useSelector } from 'react-redux';
import {
    getCommentsLoadingStatus,
    loadCommentsList,
    getComments,
    createComment,
    removeComment,
} from '../../store/comments';
import { getCurrentUserId } from '../../store/users';

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const sortedComments = orderBy(comments, ['created_at'], ['desc']);

    const handleSubmit = (content) => {
        dispatch(
            createComment({
                ...content,
                pageId: userId,
                userId: currentUserId,
            }),
        );
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    return (
        <React.Fragment>
            <div className="card mb-3">
                <div className="card-body">
                    <CommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            'Loading...'
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Comments;
