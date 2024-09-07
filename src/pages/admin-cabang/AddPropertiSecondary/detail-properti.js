import { useState, Fragment, useEffect } from "react"
import { CurrencyInput, LabelInputTextbox, RadioButtonWithLabel, TextboxWithoutShadow } from "../../../components/atoms"
import { DetailsCard, ModalGMaps, Textarea, TextboxLabel, Dropdown, TextboxDropdown } from "../../../components/molecules"
import { GMapsPinBox } from "../../../components/organisms"
import DatePicker from "react-date-picker"
import { getLocByLatLng } from "../../../helpers/getLocByLatLng"
import { useDispatch } from "react-redux"
import { inquiryKodePos } from "../../../store/actions/fetchData/sellPropState"
import { invalidNumRegex } from "../../../helpers/regex"
import { Options } from '../../../components/molecules'
import { FaCalendarAlt } from "react-icons/fa"
import { MdOutlineClear } from "react-icons/md"
import { selectConst } from "../../../static/selectConst"
import { areacodeConst } from "../../../static/areacodeConst"

const DetailProperti = ({
    inputs,
    setInputs,
    dataAddress,
    setDataAddress,
    onChangeAddress,
    handleProps
}) => {
    const [isModalGmaps, setModalGmaps] = useState(false)
    const [priceType, setPriceType] = useState({
        type: "hargaTetap"
    })

    useEffect(()=>{
      if(priceType.type === "hargaTetap"){
        delete inputs?.endDateDiscount
        delete inputs?.percentageValue
        delete inputs?.nominalValue
        handleProps.setDropdownVal({
          ...handleProps.dropdownVal,
          statusDiscount : selectConst.statusDiscount[0],
        })
        setInputs({
          ...inputs,
          statusDiscount: {
            isValid: false,
            value: '',
          },
          hargaAkhir: inputs?.hargaProperti,
        })
      }
    },[priceType])

    const [mapsState, setMapsState] = useState({
        center: {
            lat: -6.22472,
            lng: 106.80778,
        },
        address: "",
        zoom: 11,
        gestureHandling: "cooperative",
    })
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
            setModalGmaps(true);
          }, function(error) {
            console.log(error)
            // default surabaya
            getLocByLatLng(112.768845, -7.250445)
              .then((res) => {
                setMapsState({
                  ...mapsState,
                  center: {
                    ...mapsState.center,
                    lat: -7.250445,
                    lng: 112.768845,
                  },
                  address: res.results[0].formatted_address,
                  placeId: res.results[0].place_id,
                  draggable: true,
                });
                console.log(res.results[0])
              })
              .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
            setModalGmaps(true);
          });
        }
      }

      function DropdownWrap({title, item, warnText}) {
        return (
          <div className="w-full">
            {title !== "" && (
              <div className="mb-2">
                <LabelInputTextbox text={title} />
              </div>
            )}
            <div className="flex flex-row gap-3">
              {item}
            </div>
            {warnText !== "" && (
              <div className="my-2">
                <p className="textbox__invalidTxt">{warnText}</p>
              </div>
            )}
          </div>
        )
      }

    return (
        <div className="sellpropsV2__wrapper">
        <DetailsCard className="sellpropsV2__card__wrapper">
          <div>
              <ModalGMaps
                  isModalGmaps={isModalGmaps}
                  dataAddress={dataAddress}
                  mapsState={mapsState}
                  setMapsState={setMapsState}
                  setDataAddress={setDataAddress}
                  setModalGmaps={setModalGmaps}
              />
              <div className="">
                      <div className="sellpropsV2__card__wrapper-content">
                          <p className="sellpropsV2__title pb-2">Detail Properti</p>
                          <TextboxLabel
                              topLabel="Agen Properti*"
                              placeholder="Masukan Nama Agen Properti"
                              name="namaAgen"
                              value={inputs?.namaAgen?.value}
                              onChange={handleProps.handleLetterNumberInput}
                          />
                          <div className="grid grid-cols-2 gap-4 mt-4">
                              {DropdownWrap({
                                title: "Tipe Properti*",
                                item: [
                                    <div className="w-full">
                                        <Dropdown
                                            value={handleProps.dropdownVal.tipeProperti}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({...handleProps.dropdownVal, tipeProperti: value});
                                                handleProps.handleRadioDropChange("tipeProperti", value.value);
                                            }}
                                            data={selectConst.tipeProperti}
                                            warnText={
                                                !inputs?.tipeProperti?.value
                                                    ? "Tipe properti belum dipilih"
                                                    : inputs?.tipeProperti?.msgError
                                            }
                                        />
                                    </div>,
                                ]
                              })}
                              <TextboxLabel
                                  topLabel="Nama Properti*"
                                  placeholder="Masukan Nama Properti"
                                  name="namaProyek"
                                  value={inputs?.namaProyek?.value}
                                  onChange={handleProps.handleLetterNumberInput}
                              />
                          </div>
                      </div>
                      <div className="w-full p-2">
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <p className="mb-3">Pilih salah satu*</p>
                                  <div className="flex flex-row space-x-8">
                                      <RadioButtonWithLabel 
                                          name="hargaTetap"
                                          text="Harga Tetap"
                                          checked={priceType.type === "hargaTetap"}
                                          onChange={(event) => setPriceType({type: event.target.value})}
                                      />
                                      <RadioButtonWithLabel 
                                          text="Diskon"
                                          checked={priceType.type === "diskon"}
                                          name="diskon"
                                          onChange={(event) => setPriceType({type: event.target.value})}
                                      />
                                  </div>
                              </div>
                              {priceType.type === "diskon" ? (
                              <>
                                <div>
                                {DropdownWrap({
                                      title: "Tanggal Akhir Diskon*",
                                      warnText: !inputs?.endDateDiscount?.value ? "Tanggal akhir diskon belum dipilih" : inputs?.endDateDiscount?.msgError ? inputs?.endDateDiscount?.msgError : '',
                                      item: [
                                          <>
                                              <DatePicker
                                                  name="endDateDiscount"
                                                  onChange={(e) => {
                                                    handleProps.handleDateInputChange(e, "endDateDiscount");
                                                  }}
                                                  value={
                                                      inputs?.endDateDiscount?.value
                                                          ? new Date(inputs?.endDateDiscount?.value)
                                                          : null
                                                  }
                                                  onChangeRaw={(e) => e.preventDefault()}
                                                  minDate={new Date()}
                                                  format="dd-MM-yyyy"
                                                  locale="id-ID"
                                                  calendarIcon={<FaCalendarAlt/>}
                                                  clearIcon={<MdOutlineClear/>}
                                              />
                                          </>,
                                      ],
                                  })}
                                </div>
                              </>) : ""}
                          </div>
                      </div>
                      <div className="sellpropsV2__card__wrapper-content">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                        { priceType.type === "diskon" &&
                          <>
                            {DropdownWrap({
                              title: "Tipe Diskon*",
                              warnText: inputs?.statusDiscount?.msgError,
                              item: [
                                <>
                                    <div className="w-full">
                                        <Dropdown
                                            value={handleProps.dropdownVal.statusDiscount}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({...handleProps.dropdownVal, statusDiscount: value});
                                                handleProps.handleRadioDropChange("statusDiscount", value.value);
                                            }}
                                            data={selectConst.statusDiscount}
                                        />
                                    </div>
                                </>
                              ]
                            })}
                            {handleProps.dropdownVal.statusDiscount?.value === "nominal" && 
                              DropdownWrap({
                                title: "Nominal Diskon",
                                warnText: !inputs?.nominalValue?.value ? "Nominal diskon tidak boleh kosong" : inputs?.nominalValue?.msgError,
                                item: [
                                  <>
                                    <div className="w-full">
                                          <CurrencyInput
                                              className="textbox-label__currency"
                                              name="nominalValue"
                                              placeholder="0"
                                              decimalsLimit={2}
                                              onValueChange={(value) => {
                                                  handleProps.handleCurrency(value || "", "nominalValue");
                                              }}
                                              groupSeparator="."
                                              decimalSeparator=","
                                              maxLength={14}
                                              value={inputs?.nominalValue?.value}
                                              allowNegativeValue={false}
                                              allowDecimals={false}
                                          />
                                      </div>
                                  </>
                                ]
                              })
                            }
                            {handleProps.dropdownVal.statusDiscount?.value === "persentase" &&
                              DropdownWrap({
                                title: "Persentase Diskon*",
                                warnText: "",
                                item: [
                                  <>
                                    <div className="w-full">
                                        <TextboxLabel
                                            placeholder={"Masukan persentase diskon"}
                                            rightLabel={"%"}
                                            name="percentageValue"
                                            value={inputs?.percentageValue?.value}
                                            maxLength={2}
                                            warnText={
                                                !inputs?.percentageValue?.value
                                                    ? "Persentase diskon tidak boleh kosong"
                                                    : inputs?.percentageValue?.msgError
                                            }
                                            onChange={handleProps.handleNumberInput}
                                            disabled={!inputs?.hargaProperti?.value}
                                        />
                                    </div>
                                  </>
                                ]
                              })
                            }
                          </>
                        }
                        </div>
                      </div>
                      <div className="sellpropsV2__card__wrapper-content">
                          {priceType.type === "hargaTetap" ?
                          (
                              <>
                                  <div className="grid grid-cols gap-4 mt-4">
                                      {DropdownWrap({
                                        title: "Harga Properti*",
                                        item: [
                                            <div className="w-full">
                                                <CurrencyInput
                                                    className="textbox-label__currency"
                                                    name="hargaProperti"
                                                    placeholder="0"
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => {
                                                        handleProps.handleCurrency(value || "", "hargaProperti");
                                                    }}
                                                    groupSeparator="."
                                                    decimalSeparator=","
                                                    maxLength={14}
                                                    value={inputs?.hargaProperti?.value}
                                                    allowNegativeValue={false}
                                                    allowDecimals={false}
                                                    warnText={
                                                        !inputs?.hargaProperti?.value
                                                            ? "Harga properti tidak boleh kosong"
                                                            : inputs?.hargaProperti?.msgError
                                                    }
                                                />
                                            </div>,
                                        ]
                                      })}
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 mt-4">
                                      <TextboxLabel
                                          topLabel="Nama PIC*"
                                          placeholder="Masukan Nama PIC"
                                          name="namaPIC"
                                          value={inputs?.namaPIC?.value}
                                          onChange={handleProps.handleLetterNumberInput}
                                      />
                                      <TextboxPhone 
                                        label="No Handphone PIC*"
                                        value={inputs?.noHpPic?.value}
                                        name="noHpPic"
                                        onChange={handleProps.handleMobileNo}
                                        maxLength={13}
                                        invalid={!inputs?.noHpPic?.isValid}
                                        invalidTxt={inputs?.noHpPic?.msgError}
                                      />
                                  </div>
                              </>
                          )  
                          : (
                              <>
                                  <div className="grid grid-cols-2 gap-4 mt-4">
                                    {DropdownWrap({
                                        title: "Harga Awal*",
                                        item: [
                                            <div className="w-full">
                                                <CurrencyInput
                                                    className="textbox-label__currency"
                                                    name="hargaProperti"
                                                    placeholder="0"
                                                    decimalsLimit={2}
                                                    onValueChange={(value) => {
                                                        handleProps.handleCurrency(value || "", "hargaProperti");
                                                    }}
                                                    groupSeparator="."
                                                    decimalSeparator=","
                                                    maxLength={14}
                                                    value={inputs?.hargaProperti?.value}
                                                    allowNegativeValue={false}
                                                    allowDecimals={false}
                                                    warnText={
                                                        !inputs?.hargaProperti?.value
                                                            ? "Harga properti tidak boleh kosong"
                                                            : inputs?.hargaProperti?.msgError
                                                    }
                                                />
                                            </div>,
                                        ]
                                      })}
                                      {DropdownWrap({
                                        title: "Harga Akhir*",
                                        item: [
                                          <div className="w-full">
                                            <CurrencyInput
                                                className="textbox-label__currency"
                                                name="hargaAkhir"
                                                placeholder="0"
                                                decimalsLimit={2}
                                                groupSeparator="."
                                                decimalSeparator=","
                                                maxLength={14}
                                                value={inputs?.hargaAkhir?.value}
                                                allowNegativeValue={false}
                                                allowDecimals={false}
                                                warnText={
                                                    !inputs?.hargaAkhir?.value
                                                        ? "Total harga properti tidak boleh kosong"
                                                        : inputs?.hargaAkhir?.msgError
                                                }
                                                disabled={true}
                                            />
                                          </div>
                                        ]
                                      })}
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 mt-4">
                                      <TextboxLabel
                                          topLabel="Nama PIC*"
                                          placeholder="Masukan Nama PIC Properti"
                                          name="namaPIC"
                                          value={inputs?.namaPIC?.value}
                                          onChange={handleProps.handleLetterNumberInput}
                                      />
                                      <TextboxPhone 
                                        label="No Handphone PIC"
                                        value={inputs?.noHpPic?.value}
                                        name="noHpPic"
                                        onChange={handleProps.handleMobileNo}
                                        maxLength={13}
                                        invalid={!inputs?.noHpPic?.isValid}
                                        invalidTxt={inputs?.noHpPic?.msgError}
                                      />
                                  </div>
                              </>
                          )  }
                      </div>
                      <div className="sellpropsV2__card__wrapper-content">
                          <p className="sellpropsV2__title pb-2">Alamat</p>
                          <div className="sellprops__card__pinloc-wrap mb-5">
                              <GMapsPinBox
                                  title="Pin Lokasi"
                                  setModalGmaps={handleLoadPinLoc}
                                  dataAddress={dataAddress}
                              />
                          </div>
                          <Location
                              dataAddress={dataAddress}
                              onChangeText={onChangeAddress}
                              setDataAddress={setDataAddress}
                          />
                          <label className="label-input-txtbox">Alamat Lengkap*</label>
                          <Textarea
                              placeholder="Alamat Lengkap"
                              name="alamatLengkap"
                              value={inputs?.alamatLengkap?.value }
                              onChange={handleProps.handleAllCharInput}
                              warnText={!inputs?.alamatLengkap?.value ? "Alamat tidak valid" : inputs?.alamatLengkap?.msgError}
                              rows="4"
                          />
                      </div>
                      <div className="sellpropsV2__card__wrapper-content">
                          <p className="sellpropsV2__title pb-2">Deskripsi</p>
                          <Textarea
                              placeholder="Masukan deskripsi"
                              name="deskripsi"
                              value={inputs?.deskripsi?.value}
                              onChange={handleProps.handleAllCharInput}
                              // warnText={!inputs?.deskripsi?.value ? "Deskripsi tidak valid" : inputs?.deskripsi?.msgError}
                              rows="4"
                          />
                      </div>
              </div>
          </div>
        </DetailsCard>
        </div>
    )
}

