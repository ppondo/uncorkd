import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_USERS';


export const logIn = (user) => dispatch => (
    SessionApiUtil.logIn(user).then( user => (
        dispatch(receiveCurrentUser(user))
    ), err => (
        dispatch(receiveSessionErrors(err))
    ))
)

export const signUp = (user) => dispatch => (
    SessionApiUtil.signUp(user).then(user => (
        dispatch(receiveCurrentUser(user))
    ), err => (
        dispatch(receiveSessionErrors(err))
    ))
)

export const fetchUsers = () => dispatch => (
    SessionApiUtil.fetchUsers().then(users => dispatch(receiveAllUsers(users)))
)

export const fetchUser = (id) => dispatch => (
    SessionApiUtil.fetchUser(id).then(user => dispatch(receiveUser(user)))
)

export const logOut = () => dispatch => (
    SessionApiUtil.logOut().then(() => dispatch(logOutCurrentUser()))
)

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const logOutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors.responseJSON
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
})

export const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
})

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})