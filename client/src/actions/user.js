/**
 * Created by uzysjung on 2016. 7. 14..
 */
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR , GET_USER_DATA , PUT_USER_DATA , WAITING_USER_DATA, FAILED_USER_DATA , AUTH_VALIDATION_FAILED} from '../constants';
import { PORT } from '../../config';
import { selectedService_ID } from './sideMenu'
import config from '../../config';
const HOSTNAME = '10.202.31.160';
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
                service_ids : response.data.service_ids
            });
            // 2. save jwt token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('service_ids', JSON.stringify(response.data.service_ids));
            // axios.defaults.headers.common['Authorization'] = response.data.token;
            // 3. redirect to /f
            browserHistory.push('/');
            if(response.data.service_ids && response.data.service_ids.length > 0) {
                dispatch(selectedService_ID(response.data.service_ids[0].service_id));
            }
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
            // If verified,
            // 1. update state to authenticated
            dispatch({
                type: AUTH_USER,
                email : email,
                service_ids : response.data.service_ids
            });
            // 2. save jwt token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('service_ids', JSON.stringify(response.data.service_ids));
            // axios.defaults.headers.common['Authorization'] = response.data.token;
            // 3. redirect to /f
            browserHistory.push('/');
            if(response.data.service_ids.length > 0) dispatch(selectedService_ID(response.data.service_ids[0].service_id));
        }).catch(() => {
            // Else,
            // 1. Show error
            dispatch(authError('Wrong email/password.'));
        });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('service_ids');
    return {
        type: UNAUTH_USER,
    };
}

export function authError(error) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('service_ids');

    return {
        type: AUTH_ERROR,
        payload: error,
    };
}

export function authUser() {
    const email = localStorage.getItem('email');
    let service_ids;
    try {
        service_ids = JSON.parse(localStorage.getItem('service_ids'));
    } catch (e) {
        console.error('authUser error:',localStorage.getItem('service_ids'))
    }

    return {
        type: 'AUTH_USER',
        email : localStorage.getItem('email'),
        service_ids : service_ids
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
                Authorization : localStorage.getItem('token')
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
                Authorization : localStorage.getItem('token')
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




