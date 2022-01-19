import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import UserPage from './../components/page/userPage/';
import UsersListPage from './../components/page/usersListPage/';
import UserEditPage from '../components/page/userEditPage/';
import { UserProvider } from '../hooks/useUsers';
import { ProfessionProvider } from '../hooks/useProfession';

import { useAuth } from '../hooks/useAuth';

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();

    return (
        <React.Fragment>
            <UserProvider>
                <ProfessionProvider>
                    {userId ? (
                        edit ? (
                            userId === currentUser._id ? (
                                <UserEditPage />
                            ) : (
                                <Redirect
                                    to={`/users/${currentUser._id}/edit`}
                                />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </ProfessionProvider>
            </UserProvider>
        </React.Fragment>
    );
};

export default Users;
