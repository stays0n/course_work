import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookMark from './../common/bookmark';
import Qualities from './qualities';
import Table from './../common/table/';
import Profession from './profession';

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onHandleDelete,
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: 'Качества',
            component: (user) => <Qualities qualities={user.qualities} />,
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />,
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился раз',
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            ),
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onHandleDelete(user._id)}
                >
                    Удалить
                </button>
            ),
        },
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
        // <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
        //   <TableHeader {...{ onSort, selectedSort, columns }} />
        //   <TableBody {...{ columns, data: users }} />
        // </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
};

export default UserTable;
