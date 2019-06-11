import {targetURI} from '../keys';
import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

import { USER_SERVER } from '../components/utils/misc';

export function registerUser(dataToSubmit) {
    console.log(`${targetURI}${USER_SERVER}/register`);

    const request = axios.post(`${targetURI}${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    console.log(`${targetURI}${USER_SERVER}/login`);

    const request = axios.post(`${targetURI}${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

