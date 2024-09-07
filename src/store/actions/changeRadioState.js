import { SET_CASH_SUBMISSION, SET_FILTER_PROPERTYTYPE, SET_FILTER_TYPEOFPROPERTY, SET_KPR_BRI, SET_KPR_BRISYARIAH, SET_KPR_SUBMISSION, SET_QUESTION_BEFORE_CHAT, SET_SELLPROPS_PROPERTYTYPE, SET_SELLPROPS_TYPEOFPROPERTY } from "./types";

export const setCashSubmission = data => dispatch => {
  dispatch({
    type: SET_CASH_SUBMISSION,
    payload: data
  });
};

export const setKprSubmission = data => dispatch => {
  dispatch({
    type: SET_KPR_SUBMISSION,
    payload: data
  });
};

export const setKprBrisyariah = data => dispatch => {
  dispatch({
    type: SET_KPR_BRISYARIAH,
    payload: data
  });
};

export const setKprBri = data => dispatch => {
  dispatch({
    type: SET_KPR_BRI,
    payload: data
  });
};

export const setSellpropsTypeOfProperty = data => dispatch => {
  dispatch({
    type: SET_SELLPROPS_TYPEOFPROPERTY,
    payload: data
  });
};

export const setSellpropsPropertyType = data => dispatch => {
  dispatch({
    type: SET_SELLPROPS_PROPERTYTYPE,
    payload: data
  });
};

export const setFilterTypeOfProperty = data => dispatch => {
  dispatch({
    type: SET_FILTER_TYPEOFPROPERTY,
    payload: data
  });
};

export const setFilterPropertyType = data => dispatch => {
  dispatch({
    type: SET_FILTER_PROPERTYTYPE,
    payload: data
  });
};

export const setQuestionBeforeChat = data => dispatch => {
  dispatch({
    type: SET_QUESTION_BEFORE_CHAT,
    payload: data
  });
};