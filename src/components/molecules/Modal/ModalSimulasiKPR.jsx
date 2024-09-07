/* eslint-disable react-hooks/exhaustive-deps */
import jsPDF from "jspdf";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftKprSim, Modal, RightKprSim } from "../../organisms";
import { fetchPost } from "../../../helpers/fetchApi";
import { formatRupiah, formatRupiahNumber } from "../../../helpers/string";
import { currencyConst } from "../../../static/details/currency";
import { periodConst } from "../../../static/details/period";
import { fixedCreditConst } from "../../../static/kpr/simulasi/fixedCreditConst";
import { headerDetailAngsuran } from "../../../static/kpr/simulasi/headerDetailAngsuran";
import { selectConst } from "../../../static/selectConst";
import { sukuBungaConst } from "../../../static/sukuBungaConst";
import {
  setFixedCredit,
  setJenisSubsidi,
  setJenisSukuBunga,
} from "../../../store/actions/changeDropdownState";
import { showApprovalKprModal, showMethodPaymentModal } from "../../../store/actions/changeModalState";
import { selectedCurrency, selectedPeriod } from "../../../store/actions/changeState";
import { kprSimulasi } from "../../../store/actions/fetchData/kpr";
import { closeModalFail, showModalFail } from "../../../store/actions/fetchData/superAdminState";
import _ from "lodash-contrib";
import { BorderLine, Button, DetailsOverview, Spinner } from "../../atoms";
import Panel from "../../atoms/Tabs/panel";
import { TableInstallment } from "../../molecules";

