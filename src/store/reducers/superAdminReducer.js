import { SuccessRegisterV2 } from '../../components/organisms';
import { SA_EDIT, SA_EDIT_MODE, SA_FAIL, SA_REDIRECT, SA_RESAPI, SA_RESET, SA_SUCCESS, SA_SUCCESSINPUTREGISTER, SA_SUCCESSPENGAJUAN, SA_SUCCESSREGISTERV2, SHOW_ADM_MENU } from '../actions/types';

const initialState = {
  success: false,
  successPengajuan: false,
  fail: false,
  redirect: false,
  titleSuccess: "",
  msgSuccess: "",
  titleSuccessPengajuan: "",
  msgSuccessPengajuan: "",
  titleFail: "",
  msgFail: "",
  resApi: {},
  disableEdit: false,
  editMode: false,
  showAdmMenu: false
};

export default function SuperAdminReducer(state = initialState, action) {
  switch (action.type) {
    case SA_SUCCESS:
      return {
        ...state,
        success: action.state,
        titleSuccess: action.title,
        msgSuccess: action.msg
      };
      case SA_SUCCESSPENGAJUAN:
        return {
          ...state,
          successPengajuan: action.state,
          titleSuccessPengajuan: action.title,
          msgSuccessPengajuan: action.msg
        };
      case SA_SUCCESSREGISTERV2:
          return {
            ...state,
            successRegisterV2: action.state,
            titlesuccessRegisterV2: action.title,
            msgsuccessRegisterV2: action.msg
          };
      case SA_SUCCESSINPUTREGISTER:
            return {
              ...state,
              successInputRegister: action.state,
              titlesuccessInputRegister: action.title,
              msgsuccessInputRegister: action.msg
            };
    case SA_FAIL:
      return {
        ...state,
        fail: action.state,
        titleFail: action.title,
        msgFail: action.msg
      };
    case SA_REDIRECT:
      return {
        ...state,
        redirect: action.payload
      };
    case SA_RESAPI:
      return {
        ...state,
        resApi: action.payload || {}
      };
    case SA_EDIT:
      return {
        ...state,
        disableEdit: action.payload
      };
    case SA_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload
      };
    case SA_RESET:
      return {
        ...initialState
      };
    case SHOW_ADM_MENU:
      return {
        ...state,
        showAdmMenu: action.payload
      };
    default:
      return state;
  }
}
