import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import User from './user';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import api from '../api';

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, [selectedProf]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter(({ profession: { _id } }) => _id === selectedProf._id)
    : allUsers;
  const count = filteredUsers.length;
  const users = paginate(filteredUsers, currentPage, pageSize);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

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
        {count > 0 && (
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Имя</th>
                <th scope='col'>Качества</th>
                <th scope='col'>Профессия</th>
                <th scope='col'>Встретился раз</th>
                <th scope='col'>Оценка</th>
                <th scope='col'>Избранное</th>
                <th scope='col'></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <User key={user._id} user={user} {...rest} />
              ))}
            </tbody>
          </table>
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
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
