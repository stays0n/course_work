import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

const QualitiesList = ({ qualities }) => {
  return (
    <React.Fragment>
      {qualities.map((item) => (
        <Quality key={item._id} qualitie={item} />
      ))}
    </React.Fragment>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
