import React from "react";
import cookie from "hs-cookie";
import { formatRupiahNumber } from "../../../../../helpers/string";
import { useDispatch, useSelector } from "react-redux";
import { BorderLine, Button, DetailsOverview, Spinner } from "../../../../atoms";
import Panel from "../../../../atoms/Tabs/panel";
import Tabs from "../../../../atoms/Tabs/tabs";
import { TableInstallment } from "../../../../molecules";
import { useNavigate } from "react-router-dom";
import { showModalLogin } from "../../../../../store/actions/changeState";

const RightKprSim = ({
  isCalc,
  calcSimulasi,
  btnOnClick,
  loading,
  downloadDetailKPR,
  showCalc,
}) => {
  let biayaAdmin;
  let biayaProvisi;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stateReducer);
  const gimmickVal = calcSimulasi?.gimmick?.value;
  biayaAdmin =
    gimmickVal?.biayaAdminNominal >
    (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage) / 100
      ? gimmickVal?.biayaAdminNominal || 0
      : (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage) / 100;
  biayaProvisi =
    gimmickVal?.biayaProvisiNominal >
    (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage) / 100
      ? gimmickVal?.biayaProvisiNominal || 0
      : (calcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage) / 100;
  const navigate = useNavigate();
  return (
    <div
      className={`${
        isCalc ? "kprSim__pages__right__wrapperFull" : "kprSim__pages__right__wrapper"
      }`}
    >
      <div className="kprSim__pages__right__detailLoans__wrapper">
        {loading ? (
          <div className="kprSim__pages__right__detailLoans__loadingWrap">
            <Spinner />
          </div> ): 
          (showCalc && <div>
            <Tabs isCalc={isCalc}>
              <Panel title="Rincian Pinjaman">
                <div className="kprSim__pages__right__detailLoans__content__wrapper">
                  <DetailsOverview
                    title="Informasi Detail"
                    details={[
                      {
                        field: "Harga Properti",
                        value: `${calcSimulasi?.hargaAkhir?.value ? (formatRupiahNumber(calcSimulasi?.hargaAkhir?.value) || 0) : (formatRupiahNumber(calcSimulasi?.hargaAkhir) || 0)}`,
                      },
                      {
                        field: "Lama Pinjaman",
                        value: `${calcSimulasi?.rincianPinjaman?.rincian?.lamaPinjaman || 0}`,
                      },
                      {
                        field: "Uang Muka",
                        value: `${formatRupiahNumber(calcSimulasi?.rincianPinjaman?.rincian?.uangMuka || 0)}`,
                      },
                      {
                        field: "Suku Bunga",
                        value: `${calcSimulasi?.rincianPinjaman?.rincian?.sukuBunga || 0}`,
                      },
                      // {
                      //   field: "Floating Rate",
                      //   value: `${calcSimulasi?.rincianPinjaman?.rincian?.sukuBungaFloating || 0}`,
                      // },
                      {
                        field: "Masa Kredit Fix",
                        value: `${calcSimulasi.rincianPinjaman?.rincian?.kreditFix || 0}`,
                      },
                      {
                        field: "Angsuran Fixed",
                        value: `${formatRupiahNumber(calcSimulasi.rincianPinjaman?.rincian?.angsuranFixed || 0)}`,
                      },
                      {
                        field: "Angsuran Floating",
                        value: `${formatRupiahNumber(calcSimulasi.rincianPinjaman?.rincian?.angsuranFloat || 0)}`,
                      },
                      {
                        field: "Jumlah Pinjaman",
                        value: `${formatRupiahNumber(calcSimulasi?.rincianPinjaman?.rincian?.plafond || 0)}`,
                      },
                    ]}
                  />
                  <DetailsOverview
                    title="Biaya Bank"
                    details={[
                      {
                        field: "Biaya Administrasi",
                        // Comment untuk backup code
                        // value: `${formatRupiahNumber(gimmickVal?.biayaAdminNominal || 0)}`,
                        value: `${formatRupiahNumber(biayaAdmin)}`,
                      },
                      {
                        field: "Biaya Provisi",
                        // Comment untuk backup code
                        // value: `${formatRupiahNumber(gimmickVal?.biayaProvisiNominal || 0)}`,
                        value: `${formatRupiahNumber(biayaProvisi)}`,
                      },
                      {
                        field: [
                          <b className="kprSim__pages__right__detailLoans--txt-orange">
                            Total Biaya Bank
                          </b>,
                        ],
                        value: [
                          <b className="kprSim__pages__right__detailLoans--txt-orange">
                            {formatRupiahNumber(
                              Number(biayaAdmin || 0) + Number(biayaProvisi || 0)
                            )}
                          </b>,
                        ],
                      },
                    ]}
                  />
                  {/* <DetailsOverview
                  title="Biaya Notaris"
                  details={[
                    { field: "Akte Jual Beli", value: "Rp9.390.324" },
                    { field: "Bea Balik Nama", value: "Rp9.390.324" },
                    { field: "Akta SKMHT", value: "Rp4.695.162" },
                    { field: "Akta APHT", value: "Rp9.390.324" },
                    { field: "Perjanjian HT", value: "Rp9.390.324" },
                    {
                      field: "Cek Sertifikat ZNT, PNBP HT",
                      value: "Rp4.695.162",
                    },
                    {
                      field: [
                        <b className="kprSim__pages__right__detailLoans--txt-orange">
                          Total Biaya Notaris
                        </b>,
                      ],
                      value: [
                        <b className="kprSim__pages__right__detailLoans--txt-orange">
                          Rp46.951.620
                        </b>,
                      ],
                    },
                  ]}
                /> */}
                    <BorderLine />
                    <div className="kprSim__pages__right__detailLoans__installment__baseWrapper">
                      <div className="kprSim__pages__right__detailLoans__installment__contentWrapper">
                        <p className="w-[50%]">Angsuran Per Bulan</p>
                        <p className="w-[50%]">
                          {formatRupiahNumber(calcSimulasi?.rincianPinjaman?.angsuranPerbulan)}
                        </p>
                      </div>
                      <div className="kprSim__pages__right__detailLoans__installment__contentWrapper">
                        <p className="w-[50%]">Pembayaran Pertama</p>
                        <p className="w-[50%]">
                          {formatRupiahNumber(parseInt(calcSimulasi?.rincianPinjaman?.pembayaranPertama))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Panel>
                <Panel title="Detail Angsuran">
                  <TableInstallment tableData={calcSimulasi?.detailAngsuran} />
                </Panel>
              </Tabs>
            </div>
          )
              }
        {loading ? (
          <></>
        ) : (
          showCalc && (
            <div className="kprSim__pages__right__buttonWrapper">
              <Button
                buttonColor="blueLight"
                textColor="blue"
                fullWidth={true}
                paddingSize={"padding-1"}
                onClick={downloadDetailKPR}
              >
                Download Detail
              </Button>
              {!isCalc && (
                <Button
                  onClick={() => {
                    cookie.get("morgateCookie")
                      ? navigate("/kpr/approval")
                      : dispatch(showModalLogin(!state.showModalLogin));
                  }}
                  buttonColor="blue"
                  textColor="white"
                  fullWidth={true}
                  paddingSize={"padding-1"}
                >
                  Selanjutnya
                </Button>
              )}
            </div>
          )
        )}
        {loading ? (
          <></>
        ) : (
          showCalc && (
            <p className="kprSim__pages__right__notes">
              Catatan: Perhitungan ini hanyalah estimasi, untuk hasil yang lebih akurat dan lengkap, silakan kunjungi kantor BRI terdekat.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default RightKprSim;
