/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Geocode from "react-geocode";
import moment from "moment";
import { inquiryKodePos } from "../../../store/actions/fetchData/sellPropState";
import { MdOutlineClear } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { KCAutocomplete, LabelInputTextbox, Button, KCAutocompleteRadio } from "../../../components/atoms";
import {
  Checkbox,
  Dropdown,
  ModalGMaps,
  ModalGMapsInsurance,
  TextboxDropdown,
  TextboxLabel
} from "../../../components/molecules";
import {
  GMapsPinBox,
  Location,
  LocationDomisili,
} from "../../../components/organisms";
import { areacodeConst } from "../../../static/areacodeConst";
import { personalDataConst } from "../../../static/personal-data/personal-data";
import { setGender, setMaritalStatus } from "../../../store/actions/changePersonalDataState";
import { nearbyBranch, otherBranch } from "../../../store/actions/fetchData/branch";
import _ from "lodash-contrib";
import { invalidNumRegex } from "../../../helpers/regex";
import { getLocByLatLng } from "../../../helpers/getLocByLatLng";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const DataDiriAsuransi = ({ inputs, handleInput, dataAddress, setInputs, setDataAddress, dataAddressKTP, setDataAddressKTP, dropdownVal, setDropdownVal, onChangeText, disabled, setKcOtherList, kcOtherList, warnText, setKcList, kcList, setKcForm, kcForm, setKcDescVal, kcDescVal, setMapsState, mapsState, handleWaktuKontak, waktuKontak, setWaktuKontak, }) => {
  const [isModalGmaps, setModalGmaps] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSameWithKTP, setIsSameWithKTP] = useState(true)
  const [kcNearby, setKcNearby] = useState(true)
  const [loadingLoc, setLoadingLoc] = useState({
    onLoading: false,
    failed: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (kcForm.state === "nearby") {
      navigator?.geolocation?.getCurrentPosition(function (position) {
        dispatch(nearbyBranch({ lng: position?.coords?.longitude, lat: position?.coords?.latitude }, setKcList, loadingLoc, setLoadingLoc, setKcForm));
      });
    } else if (kcForm.state === "other") {
      dispatch(otherBranch(setKcOtherList, loadingLoc, setLoadingLoc));
    }
  }, [kcForm.state])

  function matchDataKc(state, value) {
    return (
      kcForm.state !== "other" ? state.unitKerja.toLowerCase().indexOf(value.toLowerCase()) !== -1 : state.brdesc.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }


  const handleLoadPinLoc = () => {
    if (!!dataAddress.placeId) {
      setMapsState({
        ...mapsState,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position){
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
        .then((res) => {
          // cut address character for insurance
          const address = res.results[0].formatted_address.split(",")
          setMapsState({
            ...mapsState,
            center: {
              ...mapsState.center,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            address: address[0],
            placeId: res.results[0].place_id,
            draggable: true,
          });
        })
        .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      });
      setModalGmaps(true);
    }
  };

  const onChangeAddressKTP = (key, value) => {
    setDataAddressKTP({ ...dataAddressKTP, [key]: value });
  };

  useEffect(() => {
    if (inputs?.addressKTP?.value) {
      setDataAddressKTP({
        address: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.alamat : "",
        rt: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.rt || "" : "",
        rw: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.rw || "" : "",
        posCode:_.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.kodePos || "" : "",
        province: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.provinsi : "",
        subDistrict: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.kecamatan : "",
        district: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.kabupaten : "",
        urbanVillage: _.isJSON(inputs?.addressKTP?.value) ? JSON.parse(inputs?.addressKTP?.value)?.kelurahan : "",
        lng: inputs?.longLatAddressKTP?.value?.split(",")[0],
        lat: inputs?.longLatAddressKTP?.value?.split(",")[1],
      });
    }
  }, [])

  const stringMinifiedKTP = "{\"alamat\":\"" + dataAddressKTP.address + "\",\"rt\":\"" + dataAddressKTP.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddressKTP.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddressKTP.posCode + "\",\"provinsi\":\"" + dataAddressKTP.province + "\",\"kabupaten\":\"" + dataAddressKTP.district + "\",\"kecamatan\":\"" + dataAddressKTP.subDistrict + "\",\"kelurahan\":\"" + dataAddressKTP.urbanVillage + "\"}";
 
  useEffect(() => {
    setInputs({ ...inputs, addressKTP: { isValid: !!stringMinifiedKTP, value: stringMinifiedKTP } })
  }, [dataAddressKTP])

  const onChangeAddress = (key, value) => {
    setDataAddress({ ...dataAddress, [key]: value });
  };

  useEffect(() => {
    if (inputs?.address?.value) {
      setDataAddress({
        address: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.alamat : "",
        rt: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.rt || "" : "",
        rw: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.rw || "" : "",
        posCode:_.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.kodePos || "" : "",
        province: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.provinsi : "",
        subDistrict: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.kecamatan : "",
        district: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.kabupaten : "",
        urbanVillage: _.isJSON(inputs?.address?.value) ? JSON.parse(inputs?.address?.value)?.kelurahan : "",
        lng: inputs?.longLatAddress?.value?.split(",")[0],
        lat: inputs?.longLatAddress?.value?.split(",")[1],
      });
    }
  }, [])

  const stringMinified = "{\"alamat\":\"" + dataAddress.address + "\",\"rt\":\"" + dataAddress.rt.replace(/ /g, '') + "\",\"rw\":\"" + dataAddress.rw.replace(/ /g, '') + "\",\"kodePos\":\"" + dataAddress.posCode + "\",\"provinsi\":\"" + dataAddress.province + "\",\"kabupaten\":\"" + dataAddress.district + "\",\"kecamatan\":\"" + dataAddress.subDistrict + "\",\"kelurahan\":\"" + dataAddress.urbanVillage + "\"}";
  useEffect(() => {
    setInputs({ ...inputs, address: { isValid: !!stringMinified, value: stringMinified } })
  }, [dataAddress])

  const formatNumberWithSpace = (value) => {
    if (!value) return '';
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
  };

  return (
    <>
     <div className="border border-[#D3D4D4] rounded-lg p-6">
      <span className="font-bold text-2xl" >Informasi Pribadi</span>
      <div className="grid mobile:grid-cols-1 grid-cols-2 gap-y-4 gap-x-6">
      <TextboxLabel topLabel="Tempat Lahir*" placeholder="Tempat Lahir" name="pob" value={inputs?.pob?.value} onChange={handleInput.handleName} warnText={inputs?.pob?.msgError} />
          <div>
          <div className="mb-2">
            <LabelInputTextbox text="Tanggal Lahir*" />
          </div>
          <DatePicker
            onChange={(e) => {
              handleInput.handleDateInputChange(e, "dob");
            }}
            value={inputs?.dob?.value || null}
            onChangeRaw={(e) => e.preventDefault()}
            maxDate={new Date(moment().subtract(17, "years"))}
            format="dd-MM-yyyy"
            locale="id-ID"
            calendarIcon={
              <Fragment>
                <img src="/icons/small-icons/date-orange.svg" alt="date-icon" />
              </Fragment>
            }
            clearIcon={<MdOutlineClear />}
          />
          {!inputs.dob?.isValid && (
            <div className="my-2">
              <p className="textbox__invalidTxt">Tanggal Lahir Wajib Diisi</p>
            </div>
          )}
        </div>
        <TextboxLabel topLabel="Nama Lengkap*" placeholder="Nama Lengkap" name="fullName" value={inputs?.fullName?.value} onChange={handleInput.handleName} warnText={inputs?.fullName?.msgError} />
      <TextboxLabel topLabel="NIK*" placeholder="NIK" name="nik" value={inputs?.nik?.value} onChange={handleInput.handleNumberInput} maxLength="16" warnText={!inputs?.nik?.value ? "NIK tidak boleh kosong" : !inputs?.nik?.isValid ? inputs?.nik?.msgError : ""} />
        <TextboxDropdown 
          label="No Handphone*"
          value={inputs?.mobileNoArea}
          valueInput={inputs?.mobileNo?.value || ""}
          name="mobileNo"
          onValueChange={handleInput.handleMobileNo}
          onChange={(value) => {
            handleInput.handleAreaCode(value, "mobileNoArea");
          }}
          data={areacodeConst}
          maxLength={13}
          invalid={!inputs?.mobileNo?.isValid}
          invalidTxt={inputs?.mobileNo?.msgError}
        />
          <TextboxLabel 
          topLabel="Email" 
          placeholder="Email" 
          value={inputs?.email?.value} 
          name="email" 
          onChange={handleInput.handleEmail}
          invalid={!inputs?.email?.isValid}
          warnText={inputs?.email?.msgError}
          disabled={true}
        />
        <TextboxLabel topLabel="Nomor Rekening Simpanan BRI*" placeholder="Nomor Rekening Simpanan BRI" name="noRekeningSimpanan" value={formatNumberWithSpace(inputs?.noRekeningSimpanan?.value)} onChange={handleInput.handleNumberInput} maxLength="18" warnText={!inputs?.noRekeningSimpanan?.value ? "No Rekening Simpanan Belum Terisi" : !inputs?.noRekeningSimpanan?.isValid ? inputs?.noRekeningSimpanan?.msgError : ""} />
        <Dropdown
            topLabel="Tujuan Calon Nasabah*"
            value={dropdownVal.tujuanNasabah}
            onChange={(value) => {
              setDropdownVal({ ...dropdownVal, tujuanNasabah: value });
              handleInput.handleRadioDropChange("tujuanNasabah", value.value);
            }}
           data={personalDataConst.tujuanNasabah}
          />
          </div>
          <span className="font-bold text-2xl" >Alamat KTP</span>
          <div className="flex flex-row gap-2 mt-2">
        <div className="w-[89%]">
      <TextboxLabel
          topLabel="Pin Lokasi*"
          placeholder="Pin Alamat Lengkap"
          name="address"
          value={dataAddress?.address || ""}
          rightLabelBorder={false}
          onChange={(e) => {
            const newValue = e.target.value;
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          disabled={disabled}
          warnText={dataAddress?.address?.length < 3 || dataAddress?.address === "0" ? "Alamat tidak valid" : ""}
        />
        </div>
        <div className="flex-shrink-0">
        <Button
          className={"mt-8 font-medium text-sm w-full h-10"}
          buttonColor="bluefigma"
          textColor="white"
          onClick={handleLoadPinLoc}
          paddingSize={"padding-0"}
          disabled={disabled}
        >
          Pin Lokasi
        </Button>
       
        <ModalGMapsInsurance
          isModalGmaps={isModalGmaps}
          dataAddress={dataAddress}
          mapsState={mapsState}
          setMapsState={setMapsState}
          setDataAddress={setDataAddress}
          setModalGmaps={setModalGmaps}
        />
      </div>
      {warnText !== "" && (
        <div className="my-2">
          <p className="textbox__invalidTxt">{warnText}</p>
        </div>
        ) }
      </div>
      <div className="grid mobile:grid-cols-1 grid-cols-2 gap-y-4 gap-x-6 mt-3">
        <TextboxLabel
          topLabel="Provinsi*"
          placeholder="Provinsi"
          name="province"
          value={dataAddress?.province || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.province === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^a-zA-Z ]/i, "");
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          warnText={dataAddress?.province?.length < 3 || dataAddress?.province === "0" ? "Provinsi tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kota/Kabupaten*"
          name="district"
          placeholder="Kota/Kabupaten"
          value={dataAddress?.district || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.district === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^a-zA-Z ]/i, "");
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          warnText={dataAddress?.district?.length < 3 || dataAddress?.district === "0" ? "Kota/Kabupaten tidak valid" : ""}
          maxLength={50}
        />
      <TextboxLabel
          topLabel="Kecamatan*"
          name="subDistrict"
          placeholder="Kecamatan"
          value={dataAddress?.subDistrict || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.subDistrict === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^a-zA-Z ]/i, "");
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          warnText={dataAddress?.subDistrict?.length < 3 || dataAddress?.subDistrict === "0" ? "Kecamatan tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kelurahan*"
          name="urbanVillage"
          placeholder="Kelurahan"
          value={dataAddress?.urbanVillage || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.urbanVillage === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^a-zA-Z ]/i, "");
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          warnText={dataAddress?.urbanVillage?.length < 3 || dataAddress?.urbanVillage === "0" ? "Kelurahan tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kode Pos*"
          placeholder="Kode Pos"
          name="posCode"
          value={dataAddress?.posCode || ""}
          rightLabelBorder={false}
          onChange={(e) => {
            const newValue = e.target.value.replace(invalidNumRegex, "");
            onChangeAddress(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          maxLength={5}
          disabled={disabled}
          warnText={dataAddress?.posCode?.length !== 5 || dataAddress?.posCode === "0" ? "Kode Pos tidak valid" : ""}
        />
      </div>
      <div className="my-5">
      <span className="font-bold text-2xl" >Alamat Domisili</span>
      <div className="flex flex-row mt-4 gap-[62px]">
      <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={isSameWithKTP}
            name="addressSelection"
            onChange={() => {
              setIsSameWithKTP(true)
              onChangeAddress('address', dataAddress?.address || '');

            }}
          />
          <p className="text-sm text-[#292929]">Sesuai Dengan KTP</p>
          </div>
          <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={!isSameWithKTP}
            name="addressSelection"
            onChange={() => setIsSameWithKTP(false)}
          />
          <p className="text-sm text-[#292929]">Berbeda Dengan KTP</p>
          </div>
          </div>
          {!isSameWithKTP ? (
          <div className="">
            <div className="flex flex-row gap-2 mt-3">
        <div className="w-[89%]">
      <TextboxLabel
          topLabel="Pin Lokasi"
          placeholder="Pin Alamat Lengkap"
          name="addressKTP"
          value={dataAddressKTP?.address || ""}
          rightLabelBorder={false}
          onChange={(e) => {
            const newValue = e.target.value;
            onChangeAddressKTP(e.target.name, newValue);
            onChangeText(e.target.name, newValue);
          }}
          disabled={disabled}
          warnText={dataAddressKTP?.address?.length < 3 || dataAddressKTP?.address === "0" ? "Alamat tidak valid" : ""}
        />
        </div>
        <div className="flex-shrink-0">
        <Button
          className={"mt-8 font-medium text-sm w-full h-10 curo"}
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
          dataAddress={dataAddressKTP}
          mapsState={mapsState}
          setMapsState={setMapsState}
          setDataAddress={setDataAddressKTP}
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
        <Location dataAddress={dataAddressKTP} setDataAddress={setDataAddressKTP} onChangeText={onChangeAddressKTP} />
      </div>
      <div className="hidden">
        <LocationDomisili
            name="alamatDomisili"
            value={dataAddressKTP?.address}
            onChange={onChangeAddressKTP}
          />
          </div>
          </div>
          
         ): null
         }
        </div>
      <div className="flex flex-col gap-4">
      <span className="font-bold text-2xl" >Pengajuan</span>
      <span className="font-semibold text-xs">Pilihan Waktu Kontak</span>
      </div>
      <div className="flex flex-row mt-3 mb-10 gap-[62px] mobile:grid mobile:grid-cols-3">
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={waktuKontak === 'Pagi'}
            value="Pagi"
            name="Pagi"
            onChange={handleWaktuKontak}
          />
          <p className="text-sm text-[#292929]">Pagi</p>
          </div>
          <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={waktuKontak === 'Siang'}
            value="Siang"
            name="Siang"
            onChange={handleWaktuKontak}
          />
          <p className="text-sm text-[#292929]">Siang</p>
          </div>
          <div className="flex flex-row gap-1">
          <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={waktuKontak === 'Sore'}
            value="Sore"
            name="Sore"
            onChange={handleWaktuKontak}
          />
          <p className="text-sm text-[#292929]">Sore</p>
          </div>
          </div>
      <span className="font-semibold text-xs">Pilihan Salah Satu</span>
      <div className="flex flex-row gap-10 mt-3 mobile:grid mobile:grid-cols-2">
      <div className="flex flex-row gap-1">
        <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={kcNearby}
            name="kcNearby"
            onChange={() => {
              setKcNearby(true)
              setKcForm({ state: "nearby" });
              setInputs({ ...inputs, ukerCode: "", ukerName: "" });
              setKcDescVal("");
                }}
          />
          <p className="text-sm text-[#292929] whitespace-nowrap">Kantor Cabang Terdekat</p>
          </div>
           <div className="flex flex-row gap-1">
      <input
            type="radio"
            className="form-radio h-6 w-6 text-indigo-600"
            checked={!kcNearby}
            name="kcOther"
            onChange={() => {
              setKcNearby(false)
              setKcForm({ state: "other" })
              setInputs({ ...inputs, ukerCode: { isValid: false, value: "" }, ukerName: { isValid: false, value: "" } })
              setKcDescVal("")}
            }
          />
          <p className="text-sm text-[#292929] whitespace-nowrap">Semua Kantor Cabang</p>
          </div>
        {kcForm.state === "nearby" ?
          <KCAutocompleteRadio
            value={kcDescVal}
            items={kcList}
            getItemValue={(item) => `${item?.kodeUker?.padStart(4, "0")} | ${item?.unitKerja} | ${item?.kanwil}`}
            shouldItemRender={matchDataKc}
            renderMenu={item => (
              kcList.length > 0 ? (
              <div className="autocompSearch__dropdownWrap">
                {item}
              </div>
              ) : (
              <div className="autocompSearch__dropdownWrap">Mohon Maaf Kanca Terdekat Tidak Tersedia, Silahkan Pilih <b>Semua</b> </div>
              )
            )}
            renderItem={(item) =>
              <div className="autocompSearch__dropdownItem">
                {item?.kodeUker?.padStart(4, "0")} | {item?.unitKerja} | {item?.kanwil}
              </div>
            }
            onChange={(event, val) => setKcDescVal(val)}
            wrapperStyle={{ position: "relative" }}
            wrapperProps={{
              className: "autocompSearch__wrapper"
            }}
            inputProps={{
              placeholder: "Pilih Kantor Cabang BRI",
              className: "autocompSearch__textbox",
            }}
            onSelect={val => {
              setKcDescVal(val);
              const valSplit = val.split(" |");
              let selectedKc = kcList?.filter?.((e) => { return e?.kodeUker === (+valSplit?.[0])?.toString() })[0];
              setInputs({
                ...inputs,
                ukerCode: { isValid: !!selectedKc?.kodeUker?.padStart(4, "0"), value: selectedKc?.kodeUker?.padStart(4, "0") },
                ukerName: { isValid: !!selectedKc?.unitKerja, value: selectedKc?.unitKerja },
                kanwil: {isValid: true, value: selectedKc?.kanwil || selectedKc?.rgdesc}
              })
            }}
            // rightLabel="Semua"
            // state={kcForm.state}
            // onClickRL={() => {
            //   setKcForm({ state: "other" });
            //   setInputs({ ...inputs, ukerCode: { isValid: false, value: "" }, ukerName: { isValid: false, value: "" } });
            //   setKcDescVal("");
            // }}
          />
          :
          <KCAutocompleteRadio
            value={kcDescVal}
            items={kcOtherList}
            getItemValue={(item) => `${item?.branch?.toString().padStart(4, "0")} | ${item?.brdesc} | ${item?.rgdesc}`}
            shouldItemRender={matchDataKc}
            renderMenu={item => (
              <div className="autocompSearch__dropdownWrap">
                {item}
              </div>
            )}
            renderItem={(item) =>
              <div className="autocompSearch__dropdownItem">
                {item?.branch?.toString().padStart(4, "0")} | {item?.brdesc} | {item?.rgdesc}
              </div>
            }
            onChange={(event, val) => setKcDescVal(val)}
            wrapperStyle={{ position: "relative" }}
            wrapperProps={{
              className: "autocompSearch__wrapper"
            }}
            inputProps={{
              placeholder: "Pilih Kantor Cabang BRI",
              className: "autocompSearch__textbox",
            }}
            onSelect={val => {
              setKcDescVal(val);
              const valSplit = val.split(" |");
              let selectedKc = kcOtherList.filter((e) => { return e.branch.toString() === (+valSplit[0]).toString() })[0];
              setInputs({
                ...inputs,
                ukerCode: { isValid: !!selectedKc?.branch?.toString().padStart(4, "0"), value: selectedKc?.branch?.toString().padStart(4, "0") },
                ukerName: { isValid: !!selectedKc?.brdesc, value: selectedKc?.brdesc },
                kanwil: { isValid: true, value: selectedKc?.kanwil || selectedKc?.rgdesc}
              })
            }}
            // state={kcForm.state}
            // rightLabel="Terdekat"
            // onClickRL={() => {
            //   setKcForm({ state: "nearby" });
            //   setInputs({ ...inputs, ukerCode: "", ukerName: "" });
            //   setKcDescVal("");
            // }}
          />
        }
      </div>
      {!inputs?.ukerCode?.value || !inputs?.ukerName?.value ? (
          <div className="mb-3">
            <p className="textbox__invalidTxt">Kantor Cabang Wajib Diisi</p>
          </div>
        ) : <></>}
      <div className="">
      <TextboxLabel topLabel="Keterangan" placeholder="Keterangan" name="keterangan" value={inputs?.keterangan?.value} onChange={handleInput.handleAllCharInput} />
      </div>
      </div>
    </>
  );
};

export default DataDiriAsuransi;
