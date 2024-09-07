/* eslint-disable react-hooks/exhaustive-deps */
import JSZip from "jszip";
import {useEffect, useState} from "react";
import DatePicker from "react-date-picker";
import {useDropzone} from "react-dropzone";
import {FaCalendarAlt} from "react-icons/fa";
import {MdOutlineClear} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {BorderLine, Button, CurrencyInput, Textarea} from "../../../../components/atoms";
import {
    Checkbox,
    DetailsCard,
    Dropdown,
    Footer,
    TextboxLabel,
} from "../../../../components/molecules";
import {Modal, UploadSellProp} from "../../../../components/organisms";
import useFormStepperHooksV2 from "../../../../hooks/v2/useFormStepperHooks";
import useSellPropsHooksV2 from "../../../../hooks/v2/useSellPropsHooksV2";
import {selectConst} from "../../../../static/selectConst";
import {
    closeModalFail,
    closeModalSuccess,
    showModalFail,
} from "../../../../store/actions/fetchData/superAdminState";
import {unitDetail} from "../../../../store/actions/fetchData/v2/detailProject";
import {editUnit} from "../../../../store/actions/fetchData/v2/editUnit";
import {saveProject} from "../../../../store/actions/fetchData/v2/saveProject";
import {compressImage} from "../../../../helpers/imageCompressor";
import _, {div} from "lodash-contrib";
import {decryptStr, encryptStr} from "../../../../helpers/encryptDecrypt";

