import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QualitiesList from './qualitiesList';

const UserInfo = ({ user }) => {
  const { name, profession, qualities, completedMeetings, rate } = user;

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <h2>Профессия: {profession.name}</h2>
      <QualitiesList qualities={qualities} />
      <p>completedMeetings: {completedMeetings}</p>
      <h2>Rate: {rate}</h2>
      <Link to='/users' className='btn btn-primary'>
        Все пользователи
      </Link>
    </React.Fragment>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
