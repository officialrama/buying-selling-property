import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Title } from "../../atoms";
import {
  CashSubmission,
  Confirmation,
  DeleteConfirm,
  DeleteAccountConfirm,
  FormLogin,
  FormSignup,
  PaymentMethod,
  SelectQuestion,
  SelectJualProperty,
  SuccessFailed,
  SuccessReg,
  SuccessSell,
  SelectAddProperty,
  SelectCompareProp,
  RatingReview,
  DeleteFasilitas,
  SuccessPengajuan,
  SuccessRegisterV2,
  SuccessInputRegister,
} from "../index";
import KprSubmission from "./modal-types/checkout/kpr-submission";
import PaymentUser from "./modal-types/checkout/payment-user";
import FilterSearch from "./modal-types/filter/filter-search";
import FilterUserRefferal from "./modal-types/filter/filter-user-refferal";
import FilterSalesRefferal from "./modal-types/filter/filter-sales-refferal";
import FilterWishlist from "./modal-types/filter/filter-wishlist";
import FilterPengajuanKPR from "./modal-types/filter/filter-pengajuan-kpr";
import ShareLink from "./modal-types/ShareLink/Component";
import RingkasanBuyer from "./modal-types/LinkRinkasanBuyer/Component";
import FooterCashSubmission from "./modal-types/footer/cash-submission";
import FooterKprSubmission from "./modal-types/footer/kpr-submission";
import FooterPaymentMethod from "./modal-types/footer/payment-method";
import FooterSendChat from "./modal-types/footer/SendChat";
import KprSubmissionSales from "./modal-types/checkout/kpr-submission-sales";
import KprSubmissionSalesDraft from "./modal-types/checkout/kpr-submission-sales-draft";
import FooterKprSubmissionSales from "./modal-types/footer/kpr-submission-sales";
import FooterKprSubmissionSalesDraft from "./modal-types/footer/kpr-submission-sales-draft";
import LandingPagePopup from "./modal-types/LandingPagePopup/Component";
import FilterSalesDev from "./modal-types/filter/filter-sales-dev";
import FilterSalesFinal from "./modal-types/filter/filter-sales-final";
import FilterSalesProject from "./modal-types/filter/filter-sales-project";
import FilterSubmittedBySales from "./modal-types/filter/filter-submitted-bysales";
import FilterListHlm from "./modal-types/filter/filter-list-hlm";
import DokuPayment from "./modal-types/Payment/Component";
import DokuPaymentVisitor from "./modal-types/PaymentVisitor/Component";
import KprSubmissionV2 from "./modal-types/checkout/kpr-submission-v2";

