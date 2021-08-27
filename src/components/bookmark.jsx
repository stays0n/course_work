import React from 'react';

const BookMark = ({ status, onHandleToggleBookMark, id }) => {
  return (
    <button onClick={() => onHandleToggleBookMark(id)}>
      <i className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>
    </button>
  );
};

export default BookMark;
