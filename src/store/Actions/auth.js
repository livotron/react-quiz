import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecuretoken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIUgeASstpgL-GhFmgwihBXtLTCIfY2yE'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIUgeASstpgL-GhFmgwihBXtLTCIfY2yE'
        }
        const response = await axios.post(url, authData);
        console.log(response)
        const data = response.data;

        // const expirationDate = + Date.now() not getting expiration date!

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);

        dispatch(authSuccess(data.idToken))

    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }   else    {
            dispatch(authSuccess(token))
        }
    }
}