import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StepperFooterV2, StepperHead } from "../../..";
import { prjSetBrosurId, prjSetImgPrjId, setAddressJson, setPrjAddress, setPrjBrochure, setPrjInfo, setPrjPhoto, setStepperTabIndex, prjSetSiteplanId, setPrjSiteplan, prjSetPricelistId, setPrjPricelist } from "../../../../../store/actions/changeUploadProjectReducer";
import { showModalFail } from "../../../../../store/actions/fetchData/superAdminState";
import _ from "lodash-contrib";


function Component({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepper, inputDetailProjectArr, dataAddressArr, inputDetailArr, addInfoArr, files, setFiles, inputs, setInputs, userStatus, dataAddress, setDataAddress, brochureFile, setBrochureFile, stringMinified, listClusterUnit, siteplanFile, setSiteplanFile, pricelistFile, setPricelistFile }) {
  const dispatch = useDispatch();
  const uploadProjectState = useSelector((state) => state.uploadProjectReducer);
  const [currentTabIndex, setCurrentTabIndex] = useState(uploadProjectState?.tabIndex),
    isLastStep = currentTabIndex === stepperContent.length - 1,
    isPrevBtn = currentTabIndex !== 0;

  const navigateToStepHandler = (index) => {
    if (index !== currentTabIndex) {
      dispatch(setStepperTabIndex(index));
      setCurrentTabIndex(index);
    }
  };

  const disableNextBtn = () => {
    if (currentTabIndex === 0) {
      if (inputDetailProjectArr.filter(Boolean).length !== 9 || dataAddressArr.filter(Boolean).length !== 15) {
        return true;
      } else {
        return false;
      }
    }
    if (listClusterUnit.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  const nextStepHandler = () => {
    if (currentTabIndex === 0) {
      if (inputDetailProjectArr.filter(Boolean).length !== 9 || dataAddressArr.filter(Boolean).length !== 15) {
        dispatch(showModalFail("Gagal", "Isian form detail proyek tidak valid"));
        if (!inputs?.tipeProperti?.value) {
          setInputs({ ...inputs, tipeProperti: { ...inputs.tipeProperti, isValid: false, msgError: "Pilih tipe properti" } });
        } else if (!inputs?.jenisProperti?.value) {
          setInputs({ ...inputs, jenisProperti: { ...inputs.jenisProperti, isValid: false, msgError: "Pilih jenis properti" } });
        }
      } else {
        if (!_.isEqual(inputs, uploadProjectState?.projectInfo)) {
          dispatch(setPrjInfo({ ...inputs }));
        }
        if (!_.isEqual(dataAddress, uploadProjectState?.address)) {
          dispatch(setPrjAddress({ ...dataAddress }));
        }
        if (!_.isEqual(stringMinified, uploadProjectState?.addressJson)) {
          dispatch(setAddressJson(stringMinified));
        }
        if (!_.isEqual(files, uploadProjectState?.projectPhoto)) {
          dispatch(prjSetImgPrjId(""));
          dispatch(setPrjPhoto(files));
        } else {
          dispatch(prjSetImgPrjId(uploadProjectState?.imageProjectId));
        }
        if (!_.isEqual(brochureFile.name, uploadProjectState?.brochure?.name)) {
          dispatch(prjSetBrosurId(""));
          dispatch(setPrjBrochure(brochureFile));
        } else {
          dispatch(prjSetBrosurId(uploadProjectState?.brosurProjectId));
        }
        if (siteplanFile.name) {
          dispatch(prjSetSiteplanId(""));
          dispatch(setPrjSiteplan(siteplanFile));
        } else {
          dispatch(prjSetSiteplanId(uploadProjectState?.siteplanId));
        }
        if (pricelistFile.name) {
          dispatch(prjSetPricelistId(""));
          dispatch(setPrjPricelist(pricelistFile));
        } else {
          dispatch(prjSetPricelistId(uploadProjectState?.pricelistId));
        }
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            dispatch(setStepperTabIndex(prev + 1));
            return prev + 1;
          }
        });
      }
    }
  };

  const previousStepHandler = () => {
    setInputs({ ...uploadProjectState?.projectInfo });
    setDataAddress({ ...uploadProjectState?.address });
    setFiles(uploadProjectState?.projectPhoto);
    setBrochureFile({ ...uploadProjectState?.brochure });
    setSiteplanFile({...uploadProjectState?.siteplan});
    setPricelistFile({...uploadProjectState?.pricelist});
    // console.log("[DEBUG] uploadProjectState : ", uploadProjectState);
    setCurrentTabIndex((prev) => {
      dispatch(setStepperTabIndex(prev - 1));
      return prev - 1;
    });
    stepperContent[currentTabIndex].isComplete = false;
  };

  const submitHandler = () => {
    submitStepper();
  };

  return (
    <div className="stepper-wrapper">
      <div style={{ display: isVertical ? 'flex' : 'block' }}>
        <div className="sellprops__wrapper">
          <StepperHead
            stepperContent={stepperContent}
            navigateToStepHandler={navigateToStepHandler}
            isVertical={isVertical}
            isInline={isInline}
            currentTabIndex={currentTabIndex}
            isRightToLeftLanguage={isRightToLeftLanguage}
          />
        </div>
        <div className="stepper-body">
          {stepperContent.map((el, i) => (
            <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
          ))}
        </div>
      </div>
      <StepperFooterV2
        isPrevBtn={isPrevBtn}
        previousStepHandler={previousStepHandler}
        isLastStep={isLastStep}
        nextStepHandler={nextStepHandler}
        submitHandler={submitHandler}
        stepperContent={stepperContent}
        currentTabIndex={currentTabIndex}
        type="sell"
        disableNextButton={disableNextBtn()}
      />
    </div>
  );
};

Component.propTypes = {
  stepperContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      clicked: PropTypes.func,
      isWarning: PropTypes.bool,
      isError: PropTypes.bool,
      isComplete: PropTypes.bool,
      isLoading: PropTypes.bool,
    })
  ),
  submitStepper: PropTypes.func.isRequired,
  isInline: PropTypes.bool,
  isVertical: PropTypes.bool,
  isRightToLeftLanguage: PropTypes.bool,
};

export default Component;