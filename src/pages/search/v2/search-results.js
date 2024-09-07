/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash-contrib";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackMaps } from "../../../components/atoms";
import { Dropdown, DropdownKota, Footer, HouseCardSearchResult, ModalGMaps, SearchCityResult } from "../../../components/molecules";
import ProjectSearchResult from "../../../components/molecules/Cards/search/v2/project-search-result";
import { CarouselDetail, GMapsResultV2, Modal } from "../../../components/organisms";
import { iconConst } from "../../../components/theme/icon/icon-const";
import { getLocByLatLng } from "../../../helpers/getLocByLatLng";
import useSearchPropertyHooks from "../../../hooks/useSearchPropertyHooks";
import { selectConst } from "../../../static/selectConst";
import { setLongLat, showSingleModal } from "../../../store/actions/changeState";
import { listPropLandPageAtSearch, inquiryListPropFilter, getNearbyKanca } from "../../../store/actions/fetchData/inquiryProp";
import { closeModalFail } from "../../../store/actions/fetchData/superAdminState";
import ProjectPropertiSecondary from "../../../components/molecules/Cards/search/v2/project-properti-secondary";
import HouseCardSearchResultV2 from "../../../components/molecules/Cards/search/v2/house-search-result-v2";
import { recommendation } from "../../../store/actions/fetchData/v2/detailProjectV2";
import { Breadcrumb } from "flowbite-react";

