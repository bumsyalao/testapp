import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
    </Switch>
);

export default Routes;
