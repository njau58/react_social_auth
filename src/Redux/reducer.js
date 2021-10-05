import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  currentUser: localStorage.getItem("user"),
  error: null,
  fbError: null,
  emailError: null,
  googleError: null,
  registerError: null,

  resetSuccess: false,
  token: localStorage.getItem("token"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
    case actionTypes.LOGIN_START:
    case actionTypes.GOOGLE_SIGNIN_START:
    case actionTypes.GET_AUTH_START:
    case actionTypes.RESET_PASSWORD_START:
    case actionTypes.FB_SIGNIN_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.GOOGLE_SIGNIN_SUCCESS:
    case actionTypes.FB_SIGNIN_SUCCESS:
      localStorage.setItem("user", action.payload);

      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetSuccess: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");

      return {
        ...state,
        loading: false,
        currentUser: null,
        token: null,
      };

    case actionTypes.GET_AUTH_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload,
      };

    case actionTypes.GET_AUTH_FAIL:
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        registerError: action.payload,
      };
    case actionTypes.FB_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        fbError: action.payload,
      };
    case actionTypes.GOOGLE_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        googleError: action.payload,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        emailError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
