import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import userDashboard from './components/UserDashboard';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import EditUser from './components/EditUser';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/user-dashboard" component={UserDashboard} />
        <Route path="/update-user/:userId" component={EditUser} />
    </Switch>
);

export default Routes;
