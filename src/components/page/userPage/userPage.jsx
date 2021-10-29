import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './../../../api';

import UserCard from './../../ui/userCard';
import QualitiesCard from './../../ui/qualitiesCard';
import MeetingsCard from './../../ui/meetingsCard';
import Comments from './../../ui/comments';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
    // if (users.length === 0) {
    //   api.users
    //     .fetchAll()
    //     .then((users) => users.map((user) => ({ _id: user._id, name: user.name })))
    //     .then((data) => setUsers(data));
    // }
    // if (comments.length === 0) {
    //   api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    // }
  }, []);

  // const addComment = (comment) => {
  //   api.comments.add(comment);
  //   api.comments.fetchCommentsForUser(user._id).then((data) => setComments(data));
  // };

  // const removeComment = (comment) => {
  //   api.comments.remove(comment);
  //   api.comments.fetchCommentsForUser(user._id).then((data) => setComments(data));
  // };

  if (user) {
    return (
      <div className='container'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <Link to='/users' className='btn btn-primary mb-3 w-100'>
              Все пользователи
            </Link>
            <UserCard name={user.name} profession={user.profession.name} rate={user.rate} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className='col-md-8'>
            <Comments />
            {/* <CommentForm users={users} userPageId={userId} addComment={addComment} />
            {users.length > 0 && comments.length > 0 && (
              <CommentsList users={users} comments={comments} removeComment={removeComment} />
            )} */}
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string,
};

export default UserPage;
