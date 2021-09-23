import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import UserInfo from './userInfo';

const User = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);

  return <React.Fragment>{user ? <UserInfo user={user} /> : 'Loading...'} </React.Fragment>;
};

export default User;
