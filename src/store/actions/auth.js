import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//  receive time in seconds
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            // run dispatch enclosed method after the expirartionTime
            dispatch(logout());
            // expirationTime = 3600 s, transform to seconds by multipying to 1000
            // [total of 1 hr]
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        // authenticate user
        dispatch(authStart());
        const authData ={
            email: email,
            password: password,
            returnSecureToken: true
        }
        // sign up
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjqZn1geUNIwCtfFlBLRnCHfQsDRZroGo';
        if(!isSignup){
            // sign in
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjqZn1geUNIwCtfFlBLRnCHfQsDRZroGo'
        }
        axios.post(url,authData)
        .then( response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            // in response.data, userId is called loacalId
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err)
            dispatch(authFail(err.response.data.error));
        });
    }
}

// sync
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// async
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            // converting string to a date object
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                // passing the time in milliseconds, where the difference is the expiry time in seconds
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

