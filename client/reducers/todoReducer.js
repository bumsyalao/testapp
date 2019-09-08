import * as types from '../actions/types';

const initialState = {
  todoList: []
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.GETALLTODOS:
      return {
        ...state,
        todoList: action.allTodos
      }

    default:
      return state;
  }
};