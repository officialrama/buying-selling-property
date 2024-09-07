import { SET_MIN_PRICE, SET_MAX_PRICE } from '../actions/types';

const initialState = {
  minPrice: "Rp0" ,
  maxPrice: "Rp0"
};

export default function SliderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload
      };
    case SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload
      };
    default:
      return state;
  }
}
