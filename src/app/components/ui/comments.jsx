import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import api from '../../api';

import CommentsList, { CommentForm } from './../common/comments/';

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
        return () => {};
    }, []);

    const sortedComments = orderBy(comments, ['created_at'], ['desc']);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
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
