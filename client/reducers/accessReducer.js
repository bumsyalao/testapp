import * as types from '../actions/types';

const initialState = {
	user: {}, 
	message: null, 
	isAuthenticated: false, 
	newUser: {},
	paginate: {},
	allUsers: []
}

export default (
	state = initialState,
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
		case types.GET_USERS:
			return {
				...state,
				paginate: action.paginate,
				allUsers: action.allUsers
			}
		default:
			return state;
	}
};
