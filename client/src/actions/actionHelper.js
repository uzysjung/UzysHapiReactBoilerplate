/**
 * Created by uzysjung on 2016. 9. 6..
 */

import axios from 'axios';
import { authError } from './user';
import { HOSTNAME , PORT } from '../../config'
const ROOT_URL = `http://${HOSTNAME}:${PORT}`;



export function axiosGetRequest (url,query,reqAction,errAction,recvAction) {
    return (dispatch, state) => {
        dispatch(reqAction());

        const config = {
            headers: {
                Authorization : localStorage.getItem('token')
            },
            timeout: 5000,
            baseURL : ROOT_URL,
            url :url,
            method : 'get'

        };

        if(query) config.params = query;

        //console.log('config:',config);
        const request = axios(config);

        request.then(response => {
            console.log('response:',response)
            dispatch(recvAction(response.data));
        }).catch((error) => {
            console.log(error.response);
            if(error.response) {
                if(error.response.status === 401) {
                    dispatch(authError('토큰이 유효하지 않습니다.'));
                }

            }

            console.log('Error',error.message);
            dispatch(errAction(error));

        });
    }

};

export function axiosSendRequest(method,url,data,query={},reqAction,errAction,recvAction) {
    console.log('query:::',query);
    return (dispatch, state) => {

        dispatch(reqAction());

        const config = {
            headers: {
                Authorization : localStorage.getItem('token')
            },
            timeout: 3000,
            baseURL : ROOT_URL,
            url :url,
            data : data,
            method : method,
            params : query
        };


        const request = axios(config);

        request.then(response => {
            dispatch(recvAction(response.data));
        }).catch((error) => {
            if(error.response) {
                if(error.response.status === 401) {
                    dispatch(authError('토큰이 유효하지 않습니다.'));
                }

            } else {
                console.log('Error',error.message);
                dispatch(errAction(error));
            }
        });
    }
}