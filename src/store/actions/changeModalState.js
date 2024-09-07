import { FAILED_REGLOGIN, SHOW_APPROVAL_KPR_MODAL, SHOW_BRIVA_MODAL, SHOW_CHAT, SHOW_CONF_LOGOUT, SHOW_METHOD_PAYMENT_MODAL, SHOW_USER_PAYMENT_MODAL, SHOW_SELECT_QUESTION, SHOW_SUCCESS_SELL, SUCCESS_REG } from "./types";

export const showMethodPaymentModal = data => dispatch => {
  dispatch({
    type: SHOW_METHOD_PAYMENT_MODAL,
    payload: data
  });
};
export const showUserPaymentModal = data => dispatch => {
  dispatch({
    type: SHOW_USER_PAYMENT_MODAL,
    payload: data
  });
};

export const showBrivaModal = data => dispatch => {
  dispatch({
    type: SHOW_BRIVA_MODAL,
    payload: data
  });
};

export const showApprovalKprModal = data => dispatch => {
  dispatch({
    type: SHOW_APPROVAL_KPR_MODAL,
    payload: data
  });
};

export const showSuccessSell = data => dispatch => {
  dispatch({
    type: SHOW_SUCCESS_SELL,
    payload: data
  });
};

export const showSelectQuestion = data => dispatch => {
  dispatch({
    type: SHOW_SELECT_QUESTION,
    payload: data
  });
};

export const showChat = data => dispatch => {
  dispatch({
    type: SHOW_CHAT,
    payload: data
  });
};

export const showConfLogout = data => dispatch => {
  dispatch({
    type: SHOW_CONF_LOGOUT,
    payload: data
  });
};

export const showSuccessReg = data => dispatch => {
  dispatch({
    type: SUCCESS_REG,
    payload: data
  });
};

export const showFailedRegLogin = (state, title, msg) => dispatch => {
  dispatch({
    type: FAILED_REGLOGIN, state: state, title: title, msg: msg
  });
};