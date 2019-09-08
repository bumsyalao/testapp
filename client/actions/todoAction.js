import axios from 'axios';
import {
  GETALLTODOS,
  CREATETODO,
  EDITTODO,
  DELETETODO
} from './types';

export const createtodoSuccess = (newTodo, message) => ({
  type: CREATETODO,
  newTodo,
  message
});

export const getAllTodosSucess = (allTodos) => ({
  type: GETALLTODOS,
  allTodos
});

export const createTodo = todo => dispatch =>
  axios
  .post('/api/v1/todo', todo)
  .then(() => {
    dispatch(getAllTodos());
  }).catch((err) => {
    throw err;
  });


export const getAllTodos = () => dispatch =>
  axios
  .get('/api/v1/todos')
  .then((res) => {
    // localStorage.setItem('todo', res.data.allTodos)
    return dispatch(getAllTodosSucess(res.data.allTodos, res.data.message));
  }).catch((err) => {
    throw err;
  });

export const editTodo = (id, todo) => dispatch =>
  axios
  .put(`/api/v1/todo/${id}`, todo)
  .then(() => {
    dispatch(getAllTodos());
  }).catch((err) => {
    throw err;
  });

export const deleteTodo = id => dispatch =>
  axios
  .delete(`/api/v1/todo/${id}`)
  .then(() => {
    dispatch(getAllTodos());
  }).catch((err) => {
    throw err;
  });
