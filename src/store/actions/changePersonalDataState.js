import { SET_DOB, SET_GENDER, SET_JANGKA_PERLINDUNGAN, SET_MARTIAL_STATUS, SET_UANG_TANGGUNGAN } from "./types";

export const setDob = data => dispatch => {
  dispatch({
    type: SET_DOB,
    payload: data
  });
};

export const setGender = data => dispatch => {
  dispatch({
    type: SET_GENDER,
    payload: data
  });
};

export const setMaritalStatus = data => dispatch => {
  dispatch({
    type: SET_MARTIAL_STATUS,
    payload: data
  });
};

export const setUangTanggungan = data => dispatch => {
  dispatch({
    type: SET_UANG_TANGGUNGAN,
    payload: data
  });
};

export const setJangkaPerlindungan = data => dispatch => {
  dispatch({
    type: SET_JANGKA_PERLINDUNGAN,
    payload: data
  });
};

