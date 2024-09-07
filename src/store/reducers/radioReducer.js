import { SET_CASH_SUBMISSION, SET_FILTER_PROPERTYTYPE, SET_FILTER_TYPEOFPROPERTY, SET_KPR_BRI, SET_KPR_BRISYARIAH, SET_KPR_SUBMISSION, SET_QUESTION_BEFORE_CHAT, SET_SELLPROPS_PROPERTYTYPE, SET_SELLPROPS_TYPEOFPROPERTY } from '../actions/types';

const initialState = {
  cashSubmission: false,
  kprSubmission: false,
  kprBrisyariah: false,
  kprBri: false,
  sellProps: {
    groupProperti: "",
    tipeProperti: ""
  },
  filter: {
    typeOfProperty: ""
  },
  questionBeforeChat: ""
};

export default function RadioReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CASH_SUBMISSION:
      return {
        ...initialState,
        cashSubmission: action.payload
      };
    case SET_KPR_SUBMISSION:
      return {
        ...initialState,
        kprSubmission: action.payload
      };
    case SET_KPR_BRISYARIAH:
      return {
        ...initialState,
        kprBrisyariah: action.payload
      };
    case SET_KPR_BRI:
      return {
        ...initialState,
        kprBri: action.payload
      };
    case SET_SELLPROPS_TYPEOFPROPERTY:
      return {
        ...state,
        sellProps: {
          ...state.sellProps,
          groupProperti: action.payload
        }
      };
    case SET_SELLPROPS_PROPERTYTYPE:
      return {
        ...state,
        sellProps: {
          ...state.sellProps,
          tipeProperti: action.payload
        }
      };
    case SET_FILTER_TYPEOFPROPERTY:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeOfProperty: action.payload
        }
      };
    case SET_FILTER_PROPERTYTYPE:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeOfProperty: action.payload
        }
      };
    case SET_QUESTION_BEFORE_CHAT:
      return {
        ...state,
        questionBeforeChat: action.payload
      };
    default:
      return initialState;
  }
}
