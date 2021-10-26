import React from 'react';
import PropTypes from 'prop-types';

import Comment from './comment';

const CommentsList = ({ users, comments, removeComment }) => {
  if (Object.keys(comments).length === 0) return null;

  const [formatedCommets, setFormatedComments] = React.useState({});
  React.useEffect(() => {
    const findUserById = (userId) => users.filter((user) => user._id === userId);

    const formatedCommets = comments.map((comment) => ({
      author: findUserById(comment.userId),
      date: comment.created_at,
      _id: comment._id,
      content: comment.content,
    }));

    const sortedComments = formatedCommets.sort((a, b) => b.date - a.date);

    setFormatedComments(sortedComments);
  }, [comments]);

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h2>Comments</h2>
        <hr />
        {Object.keys(formatedCommets).map((comment) => (
          <Comment
            key={formatedCommets[comment]._id}
            comment={formatedCommets[comment]}
            removeComment={removeComment}
          />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  users: PropTypes.array,
  comments: PropTypes.array,
  removeComment: PropTypes.func,
};

export default CommentsList;
