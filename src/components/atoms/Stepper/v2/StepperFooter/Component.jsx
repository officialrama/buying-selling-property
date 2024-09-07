import PropTypes from "prop-types";
import React from "react";
import Button from "../../../Button/Component";

function Component({
  isPrevBtn,
  previousStepHandler,
  isLastStep,
  nextStepHandler,
  submitHandler,
  stepperContent,
  currentTabIndex,
  type,
  disableNextButton
}) {
  const submitCurrentStep = async () => {
    await stepperContent[currentTabIndex].clicked();
    stepperContent[currentTabIndex].isComplete = true;
    nextStepHandler();
  };

  return (
    <div
      className={
        type === "sell"
          ? "sellprops__button-next-prev"
          : type === "kpr-approval"
            ? "kprApproval__button-next-prev"
            : ""
      }
    >
      {currentTabIndex >= 1 &&
        <Button
          buttonColor={isPrevBtn === false ? "grayBorderOnly" : "blueLight"}
          textColor={isPrevBtn === false ? "gray" : "blue"}
          fullWidth={true}
          paddingSize={"padding-0"}
          onClick={previousStepHandler}
          disabled={isPrevBtn === false ? true : false}
        >
          Kembali
        </Button>
      }
      <Button
        buttonColor="blue"
        textColor="white"
        fullWidth={true}
        paddingSize={"padding-0"}
        disabled={disableNextButton}
        onClick={isLastStep ? submitHandler : stepperContent[currentTabIndex].clicked ? submitCurrentStep : nextStepHandler}
      >
        {isLastStep ? "Simpan" : "Selanjutnya"}
      </Button>
    </div>
  );
}

Component.propTypes = {
  isPrevBtn: PropTypes.bool,
  previousStepHandler: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool,
  nextStepHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  currentTabIndex: PropTypes.number.isRequired,
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
  type: PropTypes.string.isRequired,
  disableNextButton: PropTypes.bool
};

export default Component;
