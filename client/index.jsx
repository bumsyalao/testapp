import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import attachAuthToken from './utils/attachAuthToken';
import store from './store/configureStore';
import { LOGGEDIN_USER } from './actions/types';
import './scss/style.scss';
import Routes from './Routes';

const token = global.localStorage.getItem('token');
if (token) {
  attachAuthToken(token);
  const decoded = jwt.decode(token);
  if (decoded) {
    const userInfo = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    };
    store.dispatch(
      { type: LOGGEDIN_USER, userInfo }
    );
  }
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);

