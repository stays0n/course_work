import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const UserCard = ({ name, profession, rate }) => {
  const history = useHistory();
  const [src, setSrc] = useState('');

  useEffect(() => {
    const getSrc = () => {
      const rand = (Math.random() + 1).toString(36).substring(7);
      setSrc('https://avatars.dicebear.com/api/avataaars/' + rand + '.svg');
    };

    !src && getSrc();
  }, [src]);

  const handleClick = () => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <button
          className='position-absolute top-0 end-0 btn btn-light btn-sm'
          onClick={handleClick}>
          <i className='bi bi-gear' />
        </button>
        <div className='d-flex flex-column align-items-center text-center position-relative'>
          <img src={src} className='rounded-circle shadow-1-strong me-3' alt='avatar' width='150' />
          <div className='mt-3'>
            <h4>{name}</h4>
            <p className='text-secondary mb-1'>{profession}</p>
            <div>
              <i className=' bi bi-caret-down-fill text-primary' role='button' />
              <i className=' bi bi-caret-up text-secondary' role='button' />
              <span className='ms-2'>{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
  rate: PropTypes.number,
};

export default UserCard;