const ModalSimulasiKPR = ({generatePDF, setGeneratePDF, calcState}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stateReducer);
  const stateModal = useSelector((stateModal) => stateModal.modalReducer);
  const stateDropdown = useSelector((state) => state.dropdownReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const [calcSimulasi, setCalcSimulasi] = useState({
    isCalcSimulasi: false,
  });
  const [gimmickOptions, setGimmickOptions] = useState([]);
  const [optionsGimmick, setOptionsGimmick] = useState({
    biayaAdmin: 0,
    biayaProvisi: 0,
    fixedRate: 0,
    floatingRate: 0,
    name: "Pilih Program Suku Bunga",
  });
  const [dataInputCalc, setDataInputCalc] = useState(null);
  const [masaKreditFix, setMasaKreditFix] = useState(selectConst.masaKreditFix[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const calculatorSimulasi = window.localStorage.getItem("simulasiCalc")
  const [showCalc, setShowCalc] = useState(false);
  const handleGimmick = (name, val) => {
    setDataInputCalc({ ...dataInputCalc, [name]: val });
    setOptionsGimmick({ ...val });
  };

  const handleKreditFix = (name, val) => {
    setDataInputCalc({ ...dataInputCalc, [name]: val });
    setMasaKreditFix(val);
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      if (window.location.pathname.includes("/kpr/simulasi")) {
        window.localStorage.removeItem("simulasiCalc");
        window.localStorage.removeItem("detailProperti");
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      fetchPost(`${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`, {
        // email: _.isJSON(cookie.get("morgateCookie")) ? JSON.parse(cookie.get("morgateCookie")).email : "",
        status: "active",
        pageStart: 1,
        sortBy: "createdAt",
        sortDirection: "desc",
        requestType:"visitor",
        nameSearch: "",
      })
        .then((res) => {
          if (res.data.responseCode === "00") {
            setGimmickOptions(res?.data?.responseData);
          }
        })
        .catch((err) => console.log("Error List Program Suku Bunga : " + err));
    } catch (error) {
      // console.log(error.error);
    }
  }, []);

  useEffect(() => {
    dispatch(setJenisSukuBunga(sukuBungaConst[1]));
    dispatch(setJenisSubsidi(sukuBungaConst[1]));
    dispatch(selectedPeriod(periodConst.period[2]));
    dispatch(setFixedCredit(fixedCreditConst[1]));
    dispatch(selectedCurrency(currencyConst.currency[0]));
    if (window.localStorage.getItem("simulasiCalc")) {
      setCalcSimulasi({
        ...JSON.parse(window.localStorage.getItem("simulasiCalc")),
      });
    }
  }, []);

  useState(() => {
    if (window.localStorage.getItem("simulasiCalc")) {
      setCalcSimulasi({
        isCalcSimulasi: !JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail,
        ...JSON.parse(window.localStorage.getItem("simulasiCalc")),
      });
      setOptionsGimmick(JSON.parse(window.localStorage.getItem("simulasiCalc"))?.gimmick);
      setMasaKreditFix(JSON.parse(window.localStorage.getItem("simulasiCalc"))?.kreditFix);
      setDataInputCalc({
        ...JSON.parse(window.localStorage.getItem("simulasiCalc")),
      });
    }
  }, []);

  useEffect(() => {
    if (
       generatePDF === true
    ) {
      dispatch(
        kprSimulasi(
          JSON.parse(window.localStorage.getItem("simulasiCalc")),
          setCalcSimulasi,
          {
            isCalcSimulasi: !JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail,
          },
          setLoading,
          setShowCalc
        )
      );
    } 
  }, [ generatePDF]);

  const btnOnClick = () => {
    dispatch(showMethodPaymentModal(true));
  };

  const downloadDetailKPR = () => {
    require("jspdf-autotable");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    let title;
    let fileName;
    if (!JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail) {
      title = `Detail Angsuran - ${moment().format("DD-MM-YYYY")}`;
      fileName = `Detail_Angsuran-${moment().format("DD_MM_YYYY")}`;
    } else {
      title = `Detail Angsuran - ${
        JSON.parse(window.localStorage.getItem("detailProperti"))?.detailProperti?.nama
      } - ${moment().format("DD-MM-YYYY")}`;
      fileName = `Detail_Angsuran-${JSON.parse(window.localStorage.getItem("detailProperti"))
        ?.detailProperti?.nama?.toString()
        .replace(" ", "_")}-${moment().format("DD_MM_YYYY")}`;
      title = `Detail Angsuran - ${moment().format("DD-MM-YYYY")}`;
      fileName = `Detail_Angsuran-${moment().format("DD_MM_YYYY")}`;
    }
    const headers = [headerDetailAngsuran];
    const data = calcSimulasi?.detailAngsuran?.map((data) => [
      data?.bulan,
      formatRupiahNumber(data?.sisaPinjaman),
      formatRupiahNumber(data?.angsuran),
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(fileName);
  };
  const closeModal = () => {
    setGeneratePDF(false);
  };

  let biayaAdmin;
  let biayaProvisi;
  const gimmickVal = calcSimulasi?.gimmick?.value;
  biayaAdmin =
    gimmickVal?.biayaAdminNominal >
    (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage) / 100
      ? gimmickVal?.biayaAdminNominal || 0
      : (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage) / 100;
  biayaProvisi =
    gimmickVal?.biayaProvisiNominal >
    (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage) / 100
      ? gimmickVal?.biayaProvisiNominal || 0
      : (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage) / 100;
  return (
    <div className={`${
      generatePDF ? "flex" : "hidden"
    } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-black bg-opacity-50 z-50`}>
      {stateModal.showMethodPaymentModal === true && (
        <Modal
          closeModal={() => dispatch(showMethodPaymentModal(!stateModal.showMethodPaymentModal))}
          modalTypes="paymentMethod"
          title="Ajukan Pembelian"
        />
      )}
      {stateModal.showApprovalKprModal === true && (
        <Modal
          closeModal={() => dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal))}
          modalTypes="kprSubmission"
          title="Pengajuan Pembelian KPR"
          data={JSON.parse(window.localStorage.getItem("detailProperti"))}
          otherProps={{ gimmickOptions, dataInputCalc }}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => {
            dispatch(closeModalFail());
            if (saState.msgFail === "Silahkan menghitung simulasi KPR ulang") {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <div className="relative flex flex-col justify-center px-4 pb-4 bg-white rounded-lg overflow-y-scroll">
            <div className="flex flex-row justify-between">
              <p className="text-[#fff]">h</p>
            <button
              className="bg-transparent text-black float-right place-self-center mobile:pl-5"
              onClick={closeModal}
            >
              <p className="text-[14px] leading-[14px] text-[#777777] p-4">X</p>
            </button>
            </div>
            <div className="items-center justify-center flex">
          <p className="text-2xl font-bold mobile:text-base">Detail Angsuran</p>
          </div>
          <div
      className="flex flex-col"
    >
      <div className="w-full mt-6 p-6 border border-solid rounded-xl border-[#CAD0DA] shadow-lg;">
        {loading ? (
          <div className="kprSim__pages__right__detailLoans__loadingWrap">
            <Spinner />
          </div> ): 
          <TableInstallment tableData={calcSimulasi?.detailAngsuran || []} />
              }
        {loading ? (
          <></>
        ) : (
          showCalc && (
            <div className="kprSim__pages__right__buttonWrapper">
              <Button
                buttonColor="blueLight"
                textColor="blue"
                fullWidth={true}
                paddingSize={"padding-1"}
                onClick={downloadDetailKPR}
              >
                Download Detail Angsuran
              </Button>
            </div>
          )
        )}
        {loading ? (
          <></>
        ) : (
        <></>)}
      </div>
    </div>
          </div>
          </div>
  );
};

export default ModalSimulasiKPR;
