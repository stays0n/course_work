import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
// import Pagination from './components/pagination';
import api from './api/index';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => setUsers(users.filter(({ _id }) => userId !== _id));

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) return { ...user, status: user.status ? false : true };
        return user;
      }),
    );
  };

  return (
    <React.Fragment>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onHandleDelete={handleDelete}
        onHandleToggleBookMark={handleToggleBookMark}
      />
      {/* <Pagination /> */}
    </React.Fragment>
  );
};

export default App;
