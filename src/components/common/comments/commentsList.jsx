import React from 'react';
import PropTypes from 'prop-types';

import Comment from './comment';

const CommentsList = ({ comments, onRemove }) => {
  return (
    <React.Fragment>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
      ))}
    </React.Fragment>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
};

export default CommentsList;
