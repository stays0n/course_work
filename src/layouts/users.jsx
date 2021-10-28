import React from 'react';
import { useParams } from 'react-router-dom';

import UserPage from './../components/page/userPage/';
import UsersListPage from './../components/page/usersListPage/';
import UserEditPage from '../components/page/userEditPage/';

const Users = () => {
  const { userId, edit } = useParams();
  return (
    <React.Fragment>
      {userId && edit
        ? (
          <UserEditPage />
        )
        : userId
          ? (
            <UserPage userId={userId} />
          )
          : (
            <UsersListPage />
          )}
    </React.Fragment>
  );
};

export default Users;
