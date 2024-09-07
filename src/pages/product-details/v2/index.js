/* eslint-disable react-hooks/exhaustive-deps */
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BackBreadcrumbs, Footer, Image4Frame } from "../../../components/molecules";
import { LeftPageProductDetails, Modal, RightPageProductDetails, RightPageProductDetailsAlt } from "../../../components/organisms";
import { fetchPost } from "../../../helpers/fetchApi";
import { currencyConst } from "../../../static/details/currency";
import { periodConst } from "../../../static/details/period";
import { showApprovalKprModal, showBrivaModal, showMethodPaymentModal } from "../../../store/actions/changeModalState";
import { selectedCurrency, selectedPeriod } from "../../../store/actions/changeState";
import { closeModalFail, closeModalSuccess } from "../../../store/actions/fetchData/superAdminState";
import useInputHooks from "./../../../hooks/useInputHooks";
import { inquiryDetailProps } from "./../../../store/actions/fetchData/inquiryDetailProp";
import { setLongLat } from "../../../store/actions/changeState";

const ProductDetailsV2 = ({ purchaseType, email, emailView, userStatus }) => {
  const stateModal = useSelector((stateModal) => stateModal.modalReducer);
  const { inputs, initiateState } = useInputHooks();
  const [data, setData] = useState(null);
  const [dataDev, setDataDev] = useState(null);
  const [gimmickOptions, setGimmickOptions] = useState([]);
  const [showListPropCompare, setShowListPropCompare] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saState = useSelector((state) => state.superAdminReducer);
  const [showLargeImg, setShowLargeImg] = useState(false);
  const [listImgSrc, setListImgSrc] = useState([]);
  const [startIndexImg, setStartIndexImg] = useState(0);

  const [dataInputCalc, setDataInputCalc] = useState({
    gimmick: {
      value: {
        biayaAdminNominal: 0,
        biayaProvisiNominal: 0,
        tenorFixedRate: 0,
        fixedRate: 0,
        floatingRate: 0,
        name: "Pilih Program Suku Bunga",
      },
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!_.isEmpty(cookie.get())) {
    try {
      fetchPost(
        `${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`,
        {
          // email: _.isJSON(cookie.get("morgateCookie")) ? JSON.parse(cookie.get("morgateCookie")).email : "",
          status: "active",
          pageStart: 1,
          sortBy: "createdAt",
          sortDirection: "desc",
          requestType:"visitor",
          nameSearch: ""
        }
      )
        .then((res) => {
          if (res.data.responseCode === "00") {
            setGimmickOptions(res?.data?.responseData);
          }
        })
        .catch((err) => console.log("Error List Program Suku Bunga : " + err));
    } catch (error) {
      console.log(error.error);
    }
    // };
  }, []);

  useEffect(() => {
    dispatch(selectedPeriod(periodConst.period[2]));
    dispatch(selectedCurrency(currencyConst.currency[0]));
  }, []);

  useEffect(() => {
    if (id && cookie.get("morgateCookie")) {
      dispatch(inquiryDetailProps(id, JSON.parse(cookie.get("morgateCookie"))?.email, initiateState, null, null, null, setData, setDataDev));
    } else {
      dispatch(inquiryDetailProps(id, "", initiateState, null, null, null, setData, setDataDev));
    }
  }, []);

  useEffect(() => {
    if (data?.imagesProperti) {
      data?.imagesProperti?.map((data) => {
        return setListImgSrc( listImgSrc => [...listImgSrc, { url: data?.sharedUrl, title: "" }]);
      })
    }
  }, [data?.imagesProperti]);

  const showImg = (imgIndex) => {
    setStartIndexImg(imgIndex);
    setShowLargeImg(true);
  }

  return (
    <div>
      {showLargeImg && <Lightbox showTitle={false} images={listImgSrc} onClose={() => setShowLargeImg(false)} startIndex={startIndexImg} />}
      {showListPropCompare &&
        <Modal
          closeModal={() => setShowListPropCompare(false)}
          modalTypes="selectCompareProp"
          title="Properti Tersimpan"
          firstPropId={id}
          email={email}
        />
      }
      {stateModal.showMethodPaymentModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(
              showMethodPaymentModal(!stateModal.showMethodPaymentModal)
            );
          }}
          modalTypes="paymentMethod"
          title="Ajukan Pembelian"
        />
      ) : (
        <div></div>
      )}
      {stateModal.showBrivaModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(showBrivaModal(!stateModal.showBrivaModal));
          }}
          modalTypes="cashSubmission"
          title="Pengajuan Pembelian Cash"
        />
      ) : (
        <div></div>
      )}
      {stateModal.showApprovalKprModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal));
          }}
          modalTypes="kprSubmission"
          title="Pengajuan Pembelian KPR"
          data={data}
          otherProps={{ gimmickOptions, dataInputCalc, setDataInputCalc }}
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
      <div className="prod-detail__bodyWrapper">
        <div className="prod-detail__pages__wrapper">
          <div className="prod-detail__pages__breadcrumbNav">
            <BackBreadcrumbs onClick={() => navigate(-1) } />
          </div>

          <Image4Frame
            dataImg={data?.imagesProperti}
            onClickImg0={() => showImg(0)}
            onClickImg1={() => showImg(1)}
            onClickImg2={() => showImg(2)}
            onClickImg3={() => showImg(3)}
          />

          <div className="prod-detail__pages__property__detailBuying__bodyWrapper">
            {cookie.get("morgateCookie") &&
              (JSON.parse(cookie.get("morgateCookie"))?.userType !== "developer" && data?.detailProperti?.email !== email ?
                <div className="prod-detail__pages__property__detailBuying__rightMobile__wrapper">
                  {purchaseType === 1 ? (
                    <RightPageProductDetails
                      gimmickOptions={gimmickOptions}
                      hargaProperti={inputs?.hargaProperti?.value}
                      id={id}
                      data={data?.detailProperti}
                      dataInputCalc={dataInputCalc}
                      setDataInputCalc={setDataInputCalc}
                      setShowListPropCompare={setShowListPropCompare}
                    />
                  ) : (
                    <RightPageProductDetailsAlt />
                  )}
                </div>
                :
                <></>
              )
            }
            <div className="prod-detail__pages__property__detailBuying__left__wrapper">
              <LeftPageProductDetails dataDetail={data} dataDev={dataDev} dispatch={dispatch} email={email} emailView={emailView} ownedBy={data?.ownedBy} setShowListPropCompare={setShowListPropCompare} userStatus={userStatus} />
            </div>
            {cookie.get("morgateCookie") &&
              (JSON.parse(cookie.get("morgateCookie"))?.userType !== "developer" && data?.detailProperti?.email !== email ?
                <div className="prod-detail__pages__property__detailBuying__right__wrapper">
                  {purchaseType === 1 ? (
                    <RightPageProductDetails
                      gimmickOptions={gimmickOptions}
                      hargaProperti={inputs?.hargaProperti?.value}
                      id={id}
                      data={data?.detailProperti}
                      allData={data}
                      dataInputCalc={dataInputCalc}
                      setDataInputCalc={setDataInputCalc}
                      setShowListPropCompare={setShowListPropCompare}
                    />
                  ) : (
                    <RightPageProductDetailsAlt />
                  )}
                </div>
                :
                <></>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsV2;
