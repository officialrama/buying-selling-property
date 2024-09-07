/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BackMaps } from "../../../components/atoms";
import { Dropdown, DropdownProperty, DropdownRangeHarga, Footer, ModalGMaps, ModalProvincies } from "../../../components/molecules";
import ProjectSearchResult from "../../../components/molecules/Cards/search/v2/project-search-result";
import { GMapsInfoLelang, GMapsResultV2, Modal } from "../../../components/organisms";
import { iconConst } from "../../../components/theme/icon/icon-const";
import { getLocByLatLng } from "../../../helpers/getLocByLatLng";
import useSearchPropertyHooks from "../../../hooks/useSearchPropertyHooks";
import { selectConst } from "../../../static/selectConst";
import { setLongLat, showSingleModal } from "../../../store/actions/changeState";
import { listPropLandPageAtSearch, inquiryListPropFilter, getNearbyKanca } from "../../../store/actions/fetchData/inquiryProp";
import { closeModalFail } from "../../../store/actions/fetchData/superAdminState";
import ProjectPropertiSecondary from "../../../components/molecules/Cards/search/v2/project-properti-secondary";
import { infoLelangProject, infoLelangSearch } from "../../../store/actions/fetchData/info-lelang";
import useInputRefHooks from "../../../hooks/useInputRefHooks";
import useSalesProjectHooks from "../../../hooks/useSalesProjectHooks";
import { Breadcrumb } from "flowbite-react";

