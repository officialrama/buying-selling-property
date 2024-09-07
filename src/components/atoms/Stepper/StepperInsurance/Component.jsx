import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StepperFooter, StepperFooterAsuransi, StepperHead } from "../..";
import { DetailsCard } from "../../../molecules";
import { showModalFail } from '../../../../store/actions/fetchData/superAdminState';
import { dokuPayment } from "../../../../store/actions/fetchData/salesReferral";
import { checkVisitorNik, checkVisitorPhone } from "../../../../store/actions/fetchData/uploadFile";
import { Breadcrumb } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Component({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepperKprVisitor, inputStep1Arr, dataAddressArr, inputUtjArr, selectedOption, itemBrivaVisitor, inputs, namebreadcrumb, hrefbreadcrumb }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0),
    isLastStep = currentTabIndex === stepperContent.length - 1,
    isPrevBtn = currentTabIndex !== 0;

  const navigateToStepHandler = (index) => {
    if (index !== currentTabIndex) {
      setCurrentTabIndex(index);
    }
  };
  const nextStepHandler = () => {
    if (currentTabIndex === 0) {
      if (inputStep1Arr.filter(Boolean).length !== 7 || dataAddressArr.filter(Boolean).length !== 12) {
        dispatch(showModalFail("Gagal", "Isian form data diri tidak valid"));
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
    submitStepperKprVisitor();
  };

  return (
    <div className="stepper-wrapper">
      <div className="mobile:p-0">
        <div className="max-w-5xl mx-auto mb-[16px]">
        <div className="gap-[4px] py-[16px] ml-4">
      <Breadcrumb>
        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item href='/insurance'>
      <span className="text-sm text-[#1078CA] font-semibold">
          Asuransi
          </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item href={hrefbreadcrumb}>
      <span className="text-sm text-[#1078CA] font-semibold">
      {currentTabIndex === 1 ? "..." : namebreadcrumb}
          </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
      <span className="text-sm text-[#777777] font-semibold">
      {currentTabIndex === 1 ? "Ringkasan Data" : "BRI Life - Pengisian Data"}
          </span>
      </Breadcrumb.Item>
    </Breadcrumb>
    </div>
    <p className="kprApproval__pages__title text-[#292929] ml-4">
          {currentTabIndex === 1 ? "Ringkasan" : "Pengisian Data Pemegang Polis"}
        </p>
          <div style={{ display: "block" }}>
            {/* <div className="mb-6">
              <StepperHead
                stepperContent={stepperContent}
                navigateToStepHandler={navigateToStepHandler}
                isVertical={isVertical}
                isInline={isInline}
                currentTabIndex={currentTabIndex}
                isRightToLeftLanguage={isRightToLeftLanguage}
              />
            </div> */}
            <div>
                <div className="kprApproval__pages__detailsCard__childWrapper">
                  {stepperContent.map((el, i) => (
                    <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
                  ))}
                  <div className="flex justify-end items-end bg-white w-full h-[85px] pb-8 pt-4 sticky bottom-0 z-30">
                  <StepperFooterAsuransi
                    isPrevBtn={isPrevBtn}
                    previousStepHandler={previousStepHandler}
                    isLastStep={isLastStep}
                    nextStepHandler={nextStepHandler}
                    submitHandler={submitHandler}
                    stepperContent={stepperContent}
                    currentTabIndex={currentTabIndex}
                    type="kpr-approval"
                  // disableNextButton={true}
                  />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
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