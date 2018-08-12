import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { editUser } from '../actions/userAction';

class EditUser extends Component {
	/**
	 *Creates an instance of EditUser.
	 * @param {*} props
	 * @memberof EditUser
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClose = this.onClose.bind(this);
	}
	/**
	 * Sets event value to state
	 *
	 * @param {*} event
	 * @memberof EditUser
	 */
	onChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	/**
	 * Close Edit form
	 *
	 * @param {*} event
	 * @memberof EditUser
	 */
	onClose(event) {
		event.preventDefault();
		this.props.history.push('/admin-dashboard');
	}
	/**
	 * Makes call to edit user
	 *
	 * @param {*} event
	 * @memberof EditUser
	 */
	onSubmit(event) {
		event.preventDefault();
		const userId = this.props.match.params.userId;
		const userEmail = { email: this.state.email };
		this.props.editUser(userId, userEmail)
			.then((res) => {
				Materialize.toast('User updated succesfully', 5000, 'green');
			}).catch((err) => {
				Materialize.toast(err.response.data.message, 5000, 'red');
			});
	}
	/**
	 * Renders Edit user component
	 *
	 * @returns
	 * @memberof EditUser
	 */
	render() {
		return (
			<div className="form-margin container col s6">
			<div className="input-field col s6">
				<span className="close" onClick={this.onClose}>&times;</span>
				<input
					id="email"
					value={this.state.email}
					onChange={this.onChange}
					type="email"
					className="validate"
					required
				/>
				<label htmlFor="email">Email</label>
				<center>
					<button
						className="btn waves-effect waves-light teal"
						onClick={this.onSubmit}
						type="submit"
						name="action"
					>
						Submit
							</button>
				</center>
			</div>
			</div>
		);
	}
}

export default connect(null, { editUser })(EditUser);
