import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import userDashboard from './components/UserDashboard';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/user-dashboard" component={UserDashboard} />
    </Switch>
);

export default Routes;
