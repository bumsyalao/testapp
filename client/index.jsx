import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import './scss/style.scss';
import Todo from './components/Todo';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);

