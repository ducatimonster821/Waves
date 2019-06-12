import {targetURI} from '../keys';
import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

import { USER_SERVER } from '../components/utils/misc';

export function registerUser(dataToSubmit) {
    console.log(`${targetURI}${USER_SERVER}/register`);

    const request = axios.post(`${targetURI}${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    console.log('registerUser request:', request);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    console.log(`${targetURI}${USER_SERVER}/login`);

    const request = axios.post(`${targetURI}${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    console.log('loginUser request:', request);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    console.log(`${targetURI}${USER_SERVER}/auth`);

    const request = axios.get(`${targetURI}${USER_SERVER}/auth`)
        .then(response => response.data);

    console.log('auth request:', request);

    return {
        type: AUTH_USER,
        payload: request
    }
}

