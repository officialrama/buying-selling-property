import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StepperFooter, StepperHead } from "../..";
import { DetailsCard } from "../../../molecules";
import { showModalFail } from '../../../../store/actions/fetchData/superAdminState';
import { checkCustomerNik, checkCustomerPhone, generateBriVaNew } from "../../../../store/actions/fetchData/uploadFile";

function Component({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitGenerateBrivaNew, submitStepper, inputStep1Arr, dataAddressArr, inputUtjArr, selectedOption, itemBrivaNew, inputs }) {
  const dispatch = useDispatch();
  const [currentTabIndex, setCurrentTabIndex] = useState(0),
  isLastStep = currentTabIndex === stepperContent.length - 1,
  isPrevBtn = currentTabIndex !== 0;
  const navigateToStepHandler = (index) => {
    if (index !== currentTabIndex) {
      setCurrentTabIndex(index);
    }
  };

  const[itemCheckNik, setItemCheckNik] = useState();
  const[itemCheckPhone, setItemCheckPhone] = useState();
  const[briva, setBriva] = useState();

  useEffect(() => {
    dispatch(
      checkCustomerNik(inputs, setItemCheckNik)
    )
  }, [inputs?.nik?.value]);

  useEffect(() => {
    dispatch(
      checkCustomerPhone(inputs, setItemCheckPhone)
    )
  }, [inputs?.mobileNo?.value]);

  // useEffect(() => {
  //   dispatch(
  //     generateBriVaNew(inputs, setBriva)
  //   )
  // }, [inputs?.fullName?.value, inputs?.mobileNo?.value]);

  const nextStepHandler = () => {
    if (currentTabIndex === 0) {
      if (inputStep1Arr.filter(Boolean).length !== 12 || dataAddressArr.filter(Boolean).length !== 15) {
        dispatch(showModalFail("Gagal", "Isian form data diri tidak valid"));
      } else if(itemCheckNik?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "NIK sudah dalam pengajuan KPR!"));
      } else if(itemCheckPhone?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "Silakan gunakan No. HP yang belum terdaftar!"));
      } else if(itemCheckNik?.data?.responseCode !== "00" && itemCheckPhone?.data?.responseCode !== "00"){
        dispatch(showModalFail("Gagal", "NIK dan No. HP sudah digunakan, Silakan gunakan NIK dan No. HP yang belum terdaftar!"));
      } else {
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true;
            return prev + 1;
          }
        });
      }
    } else if (currentTabIndex === 1) {
      if (inputUtjArr.filter(Boolean).length !== 1) {
        dispatch(showModalFail("Gagal", "UTJ Tidak Boleh Kosong"));
      } else {
        if(itemBrivaNew !== undefined){
          setCurrentTabIndex((prev) => {
            if (prev !== stepperContent.length - 1) {
              stepperContent[currentTabIndex].isComplete = true;
              return prev + 1;
            }
          });
        } else {
          if(selectedOption === 'doku'){
            setCurrentTabIndex((prev) => {
              if (prev !== stepperContent.length - 1) {
                stepperContent[currentTabIndex].isComplete = true;
                return prev + 1;
              }
            });
          } else {
            submitGenerateBrivaNew();
            setCurrentTabIndex((prev) => {
              if (prev !== stepperContent.length - 1) {
                stepperContent[currentTabIndex].isComplete = true;
                return prev + 1;
              }
            });
          }
        }
      }
    } else {
      setCurrentTabIndex((prev) => {
        if (prev !== stepperContent.length + 1) {
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
    submitStepper();
  };

  return (
    <div className="stepper-wrapper">
      <div className="kprApproval__bodyWrapper">
        <div className="kprApproval__pages__wrapper">
          <p className="kprApproval__pages__title">Form Pengajuan KPR</p>
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
                  <div className="flex justify-end items-end bg-white w-full h-[85px] sticky bottom-0 z-30">
                  <StepperFooter
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
  submitGenerateBriva: PropTypes.func.isRequired,
  submitCheckCustomerPhone: PropTypes.func.isRequired,
  submitCheckCustomerNik: PropTypes.func.isRequired,
  isInline: PropTypes.bool,
  isVertical: PropTypes.bool,
  isRightToLeftLanguage: PropTypes.bool,
};

export default Component;