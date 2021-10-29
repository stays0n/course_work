import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from './../../../api';

import SelectField from '../../common/form/selectField';
import TextAreaField from '../../common/form/textAreaField';
const initialData = { userId: '', content: '' };

const CommentForm = ({ onSubmit }) => {
  const [fields, setFields] = useState(initialData);
  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    api.users
      .fetchAll()
      .then((users) => users.map((user) => ({ _id: user._id, name: user.name }))) // нужно ли?
      .then((data) => setUsers(data));
  }, []);

  const handleChange = (target) => {
    setFields((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearFields = () => {
    setFields(initialData);
  };

  const handlePost = (e) => {
    e.preventDefault();
    onSubmit(fields);
    clearFields();
  };

  // const arrayOfUsers =
  //   users &&
  //   Object.keys(users).map((userId) => ({
  //     name: users[userId].name,
  //     _id: users[userId]._id,
  //   }));

  return (
    <React.Fragment>
      <form onSubmit={handlePost}>
        <h2>New comment</h2>
        <SelectField
          onChange={handleChange}
          options={users}
          name='userId'
          value={fields.userId}
          defaultOption='Выберите пользователя'
        />
        <TextAreaField
          value={fields.content}
          onChange={handleChange}
          name='content'
          label='Сообщение'
          rows='3'
        />
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-primary'>
            Опубликовать
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default CommentForm;
