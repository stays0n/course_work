import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ value, onSearchBy }) => {
  return <input type='text' placeholder='Search...' value={value} onChange={onSearchBy}></input>;
};

export default SearchField;

SearchField.propTypes = {
  value: PropTypes.string,
  onSearchBy: PropTypes.func,
};
