import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import cookie from "js-cookie";
import moment from "moment";
import { areacodeConst } from "../../../static/areacodeConst";
import useKprApprovalHooks from "../../../hooks/useKprApprovalHooks";
import DataDiriSales from "../../kpr/data-diri-sales";
import { closeModalFail, inquiryUser, saReset } from "../../../store/actions/fetchData/superAdminState";
import { decryptStr, encryptStr } from "../../../helpers/encryptDecrypt";
import { checkCustomerNik, checkCustomerPhone, generateBriVaNew, submitSalesKpr } from "../../../store/actions/fetchData/uploadFile";
import { Footer } from "../../../components/molecules";
import { Modal } from "../../../components/organisms";
import { StepperKprSales } from "../../../components/atoms";
import UtjKpr from "../../kpr/utj";
import { showRingkasanBuyer } from "../../../store/actions/changeState";
import SummarySubmitSalesKpr from "../../kpr/summary-sales";
import { dokuGenerate, salesReferralProject, userInvoiceKpr, userReferralKPR, userReferralList } from "../../../store/actions/fetchData/salesReferral";
import useRegSalesHooks from "../../../hooks/useRegSalesHooks";
import VirtualAccount from "../../kpr/virtual-account";
import {NavHeaderSales} from "../../../components/organisms";


