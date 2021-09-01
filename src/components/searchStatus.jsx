import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (!number) return 'Никто с тобой не тусанёт';
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return number + ' человек тусанёт с тобой сегодня';
    if ([2, 3, 4].indexOf(lastOne) >= 0) return number + ' человека тусанут с тобой сегодня';
    if (lastOne === 1) return number + ' человек тусанёт с тобой сегодня';
    return number + ' человек тусанёт с тобой сегодня';
  };

  return (
    <React.Fragment>
      <h2>
        <span className={'badge bg-' + (length > 0 ? 'primary' : 'danger')}>
          {renderPhrase(length)}
        </span>
      </h2>
    </React.Fragment>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
