import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../actions/userAction';

class Table extends Component {
	/**
	 *Creates an instance of Table.
	 * @param {*} props
	 * @memberof Table
	 */
	constructor(props) {
		super(props);
		this.onDelete = this.onDelete.bind(this);
	}
	componentDidMount() {
		const modal = document.getElementById('myModal');
		const btn = document.getElementById("myBtn");
		const span = document.getElementsByClassName("close")[0];
		btn.onclick = function () {
			modal.style.display = "block";
		}
		span.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}

	/**
	 * Function to delete user
	 *
	 * @memberof Table
	 */
	onDelete() {
		const userId = this.props.id;
		this.props.deleteUser(userId);
	}
	/**
	 * Render Table component
	 *
	 * @returns
	 * @memberof Table
	 */
	render() {
		const {
			email,
			admin,
			id
		} = this.props;
		return (
			<tr className="table-row">
				<td>{email} {admin ? <div className="chip">Admin</div> : null}</td>
				<td>
					{admin ? <a className="btn disabled">Edit</a> : <Link 
						className="btn"
						to={`/update-user/${id}`}>
						Edit</Link>
					}
				</td>
				<td>{admin ? <a className="btn disabled">Delete</a> : <a className="delete-btn btn" onClick={this.onDelete}>Delete</a>}</td>
			</tr>

		);
	}
}

export default connect(null, { deleteUser })(Table);
