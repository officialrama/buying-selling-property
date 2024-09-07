/* eslint-disable react-hooks/exhaustive-deps */
import jsPDF from "jspdf";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftKprSim, Modal, RightKprSim } from "../../components/organisms";
import { fetchPost } from "../../helpers/fetchApi";
import { formatRupiah, formatRupiahNumber } from "../../helpers/string";
import { currencyConst } from "../../static/details/currency";
import { periodConst } from "../../static/details/period";
import { fixedCreditConst } from "../../static/kpr/simulasi/fixedCreditConst";
import { headerDetailAngsuran } from "../../static/kpr/simulasi/headerDetailAngsuran";
import { selectConst } from "../../static/selectConst";
import { sukuBungaConst } from "../../static/sukuBungaConst";
import {
  setFixedCredit,
  setJenisSubsidi,
  setJenisSukuBunga,
} from "../../store/actions/changeDropdownState";
import { showApprovalKprModal, showMethodPaymentModal } from "../../store/actions/changeModalState";
import { selectedCurrency, selectedPeriod } from "../../store/actions/changeState";
import { kprSimulasi } from "../../store/actions/fetchData/kpr";
import { closeModalFail, showModalFail } from "../../store/actions/fetchData/superAdminState";
import _ from "lodash-contrib";
import cookie from "hs-cookie";

const KPRSimulasi = () => {
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
  const infoLelangType = window.localStorage.getItem('infolelangUtj')  
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
        gimmickType:`${infoLelangType === 'PaidInfolelang' ? "Homespot" : ""}`,
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

  useState(() => {
    if (
      window.localStorage.getItem("simulasiCalc") ||
      window.localStorage.getItem("detailProperti")
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
    } else {
      dispatch(showModalFail("Gagal", "Silahkan menghitung simulasi KPR ulang"));
    }
    if (!JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail) {
      window.localStorage.removeItem("detailProperti");
    }
  }, []);

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
    // const data = calcSimulasi?.detailAngsuran?.map(data => [data?.bulan, formatRupiah(Number(data?.sisaPinjaman)), formatRupiah(Number(data?.angsuranPokok)), formatRupiah(Number(data?.angsuranBunga)), formatRupiah(Number(data?.angsuran)), data?.bunga]);
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

  return (
    <div>
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
      <div className="kprSim__bodyWrapper mt-20">
        <div className="kprSim__pages__wrapper">
          <div className="kprSim__pages__title-wrap">
            <p className="kprSim__pages__title">Kalkulator Simulasi KPR</p>
            <p className="kprSim__pages__subTitle">
              Simulasikan KPR Anda dengan cepat, aman dan jelas
            </p>
          </div>
          <div className="kprSim__pages__card-wrap">
            {JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail ? (
              <>
                <LeftKprSim
                  hidden={calcSimulasi?.isCalcSimulasi}
                  state={state}
                  stateDropdown={stateDropdown}
                  dispatch={dispatch}
                  calcSimulasi={calcSimulasi}
                  setCalcSimulasi={setCalcSimulasi}
                  optionsGimmick={optionsGimmick}
                  onChangeGimmick={(value) => handleGimmick("gimmick", value)}
                  gimmickOptions={gimmickOptions}
                  optionsKreditFix={masaKreditFix}
                  onChangeKreditFix={(value) => handleKreditFix("kreditFix", value)}
                  setOptionsGimmick={setOptionsGimmick}
                  setMasaKreditFix={setMasaKreditFix}
                  dataInputCalc={dataInputCalc}
                  setDataInputCalc={setDataInputCalc}
                  setLoading={setLoading}
                  setShowCalc={setShowCalc}
                />
              </>
            ) : (
              <></>
            )}
            <RightKprSim
              id={calcSimulasi?.id}
              isCalc={calcSimulasi?.isCalcSimulasi}
              state={state}
              stateDropdown={stateDropdown}
              dispatch={dispatch}
              calcSimulasi={calcSimulasi}
              setCalcSimulasi={setCalcSimulasi}
              btnOnClick={btnOnClick}
              loading={loading}
              setLoading={setLoading}
              downloadDetailKPR={downloadDetailKPR}
              showCalc={showCalc}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPRSimulasi;
