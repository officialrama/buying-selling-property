import React  from "react";
import cookie from "hs-cookie";
import Modal from "../../../Modal/modal";
import { formatRupiahNumber } from "../../../../../helpers/string";
import { useDispatch, useSelector } from "react-redux";
import { BorderLine, Button, DetailsOverview, Spinner } from "../../../../atoms";
import Panel from "../../../../atoms/Tabs/panel";
import Tabs from "../../../../atoms/Tabs/tabs";
import { showUserPaymentModal } from "../../../../../store/actions/changeModalState";
import { TableInstallment } from "../../../../molecules";
import { useNavigate } from "react-router-dom";
import { closeModalFail, closeModalSuccess } from "../../../../../store/actions/fetchData/superAdminState";

const RightKprSimSales = ({ isSalesCalc, salesCalcSimulasi, allData, loading, downloadDetailKPR, showSalesCalc }) => {
    let biayaAdmin;
    let biayaProvisi;
    const stateModal = useSelector((state) => state.modalReducer);
    const saState = useSelector((state) => state.superAdminReducer);
    const dispatch = useDispatch();
    const gimmickVal = salesCalcSimulasi?.gimmick?.value;
    biayaAdmin = gimmickVal?.biayaAdminNominal > (salesCalcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage / 100) ? (gimmickVal?.biayaAdminNominal || 0) : (salesCalcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaAdminPercentage / 100 );
    biayaProvisi = gimmickVal?.biayaProvisiNominal > (salesCalcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage / 100) ? (gimmickVal?.biayaProvisiNominal || 0) : (salesCalcSimulasi?.jumlahPinjaman?.value * gimmickVal?.biayaProvisiPercentage / 100);
    const navigate = useNavigate();
    return (
      
        <div
        className={`${isSalesCalc
          ? "kprSim__pages__right__wrapperFull"
          : "kprSim__pages__right__wrapper"
          }`}
      >
        {stateModal.showUserPaymentModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(
              showUserPaymentModal(!stateModal.showUserPaymentModal)
            );
          }}
          modalTypes="PaymentUser"
          title="Ajukan Pembelian"
        />
      ) : (
        <div></div>
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
      {saState.success === true && (
        <Modal
          closeModal={() => dispatch(closeModalSuccess())}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleSuccess}
          descBody={saState.msgSuccess}
        />
      )}
        <div className="kprSim__pages__right__detailLoans__wrapper">
  
          {loading ?
            <div className="kprSim__pages__right__detailLoans__loadingWrap">
              <Spinner />
            </div> :
            (showSalesCalc && <div>
              <Tabs isSalesCalc={isSalesCalc}>
                <Panel title="Rincian Pinjaman">
                  <div className="kprSim__pages__right__detailLoans__content__wrapper">
                    <DetailsOverview
                      title="Informasi Detail"
                      details={[
                        {
                          field: "Harga Properti",
                          value: `${salesCalcSimulasi?.hargaAkhir?.value ? (formatRupiahNumber(salesCalcSimulasi?.hargaAkhir?.value) || 0) : (formatRupiahNumber(salesCalcSimulasi?.hargaAkhir) || 0)}`,
                        },
                        {
                          field: "Lama Pinjaman",
                          value: `${salesCalcSimulasi?.rincianPinjaman?.rincian?.lamaPinjaman || 0}`,
                        },
                        {
                          field: "Uang Muka",
                          value: `${formatRupiahNumber(salesCalcSimulasi?.rincianPinjaman?.rincian?.uangMuka || 0)}`,
                        },
                        {
                          field: "Suku Bunga",
                          value: `${salesCalcSimulasi?.rincianPinjaman?.rincian?.sukuBunga || 0}`,
                        },
                        // {
                        //   field: "Floating Rate",
                        //   value: `${calcSimulasi?.rincianPinjaman?.rincian?.sukuBungaFloating || 0}`,
                        // },
                        {
                          field: "Masa Kredit Fix",
                          value: `${salesCalcSimulasi?.rincianPinjaman?.rincian?.kreditFix || 0}`,
                        },
                        {
                          field: "Angsuran Fixed",
                          value: `${formatRupiahNumber(salesCalcSimulasi?.rincianPinjaman?.rincian?.angsuranFixed || 0)}`,
                        },
                        {
                          field: "Angsuran Floating",
                          value: `${formatRupiahNumber(salesCalcSimulasi?.rincianPinjaman?.rincian?.angsuranFloat || 0)}`,
                        },
                        {
                          field: "Jumlah Pinjaman",
                          value: `${formatRupiahNumber(salesCalcSimulasi?.rincianPinjaman?.rincian?.plafond || 0)}`,
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
                        <p className="w-[50%]">{formatRupiahNumber(salesCalcSimulasi?.rincianPinjaman?.angsuranPerbulan)}</p>
                      </div>
                      <div className="kprSim__pages__right__detailLoans__installment__contentWrapper">
                        <p className="w-[50%]">Pembayaran Pertama</p>
                        <p className="w-[50%]">{formatRupiahNumber(parseInt(salesCalcSimulasi?.rincianPinjaman?.pembayaranPertama))}</p>
                      </div>
                    </div>
                  </div>
                </Panel>
                <Panel title="Detail Angsuran">
                  <TableInstallment tableData={salesCalcSimulasi?.detailAngsuran} />
                </Panel>
              </Tabs>
            </div>)
          }
          {loading ? <></> :
            (showSalesCalc && <div className="kprSim__pages__right__buttonWrapper">
              <Button
                buttonColor="blueLight"
                textColor="blue"
                fullWidth={true}
                paddingSize={"padding-1"}
                onClick={downloadDetailKPR}
              >
                Download Detail
              </Button>
              {!isSalesCalc && (
                <Button
                onClick={() => { 
                  cookie.get("morgateCookie") ? navigate("/kpr-sales/approval-sales") : dispatch(showUserPaymentModal(!stateModal.showUserPaymentModal)); 
                  // cookie.get("morgateCookie") && window.localStorage.setItem("detailProperti", JSON.stringify({ ...allData })) 
                }}
                  buttonColor="blue"
                  textColor="white"
                  fullWidth={true}
                  paddingSize={"padding-1"}
                >
                  Selanjutnya
                </Button>
              )}
            </div>)
          }
          {loading ? <></> :
            (showSalesCalc && <p className="kprSim__pages__right__notes">
              Catatan: Perhitungan ini adalah hasil perkiraaan aplikasi KPR secara
              umum. Data perhitungan di atas dapat berbeda dengan perhitungan bank.
              Untuk perhitungan yang akurat, silahkan hubungi kantor cabang kami.
            </p>)
          }
        </div>
      </div>
    );
};

export default RightKprSimSales;