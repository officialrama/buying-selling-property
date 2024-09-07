import { combineReducers } from "redux";
import stateReducer from "./stateReducers";
import personalDataReducer from "./personalDataReducer";
import modalReducer from "./modalReducer";
import radioReducer from "./radioReducer";
import dropdownReducer from "./dropdownReducer";
import sliderReducer from "./sliderReducer";
import loginReducer from "./loginReducer";
import sellPropertyReducer from "./sellPropertyReducer";
import superAdminReducer from "./superAdminReducer";
import uploadProjectReducer from "./uploadProjectReducer";
import { paginationReducer } from "./paginationReducer";

export default combineReducers({
  stateReducer: stateReducer,
  personalDataReducer: personalDataReducer,
  modalReducer: modalReducer,
  radioReducer: radioReducer,
  dropdownReducer: dropdownReducer,
  sliderReducer: sliderReducer,
  loginReducer: loginReducer,
  sellPropertyReducer: sellPropertyReducer,
  superAdminReducer: superAdminReducer,
  uploadProjectReducer: uploadProjectReducer,
  paginationReducer: paginationReducer,
});
