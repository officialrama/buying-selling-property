/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Geocode from "react-geocode";
import moment from "moment";
import { MdOutlineClear } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { KCAutocomplete, LabelInputTextbox, Button, input, KCAutocompleteRadio, CurrencyInputCalc, LabelCalc, InputMasked } from "../../../components/atoms";
import {
  AccordionFaq,
  Checkbox,
  Dropdown,
  ModalGMaps,
  ModalKJPPNotaris,
  ModalSimulasiKPR,
  TextboxDropdown,
  TextboxLabel
} from "../../../components/molecules";
import {
  GMapsPinBox,
  Location,
  LocationDomisili
} from "../../../components/organisms";
import { areacodeConst } from "../../../static/areacodeConst";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import { setGender, setMaritalStatus } from "../../../store/actions/changePersonalDataState";
import { nearbyBranch, otherBranch } from "../../../store/actions/fetchData/branch";
import _ from "lodash-contrib";
import { getLocByLatLng } from "../../../helpers/getLocByLatLng";
import { listKjpp } from "../../../store/actions/fetchData/admin-cabang";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const PropertiCS = ({ inputs, handleInput, dataAddressProperti, setInputs, setAddressProperti, setMapsState, mapsState, onChangeTextProperti, disabled, warnText, handleChangeGimmick, handleUangMuka, handleJangkaWaktu, handleChangeAlt, handleChangeCalc, gimmickOptions, calcState, handleKondisiAset, kondisiAset, setKondisiAset, calcKPRSimArr, handleResetCacl, handleSimulasiCalc, generatePDF, setGeneratePDF }) => {
  const [dataTemp, setDataTemp] = useState();
  const [isModalKjppNotaris, setModalKjppNotaris] = useState(false);
  const [isModalGmaps, setModalGmaps] = useState(false);
  const [chooseReferral, setChooseReferral] = useState("karyawanBRI")
  const dispatch = useDispatch();

  const handleChooseReferral = (event) => {
    setChooseReferral(event.target.value);

  };

  useEffect(() => {
    dispatch(setGender(personalDataConst.gender[0]));
    dispatch(setMaritalStatus(personalDataConst.maritalStatus[0]));
    window.scrollTo(0, 0);
  }, []);

  const handleLoadPinLoc = () => {
    if (!!dataAddressProperti.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddressProperti.lat,
          lng: dataAddressProperti.lng,
        },
        address: dataAddressProperti.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position){
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
        .then((res) => {
          setMapsState({
            ...mapsState,
            center: {
              ...mapsState.center,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            address: res.results[0].formatted_address,
            placeId: res.results[0].place_id,
            draggable: true,
          });
        })
        .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      });
      setModalGmaps(true);
    }
  };

  const onChangeAddressProperti = (key, value) => {
    setAddressProperti({ ...dataAddressProperti, [key]: value });
  };

  useEffect(() => {
    if (inputs?.dataAddressProperti?.value) {
      setAddressProperti({
        address: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.alamat : "",
        rt: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.rt || "" : "",
        rw: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.rw || "" : "",
        posCode:_.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.kodePos || "" : "",
        province: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.provinsi : "",
        subDistrict: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.kecamatan : "",
        district: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.kabupaten : "",
        urbanVillage: _.isJSON(inputs?.addressProperti?.value) ? JSON.parse(inputs?.addressProperti?.value)?.kelurahan : "",
        lng: inputs?.longLatAddress?.value?.split(",")[0],
        lat: inputs?.longLatAddress?.value?.split(",")[1],
      });
    }
  }, [])

  const stringMinified = "{\"alamat\":\"" + dataAddressProperti.address + "\",\"rt\":\"" + dataAddressProperti.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddressProperti.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddressProperti.posCode + "\",\"provinsi\":\"" + dataAddressProperti.province + "\",\"kabupaten\":\"" + dataAddressProperti.district + "\",\"kecamatan\":\"" + dataAddressProperti.subDistrict + "\",\"kelurahan\":\"" + dataAddressProperti.urbanVillage + "\"}";
  useEffect(() => {
    setInputs({ ...inputs, dataAddressProperti: { isValid: !!stringMinified, value: stringMinified } })
  }, [dataAddressProperti])
