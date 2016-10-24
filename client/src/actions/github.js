/**
 * Created by uzysjung on 2016. 10. 21..
 */
import { RECEIVE_GITHUB_DATA, RECEIVE_FAILED_GITHUB_DATA, REQUEST_GITHUB_DATA } from '../constants'
import { axiosGetRequest } from './actionHelper'

export function recvGithub(data) {
    return {
        type: RECEIVE_GITHUB_DATA,
        payload: {
            data: data
        }
    }

}

export function recvGithubError(error) {
    return {
        type: RECEIVE_FAILED_GITHUB_DATA,
        payload: error
    }
}


export function reqGithub() {
    return {
        type: REQUEST_GITHUB_DATA
    }
}


export function fetchGithub ( userID ) {
    return axiosGetRequest(`api/github/user/${userID}`,{},
        reqGithub,recvGithubError,recvGithub)
}



