import * as types from '../actions/types';

export default (
	state = { user: {}, message: null, isAuthenticated: false, newUser: {} },
	action
) => {
	switch (action.type) {
		case types.LOGIN_USER:
		case types.REGISTER_USER:
		case types.LOGGEDIN_USER:
			return {
				...state,
				user: action.userInfo,
				message: action.message,
				isAuthenticated: true
			};
		case types.LOGOUT_USER:
			return {
				...state,
				user: {},
				message: null,
				isAuthenticated: false
			};
		case types.CREATE_USER:
			return {
				...state,
				newUser: action.newUser,
				message: action.message
			};
		default:
			return state;
	}
};
