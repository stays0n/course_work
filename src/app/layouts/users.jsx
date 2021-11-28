import React from 'react';
import { useParams } from 'react-router-dom';

import UserPage from './../components/page/userPage/';
import UsersListPage from './../components/page/usersListPage/';
import UserEditPage from '../components/page/userEditPage/';
import { UserProvider } from '../hooks/useUsers';
import { ProfessionProvider } from '../hooks/useProfession';
import { QualityProvider } from '../hooks/useQualities';

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <React.Fragment>
            <UserProvider>
                <ProfessionProvider>
                    <QualityProvider>
                        {userId && edit ? (
                            <UserEditPage />
                        ) : userId ? (
                            <UserPage userId={userId} />
                        ) : (
                            <UsersListPage />
                        )}
                    </QualityProvider>
                </ProfessionProvider>
            </UserProvider>
        </React.Fragment>
    );
};

export default Users;
