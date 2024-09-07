import _ from "lodash-contrib"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { formatRupiahNumber } from "../../../../../helpers/string"
import { CurrencyInput, CurrencyInputCalc } from "../../../../atoms"
import { Dropdown, TextboxLabel } from "../../../../molecules"
import { invalidNumRegex } from "../../../../../helpers/regex"


const KprSubmissionV2 = ({data, otherProps, dataInputCalc, setDataInputCalc }) => {
    const [jangkaWaktu, setJangkaWaktu] = useState(dataInputCalc?.lamaPinjaman?.value || '')
    const [tenorFixedRate, setTenorFixedRate] = useState(dataInputCalc?.gimmick?.value?.tenorFixedRate || 0)

    const inputArrPopup = [
        dataInputCalc?.lamaPinjaman?.isValid,
        dataInputCalc?.uangMuka?.isValid,
        dataInputCalc?.gimmick?.isValid,
      ]

    const [optionsGimmick, setOptionsGimmick] = useState({
        biayaAdmin: 0,
        biayaProvisi: 0,
        fixedRate: 0,
        floatingRate: 0,
        name: "Pilih Program Suku Bunga",
    })

    // useEffect(() => {
    //     setDataInputCalc({
    //         ...dataInputCalc,
    //         uangMuka: { value: (otherProps?.dataInputCalc?.uangMuka?.value) }
    //     })
    // },[])

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
    }

    useEffect(() => {
        if (Number(dataInputCalc?.uangMuka?.value) < Number(otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti)) {
            setDataInputCalc({
                ...dataInputCalc,
                jumlahPinjaman: {
                    ...dataInputCalc?.jumlahPinjaman,
                    value: Number(otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
                }
            });
        } else if (Number(dataInputCalc?.uangMuka?.value) >= Number(otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti)) {
            setDataInputCalc({
            ...dataInputCalc,
            uangMuka: {
                ...dataInputCalc.jumlahPinjaman,
                // value: Number(otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti),
                msgError: "Uang Muka tidak boleh sama atau melebihi harga Properti"
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
                value: otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir * 5 / 100 : otherProps?.Discount?.hargaProperti * 5 / 100,
            }
            })
        } else {
            setDataInputCalc({
                ...dataInputCalc,
                uangMuka: {
                    ...dataInputCalc.uangMuka,
                    isValid: !!Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
                    msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
            },
            jumlahPinjaman: {
                ...dataInputCalc?.jumlahPinjaman,
                value: Number(otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
            }
            })
        }
    }, [dataInputCalc?.uangMuka?.value])

    useEffect(() => {
        setDataInputCalc({
          ...dataInputCalc,
          hargaProperti: {
            ...dataInputCalc?.hargaProperti,
            value: otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti,
          },
          hargaAkhir:{
            ...dataInputCalc?.hargaAkhir,
            value: otherProps?.Discount?.hargaAkhir,
          },
          jumlahPinjaman: {
            ...dataInputCalc?.jumlahPinjaman,
            value: otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti,
          },
          uangMuka: {
            ...dataInputCalc?.uangMuka,
            value: otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir * 5 / 100 : otherProps?.Discount?.hargaProperti * 5 / 100,
            isValid: true,
          },
        })
    },[])

    useEffect(() => {
        setTenorFixedRate(dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 || 0);
    }, [dataInputCalc?.gimmick?.value?.tenorFixedRate / 12])

    const handleUangMuka = (value, name) => {
        if(name === "uangMuka") {
            const hargaAkhir = parseInt(dataInputCalc?.hargaAkhir?.value * 5 / 100)
            const hargaProperti = parseInt(dataInputCalc?.hargaProperti?.value * 5 / 100)
            if (hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
                });
            } else if (hargaAkhir !== null ? value === hargaAkhir : value === dataInputCalc?.hargaProperti?.value) {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan atau melebihi harga properti" },
                });
            } else {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" },
                });
            }
        } else if(name === "jumlahPinjaman") {
            setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" }
            })
        }
    }

    const handleLamaPinjaman = (evt) => {
        if (evt.target.value.length < 1 ) {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: false, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "Jangka waktu wajib diisi" },
          });
        } else if (evt.target.value === "0") {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: false, value: "", msgError: "Jangka waktu tidak boleh bernilai nol" },
          });
        } else if (evt.target.value < dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 ) {
          setDataInputCalc({
              ...dataInputCalc,
              [evt.target.name]: { isValid: false, value: evt.target.value, msgError: "Tidak boleh kurang dari Masa Kredit Fix" },
            });
        } else {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: true, value: evt.target.value.replace(invalidNumRegex, "")},
          });
        }
        setJangkaWaktu(evt.target.value)
      }
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
      }, [jangkaWaktu, tenorFixedRate])

    const handleConvertCalc = () => {
      window.localStorage.setItem(
          "simulasiCalc",
          JSON.stringify({ ...dataInputCalc, productDetail: true })
      );
      window.localStorage.setItem("detailProperti", JSON.stringify({ ...data }));
      window.location.href = "/kpr/simulasi";
    }

    return (
        <div className="flex flex-col gap-6">
            <div id="UnitType" className="flex flex-row gap-6 border border-[#D3D4D4] rounded-xl bg-[#F8F9F9] p-4">
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-black text-[16px]">{data?.detailProperti?.namaProperti}</p>
                    <p className="text-[14px] font-medium text-[#777777]">{
                                    _.isJSON(data?.project?.alamatProperti?.alamat) ?
                                        JSON?.parse(data?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(data?.project?.alamatProperti?.alamat)?.provinsi
                                        : "-"
                                    }</p>
                </div>
                <div className="flex flex-col gap-2 w-[182px] text-right">
                    { otherProps?.Discount?.hargaAkhir < otherProps?.Discount?.hargaProperti ? (
                      <>
                        <p className="text-[#B5B6B6] text-[14px] line-through">{formatRupiahNumber(otherProps?.Discount?.hargaProperti)}</p>
                        <p className="text-[#1078CA] text-[22px] font-bold">{formatRupiahNumber(otherProps?.Discount?.hargaAkhir)}</p>
                      </>
                    ) : (
                      <p className="text-[#1078CA] text-[22px] font-bold">{formatRupiahNumber(otherProps?.Discount?.hargaAkhir)}</p>
                    )}
                </div>
            </div>
            <div id="form" className="flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[12px] font-semibold">Harga Properti<span className="text-[red]">*</span></p>
                        <CurrencyInputCalc
                            className="textbox-label__currency"
                            name="hargaProperti"
                            placeholder="0"
                            decimalsLimit={2}
                            groupSeparator="."
                            decimalSeparator="," 
                            maxLength={14}
                            value={otherProps?.Discount?.hargaAkhir !== null ? otherProps?.Discount?.hargaAkhir : otherProps?.Discount?.hargaProperti}
                            allowDecimals={false}
                            allowNegativeValue={false}
                            disabled={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[12px] font-semibold">Uang Muka<span className="text-[red]">*</span></p>
                        <CurrencyInputCalc
                            className="textbox-label__currency"
                            name="uangMuka"
                            placeholder="0"
                            decimalsLimit={2}
                            groupSeparator="."
                            decimalSeparator="," 
                            maxLength={16}
                            value={dataInputCalc?.uangMuka?.value || dataInputCalc?.hargaProperti * 5 / 100 }
                            onValueChange={(value) => handleUangMuka(value, "uangMuka")}
                            allowNegativeValue={false}
                            warnText={dataInputCalc?.uangMuka?.msgError}
                            />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2 w-2/4">
                        <p className="text-[12px] font-semibold">Jumlah Pinjaman<span className="text-[red]">*</span></p>
                        <CurrencyInputCalc
                            className="textbox-label__currency"
                            name="jumlahPinjaman"
                            placeholder="0"
                            decimalsLimit={2}
                            groupSeparator="."
                            decimalSeparator="," 
                            maxLength={14}
                            value={dataInputCalc?.jumlahPinjaman?.value}
                            onValueChange={(value) => handleUangMuka(value, "jumlahPinjaman")}
                            allowDecimals={false}
                            allowNegativeValue={false}
                            disabled={true}
                            warnText={dataInputCalc?.jumlahPinjaman?.msgError}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-2/4">
                        <p className="text-[12px] font-semibold">Program Suku Bunga<span className="text-[red]">*</span></p>
                        <Dropdown
                            value={dataInputCalc?.gimmick?.value || optionsGimmick}
                            data={otherProps.gimmickOptions}
                            onChange={(value) => handleChangeAlt(value, "gimmick")}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#292929] text-[12px] font-medium">Suku Bunga</p>
                        <TextboxLabel
                            placeholder=""
                            rightLabel="%"
                            rightLabelBorder={true}
                            value={ dataInputCalc?.gimmick?.value?.fixedRate ? dataInputCalc?.gimmick?.value?.fixedRate : "0"}
                            disabled={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[#292929] text-[12px] font-medium">Masa Kredit Fix</p>
                        <TextboxLabel
                            name="masaKreditFix"
                            placeholder=""
                            rightLabel="Tahun"
                            rightLabelBorder={true}
                            value={dataInputCalc?.gimmick?.value?.tenorFixedRate ? dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 : "0"}
                            maxLength={3}
                            disabled={true}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[#292929] text-[12px] font-semibold">Jangka Waktu<span className="text-[red]">*</span></p>
                        <TextboxLabel
                            name="lamaPinjaman"
                            placeholder=""
                            rightLabel="Tahun"
                            rightLabelBorder={true}
                            value={dataInputCalc?.lamaPinjaman?.value}
                            onChange={(value) => handleLamaPinjaman(value)}
                            maxLength={2}
                            warnText={dataInputCalc?.lamaPinjaman?.msgError}
                        />
                    </div>
                </div>  
                <p className="col-span-2 font-medium text-[12px] text-[#777777]">*Perhitungan ini adalah bersifat simulasi / estimasi, untuk perhitungan yang akurat dan lengkap dapat menghubungi kantor BRI terdekat.
                </p>
                <button className={`${inputArrPopup.filter(Boolean).length !== 3 ? 'bg-[#EAEBEB] cursor-not-allowed' : ''} flex justify-center items-center w-full rounded-xl bg-[#1078CA] h-[48px]`}
                    onClick={handleConvertCalc}
                >
                    <p className={`${inputArrPopup.filter(Boolean).length !== 3 ? 'text-[#B5B6B6]' : 'text-white'} font-bold text-[16px]`}>Lanjutkan</p>
                </button>
            </div>
        </div>
    )
}

export default KprSubmissionV2