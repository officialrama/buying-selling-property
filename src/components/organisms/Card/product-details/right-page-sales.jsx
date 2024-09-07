/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import cookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { invalidNumRegex } from "../../../../helpers/regex";
import { showApprovalKprModal, showMethodPaymentModal, showUserPaymentModal } from "../../../../store/actions/changeModalState";
import { Button, CurrencyInput, LabelInputTextbox } from "../../../atoms";
import { Dropdown, TextboxLabel } from "../../../molecules";
import { showModalLogin } from "../../../../store/actions/changeState";

const RightPageSales = ({ hargaAkhir, gimmickOptions, id, data, allData, dataInputSalesCalc, setDataInputSalesCalc, setShowListPropCompare }) => {
  const state = useSelector((state) => state.stateReducer);
  const stateModal = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href.split('/');
  useEffect(() => {
    setDataInputSalesCalc({
      ...dataInputSalesCalc,
      hargaAkhir: {
        ...dataInputSalesCalc?.hargaAkhir,
        value: hargaAkhir,
      },
      jumlahPinjaman: {
        ...dataInputSalesCalc?.jumlahPinjaman,
        value: hargaAkhir,
      },
      uangMuka: {
        ...dataInputSalesCalc?.uangMuka,
        value: hargaAkhir * 5 / 100,
        isValid: true,
      },      
    });
  }, [hargaAkhir]);

  useEffect(() => {
    if (Number(dataInputSalesCalc?.uangMuka?.value) < Number(hargaAkhir)) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        jumlahPinjaman: {
          ...dataInputSalesCalc?.jumlahPinjaman,
          value: Number(hargaAkhir) - Number(dataInputSalesCalc?.uangMuka?.value)
        }   
      });
    } else if (Number(dataInputSalesCalc?.uangMuka?.value) > Number(hargaAkhir)) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        uangMuka: {
          ...dataInputSalesCalc.jumlahPinjaman,
          value: Number(hargaAkhir),
          msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
        },
        jumlahPinjaman: {
          ...dataInputSalesCalc?.jumlahPinjaman,
          value: 0
        }
      })
    } else if (isNaN(Number(dataInputSalesCalc?.uangMuka?.value))) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        uangMuka: {
          ...dataInputSalesCalc?.uangMuka,
          value: 0
        }
      })
    } else {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        jumlahPinjaman: {
          ...dataInputSalesCalc?.jumlahPinjaman,
          value: Number(hargaAkhir) - Number(dataInputSalesCalc?.uangMuka?.value)
        }
      })
    }
  }, [dataInputSalesCalc?.uangMuka?.value])

  const handleLamaPinjaman = (evt) => {
    if (evt.target.value.length < 1) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        [evt.target.name]: { isValid: false, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "Lama pinjaman wajib diisi" },
      });
    } else if (evt.target.value === "0") {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        [evt.target.name]: { isValid: false, value: "", msgError: "Lama pinjaman tidak boleh bernilai nol" },
      });
    } else {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        [evt.target.name]: { isValid: true, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "" },
      });
    }
  };

  const handleConvertCalc = () => {
    if (!dataInputSalesCalc.lamaPinjaman?.value) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        lamaPinjaman: {
          ...dataInputSalesCalc.lamaPinjaman,
          isValid: !!dataInputSalesCalc.lamaPinjaman?.value,
        },
      });
    } else if (dataInputSalesCalc.lamaPinjaman?.value === "0") {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        lamaPinjaman: {
          ...dataInputSalesCalc.lamaPinjaman,
          isValid: false,
          msgError: "Lama pinjaman tidak boleh bernilai nol"
        },
      });
    } else if (!dataInputSalesCalc.jumlahPinjaman?.value) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        jumlahPinjaman: {
          ...dataInputSalesCalc.jumlahPinjaman,
          isValid: !!dataInputSalesCalc.jumlahPinjaman?.value,
        },
      });
    } else if (!dataInputSalesCalc.gimmick?.value?.fixedRate) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc,
        gimmick: {
          ...dataInputSalesCalc.gimmick,
          isValid: !!dataInputSalesCalc.gimmick?.value?.fixedRate,
        },
      });
    } else {
      window.localStorage.setItem(
        "simulasiSalesCalc",
        JSON.stringify({ ...dataInputSalesCalc, productDetail: true })
      );
      if (!!allData) {
        window.localStorage.setItem(
          "detailProperti",
          JSON.stringify({ ...allData })
        );
      }
      window.localStorage.setItem(
        "referralCode",
        url[4]
      );
      localStorage.removeItem('infolelangUtj')
      navigate("/kpr-sales/simulasi-sales");
    }
  };

  const handleChangeAlt = (value, name) => {
    setDataInputSalesCalc({
      ...dataInputSalesCalc,
      [name]: { isValid: !!value, value: value },
    });
  };

  const handleUangMuka = (value, name) => {
    const hargaAkhir = parseInt(dataInputSalesCalc?.hargaAkhir?.value * 5 / 100)
    if (hargaAkhir > value) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
      });
    } else if (value === dataInputSalesCalc?.hargaAkhir?.value) {
      setDataInputSalesCalc({
        ...dataInputSalesCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan Harga Properti" },
      });
    } else {
      setDataInputSalesCalc({
        ...dataInputSalesCalc, [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  const inputArrPopup = [
    dataInputSalesCalc?.lamaPinjaman?.isValid,
    dataInputSalesCalc?.uangMuka?.isValid,
    dataInputSalesCalc?.gimmick?.isValid,
  ];

  return (
    <div>
      <>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}
          onClick={() => {
            cookie.get("morgateCookie") ?  dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal)) : dispatch(showUserPaymentModal(!stateModal.showUserPaymentModal));
            cookie.get("morgateCookie") && window.localStorage.setItem("detailProperti", JSON.stringify({ ...allData }));
            cookie.get("morgateCookie") && window.localStorage.removeItem("dataDraft")
            localStorage.removeItem('infolelangUtj')
          }}
          className="mb-3"
        >
          Ajukan Pembelian
        </Button>
      </>

      <div className="prod-detail__pages__property__detailBuying__right__calc__wrapper">
        <p className="prod-detail__pages__property__detailBuying__right__calc__title">
          Kalkulator KPR
        </p>
        <div>
          <div className="mb-4 flex flex-col gap-2">
            <LabelInputTextbox text="Harga Properti" />
            <CurrencyInput
              className="textbox-label__currency"
              name="hargaProperti"
              placeholder="0"
              decimalsLimit={2}
              groupSeparator="."
              decimalSeparator=","
              maxLength={16}
              value={hargaAkhir}
              disabled={true}
              allowNegativeValue={false}
            />
          </div>
          <div className="mb-4">
            <TextboxLabel
              name="lamaPinjaman"
              topLabel="Lama Pinjaman"
              placeholder=""
              rightLabel="Tahun"
              rightLabelBorder={true}
              value={dataInputSalesCalc?.lamaPinjaman?.value}
              onChange={handleLamaPinjaman}
              maxLength={2}
            />
            {!dataInputSalesCalc?.lamaPinjaman?.isValid && (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">{dataInputSalesCalc?.lamaPinjaman?.msgError}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <LabelInputTextbox text="Uang Muka" />
            </div>
            <CurrencyInput
              className="textbox-label__currency"
              name="uangMuka"
              placeholder="0"
              decimalsLimit={2}
              groupSeparator="."
              decimalSeparator=","
              maxLength={16}
              value={dataInputSalesCalc?.uangMuka?.value}
              onValueChange={(value) => handleUangMuka(value, "uangMuka")}
              allowNegativeValue={false}
            />
            {dataInputSalesCalc?.uangMuka?.isValid ? (
              <p className="prod-detail__pages__property__detailBuying__right__calc__interestInfo">
                Minimal 5% dari harga properti
              </p>
            ) : (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">{dataInputSalesCalc?.uangMuka?.msgError}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <LabelInputTextbox text="Jumlah Pinjaman" />
            <CurrencyInput
              className="textbox-label__currency"
              name="jumlahPinjaman"
              placeholder="0"
              decimalsLimit={2}
              groupSeparator="."
              decimalSeparator=","
              maxLength={16}
              value={dataInputSalesCalc?.jumlahPinjaman?.value}
              disabled={true}
              allowNegativeValue={false}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <LabelInputTextbox text="Program Suku Bunga" />
            </div>
            <Dropdown
              value={dataInputSalesCalc?.gimmick?.value}
              onChange={(value) => handleChangeAlt(value, "gimmick")}
              data={gimmickOptions}
            />
            {!dataInputSalesCalc?.gimmick?.isValid && (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">Program Suku Bunga Wajib diisi</span>
            )}
          </div>
          <div className="mb-4">
            <TextboxLabel
              topLabel="Suku Bunga"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              value={dataInputSalesCalc?.gimmick?.value?.fixedRate}
              disabled={true}
            />
          </div>
          {/* <div className="mb-4">
            <TextboxLabel
              topLabel="Floating Rate"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              value={dataInputSalesCalc?.gimmick?.value?.floatingRate}
              disabled={true}
            />
          </div> */}
          <div className="mb-4">
            <TextboxLabel
              name="masaKreditFix"
              topLabel="Masa Kredit Fix"
              placeholder=""
              rightLabel="Tahun"
              rightLabelBorder={true}
              value={dataInputSalesCalc?.gimmick?.value?.tenorFixedRate / 12}
              maxLength={3}
              disabled={true}
            />
          </div>
          <div>
            <p className="prod-detail__pages__property__detailBuying__right__calc__notes">
              *Catatan: Perhitungan ini adalah hasil perkiraaan aplikasi KPR
              secara umum. Data perhitungan di atas dapat berbeda dengan
              perhitungan bank. Untuk perhitungan yang akurat, silahkan hubungi
              kantor cabang kami.
            </p>
            <Button
              buttonColor="orange"
              textColor="white"
              fullWidth={true}
              onClick={handleConvertCalc}
              paddingSize={"padding-1"}
              disabled={inputArrPopup?.filter?.(Boolean)?.length !== 3}
            >
              Lihat Kalkulasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPageSales;
