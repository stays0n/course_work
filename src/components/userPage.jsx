import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

import QualitiesList from './qualitiesList';

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);

  return (
    <React.Fragment>
      {
        // eslint-disable-next-line multiline-ternary
        user ? (
          <React.Fragment>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <Link to='/users' className='btn btn-primary'>
              Все пользователи
            </Link>
          </React.Fragment>
        ) : (
          'Loading...'
        )
      }
    </React.Fragment>
  );
};

export default UserPage;
