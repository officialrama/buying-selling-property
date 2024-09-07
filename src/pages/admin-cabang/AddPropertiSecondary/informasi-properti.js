import { LabelInputTextbox } from "../../../components/atoms"
import { DetailsCard, TextboxLabel, Dropdown } from "../../../components/molecules"
import { useEffect, useState } from "react"
import { selectConst } from "../../../static/selectConst";
import DatePicker from "react-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { INPUT_OTP } from "../../../store/actions/types";

const InformasiProperti = ({
    inputs,
    setInputs,
    dropdownVal,
    handleProps
}) => {
    const [isSertifikat, setIsSertifikat] = useState({
        shm: false,
        hgb: false,
        hgu: false,
        imb: false
    })

    useEffect(() => {
        if(inputs?.sertifikat?.value)
            setIsSertifikat(prevState => ({
            ...prevState,
            [inputs.sertifikat.value] : !prevState[inputs.sertifikat.value]
        }))

    }, [])

    useEffect(() => {
        setInputs({
            ...inputs,
            sertifikat: {
                value: Object.keys(isSertifikat).find(key => isSertifikat[key])
            }
        })
    }, [isSertifikat])

    const handleRadioButton = (event) => {
        const newValue = event.target.value === 'true'; 
        setInputs((prevInputs) => ({
          ...prevInputs,
          isCluster: {
            value: newValue
          },
        }))
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
                    <div className="sellpropsV2__card__wrapper-content">
                        <p className="sellpropsV2__title pb-2">Informasi Properti</p>
                        <div className="my-5">
                            <span>Klasifikasi Properti*</span>
                            <div className="flex flex-row mt-4 gap-[62px]">
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="radio"
                                        className="form-radio h-6 w-6 text-indigo-600"
                                        value="true"
                                        name="perumahan"
                                        checked={inputs?.isCluster?.value}
                                        onChange={handleRadioButton}
                                    />
                                    <p>Perumahan</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="radio"
                                        className="form-radio h-6 w-6 text-indigo-600"
                                        value="false"
                                        name="nonperumahan"
                                        checked={!inputs?.isCluster?.value}
                                        onChange={handleRadioButton}
                                    />
                                    <p>Non Perumahan</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <TextboxLabel
                                placeholder="Masukkan luas tanah"
                                topLabel="Luas Tanah*"
                                rightLabel="m²"
                                name="lt"
                                value={inputs?.lt?.value}
                                maxLength={10}
                                warnText={
                                    !inputs?.lt?.value ? "Luas tanah tidak boleh kosong" : inputs?.lt?.msgError
                                }
                                onChange={handleProps.handleNumberInput}
                                
                            />
                            <TextboxLabel
                                topLabel="Luas Bangunan*"
                                placeholder="Masukkan luas bangunan"
                                rightLabel="m²"
                                name="lb"
                                value={inputs?.lb?.value}
                                maxLength={10}
                                warnText={
                                    !inputs?.lb?.value ? "Luas Bangunan tidak boleh kosong" : inputs?.lb?.msgError
                                }
                                onChange={handleProps.handleNumberInput}
                                
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {DropdownWrap({
                                title: "Kamar Tidur*",
                                item: [
                                    <div className="w-full">
                                        <Dropdown
                                            value={dropdownVal.bedroom}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({...dropdownVal, bedroom: value});
                                                handleProps.handleRadioDropChange("jmlKmrTidur", value.value);
                                            }}
                                            data={selectConst.bedroom}
                                            warnText={
                                                !inputs?.jmlKmrTidur?.value
                                                    ? "Jumlah kamar tidur belum dipilih"
                                                    : inputs?.jmlKmrTidur?.msgError
                                            }
                                        />
                                    </div>,
                                ]
                            })}
                            {DropdownWrap({
                                title: "Kamar Mandi*",
                                item: [
                                    <div className="w-full">
                                        <Dropdown
                                            value={dropdownVal.bathroom}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({...dropdownVal, bathroom: value});
                                                handleProps.handleRadioDropChange("jmlKmrMandi", value.value);
                                            }}
                                            data={selectConst.bathroom}
                                            warnText={
                                                !inputs?.jmlKmrMandi?.value
                                                    ? "Jumlah kamar mandi belum dipilih"
                                                    : inputs?.jmlKmrMandi?.msgError
                                            }
                                        />
                                    </div>,
                                ]
                            })}
                            {DropdownWrap({
                                title: "Jumlah Lantai*",
                                item: [
                                    <div className="w-full">
                                    <Dropdown
                                        value={dropdownVal.numberOfFloors}
                                        onChange={(value) => {
                                            handleProps.setDropdownVal({...dropdownVal, numberOfFloors: value});
                                            handleProps.handleRadioDropChange("jmlLantai", value.value);
                                        }}
                                        data={selectConst.numberOfFloors}
                                        warnText={
                                            !inputs?.jmlLantai?.value
                                                ? "Jumlah lantai belum dipilih"
                                                : inputs?.jmlLantai?.msgError
                                        }
                                    />
                                    </div>
                                ]
                            })}
                            {DropdownWrap({
                                title: "Kamar Pembantu*",
                                item: [
                                    <div className="w-full">
                                    <Dropdown
                                        value={dropdownVal.maidRoom}
                                        onChange={(value) => {
                                            handleProps.setDropdownVal({...dropdownVal, maidRoom: value});
                                            handleProps.handleRadioDropChange("kamarPembantu", value.value);
                                        }}
                                        data={selectConst.maidRoom}
                                        warnText={
                                            !inputs?.kamarPembantu?.value
                                                ? "Kamar pembantu belum dipilih"
                                                : inputs?.kamarPembantu?.msgError
                                        }
                                    />
                                    </div>
                                ]
                            })}
                            <TextboxLabel
                                topLabel="Garasi*"
                                placeholder="Masukan Garasi"
                                name="garasi"
                                value={inputs?.garasi?.value}
                                onChange={handleProps.handleInputChange}
                            />
                            {DropdownWrap({
                                title: "Hadap Rumah",
                                item: [
                                    <div className="w-full">
                                        <Dropdown
                                            value={dropdownVal.facingHouse}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({...dropdownVal, facingHouse: value});
                                                handleProps.handleRadioDropChange("hadapRumah", value.value);
                                            }}
                                            data={selectConst.facingHouse}
                                            warnText={
                                                !inputs?.hadapRumah?.value
                                                    ? "Hadap rumah belum dipilih"
                                                    : inputs?.hadapRumah?.msgError
                                            }
                                        />
                                    </div>
                                ]
                            })}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {DropdownWrap({
                                title: "Tahun Bangun*",
                                warnText: inputs?.tahunBangun?.msgError ? inputs?.tahunBangun?.msgError : inputs?.tahunBangun?.value ? "" : "Tahun bangun belum dipilih",
                                item: [
                                    <>
                                        <DatePicker
                                            name="tahunBangun"
                                            onChange={(e) => {
                                                handleProps.handleDateInputChange(e, "tahunBangun");
                                            }}
                                            value={inputs?.tahunBangun?.value || null}
                                            onChangeRaw={(e) => e.preventDefault()}
                                            maxDetail="decade"
                                            minDate={new Date(`${new Date("1980").toString()}`)}
                                            maxDate={new Date()}
                                            format="yyyy"
                                            locale="id-ID"
                                            calendarIcon={<FaCalendarAlt/>}
                                            clearIcon={<MdOutlineClear/>}
                                        />
                                    </>,
                                ]
                            })}
                            {DropdownWrap({
                                title: "Daya Listrik*",
                                item: [
                                    <div className="w-full">
                                        <Dropdown
                                            value={dropdownVal.electricalPower}
                                            onChange={(value) => {
                                                handleProps.setDropdownVal({
                                                    ...dropdownVal,
                                                    electricalPower: value,
                                                });
                                                handleProps.handleRadioDropChange("dayaListrik", value.value);
                                            }}
                                            data={selectConst.electricalPower}
                                            warnText={
                                                !inputs?.dayaListrik?.value
                                                    ? "Daya listrik belum dipilih"
                                                    : inputs?.dayaListrik?.msgError
                                            }
                                        />
                                    </div>
                                ]
                            })}
                        </div>
                        <div className="my-7">
                            <span>Sertifikat*</span>
                            <div className="flex flex-row mt-4 gap-[62px]">
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-6 w-6 text-indigo-600"
                                        checked={isSertifikat.shm}
                                        name="addressSelection"
                                        onChange={() => {
                                            setIsSertifikat(prevState => (
                                                {
                                                    shm: !prevState.shm,
                                                    hgb: false,
                                                    hgu: false, 
                                                    imb: false
                                                }
                                            ))
                                        }}
                                    />
                                    <p>SHM</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-6 w-6 text-indigo-600"
                                        checked={isSertifikat.hgb}
                                        name="addressSelection"
                                        onChange={() => {
                                            setIsSertifikat(prevState => (
                                                {
                                                    shm: false,
                                                    hgb: !prevState.hgb,
                                                    hgu: false, 
                                                    imb: false
                                                }
                                            ))
                                        }}
                                    />
                                    <p>HGB</p>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-6 w-6 text-indigo-600"
                                        checked={isSertifikat.hgu}
                                        name="addressSelection"
                                        onChange={() => {
                                            setIsSertifikat(prevState => (
                                                {
                                                    shm: false,
                                                    hgb: false,
                                                    hgu: !prevState.imb, 
                                                    imb: false
                                                }
                                            ))
                                        }}
                                    />
                                    <p>HGU</p>
                                </div>
                                {/* <div className="flex flex-row gap-1">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-6 w-6 text-indigo-600"
                                        checked={isSertifikat.imb}
                                        name="addressSelection"
                                        onChange={() => {
                                            setIsSertifikat(prevState => (
                                                {
                                                    shm: false,
                                                    hgb: false,
                                                    hgu: false, 
                                                    imb: !prevState.imb 
                                                }
                                            ))
                                        }}
                                    />
                                    <p>IMB</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
        </DetailsCard>
        </div>
    )
}

export default InformasiProperti