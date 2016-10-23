/**
 * Created by uzysjung on 2016. 7. 14..
 */

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR  ,GET_USER_DATA , FAILED_USER_DATA , PUT_USER_DATA ,WAITING_USER_DATA} from '../constants';

export default function(state = {authenticated:false}, action) {
    // console.log('state:',state);
    switch(action.type) {
        case AUTH_USER:
            return {
                ...state,
                email : action.email,
                authenticated: true,
                service_ids : action.service_ids
            };
        case UNAUTH_USER:
            return {
                authenticated: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload,
                authenticated: false
            };

        case GET_USER_DATA:
            return {
                ...state,
                user : action.payload,
                isLoading : false
            };
        case FAILED_USER_DATA:
            return {
                ...state,
                error : action.payload,
                isLoading : false
            };
        case PUT_USER_DATA:
            return {
                ...state,
                update : action.payload,
                isLoading : false
            };
        case WAITING_USER_DATA:
            return {
                ...state,
                isLoading : true
            };

    }

    return state;
}
