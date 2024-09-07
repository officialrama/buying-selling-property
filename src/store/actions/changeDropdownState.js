import { SET_CERTIFICATE, SET_ELECTRICAL_POWER, SET_FACING_HOUSE, SET_FIXED_CREDIT, SET_JENIS_SUBSIDI, SET_JENIS_SUKU_BUNGA, SET_MAID_ROOM, SET_NUMBER_OF_FLOORS, SET_PROPERTY_CONDITION, SET_YEAR_OF_DEVELOPMENT } from "./types";

export const setJenisSukuBunga = data => dispatch => {
  dispatch({
    type: SET_JENIS_SUKU_BUNGA,
    payload: data
  });
};

export const setJenisSubsidi = data => dispatch => {
  dispatch({
    type: SET_JENIS_SUBSIDI,
    payload: data
  });
};

export const setFixedCredit = data => dispatch => {
  dispatch({
    type: SET_FIXED_CREDIT,
    payload: data
  });
};

export const setCertificate = data => dispatch => {
  dispatch({
    type: SET_CERTIFICATE,
    payload: data
  });
};

export const setNumberOfFloors = data => dispatch => {
  dispatch({
    type: SET_NUMBER_OF_FLOORS,
    payload: data
  });
};

export const setPropertyCondition = data => dispatch => {
  dispatch({
    type: SET_PROPERTY_CONDITION,
    payload: data
  });
};

export const setElectricalPower = data => dispatch => {
  dispatch({
    type: SET_ELECTRICAL_POWER,
    payload: data
  });
};

export const setFacingHouse = data => dispatch => {
  dispatch({
    type: SET_FACING_HOUSE,
    payload: data
  });
};

export const setYearOfDevelopment = data => dispatch => {
  dispatch({
    type: SET_YEAR_OF_DEVELOPMENT,
    payload: data
  });
};

export const setMaidRoom = data => dispatch => {
  dispatch({
    type: SET_MAID_ROOM,
    payload: data
  });
};