export const Location = ({ title, dataAddress, onChangeText, setDataAddress, disabled }) => {
    const dispatch = useDispatch()
    return (
    <Fragment>
      <div className="grid grid-cols-2 grid-flow-row gap-4 mt-2">
        <TextboxLabel
          topLabel="Provinsi"
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
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.province?.length < 3 || dataAddress?.province === "0" ? "Provinsi tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kabupaten/Kota"
          name="district"
          placeholder="Kabupaten/Kota"
          value={dataAddress?.district || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.district === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.district?.length < 3 || dataAddress?.district === "0" ? "Kabupaten/Kota tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kecamatan"
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
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.subDistrict?.length < 3 || dataAddress?.subDistrict === "0" ? "Kecamatan tidak valid" : ""}
          maxLength={50}
        />
        <TextboxLabel
          topLabel="Kelurahan"
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
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.urbanVillage?.length < 3 || dataAddress?.urbanVillage === "0" ? "Kelurahan tidak valid" : ""}
          maxLength={50}
        />
      </div>
      <div className="flex flex-row mobile:flex-col gap-4 my-4">
        <TextboxLabel
          placeholder="RT"
          topLabel="RT"
          name="rt"
          value={dataAddress?.rt || ""}
          rightLabelBorder={false}
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={3}
          disabled={disabled}
          warnText={dataAddress?.rt?.length <= 1 || dataAddress?.rt === "0" ? "RT tidak valid" : ""}
        />
        <TextboxLabel
          placeholder="RW"
          topLabel="RW"
          name="rw"
          value={dataAddress?.rw || ""}
          rightLabelBorder={false}
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={3}
          disabled={disabled}
          warnText={dataAddress?.rw?.length <= 1 || dataAddress?.rw === "0" ? "RW tidak valid" : ""}
        />
        <TextboxLabel
          topLabel="Kode Pos"
          placeholder="Kode Pos"
          name="posCode"
          value={dataAddress?.posCode || ""}
          rightLabelBorder={false}
          rightLabel={
            <button onClick={(e) => dispatch(inquiryKodePos(dataAddress?.posCode, dataAddress, setDataAddress))}>
              Cari
            </button>
          }
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={5}
          disabled={disabled}
          warnText={dataAddress?.posCode?.length !== 5 || dataAddress?.posCode === "0" ? "Kode Pos tidak valid" : ""}
        />
      </div>
    </Fragment>
    )
}

export const TextboxPhone = ({
  value,
  onChange,
  name,
  label,
  placeholder,
  disabled,
  maxLength,
  invalid,
  invalidTxt,
  showOptions
}) => {
  return (
    <div>
      {label !== "" ? <div className="mb-2"><LabelInputTextbox text={label} /></div> : <div></div>}
      <div className="txtbox-dropdown">
        <div className="flex flex-row gap-2 place-self-center pl-2">
          <p className="text-light text-[#777777]">+62</p>
        </div>
        <div className="textbox-label__textboxWrapper">
          <div className="txtbox-dropdown__txtbox">
            <TextboxWithoutShadow 
              typeInput="text" 
              name={name} 
              value={value} 
              disablePadding={true} 
              onChange={onChange}
              maxLength={maxLength} 
              disabled={disabled} />
          </div>
        </div>
      </div>
      {invalid && <p className="textbox__invalidTxt mt-2">{invalidTxt}</p>}
    </div>
  )
}


export default DetailProperti