const Modal = ({
  closeModal,
  modalTypes,
  title,
  titleBody,
  descBody,
  onClickDelete,
  onConfirm,
  btnBottom,
  disableScroll,
  otherProps,
  data,
  projectId,
  from,
  firstPropId,
  email
}) => {
  const [dataInputCalc, setDataInputCalc] = useState(null);
  const inputArrPopup = [
    dataInputCalc?.lamaPinjaman?.isValid,
    dataInputCalc?.uangMuka?.isValid,
    dataInputCalc?.gimmick?.isValid,
  ];
  const [dataInputSalesCalc, setDataInputSalesCalc] = useState(null);
  const inputArrSalesPopup = [
    dataInputSalesCalc?.lamaPinjaman?.isValid,
    dataInputSalesCalc?.uangMuka?.isValid,
    dataInputSalesCalc?.gimmick?.isValid,
  ];
  const handleConvertCalc = () => {
    window.localStorage.setItem(
      "simulasiCalc",
      JSON.stringify({ ...dataInputCalc, productDetail: true })
    );
    window.localStorage.setItem("detailProperti", JSON.stringify({ ...data }));
    window.location.href = "/kpr/simulasi";
  };

  const handleConvertSalesCalc = () => {
    window.localStorage.setItem(
      "simulasiSalesCalc",
      JSON.stringify({ ...dataInputSalesCalc, productDetail: true })
    );
    // window.localStorage.setItem("detailProperti", JSON.stringify({ ...data }));
    window.location.href = "/kpr-sales/simulasi-sales";
  }

  const formSwitch = (formType) => {
    switch (formType) {
      case "signup":
        return <FormSignup />;
      case "login":
        return <FormLogin />;
      case "filterSearch":
        return <FilterSearch otherProps={otherProps} closeModal={closeModal} />;
      case "filterSalesProject":
        return <FilterSalesProject otherProps={otherProps} closeModal={closeModal} />;
        case "filterUserRefferal":
          return <FilterUserRefferal otherProps={otherProps} />;
          case "LandingPagePopup":
            return<LandingPagePopup otherProps={otherProps} closeModal={closeModal} />;
      case "filterSalesRefferal":
        return <FilterSalesRefferal otherProps={otherProps} />;
      case "FilterSubmittedBySales":
        return <FilterSubmittedBySales otherProps={otherProps} />;
      case "filterSalesDev":
        return <FilterSalesDev otherProps={otherProps} />;
      case "filterSalesFinal":
        return <FilterSalesFinal otherProps={otherProps} />;
      case "filterPengajuanKPR":
        return <FilterPengajuanKPR otherProps={otherProps} />;
      case "filterWishlist":
        return <FilterWishlist otherProps={otherProps} />;
      case "filterListHlm":
        return <FilterListHlm otherProps={otherProps} />;
      case "ShareLink":
        return <ShareLink />;
        case "RingkasanBuyer":
          return <RingkasanBuyer  otherProps={otherProps}/>;
          case "DokuPayment":
            return <DokuPayment  otherProps={otherProps} />;
      case "DokuPaymentVisitor":
        return <DokuPaymentVisitor otherProps={otherProps}/>
      case "paymentMethod":
        return <PaymentMethod />;
      case "PaymentUser":
        return <PaymentUser otherProps={otherProps} closeModal={closeModal} />;
      case "cashSubmission":
        return <CashSubmission />;
      case "kprSubmission":
        return (
          <KprSubmission
            data={data}
            otherProps={otherProps}
            dataInputCalc={dataInputCalc}
            setDataInputCalc={setDataInputCalc}
          />
        );
      case "KprSubmissionV2":
          return (
            <KprSubmissionV2
              data={data}
              otherProps={otherProps}
              dataInputCalc={dataInputCalc}
              setDataInputCalc={setDataInputCalc}
            />
            );
      case "kprSubmissionSales":
        return (
          <KprSubmissionSales
            data={data}
            otherProps={otherProps}
            dataInputSalesCalc={dataInputSalesCalc}
            setDataInputSalesCalc={setDataInputSalesCalc}
          />
        );
      case "kprSubmissionSalesDraft":
        return (
          <KprSubmissionSalesDraft
            data={data}
            otherProps={otherProps}
            dataInputSalesCalc={dataInputSalesCalc}
            setDataInputSalesCalc={setDataInputSalesCalc}
          />
        );
        case "ratingReview":
          return (
            <div>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-10">
                <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
                  <div
                    className={classNames(
                      "max-w-2xl min-w-[32vw]",
                      "max-h-[90vh]",
                      "border-0",
                      "rounded-lg",
                      "shadow-lg",
                      "relative",
                      "flex",
                      "flex-col",
                      "w-[432px]",
                      "mobile:w-[360px]",
                      "h-[352px]",
                      "bg-white",
                      "outline-none",
                      "focus:outline-none"
                    )}
                  >
                <div className="py-3 flex justify-between items-center">
              <div className="flex-grow text-center ml-7">
              <Title className="font-bold text-3xl text-[#292929]" text="Nilai Layanan Kami" />
              </div>
                <button
                  className="bg-transparent border-0 text-black place-self-end mr-4"
                  onClick={closeModal}
                >
              <img src="/icons/Close_Circle.svg" alt="Close Button" />
              </button>
                  </div>
                      <div className="flex flex-row"><RatingReview/>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          );
      case "successSell":
        return <SuccessSell />;
      case "selectQuestion":
        return <SelectQuestion />;
      case "successReg":
        return <SuccessReg />;
      case "modalSF":
        return (
          <SuccessFailed
            title={titleBody}
            desc={descBody}
            btnBottom={btnBottom}
          />
        );
        case "successPengajuan":
          return (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
          <div
            className={classNames(
              "max-w-2xl min-w-[32vw]",
              "max-h-[90vh]",
              "border-0",
              "rounded-lg",
              "shadow-lg",
              "relative",
              "flex",
              "flex-col",
              "w-full",
              "bg-white",
              "outline-none",
              "focus:outline-none"
            )}
          >
            <div
              className={`p-6 pt-2 pb-0 flex justify-center items-center max-h-[75vh] ${disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
                }`}
            >
              <div className="w-[432px]">            
              <SuccessPengajuan
              title={titleBody}
              desc={descBody}
              btnBottom={btnBottom}
            /></div>
            </div>
          </div>
        </div>
      </div>
          );
          case "successRegisterV2":
            return (
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
          <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
            <div
              className={classNames(
                "max-w-2xl min-w-[32vw]",
                "max-h-[90vh]",
                "border-0",
                "rounded-lg",
                "shadow-lg",
                "relative",
                "flex",
                "flex-col",
                "w-full",
                "bg-white",
                "outline-none",
                "focus:outline-none"
              )}
            >
              <div
                className={`p-6 pt-2 pb-0 flex justify-center items-center max-h-[75vh] ${disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
                  }`}
              >
                <div className="w-[432px]">            
                <SuccessRegisterV2
                title={titleBody}
                desc={descBody}
                btnBottom={btnBottom}
              /></div>
              </div>
            </div>
          </div>
        </div>
            );
            case "successInputRegister":
              return (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
            <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
              <div
                className={classNames(
                  "max-w-2xl min-w-[32vw]",
                  "max-h-[90vh]",
                  "border-0",
                  "rounded-lg",
                  "shadow-lg",
                  "relative",
                  "flex",
                  "flex-col",
                  "w-full",
                  "bg-white",
                  "outline-none",
                  "focus:outline-none"
                )}
              >
                <div
                  className={`p-6 pt-2 pb-0 flex justify-center items-center max-h-[75vh] ${disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
                    }`}
                >
                  <div className="w-[432px]">            
                  <SuccessInputRegister
                  title={titleBody}
                  desc={descBody}
                  btnBottom={btnBottom}
                /></div>
                </div>
              </div>
            </div>
          </div>
              );
  
      case "deleteConfirm":
        return (
          <DeleteConfirm cancel={closeModal} onClickDelete={onClickDelete} />
        );
        case "deleteAccountConfirm":
          return (
            <DeleteAccountConfirm cancel={closeModal} onClickDelete={onClickDelete} />
          );
        case "deleteFasilitas":
            return (
              <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
          <div
            className={classNames(
              "max-w-2xl min-w-[32vw]",
              "max-h-[90vh]",
              "border-0",
              "rounded-lg",
              "shadow-lg",
              "relative",
              "flex",
              "flex-col",
              "w-full",
              "bg-white",
              "outline-none",
              "focus:outline-none"
            )}
          >
            <div
              className={classNames(
                "flex items-end justify-end px-5 py-3 rounded-t",
              )}
            >
              <div className="flex justify-end items-end">
              <button
                className="bg-transparent text-black float-right place-self-center"
                onClick={closeModal}
              >
                X
              </button>
              </div>
            </div>
            <div
              className={`p-6 pt-2 pb-0 flex-auto max-h-[75vh] ${disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
                }`}
            >
              <div className="w-full"><DeleteFasilitas cancel={closeModal} onClickDelete={onClickDelete} /></div>
            </div>
            <div className={btnBottom === undefined && "p-6 pt-2"}>
              {footerModal(modalTypes)}
            </div>
          </div>
        </div>
      </div>
    </div>
            );
      case "confirm":
        return (
          <Confirmation
            closeModal={closeModal}
            descBody={descBody}
            onConfirm={onConfirm}
          />
        );
      case "selectJualProperty":
        return (
          <SelectJualProperty />
        );
      case "selectAddProperty":
        return (
          <SelectAddProperty projectId={projectId} from={from} />
        );
      case "selectCompareProp":
        return (
          <SelectCompareProp firstPropId={firstPropId} email={email} closeModal={closeModal} />
        );
      default:
        return <></>;
    }
  };

  const footerModal = (formType) => {
    switch (formType) {
      case "paymentMethod":
        return <FooterPaymentMethod />;
      case "cashSubmission":
        return <FooterCashSubmission />;
      case "kprSubmission":
        return <FooterKprSubmission handleConvertCalc={handleConvertCalc} inputArrPopup={inputArrPopup} />;
      case "kprSubmissionSales":
        return <FooterKprSubmissionSales handleConvertSalesCalc={handleConvertSalesCalc} inputArrSalesPopup={inputArrSalesPopup} />;
      case "kprSubmissionSalesDraft":
        return <FooterKprSubmissionSalesDraft handleConvertSalesCalc={handleConvertSalesCalc} inputArrSalesPopup={inputArrSalesPopup} />;
      case "selectQuestion":
        return <FooterSendChat />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto mobile:w-11/12 m-6 mx-auto max-w-3xl">
          <div
            className={classNames(
              "max-w-2xl min-w-[32vw]",
              "max-h-[90vh]",
              "border-0",
              "rounded-lg",
              "shadow-lg",
              "relative",
              "flex",
              "flex-col",
              "w-full",
              "bg-white",
              "outline-none",
              "focus:outline-none"
            )}
          >
            <div
              className={classNames(
                "flex items-start justify-between px-5 py-3 rounded-t",
                { "border-b border-solid border-gray-300": title !== "" }
              )}
            >
              <div className="place-self-center">
                <Title
                  className="fontsize__most_smallest fontweight__bold fontcolor__blue"
                  text={title}
                />
              </div>
              <button
                className="bg-transparent border-0 text-black float-right place-self-center"
                onClick={closeModal}
              >
                <img src="/icons/Close_Circle.svg" alt="Close Button" />
              </button>
            </div>
            <div
              className={`p-6 pt-2 pb-0 flex-auto max-h-[75vh] ${disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
                }`}
            >
              <div className="w-full">{formSwitch(modalTypes)}</div>
            </div>
            <div className={btnBottom === undefined && "p-6 pt-2"}>
              {footerModal(modalTypes)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalTypes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  disableScroll: PropTypes.bool,
  otherProps: PropTypes.any,
  data: PropTypes.any,
};

Modal.defaultProps = {
  closeModal: [() => { }],
  modalTypes: "none",
  title: "Modal",
  disableScroll: false,
  otherProps: [],
  data: {},
};

export default Modal;
