import {
  FILTER_SEARCH, FILTER_SALES_PROJECT, FS_LOADING, INPUT_OTP, LOADING, RESET_LOADING, SELECTED_BATHROOM, SELECTED_BEDROOM, SELECTED_CURRENCY, SELECTED_FILTER, SELECTED_GARAGE_CAR, SELECTED_PERIOD, SELECTED_PIC1,
  SELECTED_PIC2, SELECTED_PRICE,
  SELECTED_PROPERTY_TYPE, SELECTED_SELL_BUY, SET_LONGLAT, SHOW_DETAIL_FROM_MAPS, SHOW_MODAL_LOGIN, SHOW_MODAL_REGISTER, SHOW_SINGLE_MODAL, SHOW_MODAL_FILTER, SHOW_LINK_MODAL, SHOW_RINGKASAN_BUYER, TEST_FETCH_MOVIE, UPLOAD_FILE,SET_WISHLIST,SET_ACTIVATION,SET_MESSAGE_ERROR, SHOW_MODAL_RATING
} from "../actions/types";

const initialState = {
  showModalRegister: false,
  showModalLogin: false,
  showSingleModal: false,
  showLinkModal: false,
  showRingkasanBuyer: false,
  loading: false,
  inputOtp: "",
  select: {
    sellBuy: "",
    price: "",
    propertyType: "",
    bedroom: "",
    bathroom: "",
    filter: "",
    currency: "",
    period: "",
    garageCar: "",
  },
  showDetailFromMaps: false,
  showModalFilter: false,
  testFetchMovie: "",
  fsLoading: false,
  uploadFile: false,
  filterSearch: {},
  filterSalesProject: {},
  lat: 0,
  lng: 0,
  ownedBy: "",
  activation: "",
  messageError: ""
};


export default function StateReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL_REGISTER:
      return {
        ...state,
        showModalRegister: action.payload,
        loading: false,
      };
    case SHOW_MODAL_LOGIN:
      return {
        ...state,
        showModalLogin: action.payload,
        loading: false,
      };
    case SHOW_SINGLE_MODAL:
      return {
        ...state,
        showSingleModal: action.payload,
      };
      case SHOW_MODAL_FILTER:
        return {
          ...state,
          showModalFilter: action.payload,
        };
        case SHOW_MODAL_RATING:
          return {
            ...state,
            showModalRating: action.payload,
          };
      case SHOW_LINK_MODAL:
      return {
        ...state,
        showLinkModal: action.payload,
      };
      case SHOW_RINGKASAN_BUYER:
        return {
          ...state,
          showRingkasanBuyer: action.payload,
        };
        
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case INPUT_OTP:
      return {
        ...state,
        inputOtp: action.payload,
      };
    case SELECTED_SELL_BUY:
      return {
        ...state,
        select: {
          ...state.select,
          sellBuy: action.payload,
        },
      };
    case SELECTED_PRICE:
      return {
        ...state,
        select: {
          ...state.select,
          price: action.payload,
        },
      };
    case SELECTED_PROPERTY_TYPE:
      return {
        ...state,
        select: {
          ...state.select,
          propertyType: action.payload,
        },
      };
    case SELECTED_PIC1:
      return {
        ...state,
        select: {
          ...state.select,
          pic: action.payload,
        },
      };
    case SELECTED_PIC2:
      return {
        ...state,
        select: {
          ...state.select,
          pic: action.payload,
        },
      };
    case SELECTED_BEDROOM:
      return {
        ...state,
        select: {
          ...state.select,
          bedroom: action.payload,
        },
      };
    case SELECTED_BATHROOM:
      return {
        ...state,
        select: {
          ...state.select,
          bathroom: action.payload,
        },
      };
    case SELECTED_GARAGE_CAR:
      return {
        ...state,
        select: {
          ...state.select,
          garageCar: action.payload,
        },
      };
    case SELECTED_FILTER:
      return {
        ...state,
        select: {
          ...state.select,
          filter: action.payload,
        },
      };
    case SHOW_DETAIL_FROM_MAPS:
      return {
        ...state,
        showDetailFromMaps: action.payload,
      };
    case SELECTED_CURRENCY:
      return {
        ...state,
        select: {
          ...state.select,
          currency: action.payload,
        },
      };
    case SELECTED_PERIOD:
      return {
        ...state,
        select: {
          ...state.select,
          period: action.payload,
        },
      };
    case TEST_FETCH_MOVIE:
      return {
        ...state,
        testFetchMovie: action.payload
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: false
      };
    case FS_LOADING:
      return {
        ...state,
        fsLoading: action.payload
      };
    case UPLOAD_FILE:
      return {
        ...state,
        uploadFile: action.payload
      };
    case FILTER_SEARCH:
      return {
        ...state,
        filterSearch: action.payload
      };
    case FILTER_SALES_PROJECT:
      return {
        ...state,
        filterSalesProject: action.payload
      };
    case SET_LONGLAT:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    case SET_WISHLIST:
       return {
        ...state,
        ownedBy: action.ownedBy
      };
    case SET_ACTIVATION:
       return {
        ...state,
        activation: action.activation
      };
    case SET_MESSAGE_ERROR:
      return {
        ...state,
        messageError: action.payload
      }      
    default:
      return state;
  }
}
