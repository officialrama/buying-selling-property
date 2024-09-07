import {
  SET_JENIS_SUKU_BUNGA,
  SET_JENIS_SUBSIDI,
  SET_FIXED_CREDIT,
  SET_CERTIFICATE,
  SET_PROPERTY_CONDITION,
  SET_ELECTRICAL_POWER,
  SET_FACING_HOUSE,
  SET_NUMBER_OF_FLOORS,
  SET_YEAR_OF_DEVELOPMENT,
  SET_MAID_ROOM,
} from "../actions/types";

const initialState = {
  jenisSukuBunga: "",
  jenisSubsidi: "",
  kprBrisyariah: "",
  kprBri: "",
  fixedCredit: "",
  additionalInfoProp: {
    certificate: "",
    numberOfFloors: "",
    propertyCondition: "",
    electricalPower: "",
    facingHouse: "",
    yearOfDevelopment: "",
    maidRoom: "",
  },
};

export default function DropdownReducer(state = initialState, action) {
  switch (action.type) {
    case SET_JENIS_SUKU_BUNGA:
      return {
        ...state,
        jenisSukuBunga: action.payload,
      };
    case SET_JENIS_SUBSIDI:
      return {
        ...state,
        jenisSubsidi: action.payload,
      };
    case SET_FIXED_CREDIT:
      return {
        ...state,
        fixedCredit: action.payload,
      };
    case SET_CERTIFICATE:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          certificate: action.payload,
        },
      };
    case SET_NUMBER_OF_FLOORS:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          numberOfFloors: action.payload,
        },
      };
    case SET_PROPERTY_CONDITION:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          propertyCondition: action.payload,
        },
      };
    case SET_ELECTRICAL_POWER:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          electricalPower: action.payload,
        },
      };
    case SET_FACING_HOUSE:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          facingHouse: action.payload,
        },
      };
    case SET_YEAR_OF_DEVELOPMENT:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          yearOfDevelopment: action.payload,
        },
      };
    case SET_MAID_ROOM:
      return {
        ...state,
        additionalInfoProp: {
          ...state.additionalInfoProp,
          maidRoom: action.payload,
        },
      };
    default:
      return state;
  }
}
