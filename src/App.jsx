import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/users/:userId?' component={Users} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  );
};

export default App;
