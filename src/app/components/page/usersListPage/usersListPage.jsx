import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { paginate } from './../../../utils/paginate';
import Pagination from './../../common/pagination';
import GroupList from './../../common/groupList';
import SearchStatus from './../../ui/searchStatus';
import UserTable from './../../ui/usersTable';

import { useAuth } from '../../../hooks/useAuth';

import { useSelector } from 'react-redux';
import {
    getProfessions,
    getProfessionsLoadingStatus,
} from '../../../store/professions';
import { getUsersList } from '../../../store/users';

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const pageSize = 4;

    // поиск изера по имени
    const [searchQuery, setSearchQuery] = useState('');

    // const handleDelete = (userId) => {
    //     // setUsers(users.filter(({ _id }) => userId !== _id));
    //     console.log(userId);
    // };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('');
        setSelectedProf(item);
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

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1,
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf),
              )
            : data;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (users) {
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            // onHandleDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
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

UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default UsersListPage;
