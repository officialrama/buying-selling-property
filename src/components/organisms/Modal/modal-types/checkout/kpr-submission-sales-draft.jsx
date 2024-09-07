
import React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import { encryptStr, encryptStrFe } from "../../../../../helpers/encryptDecrypt";
import { invalidNumRegex } from "../../../../../helpers/regex";
import { toTitleCase } from "../../../../../helpers/string";
import {
  setKprBri, 
  setKprBrisyariah 
} from "../../../../../store/actions/changeRadioState";
import { detailDraftRef } from "../../../../../store/actions/fetchData/salesReferral";
import { unitDetail } from "../../../../../store/actions/fetchData/v2/detailProjectV2";
import { CurrencyInput, LabelInputTextbox } from "../../../../atoms";
import {
    Dropdown,
    Textbox, TextboxLabel
  } from "../../../../molecules";
import { TextColor } from "../../../../theme/text/text";

const KprSubmissionSalesDraft = ({ data, otherProps, dataInputSalesCalc, setDataInputSalesCalc }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const alamat = JSON.parse(data?.project?.alamatProperti?.alamat);
    const [unitDtlData, setUnitDtlData] = useState(null);
    const [loadingDtlUnit, setLoadingDtlUnit] = useState(false);
    useEffect(() => {
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
    useEffect(()=>{
      if(unitDtlData !== null){
        window.localStorage.setItem("detailProperti", JSON.stringify({ ...unitDtlData }));
      }
    },[unitDtlData])
    
    useEffect(()=> {
        setDataInputSalesCalc({
            ...otherProps.dataInputSalesCalc,
            lokasi: alamat?.kabupaten + ", " + alamat?.provinsi,
            hargaAkhir: unitDtlData?.detailProperti?.hargaAkhir,
            lt: unitDtlData?.detailProperti?.lt,
            lb: unitDtlData?.detailProperti?.lb,
            jenisProperti: unitDtlData?.alamatProperti?.jenisProperti,
            jumlahPinjaman: {
              ...dataInputSalesCalc?.jumlahPinjaman,
              value: unitDtlData?.detailProperti?.hargaAkhir
            },
            uangMuka: {
              ...dataInputSalesCalc?.uangMuka,
              value: unitDtlData?.detailProperti?.hargaAkhir * 5 / 100,
              isValid: true
            },
        });
        if(location.pathname.includes("/kpr-sales/approval-sales")){
            setOptionsGimmick(
                JSON.parse(window.localStorage.getItem("simulasiSalesCalc"))?.gimmick
            )
        }
    }, [unitDtlData]);

    useEffect(() => {
      dispatch(
        unitDetail({
          unitId: encryptStrFe(otherProps.propertiId),
          setData: setUnitDtlData,
          setLoading: setLoadingDtlUnit

        })
      )
    }, []);

    useEffect(() => {
      dispatch(
        detailDraftRef({
          id: otherProps.salesReferralId
        })
      )
    }, []);

    useEffect(() => {
        if (Number(dataInputSalesCalc?.uangMuka?.value) <= Number(dataInputSalesCalc?.hargaAkhir * 5 / 100)){
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            jumlahPinjaman: {
              ...dataInputSalesCalc?.jumlahPinjaman,
              isValid: !!(Number(dataInputSalesCalc?.hargaAkhir) - Number(dataInputSalesCalc?.hargaAkhir * 5 / 100)),
              value: Number(dataInputSalesCalc?.hargaAkhir) - Number(dataInputSalesCalc?.hargaAkhir * 5 / 100)
            }
          })
        } else if (Number(dataInputSalesCalc?.uangMuka?.value) < Number(dataInputSalesCalc?.hargaAkhir)) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            jumlahPinjaman: {
              ...dataInputSalesCalc?.jumlahPinjaman,
              isValid: !!(Number(dataInputSalesCalc?.hargaAkhir) - Number(dataInputSalesCalc?.uangMuka?.value)),
              value: Number(dataInputSalesCalc?.hargaAkhir) - Number(dataInputSalesCalc?.uangMuka?.value)
            }
          })
        } else if (Number(dataInputSalesCalc?.uangMuka?.value) > Number(dataInputSalesCalc?.hargaAkhir)) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            uangMuka: {
              ...dataInputSalesCalc.uangMuka,
              isValid: !!Number(dataInputSalesCalc?.hargaAkhir),
              value: Number(dataInputSalesCalc?.hargaAkhir),
              msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
            },
            jumlahPinjaman: {
              ...dataInputSalesCalc?.jumlahPinjaman,
              value: 0
            }
          })
        }
      }, [dataInputSalesCalc?.uangMuka?.value])
      const handleChangeAlt = (value, name) => {
        const hargaAkhir = parseInt(unitDtlData?.detailProperti?.hargaAkhir * 5 / 100);
        if (name === "uangMuka" && hargaAkhir > value) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, [name]: { isValid: !!value, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
          });
        } else if (name === "uangMuka" && value === 0 || name === "uangMuka" && isNaN(value)) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc,
            jumlahPinjaman: {
              ...dataInputSalesCalc.jumlahPinjaman,
              isValid: !!Number(dataInputSalesCalc?.hargaAkhir),
              value: Number(dataInputSalesCalc?.hargaAkhir)
            },
            [name]: {
              isValid: false,
              value: value,
              msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti"
            }
          })
        } else {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, [name]: { isValid: !!value, value: value, msgError: "" },
          });
        }
      };
    
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
    
      const handleUangMuka = (value, name) => {
        const hargaAkhir = parseInt(dataInputSalesCalc?.hargaAkhir * 5 / 100)
        if (hargaAkhir > value) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
          });
        } else if (value === dataInputSalesCalc?.hargaAkhir) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan Harga Properti" },
          });
        } else if (isNaN(Number(value))) {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, 
            jumlahPinjaman: {
              isValid: !!(Number(dataInputSalesCalc?.hargaAkhir)),
              value: Number(dataInputSalesCalc?.hargaAkhir)
            },
            [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh kosong" },
          });      
        } else {
          setDataInputSalesCalc({
            ...dataInputSalesCalc, [name]: { isValid: true, value: value, msgError: "" },
          });
        }
      };
    
      return (
        <div className="kpr-submission__wrapper__baseModal">
          <div className="kpr-submission__wrapper__flexCol">
            <Textbox
              label="Lokasi"
              typeInput="text"
              value={dataInputSalesCalc?.lokasi}
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
                value={dataInputSalesCalc?.hargaAkhir}
                disabled={true}
              />
            </div>
            <div className="kpr-submission__wrapper__formWrapper">
              <TextboxLabel
                topLabel="Luas Tanah"
                rightLabel="m²"
                placeholder="100"
                maxLength={2}
                value={dataInputSalesCalc?.lt}
                disabled
              />
              <TextboxLabel
                topLabel="Luas Bangunan"
                rightLabel="m²"
                placeholder="72"
                value={dataInputSalesCalc?.lb}
                disabled
              />
            </div>
            <TextboxLabel
              topLabel="Jenis Properti"
              placeholder="Non-Subsidi"
              value={
                dataInputSalesCalc?.jenisProperti &&
                toTitleCase(dataInputSalesCalc?.jenisProperti)
              }
              disabled
            />
            <TextboxLabel
              name="lamaPinjaman"
              topLabel="Lama Pinjaman"
              placeholder=""
              rightLabel="Tahun"
              rightLabelBorder={true}
              value={dataInputSalesCalc?.lamaPinjaman?.value}
              onChange={(e) => handleLamaPinjaman(e)}
              maxLength={2}
              disabled={location.pathname.includes("/kpr-sales/approval-sales") ? true : false}
              warnText={dataInputSalesCalc?.lamaPinjaman?.msgError}
            />
            <div className="kpr-submission__dp-wrap">
              <LabelInputTextbox text="Uang Muka" />
              <CurrencyInput
                className="textbox-label__currency"
                name="uangMuka"
                value={dataInputSalesCalc?.uangMuka?.value || dataInputSalesCalc?.hargaAkhir * 5 / 100}
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                textButtonColor={TextColor.black}
                onValueChange={(value) => handleUangMuka(value, "uangMuka")}
                disabled={
                  location.pathname.includes("/kpr-sales/approval-sales") ? true : false
                }
                warnText={dataInputSalesCalc?.uangMuka?.msgError}
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
                value={dataInputSalesCalc?.jumlahPinjaman?.value}
                disabled={true}
              />
            </div>
            <Dropdown
              topLabel="Program Suku Bunga"
              value={dataInputSalesCalc?.gimmick?.value || optionsGimmick}
              data={otherProps?.gimmickOptions}
              onChange={(value) => handleChangeAlt(value, "gimmick")}
              showOptions={
                !location.pathname.includes("/kpr-sales/approval-sales") ? true : false
              }
            />
            <TextboxLabel
              topLabel="Suku Bunga"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              disabled={true}
              value={dataInputSalesCalc?.gimmick?.value?.fixedRate}
            />
            {/* <TextboxLabel
              topLabel="Floating Rate"
              placeholder=""
              rightLabel="%"
              rightLabelBorder={true}
              disabled={true}
              value={dataInputSalesCalc?.gimmick?.value?.floatingRate}
            /> */}
            <TextboxLabel
              topLabel="Masa Kredit Fix"
              placeholder=""
              rightLabel="Tahun"
              rightLabelBorder={true}
              disabled={true}
              value={dataInputSalesCalc?.gimmick?.value?.tenorFixedRate / 12}
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

export default KprSubmissionSalesDraft;