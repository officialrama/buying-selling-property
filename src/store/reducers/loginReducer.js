import cookie from "hs-cookie";
import { EMAIL_RESET_PASS, FAILED_REGLOGIN, FETCH_LOGOUT, FETCH_USER_LOGIN, INPUT_USER_REG, LOADING_ACTIVATION, REDIRECT_LOGIN, RESET_STATE_LOGIN, SUCCESS_REG } from '../actions/types';

const initialState = {
  isLoggedIn: (cookie?.get("morgateCookie") && JSON.parse(cookie?.get("morgateCookie")).isLoggedIn),
  resApi: {},
  userType: "",
  redirect: false,
  successReg: false,
  inputUserReg: {},
  emailResetPass: "",
  loadingActivation: false,
  failed: {
    state: false,
    title: "",
    msg: ""
  }
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        resApi: action.payload || {},
        userType: action.payload?.userType,
        isLoggedIn: true
      };
    case FETCH_LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false
      };
    case REDIRECT_LOGIN:
      return {
        ...state,
        redirect: true
      };
    case SUCCESS_REG:
      return {
        ...state,
        successReg: action.payload
      };
    case RESET_STATE_LOGIN:
      return {
        ...initialState
      };
    case INPUT_USER_REG:
      return {
        ...state,
        inputUserReg: action.payload
      };
    case EMAIL_RESET_PASS:
      return {
        ...state,
        emailResetPass: action.payload
      };
    case LOADING_ACTIVATION:
      return {
        ...state,
        loadingActivation: action.payload
      };
    case FAILED_REGLOGIN:
      return {
        ...state,
        failed: {
          ...state.failed,
          state: action.state,
          title: action.title,
          msg: action.msg
        }
      };
    default:
      return state;
  }
}
