import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from './usersList';
import User from './user';

const Users = () => {
  const { userId } = useParams();

  return <React.Fragment>{userId ? <User /> : <UsersList />}</React.Fragment>;
};

export default Users;
