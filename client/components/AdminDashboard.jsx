import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutRequest, createUser } from '../actions/userAction';

class AdminDashboard extends Component {
	/**
	 *Creates an instance of AdminDashboard.
	 * @param {*} props
	 * @memberof AdminDashboard
	 */
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.onChange = this.onChange.bind(this);
		this.logout = this.logout.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	/**
	 * Check if user is authenticated
	 *
	 * @memberof AdminDashboard
	 */
	componentDidMount() {
		// if (!this.props.access.isAuthenticated) {
		//   Materialize.toast('Please Login or Register', 5000, 'red');
		//   this.props.history.push('/');
		// }

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
	 * Sets value to state
	 *
	 * @param {*} event
	 * @memberof AdminDashboard
	 */
	onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
	}
	onSubmit(event){
		event.preventDefault();
		const userInfo = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.createUser(userInfo)
			.then((res) =>{
				Materialize.toast(res.message, 5000, 'green');
				document.getElementById('myModal').style.display = "none";
				this.setState({
					email: '',
					password: ''
				});
			}).catch((err) =>{
				Materialize.toast(err.response.data.message, 5000, 'red');
			});
	}
	/**
	 * Logout User
	 *
	 * @param {*} event
	 * @memberof AdminDashboard
	 */
	logout(event) {
		event.preventDefault();
		this.props.logoutRequest();
		this.props.history.push('/');
		Materialize.toast('You have logged out successfully', 3000, 'green');
	}
	/**
	 * Render Admin Dashboard
	 *
	 * @returns
	 * @memberof AdminDashboard
	 */
	render() {
		return (
			<div>
				<div className="navbar">
					<div className="nav-items">
						<a
							className="create-user"
							id="myBtn"
						>Create A User
						</a>
						<div id="myModal" className="modal">
							<div className="modal-content">
								<span className="close">&times;</span>
								<div className="input-field col s12">
									<input
										id="email"
										value={this.state.email}
										onChange={this.onChange}
										type="email"
										className="validate"
										required
									/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field col s12">
									<input
										id="password"
										value={this.state.password}
										onChange={this.onChange}
										type="password"
										className="validate"
										required
									/>
									<label htmlFor="email">Password</label>
								</div>
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
						<a
							href="#"
							onClick={this.logout}
						>Logout</a>
					</div>
				</div>
			</div>
		);
	}

}
const mapStateToProps = state => ({
	access: state.access
});

export default connect(mapStateToProps, { logoutRequest, createUser })(withRouter(AdminDashboard));
