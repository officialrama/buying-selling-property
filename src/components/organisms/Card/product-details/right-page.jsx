/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import cookie from 'hs-cookie';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { invalidNumRegex } from "../../../../helpers/regex";
import { showApprovalKprModal, showMethodPaymentModal } from "../../../../store/actions/changeModalState";
import { Button, CurrencyInput, LabelInputTextbox } from "../../../atoms";
import { Dropdown, TextboxLabel } from "../../../molecules";
import { showModalLogin } from "../../../../store/actions/changeState";

const RightPageProductDetails = ({ hargaProperti, hargaAkhir, gimmickOptions, id, data, allData, dataInputCalc, setDataInputCalc, setShowListPropCompare }) => {
  const state = useSelector((state) => state.stateReducer);
  const stateModal = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setDataInputCalc({
      ...dataInputCalc,
      hargaProperti: {
        ...dataInputCalc?.hargaProperti,
        value: hargaAkhir !== null ? hargaAkhir : hargaProperti,
      },
      hargaAkhir:{
        ...dataInputCalc?.hargaAkhir,
        value: hargaAkhir,
      },
      jumlahPinjaman: {
        ...dataInputCalc?.jumlahPinjaman,
        value: hargaAkhir !== null ? hargaAkhir : hargaProperti,
      },
      uangMuka: {
        ...dataInputCalc?.uangMuka,
        value: hargaAkhir !== null ? hargaAkhir * 5 / 100 : hargaProperti * 5 / 100,
        isValid: true,
      },
    });
  }, [hargaProperti, hargaAkhir]);
  useEffect(() => {
    if (Number(dataInputCalc?.uangMuka?.value) < Number(hargaAkhir !== null ? hargaAkhir : hargaProperti)) {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          value: Number(hargaAkhir !== null ? hargaAkhir : hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
        }
      });
    } else if (Number(dataInputCalc?.uangMuka?.value) > Number(hargaAkhir !== null ? hargaAkhir : hargaProperti)) {
      setDataInputCalc({
        ...dataInputCalc,
        uangMuka: {
          ...dataInputCalc.jumlahPinjaman,
          value: Number(hargaAkhir !== null ? hargaAkhir : hargaProperti),
          msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
        },
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          value: 0
        }
      })
    } else if (isNaN(Number(dataInputCalc?.uangMuka?.value))) {
      setDataInputCalc({
        ...dataInputCalc,
        uangMuka: {
          ...dataInputCalc?.uangMuka,
          value: 0
        }
      })
    } else {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          value: Number(hargaAkhir !== null ? hargaAkhir : hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
        }
      })
    }
  }, [dataInputCalc?.uangMuka?.value])

  const [tenorFixedRate, setTenorFixedRate] = useState(dataInputCalc?.gimmick?.value?.tenorFixedRate || 0);
  const [jangkaWaktu, setJangkaWaktu] = useState(dataInputCalc?.lamaPinjaman?.value || '');
  useEffect(() => {
    
    setTenorFixedRate(dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 || 0);
  }, [dataInputCalc?.gimmick?.value?.tenorFixedRate / 12]);

  const handleLamaPinjaman = (evt) => {
    const tenorFixedRateYears = dataInputCalc?.gimmick?.value?.tenorFixedRate / 12
    if (evt.target.value.length < 1 ) {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: false, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "Lama pinjaman wajib diisi" },
      });
    } else if (evt.target.value === "0") {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: false, value: "", msgError: "Lama pinjaman tidak boleh bernilai nol" },
      });
     } else {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: true, value: evt.target.value.replace(invalidNumRegex, "")},
      });
    }
    setJangkaWaktu(evt.target.value)
  };
  useEffect(() => {
    if (jangkaWaktu < tenorFixedRate) {
      setDataInputCalc((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "Tidak boleh kurang dari Masa Kredit Fix",
        },
      }));
    } else {
      setDataInputCalc((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "",
        },
      }));
    }
  }, [jangkaWaktu, tenorFixedRate]);

  const handleConvertCalc = () => {
    if (!dataInputCalc.lamaPinjaman?.value) {
      setDataInputCalc({
        ...dataInputCalc,
        lamaPinjaman: {
          ...dataInputCalc.lamaPinjaman,
          isValid: !!dataInputCalc.lamaPinjaman?.value,
        },
      });
    } else if (dataInputCalc.lamaPinjaman?.value === "0") {
      setDataInputCalc({
        ...dataInputCalc,
        lamaPinjaman: {
          ...dataInputCalc.lamaPinjaman,
          isValid: false,
          msgError: "Lama pinjaman tidak boleh bernilai nol"
        },
      });
    } else if (!dataInputCalc.jumlahPinjaman?.value) {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc.jumlahPinjaman,
          isValid: !!dataInputCalc.jumlahPinjaman?.value,
        },
      });
    } else if (!dataInputCalc.gimmick?.value?.fixedRate) {
      setDataInputCalc({
        ...dataInputCalc,
        gimmick: {
          ...dataInputCalc.gimmick,
          isValid: !!dataInputCalc.gimmick?.value?.fixedRate,
        },
      });
    } else {
      window.localStorage.setItem(
        "simulasiCalc",
        JSON.stringify({ ...dataInputCalc, productDetail: true })
      );
      if (!!allData) {
        window.localStorage.setItem(
          "detailProperti",
          JSON.stringify({ ...allData })
        );
      }
      localStorage.removeItem('infolelangUtj')
      navigate("/kpr/simulasi");
    }
  };

  const handleChangeAlt = (value, name) => {
    setDataInputCalc({
      ...dataInputCalc,
      [name]: { isValid: !!value, value: value },
    });
  };

  const handleUangMuka = (value, name) => {
    const hargaAkhir = parseInt(dataInputCalc?.hargaAkhir?.value * 5 / 100)
    const hargaProperti = parseInt(dataInputCalc?.hargaProperti?.value * 5 / 100)
    if (hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
      });
    } else if (hargaAkhir !== null ? value === hargaAkhir : value === dataInputCalc?.hargaProperti?.value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan Harga Properti" },
      });
    } else {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  const inputArrPopup = [
    dataInputCalc?.lamaPinjaman?.isValid,
    dataInputCalc?.uangMuka?.isValid,
    dataInputCalc?.gimmick?.isValid,
  ];

  return (
    <div>
      <>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}
          onClick={() => {
            cookie.get("morgateCookie") ?  dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal)) : dispatch(showModalLogin(!state.showModalLogin));
            localStorage.removeItem('infolelangUtj')
          }}
          className="mb-3"
          disabled={!hargaProperti}
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
              value={hargaAkhir !== null ? hargaAkhir : hargaProperti}
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
              value={dataInputCalc?.lamaPinjaman?.value}
              onChange={handleLamaPinjaman}
              maxLength={2}
            />
            {!dataInputCalc?.lamaPinjaman?.isValid && (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">{dataInputCalc?.lamaPinjaman?.msgError}</span>
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
              value={dataInputCalc?.uangMuka?.value}
              onValueChange={(value) => handleUangMuka(value, "uangMuka")}
              allowNegativeValue={false}
            />
            {dataInputCalc?.uangMuka?.isValid ? (
              <p className="prod-detail__pages__property__detailBuying__right__calc__interestInfo">
                Minimal 5% dari harga properti
              </p>
            ) : (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">{dataInputCalc?.uangMuka?.msgError}</span>
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
              value={dataInputCalc?.jumlahPinjaman?.value}
              disabled={true}
              allowNegativeValue={false}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <LabelInputTextbox text="Program Suku Bunga" />
            </div>
            <Dropdown
              value={dataInputCalc?.gimmick?.value}
              onChange={(value) => handleChangeAlt(value, "gimmick")}
              data={gimmickOptions}
            />
            {!dataInputCalc?.gimmick?.isValid && (
              <span className="prod-detail__pages__property__detailBuying__right__calc__false">Program Suku Bunga Wajib diisi</span>
            )}
          </div>
          <div className="mb-4">
            <TextboxLabel
              topLabel="Suku Bunga"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              value={dataInputCalc?.gimmick?.value?.fixedRate}
              disabled={true}
            />
          </div>
          {/* <div className="mb-4">
            <TextboxLabel
              topLabel="Floating Rate"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              value={dataInputCalc?.gimmick?.value?.floatingRate}
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
              value={dataInputCalc?.gimmick?.value?.tenorFixedRate / 12}
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

export default RightPageProductDetails;
