import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StepperFooter, StepperHead } from "../..";
import { showModalFail } from "../../../../store/actions/fetchData/superAdminState";


function Component({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepper, disableNextButton, inputAlamatArr, dataAddressArr, inputDetailArr, addInfoArr, files, inputs, setInputs, userStatus }) {
  const dispatch = useDispatch();
  const [currentTabIndex, setCurrentTabIndex] = useState(0),
    isLastStep = currentTabIndex === stepperContent.length - 1,
    isPrevBtn = currentTabIndex !== 0;

  const navigateToStepHandler = (index) => {
    if (index !== currentTabIndex) {
      setCurrentTabIndex(index);
    }
  };

  const disableNextBtn = () => {
    if (currentTabIndex === 0) {
      if (inputAlamatArr.filter(Boolean).length !== 2 || dataAddressArr.filter(Boolean).length !== 15) {
        return true;
      } else {
        return false;
      }
    } else if (currentTabIndex === 1) {
      if (userStatus === "developer" && inputDetailArr.filter(Boolean).length < 10) {
        return true;
      } else if (userStatus === "visitor" && inputDetailArr.filter(Boolean).length !== 8) {
        return true;
      } else {
        return false;
      }
    } else if (currentTabIndex === 2) {
      if (addInfoArr.filter(Boolean).length !== 7) {
        return true;
      } else {
        return false;
      }  
    } else if (currentTabIndex === 3) {
      if (files.length < 4) {
        return true;
      } else {
        return false;  
      }
    } else {
      return false;
    }
  }

  const nextStepHandler = () => {
    if (currentTabIndex === 0) {
      if (inputAlamatArr.filter(Boolean).length !== 2 || dataAddressArr.filter(Boolean).length !== 15) {
        dispatch(showModalFail("Gagal", "Isian form alamat tidak valid"));
        if (!inputs?.tipeProperti?.value) {
          setInputs({ ...inputs, tipeProperti: { ...inputs.tipeProperti, isValid: false, msgError: "Pilih tipe properti" } });
        } else if (!inputs?.jenisProperti?.value) {
          setInputs({ ...inputs, jenisProperti: { ...inputs.jenisProperti, isValid: false, msgError: "Pilih jenis properti" } });
        }
      } else {
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            return prev + 1;
          }
        });
      }
    } else if (currentTabIndex === 1) {
      if (userStatus === "developer" && inputDetailArr.filter(Boolean).length < 10) {
        dispatch(showModalFail("Gagal", "Isian form detail properti tidak valid"));
      } else if (userStatus === "visitor" && inputDetailArr.filter(Boolean).length !== 8) {
        dispatch(showModalFail("Gagal", "Isian form detail properti tidak valid"));
      } else {
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            return prev + 1;
          }
        });
      }
    } else if (currentTabIndex === 2) {
      if (addInfoArr.filter(Boolean).length !== 7) {
        dispatch(showModalFail("Gagal", "Isian form informasi tambahan tidak valid"));
      } else {
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            return prev + 1;
          }
        });
      }
    } else {
      setCurrentTabIndex((prev) => {
        if (prev !== stepperContent.length - 1) {
          stepperContent[currentTabIndex].isComplete = true;
          return prev + 1;
        }
      });
    }

  };

  const previousStepHandler = () => {
    setCurrentTabIndex((prev) => prev - 1);
    stepperContent[currentTabIndex].isComplete = false;
  };

  const submitHandler = () => {
    if (files.length < 4) {
      dispatch(showModalFail("Gagal", "Upload foto properti sebanyak 4 item"));
    } else {
      submitStepper();
    }
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
      <StepperFooter
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