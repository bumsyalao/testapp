import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CREATE_USER, GET_USERS } from './types';

export const loginSuccess = (userInfo, message) => ({
	type: LOGIN_USER,
	userInfo,
	message
});

export const registerSuccess = (userInfo, message) => ({
	type: REGISTER_USER,
	userInfo,
	message
});

export const logoutSuccess = () => ({
	type: LOGOUT_USER
});

export const createUserSuccess = (newUser, message) => ({
	type: CREATE_USER,
	newUser,
	message
});
export const loadUsersSuccess = (allUsers, paginate) => ({
	type: GET_USERS,
	paginate,
	allUsers
});

export const loginRequest = loginInfo => dispatch =>
	axios
		.post('/api/v1/login', loginInfo)
		.then((response) => {
			localStorage.setItem('token', response.data.token);
			attachAuthToken(response.data.token);
			return dispatch(
				loginSuccess(response.data.UserDetails, response.data.message)
			);
		}).catch((error) => {
			throw error;
		});
	

export const registerRequest = registerInfo => dispatch =>
	axios
		.post('/api/v1/register', registerInfo)
		.then((response) => {
			localStorage.setItem('token', response.data.token);
			attachAuthToken(response.data.token);
			return dispatch(
				registerSuccess(response.data.UserDetails, response.data.message)
			);
		})
		.catch((error) => {
			throw error;
		});


export const logoutRequest = () => (dispatch) => {
	localStorage.removeItem('token');
	attachAuthToken(false);
	return dispatch(logoutSuccess());
};

export const createUser = newUser => dispatch =>
	axios
		.post('/api/v1/createuser', newUser)
		.then((response) => {
			return dispatch(
				createUserSuccess(response.data.newUser, response.data.message)
			);
		}).catch((error) => {
			throw error;
		});

export const getAllUsers = (selectPage) => dispatch =>
		axios
			.get(`/api/v1/users/${selectPage}`)
			.then((response) => {
				dispatch(loadUsersSuccess(response.data.allUsers, response.data.paginate ));
			}).catch((error) => {
				throw error;
			});

export const deleteUser = userId => dispatch =>
			axios
				.delete(`/api/v1/user/${userId}`)
				.then(() => {
					dispatch(getAllUsers());
				}).catch((error) => {
					throw error;
				});
				