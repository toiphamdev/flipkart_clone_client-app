import { authConstants } from "../constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  error: null,
  loading: false,
  message: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      let stateCoppy = {
        ...state,
        authenticating: true,
      };
      return stateCoppy;
    }
    case authConstants.LOGIN_SUCCESS: {
      let stateCoppy = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticate: true,
      };
      return stateCoppy;
    }
    case authConstants.LOGIN_FAILURE: {
      let stateCoppy = {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
      return stateCoppy;
    }
    case authConstants.LOGOUT_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case authConstants.LOGOUT_SUCCESS: {
      let stateCoppy = {
        ...initState,
      };
      return stateCoppy;
    }
    case authConstants.LOGOUT_FAILURE: {
      let stateCoppy = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      return stateCoppy;
    }
    case authConstants.SIGNUP_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case authConstants.SIGNUP_SUCCESS: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }
    case authConstants.SIGNUP_FAILURE: {
      let stateCoppy = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default authReducer;
