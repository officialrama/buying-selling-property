/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackMaps } from "../../components/atoms";
import { Dropdown, Footer, HouseCardSearchResult, ModalGMaps } from "../../components/molecules";
import { GMapsResult, Modal } from "../../components/organisms";
import { iconConst } from "../../components/theme/icon/icon-const";
import { getLocByLatLng } from "../../helpers/getLocByLatLng";
import useSearchPropertyHooks from "../../hooks/useSearchPropertyHooks";
import { selectConst } from "../../static/selectConst";
import { setLongLat, showSingleModal } from "../../store/actions/changeState";
import { listPropLandPageAtSearch } from "../../store/actions/fetchData/inquiryProp";

const SearchResults = () => {
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
    setLoading,
    kabKota,
    setKabKota,
    dropdownVal,
    initialBodyFilter,
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
  const [propsIdx, setPropsIdx] = useState(0);
  const [mapsStateResult, setMapsStateResult] = useState({
    center: {
      lat: -6.22472,
      lng: 106.80778,
    },
    address: "",
    zoom: 11,
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
        navigator.geolocation.getCurrentPosition(function (position) {
          dispatch(
            setLongLat(position.coords.longitude, position.coords.latitude)
          );
          getLocByLatLng(
            queryParamSearch?.get("lng"),
            queryParamSearch?.get("lat")
          )
            .then((res) => {
              const kabupatenKota = (
                res?.results[0]?.address_components || []
              ).filter(
                (data) => data.types[0] === "administrative_area_level_2"
              )[0]?.long_name;
              setKabKota(kabupatenKota);
            })
            .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state.filterSearch).length === 0 || _.isEqual(state.filterSearch, initialBodyFilter)) {
      dispatch(
        listPropLandPageAtSearch(
          {
            ...bodySearchProp,
            pageStart: pageState.curPage,
            longitude:
              queryParamSearch?.get("type") === "nearby"
                ? queryParamSearch?.get("lng")
                : null,
            latitude:
              queryParamSearch?.get("type") === "nearby"
                ? queryParamSearch?.get("lat")
                : null,
            city:
              queryParamSearch?.get("type") === "city"
                ? queryParamSearch?.get("cityName")
                : null,
            type:
              queryParamSearch?.get("type") === "price"
                ? JSON.parse(window?.localStorage?.getItem("filterLoc"))?.type
                : null,
            startPrice:
              queryParamSearch?.get("type") === "price"
                ? JSON.parse(window?.localStorage?.getItem("filterLoc"))
                  .minPrice
                : null,
            endPrice:
              queryParamSearch?.get("type") === "price"
                ? JSON.parse(window?.localStorage?.getItem("filterLoc"))
                  .maxPrice
                : null,
            keyword:
              queryParamSearch?.get("type") === "price"
                ? JSON.parse(window?.localStorage?.getItem("filterLoc"))?.search : null
          },
          setDataProperty,
          queryParamSearch,
          setResSearch,
          setLoading
        )
      );
    }
  }, [pageState.curPage, _.isEqual(state.filterSearch, initialBodyFilter)]);

  useEffect(() => {
    let posts = (dataProperty || []).slice(
      pageState?.curPage * pageState?.pageSize,
      (pageState?.curPage + 1) * pageState?.pageSize
    );

    setPageState({
      ...pageState,
      totalPage: dataProperty
        ? Math.ceil(dataProperty.length / pageState?.pageSize)
        : 1,
      posts,
      allPosts: dataProperty,
    });
  }, [dataProperty]);

  const handleClickByList = (data, idx) => {
    setMapsState({
      ...mapsState,
      center: {
        lat: Number(data?.project?.alamatProperti?.latitude),
        lng: Number(data?.project?.alamatProperti?.longitude),
      },
      zoom: 20,
    });
    setPropsIdx(idx);
    setDetailProperty({ ...data });
  };

  const handleFindLocation = () => {
    setModalGmaps(true);
  };

  const handleOnConfirm = () => {
    window.location.href = `/v2/search?type=nearby&lat=${mapsStateResult.center.lat - 14}&lng=${mapsStateResult.center.lng - 5}`;
    setModalGmaps(false);
  };

  const loadFunc = () => {
    if (dataProperty.length !== 0) {
      if (pageState?.curPage + 1 < pageState?.totalPage) {
        let curPage =
          pageState?.curPage < pageState?.totalPage
            ? pageState?.curPage + 1
            : pageState?.curPage;
        let posts = pageState?.allPosts.slice(
          0,
          (curPage + 1) * pageState?.pageSize
        );

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
  };

  return (
    <div>
      {state.showSingleModal && (
        <Modal
          closeModal={() => dispatch(showSingleModal(!state.showSingleModal))}
          modalTypes="filterSearch"
          title="Filter"
          disableScroll={true}
          otherProps={{ setDataProperty }}
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
      <div className="search-result__searchMenuWrapper mt-20">
        <div className="">
          <button
            onClick={handleFindLocation}
            className="w-full search-result__btnWrapper"
          >
            {kabKota ? kabKota : "Location"}
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
      </div>

      <div className="search-result__bodyWrapper">
        <div className="search-result__flexLeftWrapper">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={pageState.hasMore}
            loader={
              <div className="loader" key={0}>
                <HouseCardSearchResult
                  index={0}
                  isVirtual={true}
                  resSearch={resSearch}
                />
              </div>
            }
          >
            {pageState?.posts?.map((data, idx) => (
              <div>
                <HouseCardSearchResult
                  index={idx}
                  data={data}
                  isVirtual={data?.detailProperti?.mediaProperti?.virtual360Url ? true : false}
                  onClick={() => handleClickByList(data, idx)}
                  resSearch={resSearch}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <div className="search-result__mapsWrapper">
          <div className="search-result__ovrfHideWrapper">
            <GMapsResult
              dataProperty={dataProperty}
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
        />
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
