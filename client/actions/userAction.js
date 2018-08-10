import axios from 'axios';
import attachAuthToken from '../utils/attachAuthToken';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CREATE_USER } from './types';

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
