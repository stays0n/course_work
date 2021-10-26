import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SelectField from '../../common/form/selectField';
import TextAreaField from '../../common/form/textAreaField';

const CommentForm = ({ users, userPageId, addComment }) => {
  const [fields, setFields] = useState({ user: '', post: '' });

  const handleChange = (target) => {
    setFields((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearFields = () => {
    setFields({ user: '', post: '' });
  };

  const handlePost = (e) => {
    e.preventDefault();

    const comment = {
      pageId: userPageId,
      userId: fields.user,
      content: fields.post,
    };

    addComment(comment);
    clearFields();
  };

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <form onSubmit={handlePost}>
          <h2>New comment</h2>
          <SelectField
            name='user'
            value={fields.user}
            onChange={handleChange}
            defaultOption='Выберите пользователя'
            options={users}
          />
          <TextAreaField
            label='Сообщение'
            name='post'
            value={fields.post}
            rows='3'
            onChange={handleChange}
          />
          <div className='d-flex justify-content-end'>
            <button type='submit' className='btn btn-primary'>
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  users: PropTypes.array,
  userPageId: PropTypes.string,
  addComment: PropTypes.func,
};

export default CommentForm;
