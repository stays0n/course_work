import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({
  user: { _id, name, qualities, profession, completedMeetings, rate, status },
  onHandleDelete,
  ...rest
}) => {
  return (
    <React.Fragment>
      <tr key={_id}>
        <th scope='row'>{name}</th>
        <td>
          {qualities.map((item) => (
            <Qualitie key={item._id} qualitie={item} />
          ))}
        </td>
        <td>
          <span key={profession._id}>{profession.name}</span>
        </td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
        <td>
          <BookMark status={status} id={_id} {...rest} />
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => onHandleDelete(_id)}>
            Удалить
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default User;
