import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';

import Signup from './containers/Signup';
import Login from "./containers/Login";
// import Signup from './components/SignUp';
// import Login from './components/Login';
import HomepageLayout from './containers/Home';

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
