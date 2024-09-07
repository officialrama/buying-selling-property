import {
  NEXT_PAGE,
  PREV_PAGE,
  NEXT_PAGE_JUMPER,
  SET_PAGE_DATA,
  SET_PAGE_DATA_ERROR,
  SET_PAGE_DATA_NEXT,
  SET_PAGE_SEARCH,
  SET_NEXT_PAGE_LOADING,
  REMOVE_PAGINATION_DATA,
  RESET_PAGINATION_PAGE,
} from "../actions/types";

const initialState = {
  currentPage: 0,
  nextPageJumper: 1,
  data: [],
  nextData: [],
  error: null,
  loading: false,
  bodyRequest: {
    email: "",
    status: "draft",
    pageStart: 0,
    sortBy: "created_at",
    sortDirection: "desc",
  },
  search: "",
};

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case PREV_PAGE:
      if (state.currentPage === 0 && state.nextPageJumper === 1) {
        return {
          ...state,
          currentPage: 0,
          nextPageJumper: 1,
        };
      }

      return {
        ...state,
        currentPage: state.currentPage - 1,
        nextPageJumper: state.nextPageJumper - 1,
      };

    case NEXT_PAGE_JUMPER:
      return {
        ...state,
        nextPageJumper: state.nextPageJumper + 1,
      };

    case SET_PAGE_DATA:
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case SET_PAGE_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_PAGE_DATA_NEXT:
      return {
        ...state,
        nextData: action.payload,
        error: null,
      };

    case SET_PAGE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case SET_NEXT_PAGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case REMOVE_PAGINATION_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case RESET_PAGINATION_PAGE:
      return {
        ...state,
        currentPage: 0,
        nextPageJumper: 1,
      };

    default:
      return state;
  }
};
