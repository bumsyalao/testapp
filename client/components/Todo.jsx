import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter, Link } from 'react-router-dom';
import { createTodo, getAllTodos } from '../actions/todoAction';
import TodoList from './TodoList';

const moment = require('moment');

/**
 *
 *
 * @class Todo
 * @extends {Component}
 */
class Todo extends Component {
	/**
	 *Creates an instance of Todo.
	 * @param {*} props
	 * @memberof Todo
	 */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      isDone: false,

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
componentWillMount() {
  this.props.getAllTodos().catch();
}
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const todo = {
      title: this.state.title,
      description: this.state.description,
      isDone: this.state.isDone
    };
    this.props.createTodo(todo);
    this.setState({
      title: '',
      description: ''
    });
    this.props.getAllTodos();
  }



  render() {
    return (
      <div className="shopping-list" id="notebook">
        <p className="date">
          <span className="month">{moment().format('MMM')}</span>
          <span className="day">{moment().format('Do').slice(0, 2)}</span><sup>{moment().format('Do').slice(2, 4)}</sup>
        </p>
        <h1>Todo List</h1>
        <form>
          <div id="input-form" className="shop-input">
            <input
              id="title"
              value={this.state.title}
              onChange={this.onChange}
              type="text"
              maxLength="30"
              placeholder="title"
              required
              />
            <input
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              type="text"
              placeholder="description" />
            <button
              id="add-item"
              disabled={!this.state.title && !this.state.description}
              onClick={this.onSubmit}
              >
              ADD</button>
            </div>
        </form>
        <div>
          {this.props.todoList.map(todo => (
            <TodoList 
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
              isDone={todo.isDone} />
          ))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  todoList: state.todo.todoList
});


export default connect(mapStateToProps, {createTodo, getAllTodos}) (Todo);
