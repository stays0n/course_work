import React from 'react';
import PropTypes from 'prop-types';

import formatDate from './../../../utils/formatDate';

const Comment = ({ comment, removeComment }) => {
  // console.log(comment);
  // console.log(name);
  // console.log(comment.author[0].name);

  return (
    <div className='bg-light card-body mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start'>
            <img
              src='https://avatars.dicebear.com/api/avataaars/qweqasdas.svg'
              className='rounded-circle shadow-1-strong me-3'
              alt='avatar'
              width='65'
              height='65'
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1'>
                    {comment.author[0] && comment.author[0].name}
                    <span className='small ms-2'>{formatDate(comment.date)}</span>
                  </p>
                  <button
                    onClick={() => removeComment(comment._id)}
                    className='btn btn-sm text-primary d-flex align-items-center'>
                    <i className='bi bi-x-lg' />
                  </button>
                </div>
                <p className='small mb-0'>{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  removeComment: PropTypes.func,
};

export default Comment;