const LandingPageInfoLelang = () => {
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [item, setItem] = useState();
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
  } = useSearchPropertyHooks();
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
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [dataKanca, setDataKanca] = useState([]);
  const [detailKanca, setDetailKanca] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSimpanClicked, setIsSimpanClicked] = useState(false);
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
    postalCode: "",
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
  const [loadMoreType, setLoadMoreType] = useState('city')
  const dispatch = useDispatch();
  const filterSearch = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
  let provinciesValues = [];
  
  if (filterSearch.provincies && Object.keys(filterSearch.provincies).length > 0) {
    if (typeof filterSearch.provincies === "object" && !Array.isArray(filterSearch.provincies)) {
      provinciesValues = Object.values(filterSearch.provincies);
    }
    else if (Array.isArray(filterSearch.provincies)) {
      provinciesValues = filterSearch.provincies;
    }
  }
  
  useEffect(() => {
    const lat = Number(queryParamSearch?.get("lat"));
    const lng = Number(queryParamSearch?.get("lng"));
     if (window.location.pathname === "/properti-secondary" && window.location.search === "?search") {
      dispatch(infoLelangSearch(setDataProperty, dataProperty, { filterSearch }, pageState.curPage, setTotalData));
     } else {
      dispatch(infoLelangProject(setDataProperty, dataProperty, { lat, lng }, pageState.curPage, setTotalData));
     }
  }, [pageState.curPage]);

  useEffect(() => {
    if (queryParamSearch?.get("lng") && queryParamSearch?.get("lat")) {
      const filterLngLatZero = [
        queryParamSearch?.get("lng") === "0",
        queryParamSearch?.get("lat") === "0",
        queryParamSearch?.get("lng") === "-0",
        queryParamSearch?.get("lat") === "-0",
      ];
      if (filterLngLatZero.indexOf(true) !== -1) {
        navigate("/");
      } else {
        let newLongitude;
        let newLatitude;
        if (queryParamSearch?.get("type") === "nearby") {
          newLongitude = Number(queryParamSearch?.get("lng"));
          newLatitude = Number(queryParamSearch?.get("lat"));
          navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
            getLocByLatLng(newLongitude, newLatitude)
              .then((res) => {
                const kabupatenKota = (res?.results[0]?.address_components || []).filter((data) => data.types[0] === "administrative_area_level_2")[0]?.long_name;
                setMapsStateResult({
                  center: {
                    lat: newLatitude,
                    lng: newLongitude
                  },
                  address: res?.results?.[0]?.formatted_address,
                  city: kabupatenKota
                });
                setMapsState({
                  center: {
                    lat: newLatitude,
                    lng: newLongitude
                  }
                })
                setKabKota(kabupatenKota);
              })
              .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
          });
        } else {
          newLongitude = Number(queryParamSearch?.get("lng"));
          newLatitude = Number(queryParamSearch?.get("lat"));
        }
        dispatch(setLongLat(newLongitude, newLatitude));
        getLocByLatLng(newLongitude, newLatitude)
          .then((res) => {
            const kabupatenKota = (res?.results[0]?.address_components || []).filter((data) => data.types[0] === "administrative_area_level_2")[0]?.long_name;
            setMapsStateResult({
              center: {
                lat: newLatitude,
                lng: newLongitude
              },
              address: res?.results?.[0]?.formatted_address,
              city: kabupatenKota
            });
            setMapsState({
              center: {
                lat: newLatitude,
                lng: newLongitude
              }
            })
            setKabKota(kabupatenKota);
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      }
    } else {
      if (queryParamSearch?.get("type") === "nearby") {
        navigator.geolocation.getCurrentPosition(function (position) {
          dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
          getLocByLatLng(position.coords.longitude, position.coords.latitude)
            .then((res) => {
              const kabupatenKota = (res?.results[0]?.address_components || []).filter((data) => data.types[0] === "administrative_area_level_2")[0]?.long_name;
              setMapsStateResult({
                center: {
                  lat: Number(queryParamSearch?.get("lat")),
                  lng: Number(queryParamSearch?.get("lng"))
                },
                address: res?.results?.[0]?.formatted_address,
                city: kabupatenKota
              });
              setMapsState({
                center: {
                  lat: Number(queryParamSearch?.get("lat")),
                  lng: Number(queryParamSearch?.get("lng"))
                }
              })
              setKabKota(kabupatenKota);

              dispatch(
                listPropLandPageAtSearch(
                  {
                    ...bodySearchProp,
                    pageStart: pageState.curPage,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                  },
                  setDataProperty,
                  dataProperty,
                  queryParamSearch,
                  setResSearch,
                  setTotalData,
                )
              );
            })
            .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (queryParamSearch?.get("type") === "price" && property?.length !== 0) {
      const lat = Number(property[0]?.project?.alamatProperti?.latitude);
      const lng = Number(property[0]?.project?.alamatProperti?.longitude)
      setMapsStateResult({
        center: {
          lat: lat,
          lng: lng
        }
      });
      setMapsState({
        center: {
          lat: lat,
          lng: lng
        }
      })
      dispatch(getNearbyKanca(lat, lng, setDataKanca))
    }
  }, [property]);


  useEffect(() => {
    let posts = (dataProperty || []);

    let temp = [...property]
    if (Object.keys(state.filterSearch).length !== 0 && loadMoreType !== 'filter') {
      temp = []
    }

    dataProperty.map((value) => {
      temp.push(value)
    })

    setProperty(temp);

    setPageState({
      ...pageState,
      totalPage: totalData !== 0
        ? Math.ceil(totalData / 10)
        : 1,
      posts,
      allPosts: property,
    });
  }, [dataProperty]);

  const handleClickByList = (data, idx) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: Number(data?.addresses?.longitude),
        lng: Number(data?.addresses?.langitude),
      },
      // zoom: 20,
    });
    setPropsIdx(idx);
    setDetailProperty({ ...data });
  };

  const handleFindLocation = () => {
   
      setModalGmaps(true);
      setIsSimpanClicked(true);
    }
  

  // const handleOnConfirm = () => {
  //   window.location.href = `/properti-secondary?lat=${mapsStateResult.center.lat}&lng=${mapsStateResult.center.lng}`
  //   setModalGmaps(false);
  // };

  const loadFunc = () => {
    if (totalData >= 10) {
      setShowLoadMore(true)
    } else {
      setShowLoadMore(false)
    }
  };

  const loadMore = () => {
    if (pageState?.posts?.length > 0 && state.fsLoading === false) {
      if (pageState?.curPage + 1 < pageState?.totalPage) {
        let curPage =
          pageState?.curPage < pageState?.totalPage
            ? pageState?.curPage + 10
            : pageState?.curPage;
        let posts = pageState?.allPosts;
        if (Object.keys(state.filterSearch).length !== 0) {
          setLoadMoreType('filter')
        };

        setPageState({
          ...pageState,
          curPage,
          posts,
          hasMore: true,
        });
        setCurrentPage(curPage);
      } else {
        setPageState({
          ...pageState,
          hasMore: false,
        });
      }
    }
    setShowLoadMore(false)
  }
  return (
    <div>
      {state.showSingleModal && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          modalTypes="filterSearch"
          title="Filter"
          disableScroll={true}
          otherProps={{ setDataProperty, dataProperty, setTotalData, setLoadMoreType, mapsStateResult, setMapsStateResult }}
        />
      )}
      {saState.fail === true && (
        <Modal
          closeModal={() => { dispatch(closeModalFail())}}
          modalTypes="modalSF"
          title=""
          titleBody={saState.titleFail}
          descBody={saState.msgFail}
        />
      )}
      <div className="gap-[4px] px-12 py-4">
      <Breadcrumb>
        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item>
      <span className="text-sm text-[#777777] font-semibold">
      Properti Aset Bank
          </span>
      </Breadcrumb.Item>
        </Breadcrumb>
          </div>
      <div className="search-result__searchMenuWrapper">
        <div className="flex flex-row gap-4 mobile:flex-col">
      <div className="">
              <button
                onClick={handleFindLocation}
                className="inline-flex flex-row flex-shrink-0 gap-1 w-[320px] mobile:w-[350px] h-11 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                
                {(isSimpanClicked || filterSearch.provincies) ? 
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M8.20563 6.20476C7.47526 6.91535 7.25257 7.99085 7.64885 8.92724L7.64886 8.92726C8.04405 9.86094 8.97147 10.4615 9.9911 10.4622C10.6606 10.4664 11.3064 10.2093 11.7843 9.74446L11.7843 9.74442C12.2624 9.27917 12.5328 8.64408 12.5308 7.97959C12.5338 6.96542 11.9109 6.05802 10.9664 5.67323C10.0231 5.28893 8.93391 5.49619 8.20563 6.20476ZM8.20563 6.20476L8.5543 6.56313L8.20562 6.20476C8.20563 6.20476 8.20563 6.20476 8.20563 6.20476ZM5.94932 11.8275L5.94897 11.827C5.05949 10.6768 4.55437 9.2892 4.5 7.852C4.50215 5.93611 5.55526 4.1616 7.27041 3.20643C8.98853 2.2496 11.1016 2.26584 12.8039 3.24858C14.4893 4.25389 15.5081 6.04181 15.5 7.95927C15.4595 9.8644 14.3588 11.7094 12.9077 13.1801L12.907 13.1809C12.0743 14.0285 11.1431 14.7787 10.132 15.4162C10.095 15.4356 10.0556 15.4507 10.0146 15.4611C9.99398 15.4564 9.97443 15.449 9.95655 15.4391C8.40877 14.4797 7.05146 13.256 5.94932 11.8275Z" fill="#1078CA" stroke="#1078CA"/>
                 <path d="M13.1587 16.7677C13.5138 16.7677 13.8015 17.0436 13.8015 17.3839C13.8015 17.7241 13.5138 18 13.1587 18H6.78544C6.4304 18 6.14258 17.7241 6.14258 17.3839C6.14258 17.0436 6.4304 16.7677 6.78544 16.7677H13.1587Z" fill="#1078CA"/>
                 </svg>
                 :
                <img src="icons/small-icons/Location.svg" /> }
                <p className="whitespace-nowrap">
                {kabKota && queryParamSearch?.get("type") !== "city" ? kabKota : queryParamSearch?.get("type") === "city" ? decodeURI(queryParamSearch?.get("cityName")) : "Lokasi"}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mobile:ml-[225px] ml-[190px]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.6394 2.1106L12.8136 8.28484C13.5428 9.014 13.5428 10.2072 12.8136 10.9364L6.6394 17.1106" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        <div className="z-30">
            <DropdownRangeHarga
             setDataProperty={setDataProperty}
             dataProperty={dataProperty}
             filter={filterSearch}
             currentPage={pageState.curPage}
             setTotalData={setTotalData}
             setProperty={setProperty}
             property={property}
            />
        </div>
        <div className="z-30">
            <DropdownProperty
              setDataProperty={setDataProperty}
              dataProperty={dataProperty}
              filter={filterSearch}
              currentPage={pageState.curPage}
              setTotalData={setTotalData}
              setProperty={setProperty}
              property={property}
            />
        </div>
      </div>
      </div>
      <div className="smallPc:flex largePc:flex gap-x-4 pt-2">
      <div className="mobile:w-full tab:w-9/12 tab:mx-auto w-[70%] flex flex-col">
  <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={pageState.hasMore}
    loader={
      <div className="loader" key={0}>
        <ProjectPropertiSecondary
          index={0}
          isVirtual={true}
          resSearch={resSearch}
        />
      </div>
    }
  >
    {totalData > 10
      ? property?.map((data, idx) => (
          <div key={idx}>
            <ProjectPropertiSecondary
              index={idx}
              data={data}
              isVirtual={data?.project?.mediaProject?.virtual360Url ? data?.project?.mediaProject?.virtual360Url.indexOf('http') === -1 ? false : true : false}
              onClick={() => handleClickByList(data, idx)}
              resSearch={resSearch}
            />
          </div>
        ))
      : pageState?.posts?.map((data, idx) => (
          <div key={idx}>
            <ProjectPropertiSecondary
              index={idx}
              data={data}
              isVirtual={data?.project?.mediaProject?.virtual360Url ? data?.project?.mediaProject?.virtual360Url.indexOf('http') === -1 ? false : true : false}
              onClick={() => handleClickByList(data, idx)}
              resSearch={resSearch}
            />
          </div>
        ))}
  </InfiniteScroll>
  {showLoadMore === true ? <button onClick={() => loadMore()} className="mx-8 h-12 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Load More</button> : ""}
</div>
        <div className="search-result__mapsInfoLelang">
          <div className="search-result__ovrfHideWrapper">
            <GMapsInfoLelang
              dataProperty={pageState?.posts}
              dataKanca={dataKanca}
              mapsState={mapsState}
              propsIdx={propsIdx}
              setPropsIdx={setPropsIdx}
              setMapsState={setMapsState}
              detailProperty={detailProperty}
              setDetailProperty={setDetailProperty}
              detailKanca={detailKanca}
              setDetailKanca={setDetailKanca}
            />
            {/* <BackMaps /> */}
          </div>
        </div>
      </div>

      <div className="mt-10 ">
        <ModalProvincies
        isModalGmaps={isModalGmaps}
        setModalGmaps={setModalGmaps}
        setDataProperty={setDataProperty}
        dataProperty={dataProperty}
        filter={filterSearch}
        currentPage={pageState.curPage}
        setTotalData={setTotalData}
        setProperty={setProperty}
        property={property}
        />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageInfoLelang;
