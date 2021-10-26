import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './../../../api';

import UserCard from './../userPage/userCard';
import QualitiesCard from './../userPage/qualitiesCard';
import MeetingsCard from './../userPage/meetingsCard';
import CommentForm from './../userPage/сommentForm';
import CommentsList from './../userPage/commentsList';

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user) {
      api.users.getById(userId).then((user) => setUser(user));
    }
    if (users.length === 0) {
      api.users
        .fetchAll()
        .then((users) => users.map((user) => ({ _id: user._id, name: user.name })))
        .then((data) => setUsers(data));
    }
    if (comments.length === 0) {
      api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }
  }, []);

  const addComment = (comment) => {
    api.comments.add(comment);
    api.comments.fetchCommentsForUser(user._id).then((data) => setComments(data));
  };

  const removeComment = (comment) => {
    api.comments.remove(comment);
    api.comments.fetchCommentsForUser(user._id).then((data) => setComments(data));
  };

  return (
    <React.Fragment>
      {
        // eslint-disable-next-line multiline-ternary
        user ? (
          <div className='container'>
            <div className='row gutters-sm'>
              <div className='col-md-4 mb-3'>
                <Link to='/users' className='btn btn-primary mb-3 w-100'>
                  Все пользователи
                </Link>
                <UserCard
                  id={user._id}
                  name={user.name}
                  profession={user.profession.name}
                  rate={user.rate}
                />
                <QualitiesCard qualities={user.qualities} />
                <MeetingsCard completedMeetings={user.completedMeetings} />
              </div>

              <div className='col-md-8'>
                <CommentForm users={users} userPageId={userId} addComment={addComment} />
                {users.length > 0 && comments.length > 0 && (
                  <CommentsList users={users} comments={comments} removeComment={removeComment} />
                )}
              </div>
            </div>
          </div>
        ) : (
          'Loading...'
        )
      }
    </React.Fragment>
  );
};

export default UserPage;
