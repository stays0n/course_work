import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/navigation';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?' component={Users} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  );
};

export default App;
