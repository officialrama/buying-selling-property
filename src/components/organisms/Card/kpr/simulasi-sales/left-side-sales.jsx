import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { invalidNumRegex } from "../../../../../helpers/regex";
import { kprHitunganSales } from "../../../../../store/actions/fetchData/kpr-sales";
import { Button, CurrencyInput, LabelInputTextbox } from "../../../../atoms";
import { Dropdown, TextboxLabel } from "../../../../molecules";

const LeftKprSimSales = ({
    state,
    stateDropdown,
    hidden,
    salesCalcSimulasi,
    setSalesCalcSimulasi,
    optionsGimmick,
    onChangeGimmick,
    gimmickOptions,
    optionsKreditFix,
    onChangeKreditFix,
    dataInputSalesCalc,
    setDataInputSalesCalc,
    setLoading,
    setShowSalesCalc
}) => {
    const dispatch = useDispatch();
    const [isShowSalesCalc, setIsShowSalesCalc] = useState(true);
    const handleShowSalesCalc = () => {
        setIsShowSalesCalc(!isShowSalesCalc);
    };

    useState(() => {
        if(window.localStorage.getItem("simulasiSalesCalc")){
            setSalesCalcSimulasi({
                isCalcSimulasiSales: !JSON.parse(window.localStorage.getItem("simulasiSalesCalc"))
                ?.productDetail,
                ...JSON.parse(window.localStorage.getItem("simulasiSalesCalc")),
            });
        }
    }, []);

    useEffect(() => {
        if(Number(dataInputSalesCalc?.uangMuka?.value) < Number(dataInputSalesCalc?.hargaAkhir?.value)){
            setDataInputSalesCalc({
                ...dataInputSalesCalc,
                jumlahPinjaman: {
                    ...dataInputSalesCalc.jumlahPinjaman,
                    value: Number(dataInputSalesCalc?.hargaAkhir?.value) - Number(dataInputSalesCalc?.uangMuka?.value),
                },
            })
        } else if (Number(dataInputSalesCalc?.uangMuka?.value) > Number(dataInputSalesCalc?.hargaAkhir?.value)){
            setDataInputSalesCalc({
                ...dataInputSalesCalc,
                uangMuka: {
                    ...dataInputSalesCalc.jumlahPinjaman,
                    value: Number(dataInputSalesCalc?.hargaAkhir?.value),
                    msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
                },
                jumlahPinjaman: {
                    ...dataInputSalesCalc?.jumlahPinjaman,
                    value: 0
                }
            })
        } else if (isNaN(Number(dataInputSalesCalc?.uangMuka?.value))){
            setDataInputSalesCalc({
                ...dataInputSalesCalc,
                uangMuka: {
                    ...dataInputSalesCalc.jumlahPinjaman,
                    value: 0
                }
            })
        }
    }, [dataInputSalesCalc?.uangMuka?.value]);

    const handleChangeAlt = (value, name) => {
        setDataInputSalesCalc({
            ...dataInputSalesCalc,
            [name]: {
                isValid: !!value,
                value: value,
            }
        })
    };

    const handleUangMuka = (value, name) => {
        const hargaAkhir = parseInt((dataInputSalesCalc?.hargaAkhir?.value ? dataInputSalesCalc?.hargaAkhir?.value : dataInputSalesCalc?.hargaAkhir) * 5 / 100)
        if(hargaAkhir > value){
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
    }

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

    const handleSalesCalc = () => {
        if (!dataInputSalesCalc.lamaPinjaman?.value) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            lamaPinjaman: {
              ...dataInputSalesCalc.lamaPinjaman,
              isValid: !!dataInputSalesCalc.lamaPinjaman?.value,
            },
          });
        } else if (!dataInputSalesCalc.uangMuka?.value) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            uangMuka: {
              ...dataInputSalesCalc.uangMuka,
              isValid: !!dataInputSalesCalc.uangMuka?.value,
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
        } else if (!dataInputSalesCalc.gimmick?.value?.biayaAdminNominal) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            gimmick: {
              ...dataInputSalesCalc.gimmick,
              isValid: !!dataInputSalesCalc.gimmick?.value?.biayaAdminNominal,
            },
          });
        } else if (!dataInputSalesCalc?.uangMuka?.isValid) {
          setDataInputSalesCalc({ ...dataInputSalesCalc, uangMuka: { ...dataInputSalesCalc.uangMuka } });
        } else {
          dispatch(kprHitunganSales(dataInputSalesCalc, setSalesCalcSimulasi, { isCalcSimulasiSales: !JSON.parse(window.localStorage.getItem("simulasiSalesCalc"))?.productDetail }, setLoading, setShowSalesCalc));
          window.localStorage.setItem(
            "simulasiSalesCalc",
            JSON.stringify({ ...dataInputSalesCalc, productDetail: true })
          );
          setSalesCalcSimulasi({
            isCalcSimulasiSales: !dataInputSalesCalc?.productDetail,
            ...dataInputSalesCalc,
          });
    
          window.scrollTo(0, 0);
        }
    };

    const inputArrKpr = [
        dataInputSalesCalc?.lamaPinjaman?.isValid,
        dataInputSalesCalc?.uangMuka?.isValid
    ];

    return (
        <div
            className={`kprSim__pages__left_wrapper ${hidden ? "hidden" : "block"}`}
        >
            <div className="kprSim__pages__left__calc_wrapper">
                <div className="kprSim__pages__left__calc_wrapper__wrapperTittle">
                    <p 
                        className={`kprSim__pages__left__calc__title ${isShowSalesCalc ? "mb-6" : ""
                        }`}
                    >
                        Kalkulator KPR
                    </p>
                    <img
                        onClick={handleShowSalesCalc}
                        className="kprSim__pages__left__calc__btn"
                        src="/icons/small-icons/arrow-down.svg"
                        alt="arrow-down"
                    />        
                </div>
                {isShowSalesCalc && (
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
                                value={dataInputSalesCalc?.hargaAkhir?.value ? dataInputSalesCalc?.hargaAkhir?.value : dataInputSalesCalc?.hargaAkhir}
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
                                value={dataInputSalesCalc?.lamaPinjaman?.value}
                                onChange={(e) => handleLamaPinjaman(e)}
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
                                value={dataInputSalesCalc?.uangMuka?.value}
                                placeholder="0"
                                decimalsLimit={2}
                                groupSeparator="."
                                decimalSeparator=","
                                maxLength={16}
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
                            {!dataInputSalesCalc.gimmick.isValid && (
                                <span className="text-[#F04438]">Program Suku Bunga Wajib diisi</span>
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
                        <div className="mb-4">
                            <TextboxLabel
                                name="masaKreditFix"
                                topLabel="Masa Kredit Fix"
                                placeholder=""
                                rightLabel="Tahun"
                                rightLabelBorder={true}
                                maxLength={3}
                                value={dataInputSalesCalc?.gimmick?.value?.tenorFixedRate / 12}
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
                            onClick={handleSalesCalc}
                            disabled={inputArrKpr?.filter?.(Boolean)?.length !== 2}
                        >
                            Hitung Simulasi
                        </Button>                
                    </div>
                )}
            </div>

        </div>
    )
}

export default LeftKprSimSales;