const PengajuanKprSales = () => {
    const navigate = useNavigate();
    const state = useSelector((state) => state.stateReducer);
    const saState = useSelector((state) => state.superAdminReducer);
    const { inputs, utjInputs, selectedOption, setUtjInputs, setInputs, setSelectedOption, initiateState, handleInputChange, handleOptionChange, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleDateInputChange, handleRadioDropChange, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail, handleUtj, handleWaktuKontak, waktuKontak, setWaktuKontak, } = useFormStepperHooks();
    const { dropdownVal, setDropdownVal } = useKprApprovalHooks();
    const dispatch = useDispatch();
    const [kcDescVal, setKcDescVal] = useState("");
    const [dataKPR, setDataKPR] = useState("");
    const [kcList, setKcList] = useState([]);
    const [kcOtherList, setKcOtherList] = useState([]);
    const [kcForm, setKcForm] = useState({
        state: "nearby"
    })

    const [dataAddress, setDataAddress] = useState({
        address: "",
        rt: "",
        rw: "",
        posCode: "",
        province: "",
        subDistrict: "",
        district: "",
        urbanVillage: "",
    });

    const [mapsState, setMapsState] = useState({
        center: {
            lat: -6.224722,
            lng: 106.80788,
        },
        address: "",
        zoom: 11,
        draggable: false,
        gestureHandling: "coopertaive",
    });

    const [ item, setItem ] = useState(null);

    useEffect(() => {
      dispatch(salesReferralProject(setItem));
    }, []);

    useEffect(() => {
        if(cookie.get("morgateCookie")) {
            dispatch(inquiryUser(JSON.parse(cookie.get("morgateCookie"))?.email));
        }
    }, []);

    // const { setDataTemp, dataTemp, bodyListOfUser } = useRegSalesHooks();
    const [itemBrivaNew, setItemBrivaNew] = useState();
    const [ itemGenerateLinkDoku, setItemGenerateLinkDoku ] = useState();
    const [dataAddressKTP, setDataAddressKTP] = useState({
      address: "",
      rt: "",
      rw: "",
      posCode: "",
      province: "",
      subDistrict: "",
      district: "",
      urbanVillage: "",
    });

    useEffect(() => {
        let respData = saState?.resApi?.responseData?.[0] || [];
        initiateState({
            fullName: { isValid: !!JSON.parse(window.localStorage.getItem("dataDraft"))?.name, value: JSON.parse(window.localStorage.getItem("dataDraft"))?.name },
            // email: { isValid: !!respData?.email, value: decryptStr(respData?.email) },
            mobileNo: { isValid: !!JSON.parse(window.localStorage.getItem("dataDraft"))?.mobileNo , value: JSON.parse(window.localStorage.getItem("dataDraft"))?.mobileNo?.substring(1) },
            password: { isValid: !!respData?.metadata?.password, value: respData?.metadata?.password },
            confirmPassword: { isValid: !!respData?.metadata?.confirmPassword, value: respData?.metadata?.confirmPassword },
            dob: respData?.metadata?.dob ? { isValid: !!moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate(), value: moment(respData?.metadata?.dob, "DD-MM-YYYY")?.toDate() } : { isValid: false, value: null },
            pob: { isValid: !!respData?.metadata?.pob, value: respData?.metadata?.pob },
            address: { isValid: !!respData?.metadata?.address, value: respData?.metadata?.address },
            longLatAddress: { isValid: !!respData?.metadata?.longLatAddress, value: respData?.metadata?.longLatAddress },            
        });
        initiateState({
            mobileNoArea: areacodeConst.filter((e) => e.value === saState?.resApi?.responseData?.[0]?.mobileNo?.split(""|"")?.[0])[0] || areacodeConst.filter((e) => e.value === "+62")[0]
        })
    }, [saState.resApi]);

    const inputStep1Arr = [
        inputs?.nik?.isValid,
        inputs?.fullName?.isValid,
        inputs?.pob?.isValid,
        inputs?.dob?.isValid,
        dropdownVal.gender.value !== "",
        inputs?.mobileNo?.isValid,
        inputs?.email?.isValid,
        dropdownVal.maritalStatus.value !== "",
        dropdownVal.agama.value !== "",
        inputs?.ukerCode?.isValid, 
        inputs?.ukerName?.isValid,
        waktuKontak !== "",
    ];
   

    const dataAddressArr = [
        !!dataAddress?.address,
        !!dataAddress?.rt,
        !!dataAddress?.rw,
        !!dataAddress?.posCode,
        !!dataAddress?.province,
        !!dataAddress?.subDistrict,
        !!dataAddress?.district,
        !!dataAddress?.urbanVillage,
        dataAddress?.rt?.length > 1 && dataAddress?.rt?.length <= 3,
        dataAddress?.rw?.length > 1 && dataAddress?.rw?.length <= 3,
        dataAddress?.posCode?.length === 5,
        dataAddress?.province?.length > 3 && dataAddress?.province?.length <= 50,
        dataAddress?.subDistrict?.length > 3 && dataAddress?.subDistrict?.length <= 50,
        dataAddress?.district?.length > 3 && dataAddress?.district?.length <= 50,
        dataAddress?.urbanVillage?.length > 3 && dataAddress?.urbanVillage?.length <= 50,
    ];

    const inputUtjArr = [
      inputs?.utj?.isValid,
    ];
    const stepperContent = [
        {
          label: "Data Diri",
          content: (
            <DataDiriSales
              inputs={inputs}
              dataAddress={dataAddress}
              dataAddressKTP={dataAddressKTP}
              setDataAddressKTP={setDataAddressKTP}
              setDataAddress={setDataAddress}
              setInputs={setInputs}
              mapsState={mapsState}
              setMapsState={setMapsState}
              dropdownVal={dropdownVal}
              waktuKontak={waktuKontak}
              setWaktuKontak={setWaktuKontak}
              handleWaktuKontak={handleWaktuKontak}
              setDropdownVal={setDropdownVal}
              handleInput={{ handleDateInputChange, handleLetterNumberInput, handleLetterInput, handleNumberInput, handleInputChange, handleRadioDropChange, initiateState, handleAltInput, handleAreaCode, handleName, handleMobileNo, handleEmail }}
              kcDescVal={kcDescVal}
              setKcDescVal={setKcDescVal}
              kcList={kcList}
              setKcList={setKcList}
              kcOtherList={kcOtherList}
              setKcOtherList={setKcOtherList}
              kcForm={kcForm}
              setKcForm={setKcForm}
            />
          ),
        },
        {
          label: "UTJ",
          content: (
            <UtjKpr
            inputs={inputs}
            selectedOption={selectedOption}
            handleInput={{ handleUtj }}
            setInputs={setInputs}
            setSelectedOption={setSelectedOption}
            handleOptionChange={handleOptionChange}
            />
          ),
        },
        {
          label: "Ringkasan",
          content: (
            <SummarySubmitSalesKpr
              inputs={inputs}
              waktuKontak={waktuKontak}
              dataAddressKTP={dataAddressKTP}
              dataAddress={dataAddress}
              selectedOption ={selectedOption}
              itemBrivaNew={itemBrivaNew}
              setItemBrivaNew={setItemBrivaNew}
            />
          ),
        },
      ];

      const submitGenerateBrivaNew = () => {
        dispatch(
          generateBriVaNew(inputs, setItemBrivaNew)
        )
      }
      const submitStepper = () => {
        dispatch(
          submitSalesKpr(encryptStr(inputs.email.value), inputs, selectedOption, JSON.parse(window.localStorage.getItem("simulasiSalesCalc")), dataAddress, JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.id, item?.responseData[0]?.referralCode, JSON.parse(window.localStorage.getItem("dataDraft"))?.idDraft , setDataKPR, setItemGenerateLinkDoku)
        );
      };
      return (
        <div>
          <NavHeaderSales />
          {selectedOption === 'doku' ? 
            saState.success === true && (
              <Modal
              closeModal={() => navigate("/sales-dashboard/datapenjualan/final")}
              modalTypes="RingkasanBuyer"
              title="Ringkasan Buyer"
              titleBody={saState.titleSuccess}
              descBody={saState.msgSuccess}
              otherProps={dataKPR}
            />
            )
          : saState.success === true && (
            <Modal
              closeModal={() => navigate("/sales-dashboard/datapenjualan/final")}
              modalTypes="modalSF"
              title=""
              titleBody={saState.titleSuccess}
              descBody={saState.msgSuccess}
            />

          )}
          {saState.fail === true && (
            <Modal
              closeModal={() => dispatch(closeModalFail())}
              modalTypes="modalSF"
              title=""
              titleBody={saState.titleFail}
              descBody={saState.msgFail}
            />
          )}
          <div className="stepper-container">
            <StepperKprSales
              stepperContent={stepperContent}
              submitGenerateBrivaNew = {submitGenerateBrivaNew}
              submitStepper={submitStepper}
              inputStep1Arr={inputStep1Arr}
              dataAddressArr={dataAddressArr}
              inputUtjArr={inputUtjArr}
              selectedOption = {selectedOption}
              itemBrivaNew = {itemBrivaNew}
              inputs={inputs}
              isInline
            />
          </div>
          <Footer />
        </div>
    );    
};

export default PengajuanKprSales;