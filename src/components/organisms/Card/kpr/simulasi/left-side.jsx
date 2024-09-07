/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { invalidNumRegex } from "../../../../../helpers/regex";
import { kprSimulasi } from "../../../../../store/actions/fetchData/kpr";
import { Button, CurrencyInput, LabelInputTextbox } from "../../../../atoms";
import { Dropdown, TextboxLabel } from "../../../../molecules";
import { GiConsoleController } from "react-icons/gi";

const LeftKprSim = ({
  state,
  stateDropdown,
  hidden,
  calcSimulasi,
  setCalcSimulasi,
  optionsGimmick,
  onChangeGimmick,
  gimmickOptions,
  optionsKreditFix,
  onChangeKreditFix,
  dataInputCalc,
  setDataInputCalc,
  setLoading,
  setShowCalc
}) => {
  const dispatch = useDispatch();
  const [isShowCalc, setIsShowCalc] = useState(true);
  const handleShowCalc = () => {
    setIsShowCalc(!isShowCalc);
  };

  useState(() => {
    if (window.localStorage.getItem("simulasiCalc")) {
      setCalcSimulasi({
        isCalcSimulasi: !JSON.parse(window.localStorage.getItem("simulasiCalc"))
          ?.productDetail,
        ...JSON.parse(window.localStorage.getItem("simulasiCalc")),
      });
    }
  }, []);

  useEffect(() => {
    if (Number(dataInputCalc?.uangMuka?.value) < Number(dataInputCalc?.hargaAkhir?.value !== null ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaProperti?.value)) {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          value: Number(dataInputCalc?.hargaAkhir?.value !== null ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaProperti?.value) - Number(dataInputCalc?.uangMuka?.value)
        }
      })
    } else if (Number(dataInputCalc?.uangMuka?.value) > Number(dataInputCalc?.hargaAkhir?.value !== null ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaProperti?.value)) {
      setDataInputCalc({
        ...dataInputCalc,
        uangMuka: {
          ...dataInputCalc.jumlahPinjaman,
          value: Number(dataInputCalc?.hargaAkhir?.value !== null ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaProperti?.value),
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
          ...dataInputCalc.jumlahPinjaman,
          value: 0
        }
      })
    }
  }, [dataInputCalc?.uangMuka?.value]);

  const handleChangeAlt = (value, name) => {
    setDataInputCalc({
      ...dataInputCalc,
      [name]: {
        isValid: !!value,
        value: value,
      },
    });
  }; 

  const handleUangMuka = (value, name) => {
    const hargaAkhir = parseInt((dataInputCalc?.hargaAkhir?.value ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaAkhir) * 5 / 100)
    const hargaProperti = parseInt((dataInputCalc?.hargaProperti?.value ? dataInputCalc?.hargaProperti?.value : dataInputCalc?.hargaProperti) * 5 / 100)
    if (hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
      });
    } else if (dataInputCalc?.hargaAkhir?.value !== null ? value === dataInputCalc?.hargaAkhir?.value : value === dataInputCalc?.hargaProperti?.value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan Harga Properti" },
      });
    } else {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  const [tenorFixedRate, setTenorFixedRate] = useState(dataInputCalc?.gimmick?.value?.tenorFixedRate || 0);
  const [jangkaWaktu, setJangkaWaktu] = useState(dataInputCalc?.lamaPinjaman?.value || '');

  useEffect(() => {
    
    setTenorFixedRate(dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 || 0);
  }, [dataInputCalc?.gimmick?.value?.tenorFixedRate / 12]);

  const handleLamaPinjaman = (evt) => {
    if (evt.target.value.length < 1) {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: false, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "Lama pinjaman wajib diisi" },
      });
    } else if (evt.target.value === "0") {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: false, value: "", msgError: "Lama pinjaman tidak boleh bernilai nol" },
      });
    } else if (evt.target.value < tenorFixedRate) {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: false, value: evt.target.value.replace(/[^0-9]/gi, ""), msgError: "Tidak boleh kurang dari Masa Kredit Fix" },
      });
    } else {
      setDataInputCalc({
        ...dataInputCalc,
        [evt.target.name]: { isValid: true, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "" },
      });
    }
    setJangkaWaktu(evt.target.value)
  };

  useEffect(() => {
    if (jangkaWaktu < tenorFixedRate) {
      setDataInputCalc((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.lamaPinjaman,
          msgError: "Tidak boleh kurang dari Masa Kredit Fix",
        },
      }));
    }
  }, [tenorFixedRate]);
  
  const handleCalc = () => {
    if (!dataInputCalc.lamaPinjaman?.value) {
      setDataInputCalc({
        ...dataInputCalc,
        lamaPinjaman: {
          ...dataInputCalc.lamaPinjaman,
          isValid: !!dataInputCalc.lamaPinjaman?.value,
        },
      });
    } else if (!dataInputCalc.uangMuka?.value) {
      setDataInputCalc({
        ...dataInputCalc,
        uangMuka: {
          ...dataInputCalc.uangMuka,
          isValid: !!dataInputCalc.uangMuka?.value,
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
    } else if (!dataInputCalc.gimmick?.value?.biayaAdminNominal) {
      setDataInputCalc({
        ...dataInputCalc,
        gimmick: {
          ...dataInputCalc.gimmick,
          isValid: !!dataInputCalc.gimmick?.value?.biayaAdminNominal,
        },
      });
    } else if (!dataInputCalc?.uangMuka?.isValid) {
      setDataInputCalc({ ...dataInputCalc, uangMuka: { ...dataInputCalc.uangMuka } });
    } else {
      dispatch(kprSimulasi(dataInputCalc, setCalcSimulasi, { isCalcSimulasi: !JSON.parse(window.localStorage.getItem("simulasiCalc"))?.productDetail }, setLoading, setShowCalc));
      window.localStorage.setItem(
        "simulasiCalc",
        JSON.stringify({ ...dataInputCalc, productDetail: true })
      );
      setCalcSimulasi({
        isCalcSimulasi: !dataInputCalc?.productDetail,
        ...dataInputCalc,
      });

      window.scrollTo(0, 0);
    }
  };

  const inputArrKpr = [
    dataInputCalc?.lamaPinjaman?.isValid,
    dataInputCalc?.uangMuka?.isValid
  ];

    // console.log("tase", isShowCalc);
    // console.log("data", dataInputCalc);

  return (
    <div
      className={`kprSim__pages__left__wrapper ${hidden ? "hidden" : "block"}`}
    >
      <div className="kprSim__pages__left__calc__wrapper">
        <div className="kprSim__pages__left__calc__wrapper__wrapperTitle">
          <p
            className={`kprSim__pages__left__calc__title ${isShowCalc ? "mb-6" : ""
              }`}
          >
            Kalkulator KPR
          </p>
          <img
            onClick={handleShowCalc}
            className="kprSim__pages__left__calc__btn"
            src="/icons/small-icons/arrow-down.svg"
            alt="arrow-down"
          />
        </div>
        {isShowCalc && (
          <div className="kprSim__pages__left__calc__bodyFormWrapper">
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
                value={dataInputCalc?.hargaAkhir?.value ? dataInputCalc?.hargaAkhir?.value : dataInputCalc?.hargaAkhir}
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
                maxLength={2}
                value={dataInputCalc?.lamaPinjaman?.value}
                onChange={(e) => handleLamaPinjaman(e)}
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
                value={dataInputCalc?.uangMuka?.value}
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
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
              {!dataInputCalc.gimmick.isValid && (
                <span className="text-[#F04438]">Program Suku Bunga Wajib diisi</span>
              )}
            </div>
            <div className="mb-4">
              <TextboxLabel
                topLabel="Suku Bunga"
                placeholder=""
                rightLabel="%"
                rightLabelBorder={true}
                value={dataInputCalc.gimmick?.value?.fixedRate}
                disabled={true}
              />
            </div>
            {/* <div className="mb-4">
              <TextboxLabel
                topLabel="Floating Rate"
                placeholder=""
                rightLabel="%"
                rightLabelBorder={true}
                value={dataInputCalc.gimmick?.value?.floatingRate}
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
                maxLength={3}
                value={dataInputCalc?.gimmick?.value?.tenorFixedRate / 12}
                disabled={true}
              />
            </div>
            <p className="kprSim__pages__left__calc__notes">
              Setelah 1 tahun akan mengikuti Suku
              Bunga Bank BI yang berlaku saat itu
            </p>
            <Button
              buttonColor="blue"
              textColor="white"
              fullWidth={true}
              paddingSize={"padding-1"}
              onClick={handleCalc}
              disabled={inputArrKpr?.filter?.(Boolean)?.length !== 2}
            >
              Hitung Simulasi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftKprSim;
