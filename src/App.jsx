import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation';
import Login from './components/login';
import Main from './components/main';
import Users from './components/users';

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?' component={Users} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
