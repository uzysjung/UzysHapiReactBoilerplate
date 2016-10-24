/**
 * Created by uzysjung on 2016. 7. 14..
 */
import axios from 'axios';
import { browserHistory } from 'react-router';
import localStore from '../../../node_modules/store/store.js'

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR , GET_USER_DATA , PUT_USER_DATA , WAITING_USER_DATA, FAILED_USER_DATA , AUTH_VALIDATION_FAILED} from '../constants';

import { HOSTNAME , PORT } from '../../../config'
const ROOT_URL = `http://${HOSTNAME}:${PORT}`;


export function registerUser({ email, password , passwordVerify}) {
    return function(dispatch) {
        // Submit email/password to server
        const request = axios.post(`${ROOT_URL}/api/register`, {
            login_email : email,
            login_pw : password,
            login_pwVerify : passwordVerify
        });

        request.then(response => {
            console.log('response:',response);
            // If verified,
            // 1. update state to authenticated
            dispatch({
                type: AUTH_USER,
                email : email,
            });
            // 2. save jwt token
            localStore.set('token', response.data.token);
            localStore.set('email', email);
            // axios.defaults.headers.common['Authorization'] = response.data.token;
            // 3. redirect to /f
            browserHistory.push('/');

        }).catch((e) => {

            let failedMessage = e.message;
            if(e.response && e.response.data && e.response.data.message) {
                failedMessage = e.response.data.message;
            }
            // Else,
            // 1. Show error
            dispatch(failedUserData(failedMessage));

        });
    };
}

export function signinUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to server
        const request = axios.post(`${ROOT_URL}/api/login`, {
            login_email : email,
            login_pw : password,
        });

        request.then(response => {
            console.log('response:',response);
            const isAdmin = response.data.role === 'ADMIN' ? true : false;
            // If verified,
            // 1. update state to authenticated
            dispatch({
                type: AUTH_USER,
                email : email,
                isAdmin : isAdmin
            });
            // 2. save jwt token
            localStore.set('token', response.data.token);
            localStore.set('email', email);
            localStore.set('isAdmin', isAdmin);
            // axios.defaults.headers.common['Authorization'] = response.data.token;

            browserHistory.push('/');

        }).catch(() => {
            // Else,
            // 1. Show error
            dispatch(authError('Wrong email/password.'));
        });
    };
}

export function signoutUser() {
    localStore.remove('token');
    localStore.remove('email');
    localStore.remove('isAdmin');
    return {
        type: UNAUTH_USER,
    };
}

export function authError(error) {
    localStore.remove('token');
    localStore.remove('email');
    localStore.remove('isAdmin');

    return {
        type: AUTH_ERROR,
        payload: error,
    };
}

export function authUser() {
    const email = localStore.get('email');
    const isAdmin = localStore.get('isAdmin');


    return {
        type: 'AUTH_USER',
        email : localStore.get('email'),
        isAdmin : isAdmin
    }
}
export function putUserData(data) {
    // console.log('put_user_data:',data);
    return {
        type: PUT_USER_DATA,
        payload: {
            data: data
        }
    }
}

export function getUserData(data) {
    return {
        type: GET_USER_DATA,
        payload: {
            data: data
        }
    }
}
export function failedUserData(error) {
    return {
        type: FAILED_USER_DATA,
        payload: error
    };
}
export function waitingUserData() {
    return {
        type: WAITING_USER_DATA
    }
}

export function getUserDataAsync(url,query) {

    return (dispatch, state) => {

        dispatch(waitingUserData());

        const config = {
            headers: {
                Authorization : localStore.get('token')
            }
        };
        let url = '/api/user';
        if(query) config.param = query;
        const request = axios.get(`${ROOT_URL}${url}`, config);

        request.then(response => {
            dispatch(getUserData(response.data.data));
        }).catch((error) => {
            if(error.response) {
                if(error.response.status === 401) {
                    dispatch(authError('invalid token'));
                }

            } else {
                console.log('Error',error.message);
                dispatch(failedUserData(error));
            }
        });
    }
}


export function putUserDataAsync(method,url,data) {
    return (dispatch, state) => {

        dispatch(waitingUserData());

        const config = {
            headers: {
                Authorization : localStore.get('token')
            },
            timeout: 3000,
            baseURL : ROOT_URL,
            url :url,
            data : data,
            method : method
        };


        const request = axios(config);
        request.then(response => {
            dispatch(putUserData(response.data));
        }).catch((error) => {
            if(error.response) {
                if(error.response.status === 401) {
                    dispatch(authError('invalid token'));
                }

            } else {
                console.log('Error',error.message);
                dispatch(failedUserData(error));
            }
        });
    }
}




