import React from 'react';
import PropTypes from 'prop-types';

const QualitiesCard = ({ completedMeetings }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body d-flex flex-column justify-content-center text-center'>
        <h5 className='card-title'>
          <span>Completed meetings</span>
        </h5>
        <p className='display-1'>{completedMeetings}</p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  completedMeetings: PropTypes.number,
};

export default QualitiesCard;
