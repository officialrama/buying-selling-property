/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import _ from 'lodash-contrib';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CurrencyInput, RadioButtonWithLabel, Textarea, UploadSingleFile } from "../../../components/atoms";
import { decryptStr, encryptStr } from '../../../helpers/encryptDecrypt';
import { fetchJwtToken } from '../../../helpers/fetchApi';
import { getLocByLatLng } from "../../../helpers/getLocByLatLng";
import useAddDevHooks from "../../../hooks/useAddDevHooks";
import { addEditUserDev, disableEdit, editMode, inquiryUser, saReset, showModalFail } from "../../../store/actions/fetchData/superAdminState";
import { Dropdown, ModalGMaps } from "../../molecules";
import { GMapsPinBox, Location } from "../../organisms";
import Button from "./../../../components/atoms/Button/Component";
import LabelInputTextbox from "./../../../components/atoms/Label/label-input-textbox";
import TextboxLabel from "./../../../components/molecules/Input/textbox-custom/textbox-label";
import DatePicker from "react-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import moment from "moment/moment";

const Component = ({ state, saState, setCancelModal, handleBuyback, buyback, setBuyback }) => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const { inputs, initiateState, handleName, handleAddress, handleLetterNumberInput, handleNumberInput, handlePhoneNum, handleEmail, handleAltInput, handleDateInputChange, handleNoRekening, handleTiering } = useAddDevHooks();
  const disabled = saState.disableEdit;
  const refSingleUpload = useRef(null);
  const resetSingleUpload = () => {
    refSingleUpload.current.value = null;
  };
  const [pksFile, setPksFile] = useState({ file: "", name: "", selected: false });
  const [loadingFile, setLoadingFile] = useState(false);

  const [isModalGmaps, setModalGmaps] = useState(false);
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
  const onChangeAdress = (key, value) => {
    setDataAddress({ ...dataAddress, [key]: value });
  };
  const stringMinified =
    '{"alamat":"' +
    dataAddress.address +
    '","rt":"' +
    (dataAddress.rt ? dataAddress.rt.replace(/ /g, "") : "-") +
    '","rw":"' +
    (dataAddress.rw ? dataAddress.rw.replace(/ /g, "") : "-") +
    '","kodePos":"' +
    dataAddress.posCode +
    '","provinsi":"' +
    dataAddress.province +
    '","kabupaten":"' +
    dataAddress.district +
    '","kecamatan":"' +
    dataAddress.subDistrict +
    '","kelurahan":"' +
    dataAddress.urbanVillage +
    '"}';

  const [mapsState, setMapsState] = useState({
    center: { lat: -6.22472, lng: 106.80778 },
    address: "",
    zoom: 11,
    draggable: false,
    gestureHandling: "cooperative",
  });

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
      navigator.geolocation.getCurrentPosition(function (position) {
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            setMapsState({
              ...mapsState,
              center: {
                ...mapsState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
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
    dataAddress?.district?.length > 3 && dataAddress?.district?.length <= 50,
    dataAddress?.subDistrict?.length > 3 && dataAddress?.subDistrict?.length <= 50,
    dataAddress?.urbanVillage?.length > 3 && dataAddress?.urbanVillage?.length <= 50,
  ];
  const dropdownOptions = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
  ];

  useEffect(() => {
    if (email !== undefined) {
      fetchJwtToken(encryptStr(decryptStr(email))).then((tokenRes) => {
        if (tokenRes?.data?.responseCode === "00") {
          dispatch(inquiryUser(encryptStr(decryptStr(email)), encryptStr(decryptStr(tokenRes.data.responseData[0]))));
          dispatch(disableEdit(true));
          dispatch(editMode(true));
        }
      }).catch((err) => { })
    }
    return () => {
      dispatch(saReset());
    }
  }, []);

  useEffect(() => {
    if (state.loading === false && email !== undefined) {
      if (saState.resApi) {
        let respData = saState?.resApi?.responseData?.[0] || [];
        const mobilePhone = decryptStr(respData?.mobileNo);
        const tieringNumber = Number(respData?.metadata?.tiering)
        initiateState({
          name: {
            isValid: !!respData?.metadata?.name,
            value: respData?.metadata?.name
          },
          groupName: {
            isValid: !!respData?.metadata?.groupName,
            value: respData?.metadata?.groupName
          },
          tiering: {
            isValid: !!respData?.metadata?.tiering,
            value: {name : tieringNumber}
          },
          address: {
            isValid: !!respData?.metadata?.address,
            value: respData?.metadata?.address
          },
          picDeveloper: {
            isValid: !!respData?.metadata?.picDeveloper,
            value: respData?.metadata?.picDeveloper
          },
          description: {
            isValid: !!respData?.metadata?.picDeveloper,
            value: respData?.metadata?.description
          },
          noPKS: {
            isValid: !!respData?.metadata?.noPKS,
            value: respData?.metadata?.noPKS
          },
          email: {
            isValid: !!respData?.email,
            value: decryptStr(respData?.email)
          },
          mobileNo: {
            isValid: !!respData?.mobileNo,
            value: mobilePhone.split("|")[1] === undefined ? mobilePhone : `0${mobilePhone.split("|")[1]}`
          },
          accountNo: {
            isValid: !!respData?.accountNo,
            value: decryptStr(respData?.accountNo) ? decryptStr(respData?.accountNo) : ''
          },
          startRangePrice: {
            isValid: !!respData?.metadata?.rangeHargaUnit.split("-")[0],
            value: respData?.metadata?.rangeHargaUnit.split("-")[0]
          },
          endRangePrice: {
            isValid: !!respData?.metadata?.rangeHargaUnit.split("-")[1],
            value: respData?.metadata?.rangeHargaUnit.split("-")[1]
          },
          tanggalAkhirPKS: {
            isValid: !!respData?.pksEnd,
            value: respData?.pksEnd ? new Date(respData?.pksEnd) : ""
          },
          tanggalPKS: {
            isValid: !!respData?.pksStart,
            value: respData?.pksStart ? new Date(respData?.pksStart) : ""
          },
          pksEnd: {
            isValid: !!respData?.pksEnd,
            value: respData?.pksEnd ? moment(respData?.pksEnd).format('DD-MM-yyyy') : ""
          },
          pksStart: {
            isValid: !!respData?.pksStart,
            value: respData?.pksStart ? moment(respData?.pksStart).format('DD-MM-yyyy') : ""
          },
        });

        if (_.isJSON(saState?.resApi?.responseData?.[0]?.metadata?.address)) {
          setDataAddress({
            address: JSON.parse(respData?.metadata?.address)?.alamat,
            rt: JSON.parse(respData?.metadata?.address)?.rt || "",
            rw: JSON.parse(respData?.metadata?.address)?.rw || "",
            posCode: JSON.parse(respData?.metadata?.address)?.kodePos || "",
            province: JSON.parse(respData?.metadata?.address)?.provinsi,
            subDistrict: JSON.parse(respData?.metadata?.address)?.kecamatan,
            district: JSON.parse(respData?.metadata?.address)?.kabupaten,
            urbanVillage: JSON.parse(respData?.metadata?.address)?.kelurahan,
            lng: respData?.metadata?.longLatAddress?.split(",")[0],
            lat: respData?.metadata?.longLatAddress?.split(",")[1],
          });
        };

        if (respData) {
          setLoadingFile(true);
          Promise.all(
            fetch(respData?.pksUrl).then((res) => res.blob())
              .then((blob) => {
                setPksFile({
                  file: new File([blob], "Dokumen_PKS.pdf", { type: blob.type }),
                  name: "Dokumen_PKS.pdf",
                  selected: true
                });
                setLoadingFile(false);
              }
              )
          );
        };
      }

    }
  }, [saState.resApi]);

  const inputsArr = [
    inputs?.name?.isValid,
    inputs?.picDeveloper?.isValid,
    inputs?.description?.isValid,
    inputs?.noPKS?.isValid,
    inputs?.email?.isValid,
    inputs?.mobileNo?.isValid,
    inputs?.accountNo?.isValid,
    inputs?.startRangePrice?.isValid,
    inputs?.endRangePrice?.isValid,
    Boolean(Number(inputs?.endRangePrice?.value) > Number(inputs?.startRangePrice?.value)),
    !!pksFile?.file
  ];

  useEffect(() => {
    if(saState?.resApi?.responseData?.[0]?.isBuyBack === false ){
      setBuyback('tidakBuyback')
    }
    if(saState?.resApi?.responseData?.[0]?.isBuyBack === true ) {
      setBuyback('adaBuyback')
    }
  },[saState?.resApi?.responseData?.[0]?.isBuyBack])
  return (
    <div className="add-admin__wrapper">
      <div className="add-admin__form-wrap">
        <div className="add-admin__form-wrapper">
          <div className="add-admin__form-txtbox-wrap  flex flex-row gap-4 mb-6">
          <div className="largePc:w-[346px] xxl:w-[420px]">
            <TextboxLabel
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              bgColor={disabled && "lightGrey"}
              topLabel="Nama Developer"
              placeholder="Masukkan Nama Developer"
              name="name"
              value={inputs.name?.value}
              onChange={handleName}
              requiredStar={true}
              warnText={inputs?.name?.msgError}
              maxLength={100}
            />
            </div>
            <div className="largePc:w-[346px] xxl:w-[420px]">
              <TextboxLabel
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              bgColor={disabled && "lightGrey"}
              topLabel="Nama Group Developer"
              placeholder="Masukkan Nama Group Developer"
              name="groupName"
              value={inputs.groupName?.value}
              onChange={handleName}
              requiredStar={true}
              warnText={inputs?.groupName?.msgError}
              maxLength={100}
            />
            </div>
            <div className="flex flex-col gap-2">
              <p className="whitespace-nowrap">Tiering Developer</p>
              <div className="largePc:w-[346px] xxl:w-[420px]">
             <Dropdown
               placeholder="Pilih Tiering Developer"
               data={dropdownOptions}
               value={inputs?.tiering?.value}
               onChange={(val) =>
                handleTiering('tiering', val)
              }
             />
             </div>
            </div>
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <Location
              title="Alamat Developer"
              dataAddress={dataAddress}
              onChangeText={onChangeAdress}
              setDataAddress={setDataAddress}
              disabled={disabled && true}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <div className="mt-10">
              <GMapsPinBox
                title="Pin Lokasi"
                setModalGmaps={handleLoadPinLoc}
                dataAddress={dataAddress}
                disabled={disabled && true}
              />
            </div>
            <div className="mt-10">
              <ModalGMaps
                isModalGmaps={isModalGmaps}
                dataAddress={dataAddress}
                mapsState={mapsState}
                setMapsState={setMapsState}
                setDataAddress={setDataAddress}
                setModalGmaps={setModalGmaps}
                disabled={disabled && true}
              />
            </div>
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <TextboxLabel
              bgColor={disabled && "lightGrey"}
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              topLabel="PIC Developer"
              placeholder="PIC Developer"
              name="picDeveloper"
              value={inputs?.picDeveloper?.value}
              onChange={handleName}
              requiredStar={true}
              warnText={inputs?.picDeveloper?.msgError}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <Textarea
              disabled={disabled && true}
              topLabel="Deskripsi"
              placeholder="Deskripsi"
              resize={true}
              name="description"
              value={inputs?.description?.value}
              onChange={handleLetterNumberInput}
              requiredStar={true}
              warnText={inputs?.description?.msgError}
              maxLength={5000}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <TextboxLabel
              bgColor={disabled && "lightGrey"}
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              topLabel="Nomor PKS"
              placeholder="Nomor PKS"
              name="noPKS"
              value={inputs?.noPKS?.value}
              onChange={handleNumberInput}
              requiredStar={true}
              warnText={inputs?.noPKS?.msgError}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <div className="w-full">
              <div className="mb-2">
                <LabelInputTextbox text={"Tanggal Awal PKS"} />
              </div>
              <div className="flex flex-row gap-3">
                <DatePicker
                  name="tanggalPKS"
                  onChange={(e) => {
                    handleDateInputChange(e, "tanggalPKS", "pksStart");
                  }}
                  value={inputs?.tanggalPKS?.value || null}
                  onChangeRaw={(e) => e.preventDefault()}
                  locale="id-ID"
                  calendarIcon={<FaCalendarAlt />}
                  clearIcon={<MdOutlineClear />}
                  disabled={disabled && true}
                />
              </div>
            </div>
            {!inputs?.tanggalPKS?.value && <p className="textbox__invalidTxt">Tanggal PKS belum dipilih</p>}
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <div className="w-full">
              <div className="mb-2">
                <LabelInputTextbox text={"Tanggal Akhir PKS"} />
              </div>
              <div className="flex flex-row gap-3">
                <DatePicker
                  name="tanggalAkhirPKS"
                  onChange={(e) => {
                    handleDateInputChange(e, "tanggalAkhirPKS", "pksEnd");
                  }}
                  value={inputs?.tanggalAkhirPKS?.value || null}
                  onChangeRaw={(e) => e.preventDefault()}
                  locale="id-ID"
                  calendarIcon={<FaCalendarAlt />}
                  clearIcon={<MdOutlineClear />}
                  disabled={disabled && true}
                  minDate={inputs?.tanggalPKS?.value}
                />
              </div>
              {!inputs?.tanggalAkhirPKS?.value && <p className="textbox__invalidTxt">Tanggal Akhir PKS belum dipilih</p>}
            </div>
          </div>
          <div className="mb-4">
            <UploadSingleFile
              loading={loadingFile}
              disabled={disabled && true}
              requiredStar={true}
              title="Upload PKS"
              reference={refSingleUpload}
              name="brosur"
              files={pksFile.file}
              onChange={(e) => {
                const fileName = e.target.files[0].name.toString();
                const idxDot = fileName.lastIndexOf(".") + 1;
                const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile !== "pdf") {
                  dispatch(showModalFail("Gagal", "Format file tidak didukung"));
                  resetSingleUpload();
                } else if (e.target.files[0].size > 5000000) {
                  dispatch(showModalFail("Gagal", "File Terlalu Besar"));
                  resetSingleUpload();
                } else {
                  Array.from(e.target.files).forEach(file => {
                    setPksFile({ ...pksFile, file: file, name: file.name, selected: true });
                  })
                }
              }}
              selectedFile={pksFile.selected && true}
              fileName={pksFile !== [] && pksFile.name}
              onClickClear={(e) => {
                resetSingleUpload();
                setPksFile({ file: "", name: "", selected: false });
              }}
              acceptedFiles=".pdf"
              invalidTxt={!pksFile.file && "Upload PKS tidak valid"}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <TextboxLabel
              requiredStar={true}
              bgColor={disabled && "lightGrey"}
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              topLabel="Email Developer"
              placeholder="Email Developer"
              name="email"
              value={inputs?.email?.value}
              onChange={handleEmail}
              invalid={!inputs?.email?.isValid}
              warnText={inputs?.email?.msgError}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <TextboxLabel
              requiredStar={true}
              bgColor={disabled && "lightGrey"}
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              topLabel="No. HP Developer"
              placeholder="No. HP Developer"
              name="mobileNo"
              value={inputs?.mobileNo?.value}
              onChange={handlePhoneNum}
              invalid={!inputs?.mobileNo?.isValid}
              warnText={inputs?.mobileNo?.msgError}
              maxLength={13}
            />
          </div>
          <div className="add-admin__form-txtbox-wrap">
            <TextboxLabel
              requiredStar={true}
              bgColor={disabled && "lightGrey"}
              disabled={disabled && true}
              className={`${disabled ? "add-admin__form-txtbox" : ""}`}
              topLabel="No. Rekening Developer"
              placeholder="No. Rekening Developer"
              name="accountNo"
              value={inputs?.accountNo?.value}
              onChange={handleNoRekening }
              invalid={!inputs?.accountNo?.isValid}
              warnText={inputs?.accountNo?.msgError}
              maxLength={15}
            />
          </div>
          <div className="add-admin__range-price-wrap">
            <div className="add-admin__range-price-title">
              <LabelInputTextbox text="Harga Properti" requiredStar={true} />
            </div>
            <div className="add-admin__range-price">
              <CurrencyInput
                disabled={disabled && true}
                className="textbox-label__currency"
                name="startRangePrice"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={14}
                value={inputs?.startRangePrice?.value}
                allowNegativeValue={false}
                onValueChange={(value) => handleAltInput(value || "", "startRangePrice")}
                warnText={
                  Number(inputs?.startRangePrice?.value) > Number(inputs?.endRangePrice?.value) ?
                    "Harga awal melebihi harga akhir" :
                    inputs?.startRangePrice?.value !== "" && Number(inputs?.startRangePrice?.value) >= Number(inputs?.endRangePrice?.value) ?
                      "Harga awal sama dengan harga akhir" :
                      inputs?.startRangePrice?.value === "" && inputs?.endRangePrice?.value === "" ?
                        "Harga Mulai Properti Kosong" :
                        inputs?.startRangePrice?.msgError
                }
              />
              <CurrencyInput
                disabled={disabled && true}
                className="textbox-label__currency"
                name="endRangePrice"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={14}
                value={inputs?.endRangePrice?.value}
                allowNegativeValue={false}
                onValueChange={(value) => handleAltInput(value || "", "endRangePrice")}
                warnText={inputs?.endRangePrice?.msgError}
              />
            </div>
              <div>
                <p className="mb-3">Klausul Buyback</p>
                <div className="flex flex-row space-x-8">
                <div className="flex flex-row gap-1">
                <RadioButtonWithLabel 
                  text="Ada"
                  checked={buyback === 'adaBuyback'}
                  value="adaBuyback"
                  name="adaBuyback"
                  onChange={handleBuyback}
                />
                </div>
                <div className="flex flex-row gap-1">
                <RadioButtonWithLabel 
                  text="Tidak Ada"
                  checked={buyback === 'tidakBuyback'}
                  value="tidakBuyback"
                  name="tidakBuyback"
                  onChange={handleBuyback}
                />
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
      <div className="add-admin__btn-wrap">
        <Button className="add-admin__btn-bottom" buttonColor="white" textColor="blue" onClick={() => setCancelModal(true)}>
          Batal
        </Button>
        <Button
          buttonColor="blue"
          textColor="white"
          disabled={disabled ? true : inputsArr.filter(Boolean).length !== 11 || dataAddressArr.filter(Boolean).length !== 15 ? true : false}
          className="add-admin__btn-bottom--save"
          onClick={() => {
            dispatch(addEditUserDev(inputs, { editMode: saState.editMode, userType: "developer" }, stringMinified, pksFile.file, buyback))
          }}
          isLoading={state.loading}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default Component;
