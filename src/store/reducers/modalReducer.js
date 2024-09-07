import { SHOW_APPROVAL_KPR_MODAL, SHOW_BRIVA_MODAL, SHOW_CHAT, SHOW_CONF_LOGOUT, SHOW_METHOD_PAYMENT_MODAL, SHOW_USER_PAYMENT_MODAL , SHOW_SELECT_QUESTION, SHOW_SUCCESS_SELL } from '../actions/types';

const initialState = {
  showMethodPaymentModal: false,
  showUserPaymentModal: false,
  showBrivaModal: false,
  showApprovalKprModal: false,
  showSuccessSell: false,
  showSelectQuestion: false,
  showChat: false,
  showConfLogout: false
};

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_METHOD_PAYMENT_MODAL:
      return {
        ...state,
        showMethodPaymentModal: action.payload
      };
      case SHOW_USER_PAYMENT_MODAL:
      return {
        ...state,
        showUserPaymentModal: action.payload
      };
    case SHOW_BRIVA_MODAL:
      return {
        ...state,
        showBrivaModal: action.payload
      };
    case SHOW_APPROVAL_KPR_MODAL:
      return {
        ...state,
        showApprovalKprModal: action.payload
      };
    case SHOW_SUCCESS_SELL:
      return {
        ...state,
        showSuccessSell: action.payload
      };
    case SHOW_SELECT_QUESTION:
      return {
        ...state,
        showSelectQuestion: action.payload
      };
    case SHOW_CHAT:
      return {
        ...state,
        showSelectQuestion: false,
        showChat: action.payload
      };
    case SHOW_CONF_LOGOUT:
      return {
        ...state,
        showConfLogout: action.payload
      };
    default:
      return state;
  }
}