const SearchResultsV2 = () => {
  const state = useSelector((state) => state.stateReducer);
  const saState = useSelector((state) => state.superAdminReducer);
  const navigate = useNavigate();
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
    setTotalData,
    errorData, 
    setErrorData
  } = useSearchPropertyHooks();
  const [queryParamSearch] = useSearchParams();
  const [mapsState, setMapsState] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 14,
    gestureHandling: "cooperative",
  });
  const [propsIdx, setPropsIdx] = useState(-1);
  const [property, setProperty] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [dataKanca, setDataKanca] = useState([]);
  const [detailKanca, setDetailKanca] = useState([]);
  const [recommendationUnit, setRecommendationUnit] = useState(null)
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
  const [loadMoreType, setLoadMoreType] = useState('city')
  const dispatch = useDispatch();
  useEffect(() => {
    if (queryParamSearch?.get("type") !== "price") {
      let newLongitude;
      let newLatitude;

      newLongitude = Number(queryParamSearch?.get("lng"));
      newLatitude = Number(queryParamSearch?.get("lat"));

      if (newLongitude && newLatitude) {
        dispatch(getNearbyKanca(newLatitude, newLongitude, setDataKanca))
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          dispatch(getNearbyKanca(position.coords.latitude, position.coords.longitude, setDataKanca))
        })
      }
    }
  }, [])

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
      if (queryParamSearch?.get("type") === "nearby" && queryParamSearch?.get("type") === "price") {
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
    if (Object.keys(state.filterSearch).length === 0 || _.isEqual(state.filterSearch, initialBodyFilter)) {
      if (queryParamSearch?.get("type") === "nearby" && !queryParamSearch?.get("lng")) {
        // jika tipenya nearby tapi tidak ada longitude, fungsi dispatchnya dipanggil di atas
        return
      };

      dispatch(
        listPropLandPageAtSearch(
          {
            ...bodySearchProp,
            pageStart: pageState.curPage, 
            longitude: queryParamSearch?.get("type") === "nearby" ? queryParamSearch?.get("lng") : queryParamSearch?.get("type") === "diskon" ? queryParamSearch?.get("lng") : queryParamSearch?.get("type") === "second" ? queryParamSearch?.get("lng") : queryParamSearch?.get("type") === "price" ?  queryParamSearch?.get("lng") : null,
            latitude: queryParamSearch?.get("type") === "nearby" ? queryParamSearch?.get("lat") : queryParamSearch?.get("type") === "diskon" ? queryParamSearch?.get("lat") : queryParamSearch?.get("type") === "second" ? queryParamSearch?.get("lat") : queryParamSearch?.get("type") === "price" ? queryParamSearch?.get("lat") : null,
            city: queryParamSearch?.get("type") === "city" ? queryParamSearch?.get("cityName") : null,
            cityOnly: queryParamSearch?.get("type") === "city-only" ? queryParamSearch?.get("cityName") : null,
            type: queryParamSearch?.get("type") === "price" ? JSON.parse(window?.localStorage?.getItem("filterLoc"))?.type : null,
            startPrice: queryParamSearch?.get("type") === "price" ? JSON.parse(window?.localStorage?.getItem("filterLoc")).minPrice : null,
            endPrice: queryParamSearch?.get("type") === "price" ? JSON.parse(window?.localStorage?.getItem("filterLoc")).maxPrice : null,
            keyword: queryParamSearch?.get("type") === "price" ? JSON.parse(window?.localStorage?.getItem("filterLoc"))?.search ? JSON.parse(window?.localStorage?.getItem("filterLoc"))?.search : "" : null,
          },
          setDataProperty,
          dataProperty,
          queryParamSearch,
          setResSearch,
          setTotalData,
        )
      );
    } else {
      dispatch(
        inquiryListPropFilter({
          ...state.filterSearch,
          pageStart: pageState.curPage,
          tipe: state.filterSearch.tipe === "" ? "all" : state.filterSearch.tipe,
          jmlKmrTidur: state.filterSearch.jmlKmrTidur === "" ? 1 : state.filterSearch.jmlKmrTidur,
          jmlKmrMandi: state.filterSearch.jmlKmrMandi === "" ? 1 : state.filterSearch.jmlKmrMandi,
          LT: state.filterSearch.LT === "" ? 0 : Number(state.filterSearch.LT),
          LT2: state.filterSearch.LT2 === "" ? 1000000000 : Number(state.filterSearch.LT2),
          LB: state.filterSearch.LB === "" ? 0 : Number(state.filterSearch.LB),
          LB2: state.filterSearch.LB2 === "" ? 1000000000 : Number(state.filterSearch.LB2)
        }, setDataProperty, dataProperty, setResSearch, setTotalData)
      );
    }
  }, [pageState.curPage, _.isEqual(state.filterSearch, initialBodyFilter)]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(recommendation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        rentangHarga: {
          min: "0",
          max: "100000000000",
      },
        type: 'Project',
        setData: setRecommendationUnit
    }))
    })
    
},[])
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
        ? Math.ceil(totalData / pageState?.pageSize)
        : 1,
      posts,
      allPosts: dataProperty,
    });
  }, [dataProperty]);

  useEffect(() => {
    if(property?.length === 0 && saState.fail === true && state.fsLoading !== true ){
    setErrorData(true)
    } else{
      setErrorData(false)
    }

  }, );

  const handleClickByList = (data, idx) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: Number(data?.project?.alamatProperti?.latitude),
        lng: Number(data?.project?.alamatProperti?.longitude),
      },
      // zoom: 20,
    });
    setPropsIdx(idx);
    setDetailProperty({ ...data });
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
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            setMapsStateResult({
              ...mapsStateResult,
              center: {
                ...mapsState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
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
    window.location.href = `/v2/search?type=city-only&cityName=${encodeURI(mapsStateResult.city)}&lat=${mapsStateResult.center.lat}&lng=${mapsStateResult.center.lng}`;
    setModalGmaps(false);
  };

  const loadFunc = () => {
    if (property.length >= 10 && pageState.hasMore === true) {
      setShowLoadMore(true)
    }
  };

  const loadMore = () => {
    if (pageState?.posts?.length > 0 && state.fsLoading === false) {
      if (pageState?.curPage + 1 < pageState?.totalPage) {
        let curPage =
          pageState?.curPage < pageState?.totalPage
            ? pageState?.curPage + 1
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
          title=""
          disableScroll={true}
          otherProps={{ setDataProperty, dataProperty, setTotalData, setLoadMoreType, mapsStateResult, setMapsStateResult }}
        />
      )}
      {/* {saState.fail === true && (
        <Modal
          closeModal={() => { dispatch(closeModalFail())}}
          modalTypes="emptyState"
        />
      )} */}
      <div className="gap-[4px] px-12 py-4">
      <Breadcrumb>
        <span className="text-sm cursor-pointer text-[#1078CA] font-semibold" onClick={() => navigate('/') } >
          Home
          </span>
      <Breadcrumb.Item>
      <span className="text-sm text-[#777777] font-semibold">
      {queryParamSearch?.get("type") === 'second' ? 'Properti Second' : 'Hasil Pencarian'}
          </span>
      </Breadcrumb.Item>
        </Breadcrumb>
          </div>
      <div className="search-result__searchMenuWrapper">
      <div className="">
            <SearchCityResult
            placeholder="Cari lokasi"
            />
        </div>
        {/* <div className="">
          <button
            onClick={handleFindLocation}
            className="w-full search-result__btnWrapper"
          >
            {kabKota && queryParamSearch?.get("type") !== "city" ? kabKota : queryParamSearch?.get("type") === "city" ? decodeURI(queryParamSearch?.get("cityName")) : "Location"}
          </button>
        </div> */}
        <div className="w-[318px] pt-2">
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
      </div>

      <div className="search-result__bodyWrapper">
      {errorData !== true ?
      <>
        <div className="search-result__flexLeftWrapper">
         {queryParamSearch?.get("type") === "city-only" ?
         <p className="py-4 pl-12 text-sm text-[#777777]">{`Menampilkan ${totalData} pencarian dari Kota/Kabupaten`} "<b className="text-[#000000]">{queryParamSearch?.get("cityName")}</b>"</p>
         : <> </>}
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={pageState.hasMore}
            loader={
              <div className="loader" key={0}>
                <ProjectSearchResult
                  typeSearch={queryParamSearch?.get("type")}
                  index={0}
                  isVirtual={true}
                  resSearch={resSearch}
                />
              </div>
            }
          >
            {property?.map((data, idx) => (
              <div>
                <ProjectSearchResult
                  typeSearch={queryParamSearch?.get("type")}
                  index={idx}
                  data={data}
                  isVirtual={data?.project?.mediaProject?.virtual360Url ? data?.project?.mediaProject?.virtual360Url.indexOf('http') === -1 ? false : true : false}
                  onClick={() => handleClickByList(data, idx)}
                  resSearch={resSearch}
                />
              </div>
            ))}
          </InfiniteScroll>
          {showLoadMore === true ? <button onClick={() => loadMore()} class="mx-8 h-12 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Load More</button> : ""}
        </div>
        <div className="search-result__mapsWrapper">
          <div className="search-result__ovrfHideWrapper">
            <GMapsResultV2
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
        </> : 
      <div className={`${errorData === true ? "flex flex-col justify-center items-center gap-6 py-2 px-10" : "hidden"}`}>
          <div className="flex flex-col justify-center items-center">
            <img className={`${errorData === true ? "block" : "hidden"}`} src="/images/EmptyState_404.svg" alt="image" width="316px" height="317px" />
        <p className="font-bold text-[#292929] text-[24px]">Properti Tidak Ditemukan</p>
        <p className="text-[16px] text-[#777777] font-reguler">Cek ulang kata kunci yang kamu cari atau cari properti lainnya, yuk!</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[1144px] flex-shrink-0">
        <p className="text-[#292929] font-bold text-2xl pl-3">Rekomendasi Properti Untukmu</p>
          <CarouselDetail
              cols={4}
              isProject={true}
              typeCarousel="recommendation"
              property={recommendationUnit}
          />
      </div>
      </div>
      }
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
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
};

export default SearchResultsV2;
