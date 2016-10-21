/**
 * Created by uzysjung on 2016. 10. 21..
 */

import { RECEIVE_GITHUB_DATA, RECEIVE_FAILED_GITHUB_DATA, REQUEST_GITHUB_DATA } from '../constants';

export default function(state = {}, action) {
    switch(action.type) {


        case RECEIVE_GITHUB_DATA:
            return {
                ...state,
                data: action.payload.data,
                isGithubsLoading: false
            };


        case REQUEST_GITHUB_DATA:
            return {
                ...state,
                isGithubsLoading: true,
            };



        case RECEIVE_FAILED_GITHUB_DATA:
            return {
                ...state,
                error: action.payload,
                isGithubsLoading : false
            };



    }

    return state;
}
