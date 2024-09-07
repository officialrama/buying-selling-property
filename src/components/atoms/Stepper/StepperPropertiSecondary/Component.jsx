import PropTypes from "prop-types"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StepperFooterV2, StepperHead } from "../.."
import StepperFooter from "./StepperFooter"
import _ from "lodash-contrib"
import { showModalFail } from "../../../../store/actions/fetchData/superAdminState"
import { prjSetBrosurId, prjSetImgPrjId, setAddressJson, setPrjAddress, setPrjBrochure, setPrjInfo, setPrjPhoto, setStepperTabIndex, prjSetSiteplanId, setPrjSiteplan, prjSetPricelistId, setPrjPricelist } from "../../../../store/actions/changeUploadProjectReducer"
import { DetailsCard } from "../../../molecules"

const Component = ({
    isRightToLeftLanguage, 
    isVertical, 
    isInline, 
    stepperContent, 
    submitStepper, 
    inputDetailProjectArr, 
    dataAddressArr, 
    inputDetailArr, 
    addInfoArr, 
    files, 
    setFiles, 
    inputs, 
    setInputs, 
    userStatus, 
    dataAddress, 
    setDataAddress, 
    brochureFile, 
    setBrochureFile, 
    stringMinified, 
    siteplanFile, 
    setSiteplanFile, 
    pricelistFile, 
    setPricelistFile,
    isEdit,
    otherChecker
}) => {
    const dispatch = useDispatch()
    const uploadProjectState = useSelector((state) => state.uploadProjectReducer)
    const [currentTabIndex, setCurrentTabIndex] = useState(uploadProjectState?.tabIndex),
    isLastStep = currentTabIndex === stepperContent.length - 1,
    isPrevBtn = currentTabIndex !== 0
    const stepperHeadContent = [...stepperContent]
    stepperHeadContent.pop()

    function Breadcrumbs() {
      return (
        <div className="prod-detail__pages__breadcrumb__nav__wrapper pt-12 ml-12">
          <p className="prod-detail__pages__breadcrumb__nav__textGray font-bold">Home</p>
          <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
          <p className="prod-detail__pages__breadcrumb__nav__textGray font-bold">Profil</p>
          { !isLastStep && 
            <>
              <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
              <p className="prod-detail__pages__breadcrumb__nav__textGray">Tambah Properti Secondary</p>
            </>
          }
          {
            isLastStep && 
            <>
              <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
              <p className="prod-detail__pages__breadcrumb__nav__textGray">...</p>
              <img src="/icons/small-icons/chevron_right_small.svg" alt="chevron" />
              <p className="prod-detail__pages__breadcrumb__nav__textGray">Ringkasan Properti Secondary</p>
            </>
          }
        </div>
      )
    }

    const navigateToStepHandler = (index) => {
        if (index !== currentTabIndex) {
            dispatch(setStepperTabIndex(index))
            setCurrentTabIndex(index)
        }
    }

  const disableNextBtn = () => {
    if (currentTabIndex === 0 ) {
      if (inputDetailProjectArr.filter(Boolean).length < 6 || dataAddressArr.filter(Boolean).length !== 15) {
        return true
      } else {
        return false
      }
    } else if(currentTabIndex === 1) {
      if(otherChecker.informasiProperti.filter(Boolean).length != 10 ){
        return true
      } else {
        return false
      }
    } else if(currentTabIndex === 2) {
      if(otherChecker.kelengkapanRumah.filter(Boolean).length < 1 ){
        return true
      } else {
        return false
      }
    } else if(currentTabIndex === 3){
      if(files.length <= 0){
        return true
      } else {
        return false
      }
    }
  }

  const nextStepHandler = () => {
    if (currentTabIndex === 0) {
      if (inputDetailProjectArr.filter(Boolean).length < 6 || dataAddressArr.filter(Boolean).length !== 15) {
            dispatch(showModalFail("Gagal", "Isian form detail proyek tidak valid"))
        if (!inputs?.tipeProperti?.value) {
          setInputs({ ...inputs, tipeProperti: { ...inputs.tipeProperti, isValid: false, msgError: "Pilih tipe properti" } })
        } else if (!inputs?.jenisProperti?.value) {
          setInputs({ ...inputs, jenisProperti: { ...inputs.jenisProperti, isValid: false, msgError: "Pilih jenis properti" } })
        }
      } else {
        if (!_.isEqual(inputs, uploadProjectState?.projectInfo)) {
          dispatch(setPrjInfo({ ...inputs }))
        }
        if (!_.isEqual(dataAddress, uploadProjectState?.address)) {
          dispatch(setPrjAddress({ ...dataAddress }))
        }
        if (!_.isEqual(stringMinified, uploadProjectState?.addressJson)) {
          dispatch(setAddressJson(stringMinified))
        }
        if (!_.isEqual(files, uploadProjectState?.projectPhoto)) {
          dispatch(prjSetImgPrjId(""))
          dispatch(setPrjPhoto(files))
        } else {
          dispatch(prjSetImgPrjId(uploadProjectState?.imageProjectId))
        }
        if (!_.isEqual(brochureFile.name, uploadProjectState?.brochure?.name)) {
          dispatch(prjSetBrosurId(""))
          dispatch(setPrjBrochure(brochureFile))
        } else {
          dispatch(prjSetBrosurId(uploadProjectState?.brosurProjectId))
        }
        if (siteplanFile.name) {
          dispatch(prjSetSiteplanId(""))
          dispatch(setPrjSiteplan(siteplanFile))
        } else {
          dispatch(prjSetSiteplanId(uploadProjectState?.siteplanId))
        }
        if (pricelistFile.name) {
          dispatch(prjSetPricelistId(""))
          dispatch(setPrjPricelist(pricelistFile))
        } else {
          dispatch(prjSetPricelistId(uploadProjectState?.pricelistId))
        }
        setCurrentTabIndex((prev) => {
          if (prev !== stepperContent.length - 1) {
            stepperContent[currentTabIndex].isComplete = true
            dispatch(setStepperTabIndex(prev + 1))
            return prev + 1
          }
        })
      }
    } else {
      setCurrentTabIndex((prev) => {
        if (prev !== stepperContent.length - 1) {
          stepperContent[currentTabIndex].isComplete = true
          dispatch(setStepperTabIndex(prev + 1))
          return prev + 1
        }
      })
      if (!_.isEqual(inputs, uploadProjectState?.projectInfo)) {
        dispatch(setPrjInfo({ ...inputs }))
      }
      if (!_.isEqual(dataAddress, uploadProjectState?.address)) {
        dispatch(setPrjAddress({ ...dataAddress }))
      }
      if (!_.isEqual(stringMinified, uploadProjectState?.addressJson)) {
        dispatch(setAddressJson(stringMinified))
      }
      if (!_.isEqual(files, uploadProjectState?.projectPhoto)) {
        dispatch(prjSetImgPrjId(""))
        dispatch(setPrjPhoto(files))
      } else {
        dispatch(prjSetImgPrjId(uploadProjectState?.imageProjectId))
      }
      if (pricelistFile.name) {
        dispatch(prjSetPricelistId(""))
        dispatch(setPrjPricelist(pricelistFile))
      } else {
        dispatch(prjSetPricelistId(uploadProjectState?.pricelistId))
      }
    }
  }
    const previousStepHandler = () => {
        setInputs({ ...uploadProjectState?.projectInfo })
        setDataAddress({ ...uploadProjectState?.address })
        setFiles(uploadProjectState?.projectPhoto)
        setSiteplanFile({...uploadProjectState?.siteplan})
        setPricelistFile({...uploadProjectState?.pricelist})
        setCurrentTabIndex((prev) => {
          dispatch(setStepperTabIndex(prev - 1))
          return prev - 1
        });
        stepperContent[currentTabIndex].isComplete = false
    };

    const submitHandler = () => {
        submitStepper()
    }

  return (
    <>
    <Breadcrumbs />
    <div className="stepper-wrapper">
      <div style={{ display: isVertical ? 'flex' : 'block' }}>
        <div className="sellprops__wrapper">
          {!isLastStep && 
            <h1 className="font-bold text-[28px] text-[#292929] mb-4">{isEdit ? "Edit Properti Secondary" : "Tambah Properti Secondary"}</h1>
          }
          {
            !isLastStep &&
            <StepperHead
              stepperContent={stepperHeadContent}
              navigateToStepHandler={navigateToStepHandler}
              isVertical={isVertical}
              isInline={isInline}
              currentTabIndex={currentTabIndex}
              isRightToLeftLanguage={isRightToLeftLanguage}
            />
          }      
        </div>
        {/* <div className="stepper-body">
          {stepperContent.map((el, i) => (
            <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
          ))}
          <StepperFooter
            isPrevBtn={isPrevBtn}
            previousStepHandler={previousStepHandler}
            isLastStep={isLastStep}
            nextStepHandler={nextStepHandler}
            submitHandler={submitHandler}
            stepperContent={stepperContent}
            currentTabIndex={currentTabIndex}
            type="properti-secondary"
            disableNextButton={disableNextBtn()}
          />
        </div> */}
        {/* <div className="sellpropsV2__wrapper">
          <DetailsCard className="sellpropsV2__card__wrapper">
            <div className="kprApproval__pages__detailsCard__childWrapper">
              {stepperContent.map((el, i) => (
                <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
              ))}
              <StepperFooter
                isPrevBtn={isPrevBtn}
                previousStepHandler={previousStepHandler}
                isLastStep={isLastStep}
                nextStepHandler={nextStepHandler}
                submitHandler={submitHandler}
                stepperContent={stepperContent}
                currentTabIndex={currentTabIndex}
                type="properti-secondary"
                disableNextButton={disableNextBtn()}
              />
            </div>
          </DetailsCard>
        </div> */}
        <div>
          {stepperContent.map((el, i) => (
            <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
          ))}
          <StepperFooter
            isPrevBtn={isPrevBtn}
            previousStepHandler={previousStepHandler}
            isLastStep={isLastStep}
            nextStepHandler={nextStepHandler}
            submitHandler={submitHandler}
            stepperContent={stepperContent}
            currentTabIndex={currentTabIndex}
            type="properti-secondary"
            disableNextButton={disableNextBtn()}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Component