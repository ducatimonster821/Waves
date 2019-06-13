import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {

        case REGISTER_USER:
            console.log('REGISTER_USER:', action.payload);

            return {
                ...state,
                register: action.payload
            }

        case LOGIN_USER:
            console.log('LOGIN_USER', action.payload);

            return {
                ...state,
                loginSuccess: action.payload
            }

        case AUTH_USER:
            console.log('AUTH_USER', action.payload);

            return {
                ...state,
                userData: action.payload
            }

        default:
            return state;
    }
}
