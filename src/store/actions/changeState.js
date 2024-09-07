import axios from "axios";
import {
  FILTER_SEARCH, FILTER_SALES_PROJECT, FS_LOADING, INPUT_OTP, LOADING, RESET_LOADING, RESET_STATE_LOGIN, SELECTED_BATHROOM, SELECTED_BEDROOM, SELECTED_CURRENCY, SELECTED_FILTER, SELECTED_GARAGE_CAR, SELECTED_PERIOD, SELECTED_PIC1,
  SELECTED_PIC2, SELECTED_PRICE, 
  SELECTED_PROPERTY_TYPE, SELECTED_SELL_BUY, SET_LONGLAT, SHOW_DETAIL_FROM_MAPS, SHOW_MODAL_LOGIN, SHOW_LINK_MODAL, SHOW_RINGKASAN_BUYER, SHOW_MODAL_REGISTER, SHOW_SINGLE_MODAL, SHOW_MODAL_FILTER, TEST_FETCH_MOVIE, UPLOAD_FILE, SHOW_MODAL_RATING
} from "./types";

export const showModalRegister = (data) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_REGISTER,
    payload: data,
  });
};

export const showModalLogin = (data) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_LOGIN,
    payload: data,
  });
};

export const showSingleModal = (data) => (dispatch) => {
  dispatch({
    type: SHOW_SINGLE_MODAL,
    payload: data,
  });
};

export const showModalRating = (data) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_RATING,
    payload: data,
  });
};

export const showModalFilter = (data) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_FILTER,
    payload: data,
  });
};

export const showLinkModal = (data) => (dispatch) => {
  dispatch({
    type: SHOW_LINK_MODAL,
    payload: data,
  });
};

export const showRingkasanBuyer = (data) => (dispatch) => {
  dispatch({
    type: SHOW_RINGKASAN_BUYER,
    payload: data,
  });
};
export const setLoading = () => {
  return {
    type: LOADING,
  };
};

export const changeInputOtp = (data) => (dispatch) => {
  dispatch({
    type: INPUT_OTP,
    payload: data,
  });
};

export const selectedSellBuy = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_SELL_BUY,
    payload: data,
  });
};

export const selectedPrice = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_PRICE,
    payload: data,
  });
};

export const selectedPropertyType = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_PROPERTY_TYPE,
    payload: data,
  });
};

export const selectedPic1 = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_PIC1,
    payload: data,
  });
};

export const selectedPic2 = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_PIC2,
    payload: data,
  });
};

export const selectedBedroom = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_BEDROOM,
    payload: data,
  });
};

export const selectedBathroom = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_BATHROOM,
    payload: data,
  });
};

export const selectedGarageCar = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_GARAGE_CAR,
    payload: data,
  });
};

export const selectedFilter = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_FILTER,
    payload: data,
  });
};

export const showDetailFromMaps = (data) => (dispatch) => {
  dispatch({
    type: SHOW_DETAIL_FROM_MAPS,
    payload: data,
  });
};

export const selectedCurrency = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_CURRENCY,
    payload: data,
  });
};

export const selectedPeriod = (data) => (dispatch) => {
  dispatch({
    type: SELECTED_PERIOD,
    payload: data,
  });
};

export const testFetchMovie = () => (dispatch) => {
  axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=5555a26c0571b1151d2f184b95759ec4&language=id&query=x-men&page=1&include_adult=true`)
    .then(res => {
      // console.log(res)
      dispatch({
        type: TEST_FETCH_MOVIE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const resetStateLogin = () => (dispatch) => {
  dispatch({type: RESET_STATE_LOGIN});
};

export const resetLoading = () => (dispatch) => {
  dispatch({type: RESET_LOADING});
};

export const fsLoading = (data) => (dispatch) => {
  dispatch({type: FS_LOADING, payload: data});
};

export const uploadingFile = (data) => (dispatch) => {
  dispatch({type: UPLOAD_FILE, payload: data});
};

export const filterSearch = (data) => (dispatch) => {
  dispatch({type: FILTER_SEARCH, payload: data});
};

export const filterSalesProject = (data) => (dispatch) => {
  dispatch({type: FILTER_SALES_PROJECT, payload: data});
};

export const setLongLat = (lng, lat) => (dispatch) => {
  dispatch({type: SET_LONGLAT, lng: lng, lat: lat,});
};