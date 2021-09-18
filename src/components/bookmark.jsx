import React from 'react';
import PropTypes from 'prop-types';

// const BookMark = ({ bookmark, onHandleToggleBookMark, id }) => {
//   return (
//     <button onClick={() => onHandleToggleBookMark(id)}>
//       <i className={bookmark ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>
//     </button>
//   );
// };

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool,
};

export default BookMark;