useEffect(() => {
  if (inputs?.ukerCode?.value) {
    dispatch(listKjpp(inputs?.ukerCode?.value, setDataTemp, dataTemp, ""))
  }
}, [inputs?.ukerCode?.value]);


  return (
    <>
    <div className="border border-[#D3D4D4] rounded-lg p-6 mobile:p-2">
    <p className="text-xl text-[#292929] font-bold mb-4">Properti</p>
    <div className="flex flex-col">
    <p className="text-xs text-[#292929] mb-2 font-bold">Pilihan Aset</p>
    <div className="flex flex-row gap-[15px] mt-3 mobile:grid-cols-2">
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={kondisiAset === 'Baru'}
            value="Baru"
            name="Baru"
            onChange={handleKondisiAset}
          />
          <p className="text-sm text-[#292929]">Baru</p>
          </div>
          <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={kondisiAset === 'Second'}
            value="Second"
            name="Second"
            onChange={handleKondisiAset}
          />
          <p className="text-sm text-[#292929]">Second</p>
          </div>
          </div>
          </div>
      <ModalKJPPNotaris
        isModalKjppNotaris={isModalKjppNotaris}
        setModalKjppNotaris={setModalKjppNotaris}
        dataKjppNotaris={dataTemp?.ResponseData}
      />
      <div className="flex flex-row pt-4 gap-4 pb-2">
      <div className="flex flex-col w-[412px] gap-2">
      <p className="text-xs font-semibold text-[#292929] flex flex-row">Nama Pereferral atau Kode Referral<p className="text-[#E84040]">*</p></p>
      <TextboxLabel placeholder="PN Pekerja (Pegawai BRI) atau Nama (Non Pekerja BRI)" name="noReferral" value={inputs?.noReferral?.value} onChange={handleInput.handleAllCharInput} maxLength="20" warnText={!inputs?.noReferral?.value ? "Referral tidak boleh kosong" : !inputs?.noReferral?.isValid ? inputs?.noReferral?.msgError : ""} />
      </div>
      <div className="flex flex-col">
    <p className="text-xs text-[#292929] mb-2 font-bold">Yang Mereferralkan</p>
    <div className="grid grid-cols-2 mt-2 mobile:grid-cols-1">
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={chooseReferral === 'karyawanBRI'}
            value="karyawanBRI"
            name="karyawanBRI"
            onChange={handleChooseReferral}
          />
          <p className="text-sm text-[#292929]">Pekerja BRI</p>
          </div>
          <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={chooseReferral === 'agenProperti'}
            value="agenProperti"
            name="agenProperti"
            onChange={handleChooseReferral}
          />
          <p className="text-sm text-[#292929]">Non Pekerja BRI</p>
          </div>
          </div>
          </div>
          </div>
          <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[#292929] flex flex-row">Nama Properti<p className="text-[#E84040]">*</p></p>
          <TextboxLabel placeholder="Masukkan Nama Properti" name="namaProperti" value={inputs?.namaProperti?.value} onChange={handleInput.handleName} warnText={inputs?.namaProperti?.msgError} />
          </div>
        <div className="flex flex-row gap-2 mt-2">
        <div className="w-[89%] flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Pin Lokasi<p className="text-[#E84040]">*</p></p>
      <TextboxLabel
          placeholder="Pin Alamat Lengkap"
          name="address"
          value={dataAddressProperti?.address || ""}
          rightLabelBorder={false}
          onChange={(e) => {
            const newValue = e.target.value;
            onChangeAddressProperti(e.target.name, newValue);
            onChangeTextProperti(e.target.name, newValue);
          }}
          disabled={disabled}
          warnText={dataAddressProperti?.address?.length < 3 || dataAddressProperti?.address === "0" ? "Alamat tidak valid" : ""}
        />
        </div>
        <div className="flex-shrink-0">
        <Button
          className={"mt-6 font-medium text-sm w-full h-10"}
          buttonColor="bluefigma"
          textColor="white"
          onClick={handleLoadPinLoc}
          paddingSize={"padding-0"}
          disabled={disabled}
        >
          Pin Lokasi
        </Button>
       
        <ModalGMaps
          isModalGmaps={isModalGmaps}
          dataAddress={dataAddressProperti}
          setDataAddress={setAddressProperti}
          mapsState={mapsState}
          setMapsState={setMapsState}
          setModalGmaps={setModalGmaps}
        />
      </div>
      {warnText !== "" && (
        <div className="my-2">  
          <p className="textbox__invalidTxt">{warnText}</p>
        </div>
        ) }
      </div>
      <div className="-mt-12">
        <Location dataAddress={dataAddressProperti} setDataAddress={setAddressProperti} onChangeText={onChangeAddressProperti} />
      </div>
      <p className="text-xl text-[#292929] font-bold mb-4 mt-9">Simulasi KPR</p>
      <div className="grid grid-cols-2 gap-3 mobile:flex mobile:flex-col">
            <div className="flex flex-col gap-2 text-[#292929] font-semibold">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Harga Properti<p className="text-[#E84040]">*</p></p>
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="hargaRumah"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={calcState?.hargaRumah?.value}
                onValueChange={(value) => handleChangeAlt("hargaRumah", value || 0)}
              />
            </div>
            {/* <div>
              <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
                <LabelCalc text="Jumlah Pinjaman" />
                <CurrencyInputCalc
                  className="textbox-label__currency"
                  name="jumlahPinjaman"
                  placeholder="0"
                  decimalsLimit={2}
                  groupSeparator="."
                  decimalSeparator=","
                  maxLength={16}
                  value={
                    calcState?.jumlahPinjaman?.value ||
                    calcState?.hargaRumah?.value - (calcState?.hargaRumah?.value * 5) / 100 ||
                    ""
                  }
                  disabled={true}
                  allowNegativeValue={false}
                  onValueChange={(value) => handleChangeAlt("jumlahPinjaman", value)}
                />
              </div>
            </div> */}
            <div className="flex flex-col gap-2 text-[#292929] font-semibold">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Uang Muka<p className="text-[#E84040]">*</p></p>
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="dp"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                // disabled={!calcState?.hargaRumah?.isValid}
                value={calcState?.dp?.value || ""}
                onValueChange={(value) => handleUangMuka("dp", value)}
                warnText={calcState?.dp?.msgError}
              />
               {(!calcState || !calcState.dp?.msgError) && (
              <p className="landing-page calc-kpr__interest-info mobile:hidden">
               Minimal 5% dari harga properti{" "}
               {!calcState && (
              <span className="text-[#F04438]">*Wajib diisi untuk melihat kalkulasi</span>
               )}
               </p>
               )}
            </div>
            <div className="flex flex-col gap-2 -mt-1">
              <div className="text-[#292929] font-semibold">
              <p className="text-xs font-semibold text-[#292929] flex flex-row">Program Suku Bunga<p className="text-[#E84040]">*</p></p>
              </div>
              <div className="">
              <Dropdown
                value={calcState?.gimmick?.value}
                onChange={(value) => handleChangeGimmick(value, "gimmick")}
                data={gimmickOptions}
                placeholder={"Pilih Program Suku Bunga"}
              />
              </div>
              <p className="landing-page calc-kpr__interest-info">
              </p>
            </div>
            <div className="flex flex-row gap-3 mobile:gap-0">
            <div className="flex flex-col -mt-1 gap-2">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Suku Bunga<p className="text-[#E84040]">*</p></p>
            <InputMasked
              className="textbox-label__currency text-[#929393]"
              placeholder=""
              rightLabel="%"
              name="fixedRate"
              requireDecimal={true}
              value={calcState?.gimmick?.value?.fixedRate}
              onChange={(e) => handleChangeCalc("fixedRate", e.target.value)}
              disabled={true}
              rightLabelBorder={false}
            />
            </div>
            <div className="flex flex-col gap-2 -mt-1">
            <p className="text-xs font-semibold text-[#292929] flex flex-row whitespace-nowrap">Masa Kredit Fix<p className="text-[#E84040]">*</p></p>
            <TextboxLabel
              className="text-[#929393]"
              name="masaKreditFix"
              rightLabel="tahun"
              rightLabelBorder={false}
              placeholder=""
              value={`${typeof calcState?.gimmick?.value?.tenorFixedRate !== 'undefined' ? calcState?.gimmick?.value?.tenorFixedRate / 12 : ""}`}
              maxLength={3}
              disabled={true}
            />
            </div>  
            <div className="flex flex-col gap-2 -mt-1">
            <p className="text-xs font-semibold text-[#292929] flex flex-row">Jangka Waktu<p className="text-[#E84040]">*</p></p>
            <TextboxLabel
              name="jangkaWaktu"
              rightLabel="tahun"
              placeholder=""
              rightLabelBorder={false}
              disabled={!calcState?.hargaRumah?.isValid}
              value={calcState?.jangkaWaktu?.value}
              onChange={(e) => handleJangkaWaktu("jangkaWaktu", e.target.value)}
              maxLength={2}
            />
                  {calcState?.jangkaWaktu?.msgError && (
        <span className="text-[#F04438] text-[12px] font-semibold">
          {calcState?.jangkaWaktu?.msgError}
        </span>
           )}
                </div>
              </div>
              <p className="text-[#777777] pt-1 text-xs font-medium w-[726px] mobile:w-[260px]">
            *Perhitungan ini hanyalah estimasi, untuk hasil yang lebih akurat dan lengkap, silakan kunjungi kantor BRI terdekat.
            </p>
      </div>
      <div className="flex flex-row gap-2 justify-end py-2 mobile:flex-col">
            <Button
              className="bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:border-[#EAEBEB] disabled:text-[#B5B6B6] h-12"
              buttonColor={disabled === true ? "border-[#EAEBEB] bg-[#EAEBEB] rounded-lg" : "bg-[#1078CA] text-[#ffff] rounded-lg"}
              textColor={disabled === true ? "text-[#B5B6B6]" : "text-[#ffff]"}
              onClick={handleResetCacl}
              paddingSize={"padding-0"}
              disabled={calcKPRSimArr.filter(Boolean).length === 0 }
            >
              <p className="text-base font-bold whitespace-nowrap px-3">Reset</p>  
            </Button>
            <Button
              className="bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:border-[#EAEBEB] disabled:text-[#B5B6B6] h-12"
              onClick={handleSimulasiCalc}
              textColor={disabled === true ? "text-[#B5B6B6]" : "text-[#ffff]"} 
              buttonColor={disabled === true ? "border-[#EAEBEB] text-[#B5B6B6] bg-[#EAEBEB] rounded-lg" : "bg-[#1078CA] text-[#ffff] rounded-lg"}
              paddingSize={"padding-0"}
              disabled={calcKPRSimArr.filter(Boolean).length !== 3}
            >
              <p className="text-base font-bold  whitespace-nowrap px-3">Lihat Detail Angsuran</p>
            </Button>
      </div>
            <ModalSimulasiKPR 
              generatePDF={generatePDF}
              setGeneratePDF={setGeneratePDF}
              calcState={calcState}
            />
      </div>
    </>
  );
};

export default PropertiCS;
