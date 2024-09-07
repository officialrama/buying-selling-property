import {
  LOADING,
  NEXT_PAGE,
  NEXT_PAGE_JUMPER,
  PREV_PAGE,
  SET_PAGE_DATA,
  SET_PAGE_DATA_ERROR,
  SET_PAGE_DATA_NEXT,
  SET_NEXT_PAGE_LOADING,
  REMOVE_PAGINATION_DATA,
  RESET_PAGINATION_PAGE,
} from "./types";
import { fetchPost } from "../../helpers/fetchApi";
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { decryptStr } from "../../helpers/encryptDecrypt";

const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

const prevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

const nextPageJumper = () => {
  return {
    type: NEXT_PAGE_JUMPER,
  };
};

const fetchPage = (body) => (dispatch) => {
  dispatch({ type: SET_NEXT_PAGE_LOADING, payload: true });
  fetchPost(`${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/user/project/list`, {
    ...body,
    email: _.isJSON(cookie.get("morgateCookie")) && JSON.parse(cookie.get("morgateCookie")).email,
  })
    .then((res) => {
      dispatch({ type: SET_NEXT_PAGE_LOADING, payload: false });
      if (res.data.responseCode === "00") {
        dispatch({
          type: SET_PAGE_DATA,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: SET_PAGE_DATA_ERROR,
        payload: err,
      });
    });
};

const fetchNextPage = (body) => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  fetchPost(`${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/user/project/list`, {
    ...body,
    email: _.isJSON(cookie.get("morgateCookie")) && JSON.parse(cookie.get("morgateCookie")).email,
  })
    .then((res) => {
      dispatch({ type: LOADING, payload: false });
      if (res.data.responseCode === "00") {
        dispatch({
          type: SET_PAGE_DATA_NEXT,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: LOADING, payload: false });
      dispatch({
        type: SET_PAGE_DATA_ERROR,
        payload: err,
      });
    });
};

const removePaginationData =
  ({ id, data }) =>
  (dispatch) => {

    const filteredData = data.responseData.filter((item) => {
      return decryptStr(item.id) !== id;
    });

    const newData = {
      ...data,
      responseData: filteredData,
    };
    dispatch({
      type: REMOVE_PAGINATION_DATA,
      payload: newData,
    });
  };

const resetPaginationPage = () => {
  return {
    type: RESET_PAGINATION_PAGE,
  };
};

export {
  nextPage,
  nextPageJumper,
  prevPage,
  fetchPage,
  fetchNextPage,
  removePaginationData,
  resetPaginationPage,
};
