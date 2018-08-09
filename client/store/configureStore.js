import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from '../reducers/combineReducer';

const configureStore = initialState => createStore(
    combineReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : functional => functional
        )
      );
const store = configureStore();

export default store;
