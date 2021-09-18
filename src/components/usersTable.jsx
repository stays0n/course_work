import React from 'react';
import PropTypes from 'prop-types';
// import TableHeader from './tableHeader';
// import TableBody from './tableBody';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onHandleDelete, ...rest }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)} />
      ),
    },
    delete: {
      component: (user) => (
        <button className='btn btn-danger' onClick={() => onHandleDelete(user._id)}>
          Удалить
        </button>
      ),
    },
  };

  return (
    <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
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
