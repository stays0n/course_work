import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import UserPage from './../components/page/userPage/';
import UsersListPage from './../components/page/usersListPage/';
import UserEditPage from '../components/page/userEditPage/';
import { UserProvider } from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

import { useSelector, useDispatch } from 'react-redux';
import { getDataStatus, loadUsersList } from '../store/users';

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);
    console.log(dataStatus);
    if (!dataStatus) return 'Loading...';

    return (
        <React.Fragment>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserEditPage />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </React.Fragment>
    );
};

export default Users;
