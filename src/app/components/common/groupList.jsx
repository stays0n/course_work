import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({ items, selectedItem, valueProperty, contentProperty, onItemSelect }) => {
  // console.log(items);
  const newItems = Array.isArray(items) ? items : Object.values(items);

  return (
    <ul className='list-group'>
      {newItems.map((item) => (
        <li
          key={item[valueProperty]}
          className={'list-group-item' + (item === selectedItem ? ' active' : '')}
          onClick={() => onItemSelect(item)}
          role='button'>
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default GroupList;
