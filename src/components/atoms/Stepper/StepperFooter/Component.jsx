import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import React from "react";

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
            ? "flex flex-row gap-x-2 mobile:w-auto mobile:self-stretch self-end mr-1"
            : ""
      }
    >
      <div className="flex flex-row gap-2 justify-end">
        <div>
          <Button
            className="text-[#1078CA] bg-[#FFFF] sm:w-[202px] sm:h-[48px] font-bold border-[#1078CA] border-[2px]"
            paddingSize={"padding-0"}
            onClick={previousStepHandler}
            disabled={isPrevBtn === false ? true : false}
          >
            Sebelumnya
          </Button>
        </div>
      <div>
        <Button
          className="bg-[#1078CA] text-[#FFFFFF] sm:w-[202px] sm:h-[48px] disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6] font-bold whitespace-nowrap"
          paddingSize={"padding-0"}
          disabled={disableNextButton}
          onClick={isLastStep ? submitHandler : stepperContent[currentTabIndex].clicked ? submitCurrentStep : nextStepHandler}
        >
          {isLastStep && type === "sell"
            ? "Publikasi"
            : isLastStep && type === "kpr-approval"
              ? "Lanjutkan Pengajuan"
              : "Selanjutnya"}
        </Button>
      </div>
      </div>
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
