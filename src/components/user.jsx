import React from 'react';
import Qualitie from './quality';
import BookMark from './bookmark';
import PropTypes from 'prop-types';

const User = ({
  user: { _id, name, qualities, profession, completedMeetings, rate, bookmark },
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
          <BookMark status={bookmark} onClick={onHandleDelete} />
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

User.propTypes = {
  user: PropTypes.object.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
};

export default User;
