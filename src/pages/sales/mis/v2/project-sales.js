/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import cookie from "js-cookie";
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import InitialsAvatar from "react-initials-avatar";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from 'react-tabs-scrollable';
import { Button } from "../../../../components/atoms";
import SaveLove from "../../../../components/atoms/Button/save/save-love";
import Virtual360 from "../../../../components/atoms/Button/virtual-360/virtual-360";
import ListFaciltyDetail from "../../../../components/atoms/Text/details/list-facility-detail";
import PropertyInfo from "../../../../components/atoms/Text/details/property-info";
import { BackBreadcrumbs, DetailsCard, Footer, Image4FramePrj } from "../../../../components/molecules";
import HouseCardSearchResultV2 from "../../../../components/molecules/Cards/search/v2/house-search-result-v2";
import MiniInfoDetail from "../../../../components/molecules/Info/MiniInfoDetail/Component";
import { Modal, RightPageSales, NavHeaderSales, NavHeader } from "../../../../components/organisms";
import { decryptStr, encryptStr } from "../../../../helpers/encryptDecrypt";
import { fetchPost } from "../../../../helpers/fetchApi";
import { openLink } from "../../../../helpers/newTab";
import { genClickToGmaps, genStaticMapsUrl } from "../../../../helpers/staticMaps";
import { formatRupiahWord, toTitleCase, trimStr } from "../../../../helpers/string";
import useInputHooks from "../../../../hooks/useInputHooks";
import { ListFacilityType } from "../../../../static/details/list-facility/type";
import { showApprovalKprModal, showMethodPaymentModal, showUserPaymentModal } from "../../../../store/actions/changeModalState";
import { deleteSavedProp, saveProperty } from "../../../../store/actions/fetchData/favoriteProp";
import { closeModalFail, closeModalSuccess } from "../../../../store/actions/fetchData/superAdminState";
import { projectDetail, unitDetail } from "../../../../store/actions/fetchData/v2/detailProjectV2";
import Download from "../../../../components/atoms/Button/download/download";
import youtubeEmbed from "youtube-embed";


