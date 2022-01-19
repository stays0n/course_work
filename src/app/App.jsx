import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/ui/navBar';
import { AuthProvider } from './hooks/useAuth';
import Login from './layouts/login';
import Logout from './layouts/logout';
import Main from './layouts/main';
import Users from './layouts/users';

import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';
import { loadUsersList } from './store/users';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList());
    }, []);

    return (
        <React.Fragment>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
