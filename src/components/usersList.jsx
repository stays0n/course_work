import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import api from '../api';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UserTable from './usersTable';
import SearchField from './searchField';

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const pageSize = 4;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  // поиск изера по имени
  const [searchBarValue, setSearchBarValue] = useState('');
  // паттерн для поиска
  const template = new RegExp(`${searchBarValue}`, 'gi');
  useEffect(() => {
    searchBarValue && clearFilter();
    // при обновлении searchBarValue установим текущую страницу на 1ю
    setCurrentPage(1);
  }, [searchBarValue]);

  const handleDelete = (userId) => setUsers(users.filter(({ _id }) => userId !== _id));

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      }),
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, [selectedProf]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchBarValue('');
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleSearchBy = ({ target }) => {
    setSearchBarValue(target.value);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(({ profession: { _id } }) => _id === selectedProf._id)
      : searchBarValue
        ? users.filter(({ name }) => template.test(name))
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className='d-flex'>
        {professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3'>
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className='btn btn-secondary mt-2' onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className='d-flex flex-column'>
          <SearchStatus length={count} />
          <SearchField value={searchBarValue} onSearchBy={handleSearchBy} />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onHandleDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

UsersList.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default UsersList;
