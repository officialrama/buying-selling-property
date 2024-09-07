import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StepperFooter, StepperFooterCS, StepperHead } from "../..";
import { DetailsCard } from "../../../molecules";
import { showModalFail } from '../../../../store/actions/fetchData/superAdminState';
import { dokuPayment } from "../../../../store/actions/fetchData/salesReferral";
import { checkVisitorNik, checkVisitorPhone } from "../../../../store/actions/fetchData/uploadFile";
import { Breadcrumb } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Component({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepperKprVisitor, inputStep1Arr, dataAddressArr, calcKPRSimArr, addressPropertiArr, inputPropertiArr, selectedOption, itemBrivaVisitor, inputs, setComplete }) {
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

  const[itemCheckVisitorNik, setItemCheckVisitorNik] = useState();
  const[itemCheckVisitorPhone, setItemCheckVisitorPhone] = useState();

  useEffect(() => {
    dispatch(
      checkVisitorNik(inputs, setItemCheckVisitorNik)
    )
  }, [inputs?.nik?.value]);

  useEffect(() => {
    dispatch(
      checkVisitorPhone(inputs, setItemCheckVisitorPhone)
    )
  }, [inputs?.mobileNo?.value]);

  const nextStepHandler = () => {
     if (currentTabIndex === 0) {
      if (inputPropertiArr.filter(Boolean).length !== 3 || addressPropertiArr.filter(Boolean).length !== 15 || calcKPRSimArr.filter(Boolean).length !== 3) {
        dispatch(showModalFail("Gagal", "Isian data properti tidak valid"));
      } else {
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            return prev + 1;
          }
        });
      }
    } else if (currentTabIndex === 1) {
      if (inputStep1Arr.filter(Boolean).length !== 12 || dataAddressArr.filter(Boolean).length !== 15) {
        dispatch(showModalFail("Gagal", "Isian form data diri tidak valid"));
      } else if(itemCheckVisitorNik?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "NIK sudah dalam pengajuan KPR!"));
      } else if(itemCheckVisitorPhone?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "Silakan gunakan No. HP yang belum terdaftar!"));
      } else if(itemCheckVisitorNik?.data?.responseCode !== "00" && itemCheckVisitorPhone?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "NIK dan No. HP sudah digunakan, Silakan gunakan NIK dan No. HP yang belum terdaftar!"));
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

  useEffect(() => {
    if(currentTabIndex === 1 || currentTabIndex === 2){
      setComplete(true)
    } else {
      setComplete(false)
    }
  },[currentTabIndex])

  const previousStepHandler = () => {
    setCurrentTabIndex((prev) => prev - 1);
    stepperContent[currentTabIndex].isComplete = false;
  };

  const submitHandler = () => {
    submitStepperKprVisitor();
  };

  const detailProperti = JSON.parse(localStorage.getItem('detailProperti'))

  return (
    <div className="stepper-wrapper">
      <div className="mobile:p-0">
        <div className="max-w-5xl mx-auto mb-[16px] my-0">
      <div className="gap-[4px] px-7 mt-4">
      <Breadcrumb>
        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item href={`/customer-service/list-pengajuan`}>
      <span className="text-sm text-[#1078CA] font-semibold">
        List Pengajuan
          </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
      <span className="text-sm text-[#777777] font-semibold">
        Pengajuan Pembelian Properti
          </span>
      </Breadcrumb.Item>
        </Breadcrumb>
          </div>
        <div className="kprApproval__pages__wrapper">
          <p className="font-bold text-[28px] leading-[42px] text-[#292929]">Pengajuan Pembelian Properti</p>
          <div style={{ display: "block" }}>
            <div className="mb-6">
              <StepperHead
                stepperContent={stepperContent}
                navigateToStepHandler={navigateToStepHandler}
                isVertical={isVertical}
                isInline={isInline}
                currentTabIndex={currentTabIndex}
                isRightToLeftLanguage={isRightToLeftLanguage}
              />
            </div>
            <div>
                <div className="kprApproval__pages__detailsCard__childWrapper">
                  {stepperContent.map((el, i) => (
                    <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
                  ))}
                  <div className="flex justify-end items-end bg-white w-full h-[85px] pb-8 pt-4 sticky bottom-0 z-30">
                  <StepperFooterCS
                    isPrevBtn={isPrevBtn}
                    previousStepHandler={previousStepHandler}
                    isLastStep={isLastStep}
                    nextStepHandler={nextStepHandler}
                    submitHandler={submitHandler}
                    stepperContent={stepperContent}
                    currentTabIndex={currentTabIndex}
                    type="kpr-approval"
                    // disableNextButton={inputStep1Arr.filter(Boolean).length !== 12 || dataAddressArr.filter(Boolean).length !== 15}
                  />
                  </div>
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