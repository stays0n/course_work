import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';

import UserEditForm from './../../ui/userEditForm';

const UserEditPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  return <React.Fragment>{user ? <UserEditForm state={user} /> : 'Loading...'}</React.Fragment>;
};

export default UserEditPage;
