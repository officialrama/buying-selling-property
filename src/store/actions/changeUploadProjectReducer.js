import { PRJ_ADDRESS, PRJ_ADDRESS_JSON, PRJ_BROCHURE, PRJ_CLS_INFO_DTO, PRJ_GRUP_PROP, PRJ_INFO, PRJ_PHOTO, PRJ_RESET, PRJ_SET_BROSUR_ID, PRJ_SET_ID_PROP, PRJ_SET_IMAGE_PRJ_ID, STEPPER_TAB_INDEX, PRJ_SITEPLAN, PRJ_PRICELIST, PRJ_SET_SITEPLAN_ID, PRJ_SET_PRICELIST_ID} from "./types";

export const setPrjInfo = data => dispatch => {
  dispatch({
    type: PRJ_INFO,
    payload: data
  });
};

export const setPrjClsInfoDto = data => dispatch => {
  dispatch({
    type: PRJ_CLS_INFO_DTO,
    payload: data
  });
};

export const setStepperTabIndex = data => dispatch => {
  dispatch({
    type: STEPPER_TAB_INDEX,
    payload: data
  });
};

export const setPrjPhoto = data => dispatch => {
  dispatch({
    type: PRJ_PHOTO,
    payload: data
  });
};

export const setPrjAddress = data => dispatch => {
  dispatch({
    type: PRJ_ADDRESS,
    payload: data
  });
};

export const setPrjBrochure = data => dispatch => {
  dispatch({
    type: PRJ_BROCHURE,
    payload: data
  });
};

export const setPrjSiteplan = data => dispatch => {
  dispatch({
    type: PRJ_SITEPLAN,
    payload: data
  })
}

export const setPrjPricelist = data => dispatch => {
  dispatch({
    type: PRJ_PRICELIST,
    payload: data
  })
}

export const setPrjGrupProp = data => dispatch => {
  dispatch({
    type: PRJ_GRUP_PROP,
    payload: data
  });
};

export const setAddressJson = data => dispatch => {
  dispatch({
    type: PRJ_ADDRESS_JSON,
    payload: data
  });
};

export const prjReset = () => dispatch => {
  dispatch({ type: PRJ_RESET });
};

export const prjSetIdProp = data => dispatch => {
  dispatch({ 
    type: PRJ_SET_ID_PROP,
    payload: data
  });
};

export const prjSetBrosurId = data => dispatch => {
  dispatch({ 
    type: PRJ_SET_BROSUR_ID,
    payload: data
  });
};

export const prjSetSiteplanId = data => dispatch => {
  dispatch({ 
    type: PRJ_SET_SITEPLAN_ID,
    payload: data
  });
};

export const prjSetPricelistId = data => dispatch => {
  dispatch({ 
    type: PRJ_SET_PRICELIST_ID,
    payload: data
  });
};
export const prjSetImgPrjId = data => dispatch => {
  dispatch({ 
    type: PRJ_SET_IMAGE_PRJ_ID,
    payload: data
  });
};