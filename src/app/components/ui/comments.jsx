import React from 'react';
import { orderBy } from 'lodash';
import CommentsList, { CommentForm } from './../common/comments/';

import { useComments } from '../../hooks/useComments';

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const sortedComments = orderBy(comments, ['created_at'], ['desc']);

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
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
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Comments;
