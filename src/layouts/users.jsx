import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from './../components/usersList';
import User from './../components/user';

const Users = () => {
  const { userId } = useParams();

  return <React.Fragment>{userId ? <User /> : <UsersList />}</React.Fragment>;
};

export default Users;
