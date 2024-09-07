/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash-contrib";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackMaps, Button } from "../../../../components/atoms";
import { Dropdown, Footer, ModalGMaps } from "../../../../components/molecules";
import ProjectSalesResult from "../../../../components/molecules/Cards/search/v2/project-sales-result";
import { GMapsResultV2, Modal, NavHeaderSales } from "../../../../components/organisms";
import { iconConst } from "../../../../components/theme/icon/icon-const";
import { selectConst } from "../../../../static/selectConst";
import { showSingleModal } from "../../../../store/actions/changeState";
import { salesNearby, salesReferralProject } from "../../../../store/actions/fetchData/salesReferral";
import useInputRefHooks from "../../../../hooks/useInputRefHooks";
import useWindowDimensions from "../../../../utils/dimensions";
import { showLinkModal } from "../../../../store/actions/changeState";
import { getLocByLatLng } from "../../../../helpers/getLocByLatLng";
import useSalesProjectHooks from "../../../../hooks/useSalesProjectHooks";
const PenjualanResultV2 = () => {
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const profile = cookie.get("morgateCookie") ? JSON.parse(cookie.get("morgateCookie")) : "";
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [item, setItem] = useState(null);
  const { width } = useWindowDimensions();
  const { inputsRef, setInputsRef } = useInputRefHooks();
  const [isModalGmaps, setModalGmaps] = useState(false);
  const {
    bodySearchProp,
    dataProperty,
    setDataProperty,
    resSearch,
    setResSearch,
    kabKota,
    setKabKota,
    dropdownVal,
    initialBodyFilter,
    totalData,
    setTotalData
  } = useSalesProjectHooks();
  const [queryParamSearch] = useSearchParams();
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
    gestureHandling: "cooperative",
  });
  const [propsIdx, setPropsIdx] = useState(-1);
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [mapsStateResult, setMapsStateResult] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    city: "",
    zoom: 11,
  });
  const [dataAddress, setDataAddress] = useState({
    address: "",
    rt: "",
    rw: "",
    posCode: "",
    province: "",
    subDistrict: "",
    district: "",
    urbanVillage: "",
  });
  const [pageState, setPageState] = useState({
    allPosts: [],
    posts: [],
    curPage: 0,
    totalPage: 1,
    pageSize: process.env.REACT_APP_SEARCH_RESULTS_PAGESIZE,
    hasMore: true,
  });
  const [detailProperty, setDetailProperty] = useState(null);
  const dispatch = useDispatch();
  const handleModal = () => {
    setIsModal(!isModal);
  };
  const closeModal = () => {
    setInputsRef({});
    setIsModal(false);
  };
  useEffect(() => {
    dispatch(salesReferralProject(setItem, queryParamSearch?.get("referral"), currentPage));
  }, [currentPage]);

  // useEffect(() => {
  //   dispatch(salesNearby(mapsStateResult));
  // }, []);

  useEffect(() =>{
    setMapsState({
      ...mapsState,
      center: {
        lat: item?.responseData?.[0]?.project?.alamatProperti?.latitude,
        lng: item?.responseData?.[0]?.project?.alamatProperti?.longitude,
      },
      // zoom: 20,
    });
  }, [item])
  // useEffect(() => {
  //    {
  //     dispatch(
  //       salesProjectFilter({
  //         ...state.filterSalesProject,
  //         pageStart: pageState.curPage,
  //         tipeProperti: state.filterSalesProject.tipeProperti === "" ? "" : state.filterSalesProject.tipeProperti,
  //         jumlahKamarTidur: state.filterSalesProject.jumlahKamarTidur === "" ? ["1","2","3","4"] : state.filterSalesProject.jumlahKamarTidur,
  //         jumlahKamarMandi: state.filterSalesProject.jumlahKamarMandi === "" ? ["1","2","3","4"] :state.filterSalesProject.jumlahKamarMandi,
  //         LuasTanahMinimal  : state.filterSalesProject.LuasTanahMinimal   === "" ?  0 : Number(state.filterSalesProject.LuasTanahMinimal),
  //         LuasTanahMaksimal : state.filterSalesProject.LuasTanahMaksimal  === "" ?  1000000000 : Number(state.filterSalesProject.LuasTanahMaksimal),
  //         LuasBangunanMinimal  : state.filterSalesProject.LuasBangunanMinimal   === "" ?  0 : Number(state.filterSalesProject.LuasBangunanMinimal),
  //         LuasBangunanMaksimal : state.filterSalesProject.LuasBangunanMaksimal  === "" ?  1000000000 : Number(state.filterSalesProject.LuasBangunanMaksimal)
  //       }, setDataProperty, dataProperty, setTotalData)
  //     );
  //   }
  // }, [pageState.curPage, _.isEqual(state.filterSalesProject, initialBodyFilter)]);

  // console.log("set",dataProperty)
  // console.log("set2",setDataProperty)
  // console.log("set3",state.filterSalesProject)
  
  useEffect(() => {
    let posts = (item?.responseData || []);

    let temp = [...property];

    item?.responseData?.map((value) => {
      temp.push(value)
    })

    setProperty(temp);

    setPageState({
      ...pageState,
      totalPage: totalData !== 0
        ? Math.ceil(totalData / pageState?.pageSize)
        : 1,
      posts,
      allPosts: item?.responseData,
    });
  }, [item?.responseData]);

  const handleClickByList = (item, idx) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: Number(item?.project?.alamatProperti?.latitude),
        lng: Number(item?.project?.alamatProperti?.longitude),
      },
      // zoom: 20,
    });
    setPropsIdx(idx);
    setDetailProperty({ ...item });

  };

  const handleFindLocation = () => {
    if (!!dataAddress.placeId) {
      setMapsStateResult({
        ...mapsStateResult,
        center: {
          lat: dataAddress.lat,
          lng: dataAddress.lng,
        },
        address: dataAddress.address,
      });
      setModalGmaps(true);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        getLocByLatLng(item?.responseData[0]?.project?.alamatProperti?.longitude, item?.responseData[0]?.project?.alamatProperti?.latitude)
          .then((res) => {
            setMapsStateResult({
              ...mapsStateResult,
              center: {
                ...mapsState.center,
                lat: item?.responseData[0]?.project?.alamatProperti?.latitude,
                lng: item?.responseData[0]?.project?.alamatProperti?.longitude,
              },
              address: res.results[0].formatted_address,
              placeId: res.results[0].place_id,
              draggable: true,
            });
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      });
      setModalGmaps(true);
    }
  };

  const handleOnConfirm = () => {
    // window.location.href = `/v2/search?type=city&cityName=${encodeURI(mapsStateResult.city)}`;
    dispatch(salesNearby(mapsStateResult, setItem))
    setModalGmaps(false);
  };
  
  const loadFunc = () => {
    if (property.length >= 5 && pageState.hasMore === true) {
      setShowLoadMore(true)
    }
  };

  const loadMore = () => {
    setCurrentPage (item?.metadata?.listUserDtoRes?.currentPage + 1)
    // if (item && item.metadata) {
    //   const { currentPage, totalData, totalDataAll } = item.metadata.listUserDtoRes;

    //   // if (currentPage < Math.ceil(totalDataAll / 5)) {
    //   //   // Increment the current page
    //   //   const nextPage = currentPage + 1;

    //   //   // Update the page state with the new data
    //   //   setPageState({
    //   //     ...pageState,
    //   //     curPage: nextPage,
    //   //     hasMore: nextPage < Math.ceil(totalDataAll / 5),
    //   //   });
    //   // } else {
    //   //   // Hide the "Load More" button
    //   //   setShowLoadMore(false);
    //   // }

    //   console.log("page",currentPage)
    // }
  }
  // console.log("page",currentPage)
  // console.log("prase", property)

  // const url = window.location.href + `?referral=${item?.responseData[0]?.referralCode}`;

  // console.log("item", item?.responseData[0].referralCode)

  return (
    <div>
      <NavHeaderSales />
      {state.showLinkModal && (
        <Modal
          closeModal={() => dispatch(showLinkModal(!state.showLinkModal))}
          modalTypes="ShareLink"
          title="ShareLink"
          disableScroll={false}
        // otherProps={{ setDataProperty, dataProperty, setTotalData }}
        />
      )}
      {state.showSingleModal && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          modalTypes="filterSalesProject"
          title="Filter"
          disableScroll={true}
          otherProps={{ setItem, item, setTotalData }}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => navigate("/", { replace: true })}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <div className="search-result__searchMenuWrapper">
        {profile !== "" ?
          <>
            <div className="">
              <button
                onClick={handleFindLocation}
                className="w-full search-result__btnWrapper"
              >
                {kabKota && queryParamSearch?.get("type") !== "city" ? kabKota : queryParamSearch?.get("type") === "city" ? decodeURI(queryParamSearch?.get("cityName")) : "Location"}
              </button>
            </div>
            <div className="">

              <button
                onClick={() => {
                  dispatch(showSingleModal(!state.showSingleModal));
                }}
                className="w-full"
              >
                <Dropdown
                  value={dropdownVal.filter}
                  onChange={() => { }}
                  data={selectConst.filter}
                  icons={iconConst.smallIcons.filterBlue}
                  showOptions={false}
                />
              </button>
            </div>

            <div className="sales-ref__srch-drp">
              {/* <CopyToClipboard text={url}>
          <Button buttonColor="blueLight" textColor="blue">
                  {width >= 770 ? "Sharelink" : "Sharelink"}
                </Button>
               </CopyToClipboard> */}

              <div className="sales-ref__srch-drp">
                <Button
                  buttonColor="blueLight" textColor="blue"
                  onClick={() => {
                    dispatch(showLinkModal(!state.showLinkModal && (
                      <Modal
                        closeModal={() => dispatch(showLinkModal(!state.showLinkModal))}
                        modalTypes="ShareLink"
                        title="Sharelink"
                      />
                    )));
                  }}

                > {width >= 770 ? "Share Link" : "Share Link"}
                </Button>
              </div>

            </div>
          </>
          :
          ""}
      </div>



      <div className="search-result__bodyWrapper">
        <div className="search-result__flexLeftWrapper">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={pageState.hasMore}
            loader={
              <div className="loader" key={0}>
                <ProjectSalesResult
                  index={0}
                  isVirtual={true}
                  resSearch={resSearch}
                />
              </div>
            }
          >
            {property.map((item, idx) => (
              <div key={idx}>
                <ProjectSalesResult
                  index={idx}
                  data={item}
                  isVirtual={item?.project?.mediaProject?.virtual360Url ? true : false}
                  onClick={() => handleClickByList(item, idx)}
                  resSearch={resSearch}
                />
              </div>
            ))}
          </InfiniteScroll>
          {showLoadMore === true && item?.metadata?.listUserDtoRes?.totalData !== 0 ? (
            <button onClick={() => loadMore()} className="mx-8 h-12 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Load More</button>
          ) : (
            ""
          )}
        </div>
        <div className="search-result__mapsWrapper">
          <div className="search-result__ovrfHideWrapper">
            <GMapsResultV2
              dataProperty={item?.responseData}
              mapsState={mapsState}
              propsIdx={propsIdx}
              setPropsIdx={setPropsIdx}
              setMapsState={setMapsState}
              detailProperty={detailProperty}
              setDetailProperty={setDetailProperty}
            />
            {/* <BackMaps /> */}
          </div>
        </div>
      </div>

      <div className="mt-10 ">
        <ModalGMaps
          isModalGmaps={isModalGmaps}
          mapsState={mapsStateResult}
          isConfirm
          onConfirm={handleOnConfirm}
          setMapsState={setMapsStateResult}
          setModalGmaps={setModalGmaps}
          setDataAddress={setDataAddress}
          dataAddress={dataAddress}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PenjualanResultV2;
