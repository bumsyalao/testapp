import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { loginRequest, registerRequest } from '../actions/userAction';


/**
 *
 *
 * @class Auth
 * @extends {Component}
 */
class Auth extends Component {
	/**
	 *Creates an instance of Auth.
	 * @param {*} props
	 * @memberof Auth
	 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      admin: false,
      loggedIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }
	/**
	 *Check if user is authenticated
	 *
	 * @memberof Auth
	 */
  componentDidMount() {
    const registerButton = document.getElementById('register-btn');
    const loginButton = document.getElementById('login-btn');
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    registerButton.addEventListener('click', () => {
      registerForm.classList.remove('hide');
      loginForm.classList.add('hide');
    });
    loginButton.addEventListener('click', () => {
      loginForm.classList.remove('hide');
      registerForm.classList.add('hide');
    });
    // 	if (this.props.access.isAuthenticated) {
    // 		this.props.access.user.admin ? this.props.history.push('/admin-dashboard') : this.props.history.push('/user-dashboard')
    // 	}
  }
	/**
	 * Remove event listeners when component unmounts
	 *
	 * @memberof Auth
	 */
  componentWillUnmount() {
    // const registerButton = document.getElementById('register-btn');
    // const loginButton = document.getElementById('login-btn');
    // registerButton.removeEventListener();
    // loginButton.removeEventListener();
  }
	/**
		* Sets the event value to the state
		* @return {void}
		* @param {Object} event The event of the HTML component
		*
		* @memberOf Auth
		*/
  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }
	/**
	 * Validates Login Info
	 *
	 * @param {*} event
	 * @memberof Auth
	 */
  onLogin(event) {
    event.preventDefault();
    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginRequest(loginInfo)
      .then((res) => {
        this.setState({ loggedIn: true });
        this.props.access.isAuthenticated = true;
        res.userInfo.admin ? this.props.history.push('/admin-dashboard') : this.props.history.push('/user-dashboard');
        Materialize.toast(res.message, 3000, 'green');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 3000, 'red');
      });
  }
	/**
	 * Validates Register Info
	 *
	 * @param {*} event
	 * @memberof Auth
	 */
  onRegister(event) {
    event.preventDefault();
    const isAdmin = $('#switch-btn').is(':checked') ? true : false;
    const registerInfo = {
      email: this.state.email,
      password: this.state.password,
      admin: isAdmin
    };
    this.props.registerRequest(registerInfo)
      .then((res) => {
        this.setState({ loggedIn: true });
        res.userInfo.admin ? this.props.history.push('/admin-dashboard') : this.props.history.push('/user-dashboard');
        Materialize.toast(res.message, 3000, 'green');
      }).catch((error) => {
        Materialize.toast(error.response.data.message, 3000, 'red');
      });
  }

  render() {
    return (
      <div>
        <div className="container white z-depth-2" id="user_options-form">
          <ul className="tabs teal">
            <li className="tab col s3"><a className="white-text active" id="login-btn">login</a></li>
            <li className="tab col s3"><a className="white-text" id="register-btn">register</a></li>
          </ul>
          <div id="login" className="col s12">
            <form className="col s12">
              <div className="form-container">
                <h5 className="teal-text">Hello</h5>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      className="validate"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      type="password"
                      className="validate"
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <br />
                <center>
                  <button
                    onClick={this.onLogin}
                    className="btn waves-effect waves-light teal"
                    type="submit"
                    name="action"
                  >
                    Login
								</button>
                  <br />
                  <br />
                </center>
              </div>
            </form>
          </div>
          <div id="register" className="col s12 hide">
            <form className="col s12">
              <div className="form-container">
                <div>
                  <div className="heading left"> Welcome </div>
                  <div className="switch right">
                    <label>
                      <input id="switch-btn" type="checkbox" value={this.state.admin} />
                      <span className="lever" />
                      Admin User
									</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      className="validate" />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      type="password"
                      className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <center>
                  <button
                    id="register-btn"
                    className="btn waves-effect waves-light teal"
                    onClick={this.onRegister}
                    type="submit"
                    name="action"
                  >
                    Register
							</button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access
});

const actions = {
  loginRequest,
  registerRequest
}

export default connect(mapStateToProps, actions)(withRouter(Auth));
