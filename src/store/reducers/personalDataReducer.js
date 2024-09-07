import { SET_DOB, SET_GENDER, SET_JANGKA_PERLINDUNGAN, SET_MARTIAL_STATUS, SET_UANG_TANGGUNGAN } from "../actions/types";

const initialState = {
  dob: "",
  gender: { id: "man", name: "Laki-Laki", unavailable: false },
  maritalStatus: "",
};

export default function PersonalDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOB:
      return {
        ...state,
        dob: action.payload,
      };
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    case SET_MARTIAL_STATUS:
      return {
        ...state,
        maritalStatus: action.payload,
      };
      case SET_UANG_TANGGUNGAN:
        return {
          ...state,
          uangTanggungan: action.payload,
        };
        case SET_JANGKA_PERLINDUNGAN:
          return {
            ...state,
            jangkaPerlindungan: action.payload,
          };
    default:
      return state;
  }
}
