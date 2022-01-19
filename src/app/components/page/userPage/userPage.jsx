import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserCard from './../../ui/userCard';
import QualitiesCard from './../../ui/qualitiesCard';
import MeetingsCard from './../../ui/meetingsCard';
import Comments from './../../ui/comments';

import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers();
    const user = getUserById(userId);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <Link
                            to="/users"
                            className="btn btn-primary mb-3 w-100"
                        >
                            Все пользователи
                        </Link>
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>

                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
