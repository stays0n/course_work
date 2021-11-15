import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';

// import { ProfessionProvider } from './hooks/useProfession';

const App = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
