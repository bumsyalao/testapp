import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTodo, deleteTodo } from '../actions/todoAction';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.onSetDone = this.onSetDone.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSetDone(e) {
    e.preventDefault();
    const todoId = this.props.id;
    const updatedTodo = {
      title: this.props.title,
      description: this.props.description,
      isDone: true
    }
    this.props.editTodo(todoId, updatedTodo);

  }
  onDelete() {
    const todoId = this.props.id;
    this.props.deleteTodo(todoId);
  }

  render() {
    const {
      id,
      title,
      description,
      isDone
    } = this.props;
    return (
      <ul>
        <li id={id}><input type="checkbox" /><p>{title}</p>
          <div>{description}</div>
          <span className="isDone">{isDone ? 'Done' : ''}</span>
          <div>
            <a id="edit-todo" onClick={this.onSetDone} ><img src="https://res.cloudinary.com/dcpfdxsly/image/upload/v1565798548/success_e2lfu4.png" /></a>
            <a onClick={this.onDelete}> <img src="https://res.cloudinary.com/dcpfdxsly/image/upload/v1565798337/error_a0zn3r.png" /></a>
          </div>
        </li>

      </ul>
    )
  }
}


export default connect(null, { editTodo, deleteTodo })(TodoList);
