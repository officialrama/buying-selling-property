import { DEV_NAME, INQUIRY_DATI2 } from '../actions/types';

const initialState = {
  devName: "",
  dati2: {
    kodePos: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: ""
  },
  inquiryDetail: {}
};

export default function SellPropertyReducer(state = initialState, action) {
  switch (action.type) {
    case DEV_NAME: 
    return {
      ...state,
      devName: action.payload
    }
    case INQUIRY_DATI2:
      return {
        ...state,
        dati2: {
          ...state.dati2,
          kodePos: action.payload.kode_pos,
          provinsi: action.payload.PROPINSI,
          kabupaten: action.payload.dati2,
          kecamatan: action.payload.kecamatan,
          kelurahan: action.payload.kelurahan
        }
      };
    default:
      return state;
  }
}
