import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import UserPage from './../components/page/userPage/';
import UsersListPage from './../components/page/usersListPage/';
import UserEditPage from '../components/page/userEditPage/';

import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
    const { userId, edit } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <React.Fragment>
            <UsersLoader>
                    {userId ? (
                        edit ? (
                            userId === currentUserId ? (
                                <UserEditPage />
                            ) : (
                                <Redirect to={`/users/${currentUserId}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
            </UsersLoader>
        </React.Fragment>
    );
};

export default Users;
