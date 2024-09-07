import { PRJ_ADDRESS, PRJ_ADDRESS_JSON, PRJ_BROCHURE, PRJ_CLS_INFO_DTO, PRJ_GRUP_PROP, PRJ_IMAGE_PROP, PRJ_IMAGE_PROP_INQUIRY, PRJ_INFO, PRJ_PHOTO, PRJ_PHOTO_INQUIRY, PRJ_PROPERTI, PRJ_RESET, PRJ_SET_BROSUR_ID, PRJ_SET_ID_PROP, PRJ_SET_IMAGE_PRJ_ID, PRJ_SET_IMAGE_PROP_ID, STEPPER_TAB_INDEX, PRJ_SET_SITEPLAN_ID, PRJ_SITEPLAN, PRJ_SET_PRICELIST_ID, PRJ_PRICELIST } from "../actions/types";

const initialState = {
  projectInfo: {},
  clusterInfoDto: {},
  properti: {},
  tabIndex: 0,
  projectPhoto: [],
  address: {},
  addressJson: {},
  brochure: {},
  siteplan: {},
  pricelist: {},
  groupProperti: "",
  idProperty: 0,
  brosurProjectId: "",
  siteplanId: "",
  pricelistId: "",
  imageProjectId: "",
  imagePropertiId: "",
  propPhoto: []
};

export default function UploadProjectReducer(state = initialState, action) {
  switch (action.type) {
    case PRJ_INFO:
      return {
        ...state,
        projectInfo: action.payload,
      };
    case PRJ_CLS_INFO_DTO:
      return {
        ...state,
        clusterInfoDto: action.payload,
      };
    case PRJ_PROPERTI:
      return {
        ...state,
        properti: action.payload,
      };
    case STEPPER_TAB_INDEX:
      return {
        ...state,
        tabIndex: action.payload,
      };
    case PRJ_PHOTO:
      return {
        ...state,
        projectPhoto: action.payload,
      };
    case PRJ_PHOTO_INQUIRY:
      return {
        ...state,
        projectPhoto: [...state.projectPhoto, action.payload],
      };
    case PRJ_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case PRJ_BROCHURE:
      return {
        ...state,
        brochure: action.payload,
      };
    case PRJ_SITEPLAN:
      return {
        ...state,
        siteplan: action.payload,
      };    
    case PRJ_PRICELIST:
      return {
        ...state,
        pricelist: action.payload,
      };       
    case PRJ_GRUP_PROP:
      return {
        ...state,
        groupProperti: action.payload,
      };
    case PRJ_ADDRESS_JSON:
      return {
        ...state,
        addressJson: action.payload
      }
    case PRJ_RESET:
      return {
        ...initialState,
      }
    case PRJ_SET_ID_PROP:
      return {
        ...state,
        idProperty: action.payload
      }
    case PRJ_SET_BROSUR_ID:
      return {
        ...state,
        brosurProjectId: action.payload
      }
    case PRJ_SET_SITEPLAN_ID:
      return {
        ...state,
        siteplanId: action.payload
      }
    case PRJ_SET_PRICELIST_ID:
      return {
        ...state,
        pricelistId: action.payload
      }
    case PRJ_SET_IMAGE_PRJ_ID:
      return {
        ...state,
        imageProjectId: action.payload
      }
    case PRJ_SET_IMAGE_PROP_ID:
      return {
        ...state,
        imagePropertiId: action.payload
      }
    case PRJ_IMAGE_PROP:
      return {
        ...state,
        propPhoto: action.payload
      }
    case PRJ_IMAGE_PROP_INQUIRY:
      return {
        ...state,
        propPhoto: [...state.propPhoto, action.payload],
      };
    default:
      return state;
  }
}