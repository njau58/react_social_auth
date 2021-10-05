import * as actionTypes from "./actionTypes";
import getFirebase, {
  googleAuthProvider,
  facebookAuthProvider,
} from "../firebase";
import axios from "axios";

const auth = getFirebase();

//Register actions
const registerStart = () => ({
  type: actionTypes.REGISTER_START,
});
const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: actionTypes.REGISTER_FAIL,
  payload: error,
});
//Login actions
const loginStart = () => ({
  type: actionTypes.LOGIN_START,
});
const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: error,
});
//Logout actions

const logoutStart = () => ({
  type: actionTypes.LOGOUT_START,
});
const logoutSuccess = (user) => ({
  type: actionTypes.LOGOUT_SUCCESS,
  payload: user,
});
const logoutFail = (error) => ({
  type: actionTypes.LOGOUT_FAIL,
  payload: error,
});

//Google signin actions
const googleSigninStart = () => ({
  type: actionTypes.GOOGLE_SIGNIN_START,
});
const googleSigninSuccess = (user) => ({
  type: actionTypes.GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});
const googleSigninFail = (error) => ({
  type: actionTypes.GOOGLE_SIGNIN_FAIL,
  payload: error,
});
//Fb signin actions

const fbSigninStart = () => ({
  type: actionTypes.FB_SIGNIN_START,
});
const fbSigninSuccess = (user) => ({
  type: actionTypes.FB_SIGNIN_SUCCESS,
  payload: user,
});
const fbSigninFail = (error) => ({
  type: actionTypes.FB_SIGNIN_FAIL,
  payload: error,
});

//Set auth_token actions
const getAuthStart = () => ({
  type: actionTypes.GET_AUTH_START,
});
const getAuthSuccess = (response) => ({
  type: actionTypes.GET_AUTH_SUCCESS,
  payload: response,
});
const getAuthFail = (error) => ({
  type: actionTypes.GET_AUTH_FAIL,
  payload: error,
});

//password reset

const resetPasswordStart = () => ({
  type: actionTypes.RESET_PASSWORD_START,
});
const resetPasswordSuccess = (response) => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
  payload: response,
});
const resetPasswordFail = (error) => ({
  type: actionTypes.RESET_PASSWORD_FAIL,
  payload: error,
});

//HELPER METHODS

//Register helper
export const registerInitiate = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart());
    auth
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({ displayName });
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    dispatch(getAuthStart());
    auth
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user.displayName));
      })
      .catch((error) => dispatch(loginFail(error.message)));

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxF4E54LBzVzWVejlepETlyH_adKMb9Gc",
        authData
      )
      .then((response) => {
        console.log(response);
        dispatch(getAuthSuccess(response.data.idToken));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getAuthFail);
      });
  };
};

export const googleSigninInitiate = () => {
  return function (dispatch) {
    dispatch(googleSigninStart());
    auth
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((response) => {
        dispatch(googleSigninSuccess(response.additionalUserInfo.profile.name));
        dispatch(getAuthSuccess(response.credential.accessToken));
      })
      .catch((error) => dispatch(googleSigninFail(error.message)));
  };
};
export const fbSigninInitiate = () => {
  return function (dispatch) {
    dispatch(fbSigninStart());
    auth
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then((user) => {
        dispatch(fbSigninSuccess(user.additionalUserInfo.profile.name));
        dispatch(getAuthSuccess(user.credential.accessToken));
      })
      .catch((error) => dispatch(fbSigninFail(error.message)));
  };
};
export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
      .auth()
      .signOut()
      .then((res) => {
        dispatch(logoutSuccess());
      })
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};
export const resetPasswordInitiate = (email) => {
  return function (dispatch) {
    dispatch(resetPasswordStart());
    auth
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        dispatch(resetPasswordSuccess());
      })
      .catch((error) => dispatch(resetPasswordFail(error.message)));
  };
};