const DetailUnitProp = ({userStatus, email, editMode}) => {
    const {dropdownVal, setDropdownVal, files, setFiles, setImgFiles} = useSellPropsHooksV2();
    const {
        inputs,
        setInputs,
        initiateState,
        initiateStateV2,
        handleRadioDropChange,
        handleCurrency,
        handleInputChange,
        handleDateInputChange,
        handleCheckboxChange,
        handleLetterNumberInput,
        handleNumberInput,
        handleAllCharInput,
        modalConfirm,
        setModalConfirm,
    } = useFormStepperHooksV2();
    const {id} = useParams();
    const [queryParamSearch] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const saState = useSelector((state) => state.superAdminReducer);
    const uploadProjectState = useSelector((state) => state.uploadProjectReducer);
    const stateSellProp = useSelector((state) => state.sellPropertyReducer);
    const groupPrj = "#USER#|#TYPE#|#PRJNAME#";
    const groupUnit = "#USER#|#TYPE#|#PRJNAME#|#CLSNAME#|#UNITNAME#";
    let groupPrjAfter = "";
    let groupUnitAfter = "";
    if (queryParamSearch?.get("clsId") && decryptStr(queryParamSearch?.get("clsId")) !== "-1") {
        groupPrjAfter = groupPrj
            .replace("#USER#", "PRJ")
            .replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase())
            .replace(
                "#PRJNAME#",
                uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase()
            );
        groupUnitAfter = groupUnit
            .replace("#USER#", "PRJ")
            .replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase())
            .replace(
                "#PRJNAME#",
                uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase()
            )
            .replace(
                "#CLSNAME#",
                uploadProjectState?.clusterInfoDto?.namaCluster?.value?.replace(/\W/g, "").toUpperCase()
            )
            .replace("#UNITNAME#", inputs?.namaProperti?.value?.replace(/\W/g, "").toUpperCase());
    } else {
        groupPrjAfter = groupPrj
            .replace("#USER#", "PRJ")
            .replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase())
            .replace(
                "#PRJNAME#",
                uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase()
            );
        groupUnitAfter = groupUnit
            .replace("#USER#", "PRJ")
            .replace("#TYPE#", stateSellProp.devName.replace(/\W/g, "").toUpperCase())
            .replace(
                "#PRJNAME#",
                uploadProjectState?.projectInfo?.namaProyek?.value?.replace(/\W/g, "").toUpperCase()
            )
            .replace("#CLSNAME#", "UNCLUSTERED")
            .replace("#UNITNAME#", inputs?.namaProperti?.value?.replace(/\W/g, "").toUpperCase());
    }

    const zip = new JSZip();
    const [editCluster, setEditCluster] = useState(false);
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                if (file.size <= 1000000) {
                    setImgFiles(file, URL.createObjectURL(file));
                } else {
                    const compressedImage = compressImage(file);
                    compressedImage.then(
                        function (result) {
                            setImgFiles(result, URL.createObjectURL(result));
                        },
                        function (err) {
                            dispatch(showModalFail("Gagal", "Kompresi File Gagal"));
                        }
                    );
                }
            });
        },
    });
    let inputDetailProjectArr = [
        inputs?.namaProperti?.isValid,
        inputs?.lt?.isValid,
        inputs?.lb?.isValid,
        inputs?.jmlKmrTidur?.isValid,
        inputs?.jmlKmrMandi?.isValid,
        inputs?.hargaProperti?.isValid,
        inputs?.deskripsiProperti?.isValid,
        inputs?.sertifikat?.isValid,
        inputs?.jmlLantai?.isValid,
        inputs?.kondisiProperti?.isValid,
        inputs?.dayaListrik?.isValid,
        inputs?.hadapRumah?.isValid,
        inputs?.tahunBangun?.isValid,
        inputs?.kamarPembantu?.isValid,
        inputs?.stockUnitsProp?.isValid,
        // inputs?.discountPercentage?.isValid,
        // inputs?.diskonNominal?.isValid,
        // inputs?.hargaAkhir?.isValid,
        // inputs?.periodeDiskon?.isValid,
        files?.length >= 4,
    ];

    if (window.location.pathname.includes("/edit-unit")) {
        inputDetailProjectArr.push(inputs?.statusUnit?.isValid);
    }

    function removeItem(index, imgSrc) {
        URL.revokeObjectURL(imgSrc);
        setFiles((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)]);
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(files);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFiles(items);
    };

    function RedStar() {
        return <span className="sellpropsV2__card__redstar">*</span>;
    }

    function InfoProyekItemWrap({title, item}) {
        return (
            <div className="sellpropsV2__card__form-col__wrapper grid-tpl-col">
                <p className="sellpropsV2__card__form-col__title-25">{title}</p>
                <div>{item}</div>
            </div>
        );
    }

    function DropdownWrap({title, item}) {
        return (
            <div className="sellpropsV2__card__form-col__wrapper grid-tpl-col">
                <p className="sellpropsV2__card__form-col__title-25">{title}</p>
                <div className="sellpropsV2__card__form-col__form-dropdown w-[40%] mobile:w-full">
                    {item}
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (
            window.location.pathname.includes("/edit-unit") &&
            (queryParamSearch?.get("from") === "profile-menu" ||
                queryParamSearch?.get("from") === "add-property")
        ) {
            setEditCluster(false);
            dispatch(
                unitDetail({
                    id: encryptStr(decryptStr(id)),
                    setDataWithVal: initiateStateV2,
                    setData: initiateState,
                    setImgFiles: setImgFiles,
                    dropdownVal: dropdownVal,
                    setDropdownVal: setDropdownVal,

                })
            );
            setInputs({...uploadProjectState?.projectInfo});
        } else {
            setEditCluster(true);
        }
    }, []);
    useEffect(() => {
        setDropdownVal({...dropdownVal,  
            bathroom:inputs?.jmlKmrMandi,
            bedroom:inputs?.jmlKmrTidur,
            certificate:inputs?.sertifikat,
            numberOfFloors:inputs?.jmlLantai,
            propertyCondition:inputs?.kondisiProperti,
            electricalPower:inputs?.dayaListrik,
            facingHouse:inputs?.hadapRumah,
            maidRoom: inputs?.kamarPembantu,
            statusUnit: inputs?.statusUnit
            })     
        
    }, [inputs]);
    useEffect(() => {
        const certificate = dropdownVal?.certificate?.value 
        if(certificate === "shm"){
            setDropdownVal({...dropdownVal,
            certificate:{value : "Sertifikat Hak Milik"}
            }) 
        } 
        if(certificate === "shgb"){
            setDropdownVal({...dropdownVal,
            certificate:{value : "Sertifikat Hak Guna Bangunan"}
            }) 
        }  
        if(certificate === "shsrs"){
            setDropdownVal({...dropdownVal,
            certificate:{value : "Sertifikat Hak Satuan Rumah Susun"}
            }) 
        }     
    }, [dropdownVal]);
    return (
        <div>
            {saState.success ? (
                <Modal
                    closeModal={() => {
                        dispatch(closeModalSuccess());
                        navigate(-1, {replace: true});
                    }}
                    modalTypes="modalSF"
                    title=""
                    titleBody={saState.titleSuccess}
                    descBody={saState.msgSuccess}
                />
            ) : (
                <></>
            )}
            {saState.fail === true && (
                <Modal
                    closeModal={() => dispatch(closeModalFail())}
                    modalTypes="modalSF"
                    title=""
                    titleBody={saState.titleFail}
                    descBody={saState.msgFail}
                />
            )}
            {modalConfirm && (
                <Modal
                    modalTypes="confirm"
                    closeModal={() => setModalConfirm(false)}
                    onConfirm={() => navigate(-1)}
                    descBody={"Apakah anda yakin akan membuang perubahan?"}
                    title="Konfirmasi"
                />
            )}
            <div className="sellpropsV2__wrapper">
                <div className="sellpropsV2__text-wrapper">
                    <p className="sellpropsV2__title">
                        {!window.location.pathname.includes("/edit-unit") ? "Detail Unit" : "Edit Unit"}
                    </p>
                </div>

                <DetailsCard className="sellpropsV2__card__wrapper">
                    <div className="sellpropsV2__card__wrapper-content">
                        {!window.location.pathname.includes("/edit-unit") ? (
                            <p className="sellpropsV2__card__title">Informasi Unit {RedStar()}</p>
                        ) : (
                            <div className="flex flex-row gap-4 justify-between mb-4">
                                <p className="sellpropsV2__card__title mb-0">Informasi Unit {RedStar()}</p>
                                <Button
                                    buttonColor="orangeBorder"
                                    textColor="orange"
                                    className="add-admin__btn-bottom--edit mr-0"
                                    onClick={() => setEditCluster(!editCluster)}
                                    paddingSize="padding-0"
                                >
                  <span className="flex gap-2">
                    <img src="/icons/small-icons/edit-orange.svg" alt="edit"/>
                    Edit
                  </span>
                                </Button>
                            </div>
                        )}
                        {InfoProyekItemWrap({
                            title: "Nama Tipe Unit",
                            item: [
                                <TextboxLabel
                                    placeholder="Nama Tipe Unit"
                                    typeInput="text"
                                    name="namaProperti"
                                    value={inputs?.namaProperti?.value}
                                    warnText={
                                        !inputs?.namaProperti?.value
                                            ? "Nama properti tidak boleh kosong"
                                            : inputs?.namaProperti?.msgError
                                    }
                                    onChange={handleLetterNumberInput}
                                    disabled={!editCluster}
                                    maxLength={100}
                                />,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Luas Tanah",
                            item: [
                                <div className="w-[45%] mobile:w-full">
                                    <TextboxLabel
                                        placeholder="Masukkan luas tanah"
                                        rightLabel="m²"
                                        name="lt"
                                        value={inputs?.lt?.value}
                                        maxLength={10}
                                        warnText={
                                            !inputs?.lt?.value ? "Luas tanah tidak boleh kosong" : inputs?.lt?.msgError
                                        }
                                        onChange={handleNumberInput}
                                        disabled={!editCluster}
                                    />
                                </div>,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Luas Bangunan",
                            item: [
                                <div className="w-[45%] mobile:w-full">
                                    <TextboxLabel
                                        placeholder="Masukkan luas bangunan"
                                        rightLabel="m²"
                                        name="lb"
                                        value={inputs?.lb?.value}
                                        maxLength={10}
                                        warnText={
                                            !inputs?.lb?.value ? "Luas Bangunan tidak boleh kosong" : inputs?.lb?.msgError
                                        }
                                        onChange={handleNumberInput}
                                        disabled={!editCluster}
                                    />
                                </div>,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Kamar Tidur",
                            item: [
                                <div className="w-[30%] mobile:w-full">
                                    <Dropdown
                                        value={dropdownVal.bedroom}
                                        placeholder={selectConst?.bedroom?.[0]?.name}
                                        onChange={(value) => {
                                            setDropdownVal({...dropdownVal, bedroom: value});
                                            handleRadioDropChange("jmlKmrTidur", value.value);
                                        }}
                                        data={selectConst.bedroom}
                                        warnText={
                                            !inputs?.jmlKmrTidur?.value
                                                ? "Jumlah kamar tidur belum dipilih"
                                                : inputs?.jmlKmrTidur?.msgError
                                        }
                                        showOptions={!editCluster ? false : true}
                                    />
                                </div>,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Kamar Mandi",
                            item: [
                                <div className="w-[30%] mobile:w-full">
                                    <Dropdown
                                        value={dropdownVal.bathroom}
                                        placeholder={selectConst?.bathroom?.[0]?.name}
                                        onChange={(value) => {
                                            setDropdownVal({...dropdownVal, bathroom: value});
                                            handleRadioDropChange("jmlKmrMandi", value.value);
                                        }}
                                        data={selectConst.bathroom}
                                        warnText={
                                            !inputs?.jmlKmrMandi?.value
                                                ? "Jumlah kamar mandi belum dipilih"
                                                : inputs?.jmlKmrMandi?.msgError
                                        }
                                        showOptions={!editCluster ? false : true}
                                    />
                                </div>,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Parkir Mobil",
                            item: [
                                <div className="w-[30%] mobile:w-full">
                                    <Checkbox
                                        label=""
                                        checked={inputs.parkirMobil}
                                        fontSize="16px"
                                        name="parkirMobil"
                                        onChange={!editCluster ? () => {
                                        } : handleCheckboxChange}
                                    />
                                </div>,
                            ],
                        })}
                        <div className="sellpropsV2__horizontal-line mt-6">
                            <BorderLine/>
                        </div>
                        {InfoProyekItemWrap({
                            title: "Jumlah Unit",
                            item: [
                                <div className="w-[45%] mobile:w-full">
                                    <TextboxLabel
                                        placeholder="Jumlah Unit"
                                        typeInput="text"
                                        name="stockUnitsProp"
                                        value={inputs?.stockUnitsProp?.value}
                                        invalid={!inputs?.stockUnitsProp?.isValid}
                                        warnText={
                                            !inputs?.stockUnitsProp?.value
                                                ? "Jumlah unit tidak boleh kosong"
                                                : inputs?.stockUnitsProp?.msgError
                                        }
                                        onChange={handleNumberInput}
                                        disabled={!editCluster}
                                        maxLength={5}
                                    />
                                </div>,
                            ],
                        })}
                        {InfoProyekItemWrap({
                            title: "Harga Properti",
                            item: [
                                <div className="w-[45%] mobile:w-full">
                                    <CurrencyInput
                                        className="textbox-label__currency"
                                        name="hargaProperti"
                                        placeholder="0"
                                        decimalsLimit={2}
                                        onValueChange={(value) => {
                                            handleCurrency(value || "", "hargaProperti");
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
                                        disabled={!editCluster}
                                    />
                                </div>,
                            ],
                        })}
                        {window.location.pathname.includes("/edit-unit") &&
                            InfoProyekItemWrap({
                                title: "Status",
                                item: [
                                    <div className="w-[30%] mobile:w-full">
                                        <Dropdown
                                            value={dropdownVal?.statusUnit}
                                            placeholder={selectConst?.statusUnit?.[0]?.name}
                                            onChange={(value) => {
                                                setDropdownVal({...dropdownVal, statusUnit: value});
                                                handleRadioDropChange("statusUnit", value.value);
                                            }}
                                            data={selectConst.statusUnit}
                                            warnText={inputs?.statusUnit?.msgError}
                                            showOptions={editCluster}
                                        />
                                    </div>,
                                ],
                            })}
                        {InfoProyekItemWrap({
                            title: "Diskon Properti",
                            item: [
                                <>
                                    <div className="w-[30%] mobile:w-full">
                                        <Dropdown
                                            value={dropdownVal.statusDiscount}
                                            onChange={(value) => {
                                                setDropdownVal({...dropdownVal, statusDiscount: value});
                                                handleRadioDropChange("statusDiscount", value.value);
                                                // console.log("dropdownVal.statusDiscount", inputs.statusDiscount);
                                            }}
                                            data={selectConst.statusDiscount}
                                            warnText={inputs?.statusDiscount?.msgError}
                                            showOptions={editCluster}
                                        />
                                    </div>
                                </>,
                            ],
                        })}
                        {dropdownVal.statusDiscount?.value === "persentase" &&
                            InfoProyekItemWrap({
                                title: "Persentase Diskon",
                                item: [
                                    <div className="w-[45%] mobile:w-full">
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
                                            onChange={handleNumberInput}
                                            disabled={!editCluster}
                                        />
                                    </div>,
                                ],
                            })}

                        {dropdownVal.statusDiscount?.value === "nominal" &&
                            InfoProyekItemWrap({
                                title: "Nominal Diskon",
                                item: [
                                    <div className="w-[45%] mobile:w-full">
                                        <CurrencyInput
                                            className="textbox-label__currency"
                                            name="nominalValue"
                                            placeholder="0"
                                            decimalsLimit={2}
                                            onValueChange={(value) => {
                                                handleCurrency(value || "", "nominalValue");
                                                // handleNominalDiscount(value, inputs?.hargaProperti?.value, inputs?.statusDiscount?.value)
                                                // console.log("DEBUG FOR HANDLE TOTAL PRICE", inputs?.hargaAkhir?.value)
                                            }}
                                            groupSeparator="."
                                            decimalSeparator=","
                                            maxLength={14}
                                            value={inputs?.nominalValue?.value}
                                            allowNegativeValue={false}
                                            allowDecimals={false}
                                            warnText={
                                                !inputs?.nominalValue?.value
                                                    ? "Nominal diskon tidak boleh kosong"
                                                    : inputs?.nominalValue?.msgError
                                            }
                                            disabled={!editCluster}
                                        />
                                    </div>,
                                ],
                            })}
                        {dropdownVal.statusDiscount?.value === "persentase" ||
                        dropdownVal.statusDiscount?.value === "nominal" ? (
                            <>
                                {DropdownWrap({
                                    title: "Durasi Diskon",
                                    item: [
                                        <>
                                            <DatePicker
                                                name="endDateDiscount"
                                                onChange={(e) => {
                                                    handleDateInputChange(e, "endDateDiscount");
                                                }}
                                                value={
                                                    inputs?.endDateDiscount?.value
                                                        ? new Date(inputs?.endDateDiscount?.value)
                                                        : null
                                                }
                                                onChangeRaw={(e) => e.preventDefault()}
                                                // maxDetail="decade"
                                                minDate={new Date()}
                                                format="dd-MM-yyyy"
                                                locale="id-ID"
                                                calendarIcon={<FaCalendarAlt/>}
                                                clearIcon={<MdOutlineClear/>}
                                                disabled={!editCluster}
                                            />
                                            {inputs?.endDateDiscount?.msgError && (
                                                <p className="textbox__invalidTxt">{inputs?.endDateDiscount?.msgError}</p>
                                            )}
                                            {!inputs?.endDateDiscount?.value && (
                                                <p className="textbox__invalidTxt">Durasi diskon belum dipilih</p>
                                            )}
                                        </>,
                                    ],
                                })}
                                {InfoProyekItemWrap({
                                    title: "Harga Akhir",
                                    item: [
                                        <div className="w-[45%] mobile:w-full">
                                            <CurrencyInput
                                                className="textbox-label__currency"
                                                name="hargaAkhir"
                                                placeholder="0"
                                                decimalsLimit={2}
                                                // onValueChange={(value) => handleCurrency(value || "", "hargaAkhir")}
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
                                        </div>,
                                    ],
                                })}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </DetailsCard>
                <DetailsCard className="sellpropsV2__card__wrapper mb-6">
                    <div className="sellpropsV2__card__desc-wrap">
                        <p className="sellpropsV2__card__desc-title">Deskripsi {RedStar()}</p>
                        <div className="sellpropsV2__card__form-col__form-75">
                            <Textarea
                                placeholder="Tulis deskripsi properti"
                                resize={true}
                                rows={6}
                                name="deskripsiProperti"
                                value={inputs?.deskripsiProperti?.value}
                                maxLength={5000}
                                onChange={handleAllCharInput}
                                warnText={
                                    !inputs?.deskripsiProperti?.value
                                        ? "Deskripsi properti tidak boleh kosong"
                                        : inputs?.deskripsiProperti?.msgError
                                }
                                disabled={!editCluster}
                            />
                        </div>
                    </div>
                </DetailsCard>
                <div className="sellpropsV2__text-wrapper">
                    <p className="sellpropsV2__title">Informasi Tambahan</p>
                </div>
                <DetailsCard className="sellpropsV2__card__wrapper">
                    <div className="sellpropsV2__card__wrapper-content">
                        <p className="sellpropsV2__card__title">Informasi Properti {RedStar()}</p>
                        {DropdownWrap({
                            title: "Sertifikat",
                            item: [
                                <Dropdown
                                    value={dropdownVal.certificate}
                                    placeholder={selectConst?.certificate?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({...dropdownVal, certificate: value});
                                        handleRadioDropChange("sertifikat", value.value);
                                    }}
                                    data={selectConst.certificate}
                                    warnText={
                                        !inputs?.sertifikat?.value
                                            ? "Sertifikat belum dipilih"
                                            : inputs?.sertifikat?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Jumlah Lantai",
                            item: [
                                <Dropdown
                                    value={dropdownVal.numberOfFloors}
                                    placeholder={selectConst?.numberOfFloors?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({...dropdownVal, numberOfFloors: value});
                                        handleRadioDropChange("jmlLantai", value.value);
                                    }}
                                    data={selectConst.numberOfFloors}
                                    warnText={
                                        !inputs?.jmlLantai?.value
                                            ? "Jumlah lantai belum dipilih"
                                            : inputs?.jmlLantai?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Kondisi Properti",
                            item: [
                                <Dropdown
                                    value={dropdownVal.propertyCondition}
                                    placeholder={selectConst?.propertyCondition?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({
                                            ...dropdownVal,
                                            propertyCondition: value,
                                        });
                                        handleRadioDropChange("kondisiProperti", value.value);
                                        if (value.value === "second") {
                                            setInputs((inputs) => ({
                                                ...inputs,
                                                stockUnitsProp: {isValid: true, value: 1, msgError: ""},
                                            }));
                                        }
                                    }}
                                    data={selectConst.propertyCondition}
                                    warnText={
                                        !inputs?.kondisiProperti?.value
                                            ? "Kondisi properti belum dipilih"
                                            : inputs?.kondisiProperti?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Daya Listrik",
                            item: [
                                <Dropdown
                                    value={dropdownVal.electricalPower}
                                    placeholder={selectConst?.electricalPower?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({
                                            ...dropdownVal,
                                            electricalPower: value,
                                        });
                                        handleRadioDropChange("dayaListrik", value.value);
                                    }}
                                    data={selectConst.electricalPower}
                                    warnText={
                                        !inputs?.dayaListrik?.value
                                            ? "Daya listrik belum dipilih"
                                            : inputs?.dayaListrik?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Hadap Rumah",
                            item: [
                                <Dropdown
                                    value={dropdownVal.facingHouse}
                                    placeholder={selectConst?.facingHouse?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({...dropdownVal, facingHouse: value});
                                        handleRadioDropChange("hadapRumah", value.value);
                                    }}
                                    data={selectConst.facingHouse}
                                    warnText={
                                        !inputs?.hadapRumah?.value
                                            ? "Hadap rumah belum dipilih"
                                            : inputs?.hadapRumah?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Tahun Bangun",
                            item: [
                                <>
                                    <DatePicker
                                        name="tahunBangun"
                                        onChange={(e) => {
                                            handleDateInputChange(e, "tahunBangun");
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
                                        disabled={!editCluster}
                                    />
                                    {inputs?.tahunBangun?.msgError && (
                                        <p className="textbox__invalidTxt">{inputs?.tahunBangun?.msgError}</p>
                                    )}
                                    {!inputs?.tahunBangun?.value && (
                                        <p className="textbox__invalidTxt">Tahun bangun belum dipilih</p>
                                    )}
                                </>,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Kamar Pembantu",
                            item: [
                                <Dropdown
                                    value={dropdownVal.maidRoom}
                                    placeholder={selectConst?.maidRoom?.[0]?.name}
                                    onChange={(value) => {
                                        setDropdownVal({...dropdownVal, maidRoom: value});
                                        handleRadioDropChange("kamarPembantu", value.value);
                                    }}
                                    data={selectConst.maidRoom}
                                    warnText={
                                        !inputs?.kamarPembantu?.value
                                            ? "Kamar pembantu belum dipilih"
                                            : inputs?.kamarPembantu?.msgError
                                    }
                                    showOptions={!editCluster ? false : true}
                                />,
                            ],
                        })}
                        {DropdownWrap({
                            title: "Dalam pembangunan",
                            item: [
                                <Checkbox
                                    /* label="Dapur" fontSize="16px" */ checked={inputs?.inDevelopment}
                                                                        name="inDevelopment"
                                                                        onChange={handleCheckboxChange}
                                />,
                            ],
                        })}
                    </div>
                </DetailsCard>
                <DetailsCard className="sellpropsV2__card__wrapper">
                    <div className="sellpropsV2__card__wrapper-content">
                        <p className="sellpropsV2__card__title">Kelengkapan Rumah</p>
                        <div className="sellprops__card__checklist-wrapper">
                            <Checkbox
                                label="Dapur"
                                checked={inputs?.dapur}
                                fontSize="16px"
                                name="dapur"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <Checkbox
                                label="Jalur PDAM"
                                checked={inputs?.jalurPDAM}
                                fontSize="16px"
                                name="jalurPDAM"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <Checkbox
                                label="Ruang Keluarga"
                                checked={inputs?.ruangKeluarga}
                                fontSize="16px"
                                name="ruangKeluarga"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <div className="sellprops__card__text-hidden"></div>
                            <Checkbox
                                label="Jalur Listrik"
                                checked={inputs?.jalurListrik}
                                fontSize="16px"
                                name="jalurListrik"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <Checkbox
                                label="Jalur Telepon"
                                checked={inputs?.jalurTelepone}
                                fontSize="16px"
                                name="jalurTelepone"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <Checkbox
                                label="Ruang Kerja"
                                checked={inputs?.ruangKerja}
                                fontSize="16px"
                                name="ruangKerja"
                                onChange={handleCheckboxChange}
                                disabled={!editCluster}
                            />
                            <div className="sellprops__card__text-hidden"></div>
                        </div>
                    </div>
                </DetailsCard>
                <div className="sellpropsV2__text-wrapper">
                    <p className="sellpropsV2__title">Media</p>
                </div>
                <DetailsCard className="sellpropsV2__card__wrapper">
                    <UploadSellProp
                        files={files}
                        setFiles={setFiles}
                        zip={zip}
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        removeItem={removeItem}
                        handleOnDragEnd={handleOnDragEnd}
                    />
                    {files.length < 4 && <p className="textbox__invalidTxt mb-4">Upload Foto Minimal 4</p>}
                    <div className="sellpropsV2__card__wrapper-content">
                        <p className="sellpropsV2__card__title">Video Youtube</p>
                        <TextboxLabel
                            placeholder="Link video youtube"
                            typeInput="text"
                            name="youtubeUrlUnit"
                            value={inputs?.youtubeUrlUnit?.value}
                            onChange={handleInputChange}
                            disabled={!editCluster}
                        />
                    </div>
                    <div className="sellpropsV2__card__wrapper-content">
                        <p className="sellpropsV2__card__title">Virtual 360</p>
                        <TextboxLabel
                            placeholder="Virtual 360"
                            typeInput="text"
                            name="virtual360UrlUnit"
                            value={inputs?.virtual360UrlUnit?.value}
                            onChange={handleInputChange}
                            disabled={!editCluster}
                        />
                    </div>
                </DetailsCard>
            </div>
            <div className="sellprops__button-next-prev">
                <Button
                    buttonColor="blueLight"
                    textColor="blue"
                    fullWidth={true}
                    paddingSize={"padding-0"}
                    onClick={() => setModalConfirm(true)}
                >
                    Kembali
                </Button>
                <Button
                    buttonColor="blue"
                    textColor="white"
                    fullWidth={true}
                    paddingSize={"padding-0"}
                    disabled={
                        window.location.pathname.includes("/edit-unit")
                            ? inputDetailProjectArr.filter(Boolean).length !== 17
                            : inputDetailProjectArr.filter(Boolean).length !== 16 || !editCluster
                    }
                    onClick={() => {
                        // console.log(inputDetailProjectArr.filter(Boolean).length);
                        if (
                            window.location.pathname.includes("/edit-unit") &&
                            inputDetailProjectArr.filter(Boolean).length !== 17
                        ) {
                            dispatch(showModalFail("Gagal", "Isian form detail unit tidak valid"));
                        }
                        if (
                            !window.location.pathname.includes("/edit-unit") &&
                            inputDetailProjectArr.filter(Boolean).length !== 16
                        ) {
                            dispatch(showModalFail("Gagal", "Isian form detail unit tidak valid"));
                        } else {
                            if (
                                queryParamSearch?.get("from") === "profile-menu" ||
                                queryParamSearch?.get("from") === "add-property"
                            ) {
                                // console.log("DEBUG HADI INPUT", inputs);
                                // console.log("DEBUG HADI DISCOUNT", {
                                //     statusDiscount: inputs?.statusDiscount?.value,
                                //     percentageValue: inputs?.percentageValue?.value,
                                //     nominalValue: inputs?.nominalValue?.value,
                                //     endDateDiscount: inputs?.endDateDiscount?.value,
                                //     hargaAkhir: inputs?.hargaAkhir?.value,
                                // });
                                dispatch(
                                    editUnit({
                                        clusterId: queryParamSearch?.get("clsId"),
                                        unitId: id,
                                        inputs: {
                                            ...inputs,
                                            statusDiscount: inputs?.statusDiscount?.value || dropdownVal.statusDiscount.value,
                                        },
                                        unitPhoto: !_.isEqual(files, uploadProjectState?.propPhoto) ? files : null,
                                        userName: email,
                                        group: groupUnitAfter,
                                        status: inputs?.statusUnit?.value,
                                        imagePropertiId: uploadProjectState?.imagePropertiId,
                                    })
                                );
                            } else {
                                if (queryParamSearch?.get("clsId")) {
                                    dispatch(
                                        saveProject({
                                            prjId: uploadProjectState?.idProperty,
                                            clsId: encryptStr(
                                                decryptStr(decodeURIComponent(queryParamSearch?.get("clsId")))
                                            ),
                                            inputs: {
                                                ...inputs,
                                                ...uploadProjectState?.projectInfo,
                                                ...uploadProjectState?.clusterInfoDto,
                                            },
                                            dataAddress: uploadProjectState?.address,
                                            addressJsonData: uploadProjectState?.addressJson,
                                            brochureFile:
                                                uploadProjectState?.brosurProjectId === ""
                                                    ? uploadProjectState?.brochure?.file
                                                    : null,
                                            prjPhoto:
                                                uploadProjectState?.imageProjectId === ""
                                                    ? uploadProjectState?.projectPhoto
                                                    : null,
                                            unitPhoto: files,
                                            userName: email,
                                            group: groupPrjAfter,
                                            groupUnit: groupUnitAfter,
                                            clusterData: uploadProjectState?.clusterInfoDto,
                                            listPropData: inputs,
                                            actionId: 2,
                                            type: "unit",
                                            from: queryParamSearch?.get("from"),
                                            brosurProjectId: uploadProjectState?.brosurProjectId,
                                            imageProjectId: uploadProjectState?.imageProjectId,
                                        })
                                    );
                                } else {
                                    // console.log("Debug clsId false");
                                    // console.log("Debug clsId false", {
                                    //     prjId: uploadProjectState?.idProperty,
                                    //     ...inputs,
                                    //     // statusDiscount: inputs.statusDiscount
                                    // });
                                    dispatch(
                                        saveProject({
                                            prjId: uploadProjectState?.idProperty,
                                            clsId: 0,
                                            inputs: {
                                                ...inputs,
                                                ...uploadProjectState?.projectInfo,
                                                ...uploadProjectState?.properti,
                                            },
                                            dataAddress: uploadProjectState?.address,
                                            addressJsonData: uploadProjectState?.addressJson,
                                            brochureFile:
                                                uploadProjectState?.brosurProjectId === ""
                                                    ? uploadProjectState?.brochure?.file
                                                    : null,
                                            prjPhoto:
                                                uploadProjectState?.imageProjectId === ""
                                                    ? uploadProjectState?.projectPhoto
                                                    : null,
                                            unitPhoto: files,
                                            userName: email,
                                            group: groupPrjAfter,
                                            groupUnit: groupUnitAfter,
                                            clusterData: [],
                                            listPropData: inputs,
                                            actionId: 3,
                                            type: "unit",
                                            from: queryParamSearch?.get("from"),
                                            brosurProjectId: uploadProjectState?.brosurProjectId,
                                            imageProjectId: uploadProjectState?.imageProjectId,
                                        })
                                    );
                                }
                            }
                        }
                    }}
                >
                    Simpan
                </Button>
            </div>
            <Footer/>
        </div>
    );
};

export default DetailUnitProp;
