import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Table from '../components/Table';
import { logoutRequest, createUser, getAllUsers } from '../actions/userAction';

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
      password: '',
      pageCount: 0
    };
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
	/**
	 * Check if user is authenticated
	 * Initialise modal
	 * @memberof AdminDashboard
	 */
  componentDidMount() {
    if (!this.props.access.isAuthenticated) {
      Materialize.toast('Please Login or Register', 5000, 'red');
      this.props.history.push('/');

    }

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
	 *Get All users
	 *
	 * @memberof AdminDashboard
	 */
  componentWillMount() {
    this.props.getAllUsers().catch();
  }
	/**
	 * Set sate to nextProps
	 *
	 * @param {*} nextProps
	 * @memberof AdminDashboard
	 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      pageCount: nextProps.paginate.pageCount,
      count: nextProps.paginate.count,
      allUsers: nextProps.foundUsers
    });
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
	/**
	 * Create User
	 *
	 * @param {*} event
	 * @memberof AdminDashboard
	 */
  onSubmit(event) {
    event.preventDefault();
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.createUser(userInfo)
      .then((res) => {
        Materialize.toast(res.message, 5000, 'green');
        document.getElementById('myModal').style.display = "none";
        this.props.getAllUsers().catch();
        this.setState({
          email: '',
          password: ''
        });
      }).catch((err) => {
        Materialize.toast(err.response.data.message, 5000, 'red');
      });
  }
	/**
	 * Handle page click
	 *
	 * @param {*} pageData
	 * @memberof AdminDashboard
	 */
  handlePageClick(pageData) {
    const selected = pageData.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    const selectPage = selected + 1;
    this.props.getAllUsers(selectPage).catch();
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
        <div>
          <div className="users-table">
            <h5> USERS </h5>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.props.foundUsers.map(user => (
                  <Table
                    key={user._id}
                    id={user._id}
                    email={user.email}
                    admin={user.admin}
                  />
                ))}
              </tbody>
            </table>
            <div className="select-page">
              {(this.state.count > 5) && <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />}
            </div>
          </div>
        </div>
      </div>
    );
  }

}
const mapStateToProps = state => ({
  access: state.access,
  foundUsers: state.access.allUsers,
  paginate: state.access.paginate
});

export default connect(mapStateToProps, { logoutRequest, createUser, getAllUsers })(withRouter(AdminDashboard));
