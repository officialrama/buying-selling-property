import { SET_MIN_PRICE, SET_MAX_PRICE } from "./types";

export const setMinPrice = data => dispatch => {
  dispatch({
    type: SET_MIN_PRICE,
    payload: data
  });
};

export const setMaxPrice = data => dispatch => {
  dispatch({
    type: SET_MAX_PRICE,
    payload: data
  });
};
