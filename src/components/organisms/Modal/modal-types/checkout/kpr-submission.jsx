/* eslint-disable no-mixed-operators */
import _ from "lodash-contrib";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { invalidNumRegex } from "../../../../../helpers/regex";
import { toTitleCase } from "../../../../../helpers/string";
import {
  setKprBri,
  setKprBrisyariah
} from "../../../../../store/actions/changeRadioState";
import { CurrencyInput, LabelInputTextbox } from "../../../../atoms";
import {
  Dropdown,
  Textbox, TextboxLabel
} from "../../../../molecules";
import { TextColor } from "../../../../theme/text/text";

const KprSubmission = ({ data, otherProps, dataInputCalc, setDataInputCalc }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const alamat = _.isJSON(data?.project?.alamatProperti?.alamat) ? JSON.parse(data?.project?.alamatProperti?.alamat) : "" 
  const alamatInfolelang = data?.responseData?.addresses?.region + ", " + data?.responseData?.addresses?.province
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setKprBrisyariah(false));
    dispatch(setKprBri(false));
  }, []);
  const [optionsGimmick, setOptionsGimmick] = useState({
    biayaAdmin: 0,
    biayaProvisi: 0,
    fixedRate: 0,
    floatingRate: 0,
    name: "Pilih Program Suku Bunga",
  });
  useEffect(() => {
    setDataInputCalc({
      ...otherProps.dataInputCalc,
      lokasi: alamat?.kabupaten + ", " + alamat?.provinsi,
      hargaAkhir: data?.detailProperti?.hargaAkhir ? data?.detailProperti?.hargaAkhir : data?.responseData?.price,
      hargaProperti: data?.detailProperti?.hargaProperti ? data?.detailProperti?.hargaProperti : data?.responseData?.priceBefore ,
      lt: data?.detailProperti?.lt ? data?.detailProperti?.lt : data?.responseData?.buildingAssets?.surfaceArea,
      lb: data?.detailProperti?.lb ? data?.detailProperti?.lb : data?.responseData?.buildingAssets?.buildingArea,
      jenisProperti: data?.project?.jenisProperti ? data?.project?.jenisProperti : data?.responseData?.type,
    });
    if (location.pathname.includes("/kpr/simulasi")) {
      setOptionsGimmick(
        JSON.parse(window.localStorage.getItem("simulasiCalc"))?.gimmick
      );
    }
  }, [data]);

  useEffect(() => {
    if (Number(dataInputCalc?.uangMuka?.value) <= Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir * 5 / 100 : dataInputCalc?.hargaProperti * 5 / 100)){
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          isValid: !!(Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti) - Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir * 5 / 100 : dataInputCalc?.hargaProperti * 5 / 100)),
          value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti) - Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir * 5 / 100 : dataInputCalc?.hargaProperti * 5 / 100)
        }
      })
    } else if (Number(dataInputCalc?.uangMuka?.value) < Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)) {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          isValid: !!(Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)),
          value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
        }
      })
    } else if (Number(dataInputCalc?.uangMuka?.value) > Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)) {
      setDataInputCalc({
        ...dataInputCalc,
        uangMuka: {
          ...dataInputCalc.uangMuka,
          isValid: !!Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
          value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
          msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
        },
        jumlahPinjaman: {
          ...dataInputCalc?.jumlahPinjaman,
          value: 0
        }
      })
    }
  }, [dataInputCalc?.uangMuka?.value])

  const handleChangeAlt = (value, name) => {
    const hargaAkhir = parseInt(dataInputCalc?.hargaAkhir?.value * 5 / 100)
    const hargaProperti = parseInt(data?.detailProperti?.hargaProperti * 5 / 100);
    if (name === "uangMuka" && hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: !!value, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
      });
    } else if (name === "uangMuka" && value === 0 || name === "uangMuka" && isNaN(value)) {
      setDataInputCalc({
        ...dataInputCalc,
        jumlahPinjaman: {
          ...dataInputCalc.jumlahPinjaman,
          isValid: !!Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
          value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)
        },
        [name]: {
          isValid: false,
          value: value,
          msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti"
        }
      })
    } else {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: !!value, value: value, msgError: "" },
      });
    }
  };

  const [tenorFixedRate, setTenorFixedRate] = useState(dataInputCalc?.gimmick?.value?.tenorFixedRate || 0);
  const [jangkaWaktu, setJangkaWaktu] = useState(dataInputCalc?.lamaPinjaman?.value || '');

  useEffect(() => {
    
    setTenorFixedRate(dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 || 0);
  }, [dataInputCalc?.gimmick?.value?.tenorFixedRate / 12]);

  const handleLamaPinjaman = (evt) => {
    const tenorFixedRateYears = dataInputCalc?.gimmick?.value?.tenorFixedRate / 12
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
          ...prevState.jangkaWaktu,
          msgError: "Tidak boleh kurang dari Masa Kredit Fix",
        },
      }));
    }
  }, [tenorFixedRate]);

  const handleUangMuka = (value, name) => {
    const hargaAkhir = parseInt(dataInputCalc?.hargaAkhir * 5 / 100)
    const hargaProperti = parseInt(dataInputCalc?.hargaProperti * 5 / 100)
    if (hargaProperti > value) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
      });
    } else if (dataInputCalc?.hargaAkhir !== null ? value === dataInputCalc?.hargaAkhir : value === dataInputCalc?.hargaProperti) {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan Harga Properti" },
      });
    } else if (isNaN(Number(value))) {
      setDataInputCalc({
        ...dataInputCalc, 
        jumlahPinjaman: {
          isValid: !!(Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)),
          value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)
        },
        [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh kosong" },
      });      
    } else {
      setDataInputCalc({
        ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  return (
    <div className="kpr-submission__wrapper__baseModal">
      <div className="kpr-submission__wrapper__flexCol">
        <Textbox
          label="Lokasi"
          typeInput="text"
          value={alamat === "" ? alamatInfolelang : dataInputCalc?.lokasi}
          disabled
        />
        <div className="kpr-submission__dp-wrap">
          <LabelInputTextbox text="Harga Properti" />
          <CurrencyInput
            className="textbox-label__currency"
            name="hargaProperti"
            placeholder="0"
            decimalsLimit={2}
            groupSeparator="."
            decimalSeparator=","
            maxLength={16}
            value={dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti}
            disabled={true}
          />
        </div>
        <div className="kpr-submission__wrapper__formWrapper">
          <TextboxLabel
            topLabel="Luas Tanah"
            rightLabel="m²"
            placeholder="100"
            maxLength={2}
            value={dataInputCalc?.lt}
            disabled
          />
          <TextboxLabel
            topLabel="Luas Bangunan"
            rightLabel="m²"
            placeholder="72"
            value={dataInputCalc?.lb}
            disabled
          />
        </div>
        <TextboxLabel
          topLabel="Jenis Properti"
          placeholder="Non-Subsidi"
          value={
            dataInputCalc?.jenisProperti &&
            toTitleCase(dataInputCalc?.jenisProperti)
          }
          disabled
        />
        <TextboxLabel
          name="lamaPinjaman"
          topLabel="Lama Pinjaman"
          placeholder=""
          rightLabel="Tahun"
          rightLabelBorder={true}
          value={dataInputCalc?.lamaPinjaman?.value}
          onChange={(e) => handleLamaPinjaman(e)}
          maxLength={2}
          disabled={location.pathname.includes("/kpr/simulasi") ? true : false}
          warnText={dataInputCalc?.lamaPinjaman?.msgError}
        />
        <div className="kpr-submission__dp-wrap">
          <LabelInputTextbox text="Uang Muka" />
          <CurrencyInput
            className="textbox-label__currency"
            name="uangMuka"
            value={dataInputCalc?.uangMuka?.value || dataInputCalc?.hargaProperti * 5 / 100}
            placeholder="0"
            decimalsLimit={2}
            groupSeparator="."
            decimalSeparator=","
            maxLength={16}
            textButtonColor={TextColor.black}
            onValueChange={(value) => handleUangMuka(value, "uangMuka")}
            disabled={
              location.pathname.includes("/kpr/simulasi") ? true : false
            }
            warnText={dataInputCalc?.uangMuka?.msgError}
            allowNegativeValue={false}
          />
          <p className="kpr-submission__interestInfo">
            Minimal 5% dari harga properti
          </p>
        </div>
        <div className="kpr-submission__dp-wrap">
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
          />
        </div>
        <Dropdown
          topLabel="Program Suku Bunga"
          value={dataInputCalc?.gimmick?.value || optionsGimmick}
          data={otherProps?.gimmickOptions}
          onChange={(value) => handleChangeAlt(value, "gimmick")}
          showOptions={
            !location.pathname.includes("/kpr/simulasi") ? true : false
          }
        />
        <TextboxLabel
          topLabel="Suku Bunga"
          placeholder=""
          rightLabel="%"
          rightLabelBorder={true}
          disabled={true}
          value={dataInputCalc?.gimmick?.value?.fixedRate}
        />
        {/* <TextboxLabel
          topLabel="Floating Rate"
          placeholder=""
          rightLabel="%"
          rightLabelBorder={true}
          disabled={true}
          value={dataInputCalc?.gimmick?.value?.floatingRate}
        /> */}
        <TextboxLabel
          topLabel="Masa Kredit Fix"
          placeholder=""
          rightLabel="Tahun"
          rightLabelBorder={true}
          disabled={true}
          value={dataInputCalc?.gimmick?.value?.tenorFixedRate / 12}
        />
        <p className="kpr-submission__notes">
          *Catatan: Perhitungan ini adalah hasil perkiraaan aplikasi KPR secara
          umum. Data perhitungan di atas dapat berbeda dengan perhitungan bank.
          Untuk perhitungan yang akurat, silahkan hubungi kantor cabang kami.
        </p>
      </div>
    </div>
  );
};

export default KprSubmission;
