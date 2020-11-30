import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import Section from './components/Section';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path='/' to='/home' />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/section' component={Section} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;