const ProjectSales = ({ email, emailView, userStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { inputs, setInputs } = useInputHooks();
  const [activeTab, setActiveTab] = useState(0);
  const [gimmickOptions, setGimmickOptions] = useState([]);
  const onTabClick = (e, index) => setActiveTab(index);
  const [dataInputSalesCalc, setDataInputSalesCalc] = useState({
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
  const [prjData, setPrjData] = useState(null);
  const [unitListData, setUnitListData] = useState(null);
  const [unitDtlData, setUnitDtlData] = useState(null);
  const [loadingDtlUnit, setLoadingDtlUnit] = useState(false);
  const [showLargeImg, setShowLargeImg] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [listImgSrc, setListImgSrc] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [showListPropCompare, setShowListPropCompare] = useState(false);
  const [startIndexImg, setStartIndexImg] = useState(0);
  const saState = useSelector((state) => state.superAdminReducer);
  const stateModal = useSelector((stateModal) => stateModal.modalReducer);

  useEffect(() => {
    dispatch(projectDetail({ prjId: id, setData: setPrjData, email: email }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
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

  }, []);

  useEffect(() => {
    if (prjData?.responseData?.[0]?.imagesProject) {
      prjData?.responseData?.[0]?.imagesProject?.map((data) => {
        return setListImgSrc(listImgSrc => [...listImgSrc, { url: data?.sharedUrl, title: "" }]);
      })
    }
  }, [prjData?.responseData?.[0]?.imagesProject]);

  if (prjData?.responseData?.[0]?.listClusters && _.isNull(unitListData) && prjData) {
    // console.log("[DEBUG] initial data masuk 1");
    let getClsId = decryptStr(prjData?.responseData?.[0]?.listClusters?.[0]?.clusters?.[0]?.id);
    if (prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes) {
      let getUnitList = prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes?.[getClsId];
      setUnitListData(getUnitList);
      if (_.isNull(unitDtlData) && loadingDtlUnit === false) {
        dispatch(unitDetail({
          unitId: getUnitList?.properties?.[0].id,
          setData: setUnitDtlData,
          setLoading: setLoadingDtlUnit
        }));
      }
    }
  } else if (!prjData?.responseData?.[0]?.listClusters && _.isNull(unitListData) && prjData) {
    // console.log("[DEBUG] initial data masuk 2");
    setUnitListData(prjData?.responseData?.[0]?.propertiUnclustered?.[0]);
    if (_.isNull(unitDtlData) && loadingDtlUnit === false) {
      dispatch(unitDetail({
        unitId: prjData?.responseData?.[0]?.propertiUnclustered?.[0]?.properties?.[0]?.id,
        setData: setUnitDtlData,
        setLoading: setLoadingDtlUnit
      }));
    }
  };
  useEffect(() => {
    const url = window.location.href.split('/');
    if (!_.isNull(unitDtlData)) {
      setInputs({
        ...inputs,
        hargaProperti: {
          value: unitDtlData?.detailProperti?.hargaProperti
        },
        hargaAkhir: {
          value: unitDtlData?.detailProperti?.hargaAkhir
        }
      });
    }
    if (unitDtlData?.ownedBy === decryptStr(emailView)) {
      setSaveState(true);
    } else {
      setSaveState(false);
    };
    window.localStorage.setItem(
      "detailProperti",
      JSON.stringify({ ...unitDtlData })
    );
    window.localStorage.setItem(
      "referralCode",url[4]
      
    );
  }, [unitDtlData]);

  const showImg = (imgIndex) => {
    setStartIndexImg(imgIndex);
    setShowLargeImg(true);
  };


  return (
    <div>
      <NavHeaderSales />
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
      {stateModal.showApprovalKprModal === true ? (
        <Modal
          closeModal={() => {
            dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal));
          }}
          modalTypes="kprSubmissionSales"
          title="Pengajuan Pembelian KPR"
          data={unitDtlData}
          otherProps={{ gimmickOptions, dataInputSalesCalc, setDataInputSalesCalc }}
        />
      ) : (
        <div></div>
      )}
      {showListPropCompare &&
        <Modal
          closeModal={() => setShowListPropCompare(false)}
          modalTypes="selectCompareProp"
          title="Properti Tersimpan"
          firstPropId={unitDtlData?.detailProperti?.id}
          email={email}
        />
      }
      {showLargeImg && <Lightbox showTitle={false} images={listImgSrc} onClose={() => setShowLargeImg(false)} startIndex={startIndexImg} />}
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
      <div className="prj-detail__wrapper">
        <div className="prj-detail__breadcrumbNav">
          <BackBreadcrumbs onClick={() => navigate(-1)} />
        </div>
        <Image4FramePrj
          dataImg={prjData?.responseData?.[0]?.imagesProject}
          onClickImg0={() => showImg(0)}
          onClickImg1={() => showImg(1)}
          onClickImg2={() => showImg(2)}
          onClickImg3={() => showImg(3)}
        />
        <div className="prj-detail__content">
          <div className="prj-detail__pageLeft">
            <div className="prj-detail__detailPrjWrap">
              <div className="prj-detail__priceWrap">
                {prjData?.responseData?.[0]?.project?.kisaranHarga === undefined ? "" :
                  <p className="prj-detail__price">{formatRupiahWord(prjData?.responseData?.[0]?.project?.kisaranHarga?.split(",")[0])} - {formatRupiahWord(prjData?.responseData?.[0]?.project?.kisaranHarga?.split(",")[1])}</p>
                }
              </div>
              <div className="prj-detail__namePrjWrap">
                <p className="prj-detail__namePrj">{prjData?.responseData?.[0]?.project?.namaProyek}</p>
                <p className="prj-detail__locPrj">{
                  _.isJSON(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat) ?
                    JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.provinsi
                    : "-"}
                </p>
              </div>
              <div className="prj-detail__detailPrj">
                {cookie.get("morgateCookie") &&
                  (decryptStr(JSON.parse(cookie.get("morgateCookie"))?.userType) !== "developer" ?
                    <DetailsCard title="Developer">
                      <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
                        <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                          <InitialsAvatar
                            className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                            name={_.isJSON(prjData?.responseData?.[0]?.metadataUser) ? (JSON?.parse(prjData?.responseData?.[0]?.metadataUser)?.name).toString() : "-"}
                          />
                          <div className="prod-detail__pages__property__detailBuying__left__dev-info__name">
                            <p>{trimStr({ string: _.isJSON(prjData?.responseData?.[0]?.metadataUser) ? (JSON?.parse(prjData?.responseData?.[0]?.metadataUser)?.name).toString() : "-", maxLength: 50 })}</p>
                            <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">
                              {prjData?.responseData?.[0]?.metadataUser && _.isJSON(prjData?.responseData?.[0]?.metadataUser) ? JSON?.parse(JSON?.parse(prjData?.responseData?.[0]?.metadataUser)?.address)?.alamat : "-"}
                            </p>
                          </div>
                          <div className="prod-detail__pages__property__detailBuying__left__dev-info__wa-btn">
                            <Button buttonColor="greenWA" textColor="white" fullWidth={false} paddingSize={"padding-5"} onClick={() => openLink(`https://api.whatsapp.com/send?phone=${(decryptStr(prjData?.responseData?.[0]?.mobileNoDeveloper)).replace("|", "").replace("+", "").replace(/^0/g, "62")}`, true)}>
                              <div className="flex flex-row gap-2 justify-center">
                                <img src="/icons/small-icons/whatsapp.svg" alt="wa-icon" />
                                <p>WhatsApp</p>
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DetailsCard>
                    :
                    <></>)
                }
              </div>
              <div className="prj-detail__prjInfoWrap">
                <MiniInfoDetail iconPath="/icons/Pin.svg" title="Lokasi" desc={
                  _.isJSON(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat) ?
                    JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.provinsi
                    : "-"} />
                {/* <MiniInfoDetail iconPath="/icons/Area.svg" title="Tipe Tersedia" desc="4 Tipe" /> */}
                {/* <MiniInfoDetail iconPath="/icons/Date.svg" title="Tanggal Selesai" desc="12-12-2022" /> */}
              </div>
            </div>
            <div className="prj-detail__listCluster">
              <Tabs
                activeTab={activeTab}
                leftBtnIcon={<div><AiFillLeftCircle /></div>}
                rightBtnIcon={<><AiFillRightCircle /></>}
                tabsScrollAmount={1}
                onTabClick={onTabClick}
                
              >
                {prjData?.responseData?.[0]?.listClusters?.[0]?.clusters?.map((data) => {
                  return (
                    <Tab className="prj-detail__listOfCluster"
                      onClick={() => {
                        // console.log("[DEBUG] id project clicked : ", decryptStr(data?.id));
                        // console.log("[DEBUG] list unit project clicked : ", prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes?.[decryptStr(data?.id)]);
                        setUnitListData(prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes?.[decryptStr(data?.id)]);
                        if(prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes?.[decryptStr(data?.id)]?.properties?.[0].id)
                         {
                          dispatch(unitDetail({
                            unitId: prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes?.[decryptStr(data?.id)]?.properties?.[0].id,
                            setData: setUnitDtlData,
                            setLoading: setLoadingDtlUnit
                          }))
                        }
                      }}
                    >
                      Cluster {data?.name}
                    </Tab>
                  )
                })}
                {prjData?.responseData?.[0]?.propertiUnclustered &&
                  <Tab className="prj-detail__listOfCluster"
                    onClick={() => {
                      setUnitListData(prjData?.responseData?.[0]?.propertiUnclustered?.[0]);
                    }}
                  >
                    Unit Non Cluster
                  </Tab>
                }
              </Tabs>
              <div>
                {unitListData ? 
                  unitListData?.properties?.map((data, idx) => {
                    if (data?.status === "sold" || data?.status === "deleted"  ){
                      return null ;
                  }
                    return (
                      <div className={decryptStr(data?.id) === decryptStr(unitDtlData?.detailProperti?.id) ? "my-2 w-full bg-white rounded-lg border border-gray-200 shadow-md" : ""}>
                        <HouseCardSearchResultV2
                          index={idx}
                          data={data}
                          dataImg={unitListData?.propertiImagesMap?.[decryptStr(data?.id)]}
                          isVirtual={data?.mediaProperti?.virtual360Url ? true : false}
                          onClick={() => {
                            dispatch(unitDetail({
                              unitId: data?.id,
                              setData: setUnitDtlData,
                              setLoading: setLoadingDtlUnit
                            }));
                          }}
                          resSearch={[]}
                        />
                      </div>
                    );
                  })
                  :
                  <p className="hs-search-rslt__notfound text-center text-[1rem] my-8">Unit tidak tersedia.</p>
                }
              </div>
            </div>
            {!_.isNull(unitDtlData) && !loadingDtlUnit ?
              <div className="prj-detail__detailCluster">

                <div className="prod-detail__pages__property__detailBuying__left__description__wrapper">
                  <p className="prod-detail__pages__property__detailBuying__left__description__titleDesc">
                    Deskripsi
                  </p>
                  <p className="prod-detail__pages__property__detailBuying__left__description__desc">
                    {unitDtlData?.detailProperti?.deskripsiProperti}
                  </p>
                  {unitDtlData?.detailProperti?.inDevelopment && unitDtlData?.detailProperti?.inDevelopment === true ? ( <p className="prod-detail__pages__property__detailBuying__left__description__desc">*Properti masih dalam tahap pembangunan</p>) : ""}
                </div>

                <div className="flex flex-row gap-3 justify-content">
                  {unitDtlData && unitDtlData?.project?.mediaProject?.virtual360Url ? <Virtual360 onClick={() => openLink(unitDtlData?.project?.mediaProject?.virtual360Url, true)} /> : <></>}
                  {unitDtlData && unitDtlData?.brosurUrl ? <Download title={"Download Brosur"} onClick={() => openLink(unitDtlData?.brosurUrl, true)} /> : <></>}
                  {(decryptStr(userStatus) === "visitor" &&
                    <div className="ml-auto">
                      <SaveLove
                        filled={saveState}
                        onClick={
                          (!saveState ?
                            (saveLoading ? null : () => dispatch(saveProperty({ email: email, propertiId: encryptStr(decryptStr(unitDtlData?.detailProperti?.id)) }, setSaveLoading, emailView, setSaveState))) :
                            (saveLoading ? null : () => dispatch(deleteSavedProp(email, encryptStr(decryptStr(unitDtlData?.detailProperti?.id)), setSaveState)))
                          )
                        }
                        loading={saveLoading}
                      />
                    </div>)}
                </div>

                <div className="prj-detail__informasiRumahWrap">
                  <DetailsCard title="Kelengkapan Rumah">
                    <div className="grid grid-cols-2 gap-4">
                      <ListFaciltyDetail type={ListFacilityType.type.dapur} value={unitDtlData?.detailProperti?.kelengkapanProperti?.dapur || false} />
                      <ListFaciltyDetail type={ListFacilityType.type.telepon} value={unitDtlData?.detailProperti?.kelengkapanProperti?.jalurTelepone || false} />
                      <ListFaciltyDetail type={ListFacilityType.type.listrik} value={unitDtlData?.detailProperti?.kelengkapanProperti?.jalurListrik || false} />
                      <ListFaciltyDetail type={ListFacilityType.type.ruangKeluarga} value={unitDtlData?.detailProperti?.kelengkapanProperti?.ruangKeluarga || false} />
                      <ListFaciltyDetail type={ListFacilityType.type.pdam} value={unitDtlData?.detailProperti?.kelengkapanProperti?.jalurPDAM || false} />
                      <ListFaciltyDetail type={ListFacilityType.type.ruangKerja} value={unitDtlData?.detailProperti?.kelengkapanProperti?.ruangKerja || false} />
                    </div>
                  </DetailsCard>
                  <DetailsCard title="Akses">
                    <div className="grid grid-cols-2 gap-4">
                      <ListFaciltyDetail type={ListFacilityType.type.rumahSakit} value={prjData?.responseData?.[0]?.project?.aksesProperti?.rumahSakit} />
                      <ListFaciltyDetail type={ListFacilityType.type.mall} value={prjData?.responseData?.[0]?.project?.aksesProperti?.mall} />
                      <ListFaciltyDetail type={ListFacilityType.type.tol} value={prjData?.responseData?.[0]?.project?.aksesProperti?.jalanTol} />
                      <ListFaciltyDetail type={ListFacilityType.type.stasiunKereta} value={prjData?.responseData?.[0]?.project?.aksesProperti?.stasiun} />
                      <ListFaciltyDetail type={ListFacilityType.type.sekolah} value={prjData?.responseData?.[0]?.project?.aksesProperti?.sekolah} />
                      <ListFaciltyDetail type={ListFacilityType.type.taman} value={prjData?.responseData?.[0]?.project?.aksesProperti?.taman} />
                      <ListFaciltyDetail type={ListFacilityType.type.pasar} value={prjData?.responseData?.[0]?.project?.aksesProperti?.pasar} />
                      <ListFaciltyDetail type={ListFacilityType.type.farmasi} value={prjData?.responseData?.[0]?.project?.aksesProperti?.farmasi} />
                      <ListFaciltyDetail type={ListFacilityType.type.rumahIbadah} value={prjData?.responseData?.[0]?.project?.aksesProperti?.rumahIbadah} />
                      <ListFaciltyDetail type={ListFacilityType.type.restoran} value={prjData?.responseData?.[0]?.project?.aksesProperti?.restoran} />
                      <ListFaciltyDetail type={ListFacilityType.type.bar} value={prjData?.responseData?.[0]?.project?.aksesProperti?.bar} />
                      <ListFaciltyDetail type={ListFacilityType.type.halte} value={prjData?.responseData?.[0]?.project?.aksesProperti?.halte} />
                      <ListFaciltyDetail type={ListFacilityType.type.gymnasium} value={prjData?.responseData?.[0]?.project?.aksesProperti?.gymnasium} />
                      <ListFaciltyDetail type={ListFacilityType.type.bioskop} value={prjData?.responseData?.[0]?.project?.aksesProperti?.bioskop} />
                      <ListFaciltyDetail type={ListFacilityType.type.bandara} value={prjData?.responseData?.[0]?.project?.aksesProperti?.bandara} />
                      <ListFaciltyDetail type={ListFacilityType.type.gerbangTol} value={prjData?.responseData?.[0]?.project?.aksesProperti?.gerbangTol} />
                      <ListFaciltyDetail type={ListFacilityType.type.spbu} value={prjData?.responseData?.[0]?.project?.aksesProperti?.spbu} />
                      <ListFaciltyDetail type={ListFacilityType.type.bankATM} value={prjData?.responseData?.[0]?.project?.aksesProperti?.bankAtm} />
                    </div>
                  </DetailsCard>
                  <DetailsCard title="Fasilitas">
                    <div className="grid grid-cols-2 gap-4">
                      <ListFaciltyDetail type={ListFacilityType.type.kolamBerenang} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.kolamRenang} />
                      <ListFaciltyDetail type={ListFacilityType.type.clubHouse} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.clubHouse} />
                      <ListFaciltyDetail type={ListFacilityType.type.parkir} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.parkir} />
                      <ListFaciltyDetail type={ListFacilityType.type.keamanan} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.keamanan} />
                      <ListFaciltyDetail type={ListFacilityType.type.penghijauan} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.penghijauan} />
                      <ListFaciltyDetail type={ListFacilityType.type.lift} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.lift} />
                      <ListFaciltyDetail type={ListFacilityType.type.elevator} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.elevator} />
                      <ListFaciltyDetail type={ListFacilityType.type.gym} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.gym} />
                      <ListFaciltyDetail type={ListFacilityType.type.jogging} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.jogging} />
                      <ListFaciltyDetail type={ListFacilityType.type.garasi} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.garasi} />
                      <ListFaciltyDetail type={ListFacilityType.type.rowJalan} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.rowJalan12} />
                      <ListFaciltyDetail type={ListFacilityType.type.cctv} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.cctv} />
                      <ListFaciltyDetail type={ListFacilityType.type.rumahSakit} value={prjData?.responseData?.[0]?.project?.fasilitasProperti?.rumahSakit} />
                    </div>
                  </DetailsCard>
                  <DetailsCard title="Informasi Properti">
                    <div className="grid grid-cols-2 gap-4">
                      <PropertyInfo title="Tipe Properti" value={unitDtlData?.project?.tipeProperti ? (toTitleCase(unitDtlData?.project?.tipeProperti)) : "-"} />
                      <PropertyInfo title="Stok Unit" value={ `Sisa stok properti ${unitDtlData?.detailProperti?.stockUnits} unit lagi` } />
                      <PropertyInfo title="Luas Tanah" value={unitDtlData?.detailProperti?.lt + " m²"} />
                      <PropertyInfo title="Luas Bangunan" value={unitDtlData?.detailProperti?.lb + " m²"} />
                      <PropertyInfo title="Kamar Tidur" value={unitDtlData?.detailProperti?.jmlKmrTidur + " Kamar"} />
                      <PropertyInfo title="Kamar Mandi" value={unitDtlData?.detailProperti?.jmlKmrMandi + " Kamar Mandi"} />
                      <PropertyInfo title="Sertifikat" value={(unitDtlData?.detailProperti?.informasiProperti?.sertifikat)?.toUpperCase()} />
                      <PropertyInfo title="Jumlah Lantai" value={unitDtlData?.detailProperti?.informasiProperti?.jmlLantai + " Lt"} />
                      <PropertyInfo title="Kondisi Properti" value={unitDtlData?.detailProperti?.informasiProperti?.kondisiProperti} />
                      <PropertyInfo title="Daya Listrik" value={unitDtlData?.detailProperti?.informasiProperti?.dayaListrik + " watt"} />
                      <PropertyInfo title="Hadap" value={toTitleCase(unitDtlData?.detailProperti?.informasiProperti?.hadapRumah)} />
                      {unitDtlData?.project?.fasilitasProperti?.garasi && <PropertyInfo title="Jumlah Garasi" value="1" />}
                      <PropertyInfo title="Tahun Bangun" value={unitDtlData?.detailProperti?.informasiProperti?.tahunBangun} />
                      <PropertyInfo title="Kamar Pembantu" value={unitDtlData?.detailProperti?.informasiProperti?.kamarPembantu} />
                      <PropertyInfo title="Jenis Properti" value={unitDtlData?.project?.jenisProperti === "subsidi" ? "Subsidi" : "Non Subsidi"} />
                    </div>
                  </DetailsCard>
                  <DetailsCard title="Alamat">
                    <div className="prod-detail__pages__property__detailBuying__left__address__colWrapper">
                      <div className="prod-detail__pages__property__detailBuying__left__address__addressWrapper">
                        <img
                          className="prod-detail__pages__property__detailBuying__left__address__icon"
                          src="/icons/small-icons/pin-drop.svg"
                          alt="pin-icon"
                        />
                        <p className="prod-detail__pages__property__detailBuying__left__description__desc">
                          {_.isJSON(unitDtlData?.project?.alamatProperti?.alamat) ? JSON.parse(unitDtlData?.project?.alamatProperti?.alamat)?.alamat : ""}
                        </p>
                      </div>
                      {unitDtlData?.project.alamatProperti &&
                        <img
                          className="cursor-pointer mt-3"
                          src={genStaticMapsUrl({
                            size: "600x200",
                            lat: Number(unitDtlData?.project.alamatProperti.latitude),
                            lng: Number(unitDtlData?.project.alamatProperti.longitude)
                          })}
                          alt="gmaps-product-detail"
                          onClick={() => {
                            openLink(genClickToGmaps({ lat: Number(unitDtlData?.project.alamatProperti.latitude), lng: Number(unitDtlData?.project.alamatProperti.longitude) }), true)
                          }}
                        />
                      }
                    </div>
                  </DetailsCard>
              
            <DetailsCard title="Media">
              {unitDtlData?.project?.mediaProject?.youtubeUrl ? 
              <div className="w-full my-3">
                
                <div className="about__video my-4 ">
                      <iframe
                        className="about__iframe"
                        src={youtubeEmbed(unitDtlData?.project?.mediaProject?.youtubeUrl)}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="allowfullscreen"
                      ></iframe>
                </div>
              </div>
               : "" }
             
            </DetailsCard>   
         
                </div>
              </div>
              :
              _.isNull(unitDtlData) && loadingDtlUnit ?
                <div className="prj-detail__loaderWrap">
                  <Oval
                    wrapperclassName="loader__oval"
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    color="#00529C"
                    secondaryColor="#bbd7f0"
                  />
                </div>
                : <></>
            }
          </div>
          <div className="prj-detail__pageRight">
            {/* {cookie.get("morgateCookie") && decryptStr(JSON.parse(cookie.get("morgateCookie"))?.userType) !== "developer" ? */}
              <>
                <RightPageSales
                  gimmickOptions={gimmickOptions}
                  hargaAkhir={inputs?.hargaAkhir?.value}
                  hargaProperti={inputs?.hargaProperti?.value}
                  id={id}
                  data={unitDtlData?.detailProperti}
                  allData={unitDtlData}
                  dataInputSalesCalc={dataInputSalesCalc}
                  setDataInputSalesCalc={setDataInputSalesCalc}
                  setShowListPropCompare={setShowListPropCompare}
                />
              </>
            {/* } */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectSales;