import React, { useState } from 'react';
import api from './../api/index';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((item) => item.filter(({ _id }) => userId !== _id));
  };
  const renderPhrase = (number) => {
    if (!number) return <span className='badge bg-danger'>Никто с тобой не тусанёт</span>;

    if (number >= 2 && number <= 4) {
      return <span className='badge bg-primary'>{number} человека тусанут с тобой сегодня</span>;
    }

    return <span className='badge bg-primary'>{number} человек тусанёт с тобой сегодня</span>;
  };

  const usersArray = users.map(({ _id, name, qualities, profession, completedMeetings, rate }) => (
    <tr key={_id}>
      <th scope='row'>{name}</th>
      <td>
        {qualities.map(({ _id, name, color }) => (
          <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
          </span>
        ))}
      </td>
      <td>
        <span key={profession._id}>{profession.name}</span>
      </td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <button className='btn btn-danger' onClick={() => handleDelete(_id)}>
          Удалить
        </button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2>{renderPhrase(users.length)}</h2>
      {users.length ? (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>{usersArray}</tbody>
        </table>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Users;
