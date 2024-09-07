/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import cookie from "hs-cookie";
import _ from "lodash-contrib";
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ButtonCalcHomepage,
  CurrencyInput,
  CurrencyInputCalc,
  InputMasked,
  LabelCalc,
  Title,
} from "../../components/atoms";
import {
  CarouselHeader,
  DetailsCard,
  Footer,
  HowWeWorkBigCard,
  HowWeWorkCard,
  NewPropertiesNearbyHeaderNeo,
  NewPropertiesNearbyHeader,
  SearchBarHomepage,
  TextboxLabel,
  CarouselHeaderNeo,
  SearchBarNeo,
  Dropdown,
  DropdownProperty,
  DropdownKota,
  FrameArticle
} from "../../components/molecules";
import {
  CarouselJelajahProperty,
  CarouselNewProperty,
  CarouselPromosi,
  CityCarousel,
  CityCarouselNeo,
  FloatingRating,
  InfoLelangCarousel,
  LandingPagePopup,
  Modal,
  PropertyCarousel,
  RatingReview,
  SnackBar,
} from "../../components/organisms";
import { getLocByLatLng } from "../../helpers/getLocByLatLng";
import { showSingleModal } from "../../store/actions/changeState";
import { invalidNumRegex, percentDecRegex } from "../../helpers/regex";
import useSearchPropertyHooks from "../../hooks/useSearchPropertyHooks";
import { currencyConst } from "../../static/details/currency";
import { periodConst } from "../../static/details/period";
import { sliderPromoConst } from "../../static/v2/sliderPromoConst";
import { selectedCurrency, selectedPeriod, setLongLat } from "../../store/actions/changeState";
import { listPropLandPage } from "../../store/actions/fetchData/inquiryProp";
import { decryptStr } from "../../helpers/encryptDecrypt";
import { facebookCallback, googleCallback } from "../../store/actions/fetchData/socialMedia";
import ContentLoader from "react-content-loader";
import { fetchPost } from "../../helpers/fetchApi";
import { Button } from "flowbite-react";
import { bannerFetch, searchSuggestion } from "../../store/actions/fetchData/landing-page"
import { infoLelangProject } from "../../store/actions/fetchData/info-lelang";
import { formatRupiahNumber } from "../../helpers/string";
import { ListArticle } from "../../store/actions/fetchData/article-fetch";

Geocode.setApiKey(process.env.REACT_APP_GMAPS_APIKEY);
Geocode.setLanguage("id");
Geocode.setRegion("id");

const Dashboard = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginReducer)
  const {resApi: userProps} = loginState;
  const sliderState = useSelector((state) => state.sliderReducer);
  const [filterDataLoc, setFilterDataLoc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [gimmickOptions, setGimmickOptions] = useState([]);
  const [calcState, setCalcState] = useState({
    gimmick: {
      value: {
        biayaAdminNominal: 0,
        biayaProvisiNominal: 0,
        floatingRate: 0,
        name: "Pilih Program Suku Bunga",
        requestType:"visitor",
        gimmickType: "",
      },
    },
    uangCicilan:{
      msgError: ''
    }
  });
  const [dataArticle, setDataArticle] = useState([])
  const [listArticle, setListArticle] = useState({
    limit: 4,
    page: 0,
    keyword: "",
    type: "article",
    order: "-published_at",
    search:""
  });
  const {
    bodySearchProp,
    dataProperty,
    setDataProperty,
    kabKota,
    setKabKota,
    lngLat,
    setLngLat,
    dataNearby,
    setDataNearby,
    dataVirtual,
    setDataVirtual,
  } = useSearchPropertyHooks();
  const dispatch = useDispatch();
  const [infolelangdata, setInfolelangdata] = useState([])
  const [queryParam] = useSearchParams();
  const [showFloatingRating, setShowFloatingRating] = useState(false);
  const userTipe = decryptStr(userProps?.userType);
  useEffect(() => {
    if(loginState.isLoggedIn && decryptStr(JSON.parse(cookie.get("morgateCookie"))?.userType) === "visitor") {
      setShowFloatingRating(true);
    }
  }, []);
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
          nameSearch: "",
          requestType:"visitor"
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

  let isMobile = false;

  useEffect(() => {
    isMobile = window.innerWidth <= 768;
  }, [window.innerWidth]);

  useEffect(() => {
    if (queryParam?.get("code") !== undefined && queryParam?.get("code") !== null) {
      if (queryParam?.get("state") === "gstate") {
        dispatch(googleCallback(queryParam?.get("code"), dispatch));
      } else if (queryParam?.get("state") === "state") {
        dispatch(facebookCallback(queryParam?.get("code"), dispatch));
      } else {
        // do nothing
      }
    }
  }, [queryParam?.get("code")]);

  useEffect(() => {
    dispatch(selectedPeriod(periodConst.period[2]));
    dispatch(selectedCurrency(currencyConst.currency[0]));
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", { bubbles: true, cancelable: true })
    );
  }, []);

  useEffect(() => {
    dispatch(ListArticle(listArticle, setDataArticle));
  }, []);

  // const handleSearchChange = (evt) => {
  //   if (evt.target.value !== "") {
  //     if(evt.target.value.length >= 3){
  //       console.log("input search is 3 or more")
  //     }
  //     if (
  //       filterDataLoc.nameType === undefined ||
  //       (filterDataLoc.nameType === "" && filterDataLoc.type === undefined) ||
  //       filterDataLoc.type === ""
  //     ) {
  //       if (filterDataLoc.minPrice > 0 || filterDataLoc.maxPrice < 100000000000) {
  //         setFilterDataLoc({
  //           ...filterDataLoc,
  //           search: evt.target.value,
  //           nameType: "Semua",
  //           type: "all",
  //           searchBtn: true,
  //         });
  //       } else {
  //         setFilterDataLoc({
  //           ...filterDataLoc,
  //           search: evt.target.value,
  //           nameType: "Semua",
  //           type: "all",
  //           minPrice: Number(0),
  //           maxPrice: Number(100000000000),
  //           searchBtn: true,
  //         });
  //       }
  //     } else {
  //       setFilterDataLoc({
  //         ...filterDataLoc,
  //         search: evt.target.value,
  //         searchBtn: true,
  //       });
  //     }
  //   } else {
  //     setFilterDataLoc({
  //       ...filterDataLoc,
  //       search: evt.target.value,
  //       searchBtn: false,
  //     });
  //   }
  // };

  const handleKeyDown = (evt) => {
    if (filterDataLoc?.searchBtn === true) {
      if (evt.key === "Enter" || evt.type === "click") {
        if (!!filterDataLoc) {
          window.localStorage.setItem("filterLoc", JSON.stringify(filterDataLoc));

          navigate({
            pathname: "/v2/search",
            // search: `?type=price`,
            search: `?type=price&lat=${lngLat?.lat}&lng=${lngLat?.lng}`
          });
        }
      }
    }
  };

  const handleChangePrice = (evt, type) => {
    setFilterDataLoc({
      ...filterDataLoc,
      [type]: Number(evt.target.value),
      searchBtn: true,
    });
  };

  const handleRangePrice = (evt, min, max) => {
    setFilterDataLoc({
      ...filterDataLoc,
      minPrice: Number(min),
      maxPrice: Number(max),
      searchBtn: true,
    })
  }

  const onChangeType = (evt) => {
    setFilterDataLoc({
      ...filterDataLoc,
      nameType: evt.name,
      type: evt.value,
      searchBtn: true,
    });
  };

  const handleChangeCalc = (key, val) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "jangkaWaktu":
          return "Lama Pinjaman tidak valid";
        case "fixedRate":
          return "Suku Bunga tidak valid";
        case "floatRate":
          return "Floating Rate tidak valid";
        default:
          return "";
      }
    };
    if (!percentDecRegex.test(val) || val.length < 1 || val === "0" || val === "100") {
      setCalcState({
        ...calcState,
        [key]: { isValid: false, value: val, msgError: msgErrorbyName(key) },
      });
    } else {
      setCalcState({
        ...calcState,
        [key]: { isValid: !!val, value: val, msgError: "" },
      });
    }
  };

  const [tenorFixedRate, setTenorFixedRate] = useState(calcState?.gimmick?.value?.tenorFixedRate || 0);
  const [jangkaWaktu, setJangkaWaktu] = useState(calcState?.jangkaWaktu?.value || '');
  const [disableButton, setDisableButton] = useState();

  useEffect(() => {

    setTenorFixedRate(calcState?.gimmick?.value?.tenorFixedRate / 12 || 0);
  }, [calcState?.gimmick?.value?.tenorFixedRate / 12]);

  const handleJangkaWaktu = (key, val) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "jangkaWaktu":
          return "Tidak boleh kurang dari Masa Kredit Fix";
        default:
          return "";
      }
    };

    if (val < 1 || invalidNumRegex.test(val) || val < tenorFixedRate) {
      setCalcState({
        ...calcState,
        [key]: {
          isValid: false,
          value: val.replace(/[^0-9]/gi, ""),
          msgError: msgErrorbyName(key),
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [key]: { isValid: !!val, value: val.replace(/[^0-9]/gi, ""), msgError: "" },
      });
    }
    setJangkaWaktu(val);
  };

  useEffect(() => {
    if (jangkaWaktu < tenorFixedRate) {
      setCalcState((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "Tidak boleh kurang dari Masa Kredit Fix",
        },
      }));
    } else {
      setCalcState((prevState) => ({
        ...prevState,
        jangkaWaktu: {
          ...prevState.jangkaWaktu,
          msgError: "",
        },
      }));
    }
  
  }, [tenorFixedRate]);

  const handleChangeAlt = (name, value) => {
    const msgErrorbyName = (name) => {
      switch (name) {
        case "hargaRumah":
          return "Harga Rumah tidak valid";
        default:
          return "";
      }
    };
    if (value.length < 7 || value === "0" || invalidNumRegex.test(value) || value === undefined) {
      setCalcState({
        ...calcState,
        [name]: { isValid: false, value: value, msgError: msgErrorbyName(name) },
        dp: {
          isValid: false,
          value: 0,
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [name]: { isValid: !!value, value: value, msgError: "" },
        dp: {
          isValid: true,
          value: parseInt((value * 5) / 100),
        },
      });
    }
  };

  const handleGajiBulanan = (name, value) => {
    setCalcState({
      ...calcState,
      [name]: { isValid: true, value: value, msgError: "" },
    });
  };

  const handleUangMuka = (name, value) => {
    const hargaProperti = parseInt((calcState?.hargaRumah?.value * 5) / 100);
    if (hargaProperti > value) {
      setCalcState({
        ...calcState,
        [name]: {
          isValid: false,
          value: value,
          msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti",
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  const handleUangCicilan = (name, value) => {
    const gaji = parseInt(calcState?.gajiBulanan?.value);
    if (gaji < value) {
      setCalcState({
        ...calcState,
        [name]: {
          isValid: false,
          value: value,
          msgError: "Nominal cicilan melebihi Penghasilan Perbulan",
        },
      });
    } else {
      setCalcState({
        ...calcState,
        [name]: { isValid: true, value: value, msgError: "" },
      });
    }
  };

  const handleChangeGimmick = (value, name) => {
    setCalcState({
      ...calcState,
      [name]: { isValid: !!value, value: value },
    });
  };
  const [maximumPlafon, setMaximumPlafon] = useState();
  const [maximumAngsuran, setMaximumAngsuran] = useState();
  const [resultPenghasilan, setResultPenghasilan] = useState(false);
  const handleSimulasiCalc = (e) => {
    e.preventDefault();
    if (!!calcState) {
      const payload = {
        productDetails: false,
        dp: Number(calcState?.dp?.value),
        fixedRate: Number(calcState?.gimmick?.value?.fixedRate),
        floatRate: Number(calcState?.gimmick?.value?.floatingRate),
        jangkaWaktu: Number(calcState?.jangkaWaktu?.value),
        jangkaWaktuFixed: Number(calcState?.gimmick?.value?.tenorFixedRate),
        hargaRumah: Number(calcState?.hargaRumah?.value),
      };

      window.localStorage.setItem("simulasiCalc", JSON.stringify(payload));
      navigate("/kpr/simulasi");
    }
    
  };

  const handleResetCacl = (e) => {
    e.preventDefault();
    setCalcState({
      gimmick: {
        value: {
          biayaAdminNominal: 0,
          biayaProvisiNominal: 0,
          tenorFixedRate: 0,
          fixedRate: 0,
          floatingRate: 0,
          name: "Pilih Program Suku Bunga",
          requestType:"visitor",
          gimmickType: "",
        }
      },
      hargaRumah: { isValid: false, value: "", msgError: "" },
      jangkaWaktu: { isValid: false, value: "", msgError: "" },
      dp: { isValid: false, value: "", msgError: "" },
      jumlahPinjaman: { isValid: false, value: "", msgError: "" },
      gajiBulanan: { isValid: false, value: 0, msgError: "" },
      uangCicilan: { isValid: true, value: 0, msgError: "" },
    });
    setResultPenghasilan(false);
    setMaximumPlafon("");
    setMaximumAngsuran("");
  };


  const handlePenghasilanCalc = (e) => {
    e.preventDefault(); 
    if(switchPenghasilan === true){
      const gajiBulanan = calcState?.gajiBulanan?.value
      const uangCicilan = calcState?.uangCicilan?.value || 0
      const jangkaWaktu = calcState?.jangkaWaktu?.value * 12
      const fixedRate = calcState?.gimmick?.value?.fixedRate / 100
      let debtIncome
       if (gajiBulanan < 15000000) {
        debtIncome = 0.5;
      } else if (gajiBulanan < 25000000) {
        debtIncome = 0.55;
      } else {
        debtIncome = 0.6;
      }
      const maxCicilan = (gajiBulanan*debtIncome) - uangCicilan
      const maxPlafon = (maxCicilan / (fixedRate / 12)) * (1 - (1 / Math.pow((1 + (fixedRate / 12)), jangkaWaktu)))
      setMaximumAngsuran(maxCicilan)
      setMaximumPlafon(maxPlafon)
      setResultPenghasilan(true)
      setDisableButton(true)
    }
    
  };

  const [initialCalcState] = useState({
    gajiBulanan: { value: '', isValid: false },
    jangkaWaktu: { value: '', isValid: false },
    uangCicilan: { value: '', isValid: false },
    gimmick: { value: '', isValid: false },
  });

  useEffect(() => {
    const gajiBulananEdited = calcState?.gajiBulanan?.value !== initialCalcState?.gajiBulanan?.value;
    const jangkaWaktuEdited = calcState?.jangkaWaktu?.value !== initialCalcState?.jangkaWaktu?.value;
    const gimmickEdited = calcState?.gimmick?.value !== initialCalcState?.gimmick?.value;
    const cicilanEdited = calcState?.uangCicilan?.value !== initialCalcState?.uangCicilan?.value;

    if (gajiBulananEdited || jangkaWaktuEdited || gimmickEdited || cicilanEdited) {
      setDisableButton(false);
    }

    if (switchPenghasilan === true) {
      if (calcGajiArr.filter(Boolean).length !== 3 || 
          calcState?.jangkaWaktu?.msgError !== '' || 
          calcState?.uangCicilan?.msgError !== '') {
        setDisableButton(true);
      } 
      else {
        setDisableButton(false);
      }
    } 
  }, [calcState?.gajiBulanan?.value, calcState?.jangkaWaktu?.value, calcState?.gimmick?.value, calcState?.uangCicilan?.value]);

  const calcKPRSimArr = [
    // calcState?.dp?.isValid,
    calcState?.gimmick?.isValid,
    calcState?.hargaRumah?.isValid,
    calcState?.jangkaWaktu?.isValid,
  ];

  const calcGajiArr = [
    calcState?.gimmick?.isValid,
    calcState?.gajiBulanan?.isValid,
    calcState?.jangkaWaktu?.isValid,
  ];

  // useEffect(() => {
  //   const lat = position.coords.latitude
  //   const lng = position.coords.longitude
     
  //   dispatch(infoLelangProject(setDataProperty, dataProperty, { lat, lng }, 0, setTotalData));
     
  // }, []);

  const [totalData, setTotalData] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          listPropLandPage(
            {
              ...bodySearchProp,
              // longitude: 106.797188,
              // latitude: -6.190071,
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
            setDataProperty
          )
        );
        dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
        dispatch(infoLelangProject(setInfolelangdata, infolelangdata, { lat:position.coords.latitude, lng:position.coords.longitude }, 0, setTotalData));
        getLocByLatLng(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            const kabupatenKota = (res?.results[0]?.address_components || []).filter(
              (data) => data.types[0] === "administrative_area_level_2"
            )[0]?.long_name;
            setKabKota(kabupatenKota);
            setLngLat({
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            });
          })
          .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
      }, handleGeolocationError);
    } else {
      // Handle the case when geolocation is not supported by the browser
      console.error("Geolocation is not supported in this browser.");
      handleGeolocationError();
    }
  }, []);

  function handleGeolocationError(error) {
    //default location if location disabled or prompt
    dispatch(
      listPropLandPage(
        {
          ...bodySearchProp,
          longitude: process.env.REACT_APP_LONG_DEFAULT,
          latitude: process.env.REACT_APP_LAT_DEFAULT,
        },
        setDataProperty
      )
    );
    dispatch(setLongLat(process.env.REACT_APP_LONG_DEFAULT, process.env.REACT_APP_LAT_DEFAULT));
    getLocByLatLng(process.env.REACT_APP_LONG_DEFAULT, process.env.REACT_APP_LAT_DEFAULT)
      .then((res) => {
        const kabupatenKota = (res?.results[0]?.address_components || []).filter(
          (data) => data.types[0] === "administrative_area_level_2"
        )[0]?.long_name;
        setKabKota(kabupatenKota);
        setLngLat({
          lng: process.env.REACT_APP_LONG_DEFAULT,
          lat: process.env.REACT_APP_LAT_DEFAULT,
        });
      })
      .catch((err) => console.log("Get Loc by Lat Lng Error : ", err));
  }

  useEffect(() => {
    if (Number(calcState?.dp?.value) < Number(calcState?.hargaRumah?.value)) {
      setCalcState({
        ...calcState,
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: Number(calcState?.hargaRumah?.value) - Number(calcState?.dp?.value),
        },
      });
    } else if (
      Number(calcState?.dp?.value) === Number(calcState?.hargaRumah?.value) ||
      Number(calcState?.dp?.value) > Number(calcState?.hargaRumah?.value)
    ) {
      setCalcState({
        ...calcState,
        dp: {
          ...calcState?.dp,
          isValid: false,
          value: Number(calcState?.hargaRumah?.value),
        },
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: 0,
        },
      });
    } else if (isNaN(Number(calcState?.dp?.value)) || isNaN(Number(calcState?.hargaRumah?.value))) {
      setCalcState({
        ...calcState,
        dp: {
          ...calcState?.dp,
          value: 0,
        },
        jumlahPinjaman: {
          ...calcState?.jumlahPinjaman,
          value: Number(calcState?.hargaRumah || 0),
        },
      });
    }
  }, [calcState?.dp?.value]);

  useEffect(() => {
    if (dataProperty.length !== 0) {
      const dataNearby = [];

      dataProperty?.responseData?.[0]?.propertiTerdekat[0]?.detailPropertiDtoResList?.map(
        (detail) => {
          const idEncrypted = decryptStr(detail.detailProperti.projectId);
          let properti = {
            id: idEncrypted,
            mediaProject:
              dataProperty?.responseData?.[0]?.propertiTerdekat[0]?.projectMap[idEncrypted]
                ?.mediaProject,
            namaProyek:
              dataProperty?.responseData?.[0]?.propertiTerdekat[0]?.projectMap[idEncrypted]
                ?.namaProyek,
            alamatProperti:
              dataProperty?.responseData?.[0]?.propertiTerdekat[0]?.projectMap[idEncrypted]
                ?.alamatProperti,
            kisaranHarga:
              dataProperty?.responseData?.[0]?.propertiTerdekat[0]?.projectMap[idEncrypted]
                ?.kisaranHarga,
            metadataDeveloper: detail.metadataDeveloper,
            imagesProject: detail.imagesProject,
          };
          dataNearby.push(properti);
        }
      );
      setDataNearby(dataNearby);

      const data360 = [];

      dataProperty?.responseData?.[0]?.properti360[0]?.detailPropertiDtoResList?.map((detail) => {
        const idEncrypted = decryptStr(detail.detailProperti.projectId);
        let properti = {
          id: idEncrypted,
          mediaProject:
            dataProperty?.responseData?.[0]?.properti360[0]?.projectMap[idEncrypted]?.mediaProject,
          namaProyek:
            dataProperty?.responseData?.[0]?.properti360[0]?.projectMap[idEncrypted]?.namaProyek,
          alamatProperti:
            dataProperty?.responseData?.[0]?.properti360[0]?.projectMap[idEncrypted]
              ?.alamatProperti,
          kisaranHarga:
            dataProperty?.responseData?.[0]?.properti360[0]?.projectMap[idEncrypted]?.kisaranHarga,
          metadataDeveloper: detail.metadataDeveloper,
          imagesProject: detail.imagesProject,
        };
        data360.push(properti);
      });

      setDataVirtual(data360);
    }
  }, [dataProperty]);

  const handleSearchbarClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the parent div
  };

  const [dynamicCarousel, setDynamicCarousel] = useState([])
  const [dynamicPopup, setDynamicPopup] = useState([])
  useEffect(() => {
    bannerFetch("Carousel", setDynamicCarousel)
    bannerFetch("Popup", setDynamicPopup);
  }, [])
  useEffect(() => {
    if (dynamicPopup?.[0]?.status === 'Active'){
      setShowPopup(true)
    } else {
      setShowPopup(false)
    }
  }, [dynamicPopup?.[0]?.status])


  const [switchPenghasilan, setSwitchPenghasilan] = useState(true);
  const [switchProperti, setSwitchProperti] = useState(false);

  const handleCalcPenghasilan = () => {
    setSwitchPenghasilan(true);
    setSwitchProperti(false);
  };

  const handleCalcProperti = () => {
    setSwitchProperti(true);
    setSwitchPenghasilan(false);
  };

  return (

    <div className="">
<div className="absolute top-0 -z-10" style={{ backgroundImage: `url("images/background-nearby.png")`, backgroundRepeat: "no-repeat", backgroundSize:"cover", height: "200px", width: "100%" }}></div>

      {/* new style */}
      <div className="flex flex-col mb-8 h-[30rem] mobile:h-[409px]">
          <div className="flex flex-col item-center h-[182px]">
            <CarouselPromosi images={dynamicCarousel} />
          </div>
          <SnackBar message="Terima kasih, penilaianmu berhasil dikirim!"/>
          {userTipe === 'visitor' && ( 
            <div className="z-[50] absolute">
            <FloatingRating />
            </div>
          )}
          <div
            className="
            z-40 
            largePc:py-[2%]
            xxl:py-[5%]
            miniPc:py-[6%]
            small:py-[6.7%] 
            mobile:py-[8%]
            xl:py-[7%]
            lg:py-[7%]
            xxl:px-[25%] 
            largePc:px-[15%] 
            miniPc:px-[20%]
            small:px-[15%]
            tab:px-[5%] 
            lg:px-[10%]
            xl:px-[15%]
            smallPc:px-[4%] 
            mobile:px-[5%]"
            onClick={handleSearchbarClick}
          > 
            <SearchBarNeo
              sliderState={sliderState}
              minRange={100000000}
              maxRange={100000000000}
              handleKeyDown={handleKeyDown}
              onChangeType={onChangeType}
              filterDataLoc={filterDataLoc}
              setFilterDataLoc={setFilterDataLoc}
              handleChangePrice={handleRangePrice}
              defaultValue={[0, 10000000000]}
              value={[filterDataLoc?.minPrice || 0, filterDataLoc?.maxPrice || 100000000000]}
              onChangeSlider={(props) => {
                setFilterDataLoc({
                  ...filterDataLoc,
                  minPrice: props[0],
                  maxPrice: props[1],
                  searchBtn: true,
                });
              }}
              enableLabelClick={filterDataLoc?.nameType ? filterDataLoc?.searchBtn : false}
              fetch={searchSuggestion}
              lngLat={lngLat}
            />
          </div>

      </div>

      {showPopup === true && <LandingPagePopup dynamicPopUp={dynamicPopup} showPopup={showPopup} setShowPopup={setShowPopup} />}
      <div className="px-12 gap-4 pb-4 xxl:-mt-8 largePc:-mt-16 flex flex-row mobile:px-1 mobile:mt-0 mobile:grid mobile:grid-cols-2 mobile:justify-items-center mobile:pb-6 justify-center">
        <div className="bg-[#F8F9F9] rounded-2xl flex flex-col items-center w-[318px] h-[168px] mobile:w-[156px] mobile:h-[172px] p-4 cursor-pointer" onClick={() => {window.location.href = "#kalkulator"}}>
           <img className="w-16 h-16" src="icons/small-icons/Properti-Kalkulator.svg"></img>
           <span className="text-lg mobile:text-sm font-semibold">Simulasi KPR</span>
           <span className="text-sm mobile:text-xs text-center font-medium text-[#777777]">Cari tahu perkiraaan cicilan untuk properti pilihanmu dengan mudah</span>
        </div>
        <div className="bg-[#F8F9F9] rounded-2xl flex flex-col items-center w-[318px] h-[168px] mobile:w-[156px] mobile:h-[172px] p-4 cursor-pointer"
         onClick={() => window.location.href = `/v2/search?type=second&lat=${lngLat?.lat}&lng=${lngLat?.lng}`}  >
           <img className="w-16 h-16" src="icons/small-icons/Properti-second.svg"></img>
           <span className="text-lg mobile:text-sm font-semibold">Properti Second</span>
           <span className="text-sm mobile:text-xs text-center font-medium text-[#777777]">Cari beragam pilihan properti second murah dan berkualitas</span>
        </div>
        <div className="bg-[#F8F9F9] rounded-2xl flex flex-col items-center w-[318px] h-[168px] mobile:w-[156px] mobile:h-[172px] p-4 cursor-pointer"
         onClick={() => {
          navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
            window.location.href = `/properti-secondary?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
          });
          localStorage.removeItem('FilterInfoLelang')
          localStorage.removeItem('infolelangDetail')
          localStorage.removeItem('infolelangUtj')
          }
        }
        >
           <img className="w-16 h-16" src="icons/small-icons/Properti-AssetBank.svg"></img>
           <span className="text-lg mobile:text-sm font-semibold text-center">Properti Aset Bank</span>
           <span className="text-sm mobile:text-xs text-center font-medium text-[#777777]">Dapatkan properti murah meriah yang aman dan terpercaya</span>
        </div>
        <div className="bg-[#F8F9F9] rounded-2xl flex flex-col items-center w-[318px] h-[168px] mobile:w-[156px] mobile:h-[172px] p-4 cursor-pointer"
        onClick={() => window.location.href = `/v2/search?type=diskon&lat=${lngLat?.lat}&lng=${lngLat?.lng}`} >
           <img className="w-16 h-16" src="icons/small-icons/Properti-HunianPromo.svg"></img>
           <span className="text-lg mobile:text-sm font-semibold">Hunian Promo</span>
           <span className="text-sm mobile:text-xs text-center font-medium text-[#777777]">Dapatkan diskon spesial untuk berbagai hunian menarik</span>
        </div>
      </div>
      {/* <div className="absolute top-[775px] -z-10" style={{ backgroundImage: `url("images/background-nearby.svg")`, backgroundRepeat: "no-repeat", backgroundSize:"cover", height: "341px", width: "100%" }}></div> */}
      <div className="flex flex-col gap-6">
      <div className="pt-6" style={{ backgroundImage: `url("images/background-nearby.png")`, backgroundRepeat: "no-repeat", backgroundSize:"100% 70%", width:"auto", height:"auto" }}>
      <div className="px-12 flex flex-col mobile:px-1">
      <div className="flex flex-row pt-6 pb-4 px-6 mobile:px-3 justify-between">
        <p className="text-[28px] mobile:text-[18px] mobile:leading-[28px] leading-[42px] font-bold text-[#292929]">Properti di Sekitarmu</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer" onClick={() => window.location.href = `/v2/search?type=nearby&lat=${lngLat?.lat}&lng=${lngLat?.lng}`}>Lihat Semua</p>
        </div>
        <div className="mobile:pl-3 pl-6">
            <DropdownKota
            placeholder={kabKota}
            />
        </div>
        <div className="mobile:-ml-3">
          {dataProperty?.responseData?.[0]?.propertiTerdekat !== undefined ? (
            <PropertyCarousel
              is360={false}
              property={dataProperty?.responseData?.[0]?.propertiTerdekat || []}
            />
          ) : (
            <ContentLoader
              width={700}
              height={300}
              viewBox="0 0 700 300"
              backgroundColor="#f5f5f5"
              foregroundColor="#dbdbdb"
            >
              <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
              <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
              <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
              <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
              <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
              <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
              <rect x="455" y="60" rx="0" ry="0" width="200" height="120" />
              <rect x="455" y="189" rx="0" ry="0" width="200" height="15" />
              <rect x="455" y="211" rx="0" ry="0" width="140" height="15" />
              <rect x="667" y="60" rx="0" ry="0" width="200" height="120" />
              <rect x="667" y="188" rx="0" ry="0" width="200" height="15" />
              <rect x="667" y="209" rx="0" ry="0" width="140" height="15" />
            </ContentLoader>
          )}
        </div>
        </div>
        </div>
      <div className="px-12 mobile:px-1">
        <div className="flex flex-row pt-6 mobile:px-4 px-7 justify-between">
        <p className="text-[28px] mobile:text-[18px] mobile:leading-[28px] leading-[42px] font-bold text-[#292929]">Virtual Tour 360°</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer" onClick={() => window.location.href = `/v2/search?type=virtual`}>Lihat Semua</p>
        </div>
        <p className="text-[#777777] text-base mobile:text-sm font-medium pt-2 pl-7 mobile:pl-4">
          Jelajahi keseluruhan isi rumah dengan virtual 360°
        </p>
        <div className="mobile:-ml-3">
        <PropertyCarousel
          is360={true}
          property={dataProperty?.responseData?.[0]?.properti360 || []}
        />
        </div>
      </div>
      <div className="px-12 mobile:px-1">
      <div className="" style={{ backgroundImage: `url("images/Background-city.png")`, backgroundRepeat: "no-repeat", backgroundSize:"100% 75%", width:"auto", height:"auto" }}>
        <div className="flex pt-6 flex-col px-6">
        <div className="flex flex-row justify-between">
        <p className="text-[28px] leading-[42px] mobile:text-[18px] mobile:leading-[28px] font-bold text-[#292929]">Cari Berdasarkan Kota</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer" onClick={() => window.location.href = `/v2/search?type=city-only&cityName=all`}>Lihat Semua</p>
        </div>
        <p className="text-[#777777] font-medium mobile:text-sm">
          Cari properti impian di berbagai kota pilihan
        </p>
        <div className="mobile:-ml-3 mobile:w-[360px]">
          <CityCarouselNeo dataMap={dataProperty?.responseData?.[0]?.propertiByCity || []} />
        </div>
        </div>
        </div>
      </div>
     {typeof dataProperty?.responseData?.[0]?.propertiDiscount?.[0] !== 'undefined' &&
     <div className="px-12 mobile:px-1 pt-2">
      <div className="flex flex-row justify-between px-6 mobile:px-3 pt-3">
        <p className="text-[28px] leading-[42px] mobile:text-[18px] mobile:leading-[28px] font-bold text-[#292929]">Hunian Harga Promo</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer" onClick={() => window.location.href = `/v2/search?type=diskon&lat=${lngLat?.lat}&lng=${lngLat?.lng}`}>Lihat Semua</p>
        </div>
        <p className="text-[#777777] mobile:pl-3 pl-6 font-medium mobile:text-sm pt-2">
        Kejar diskon spesial sekarang dan dapatkan hunian dengan promo terbatas
        </p>
        <div className="mobile:-ml-3 -mt-1">
        <PropertyCarousel
          is360={true}
          property={dataProperty?.responseData?.[0]?.propertiDiscount || []}
        />
        </div>
      </div>
      }
      {typeof dataProperty?.responseData?.[0]?.propertiSecondary?.[0] !== 'undefined' &&
        <div className="px-12 mobile:px-1">
      <div className="flex flex-row justify-between px-6 mobile:px-3">
        <p className="text-[28px] leading-[42px] mobile:text-[18px] mobile:leading-[28px] font-bold text-[#292929]">Properti Second</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer" onClick={() => window.location.href = `/v2/search?type=second&lat=${lngLat?.lat}&lng=${lngLat?.lng}`}>Lihat Semua</p>
        </div>
        <p className="text-[#777777] mobile:pl-3 pl-6 font-medium mobile:text-sm pt-2">
        Dapatkan berbagai piihan properti second terbaik di sini
        </p>
        <div className="mobile:-ml-3">
        <PropertyCarousel
          is360={true}
          property={dataProperty?.responseData?.[0]?.propertiSecondary || []}
        />
        </div>
      </div>
      }
      {totalData > 0 &&
        <div className="px-12 mobile:px-1">
      <div className="flex flex-row justify-between px-6 mobile:px-3">
        <p className="text-[28px] leading-[42px] mobile:text-[18px] mobile:leading-[28px] font-bold text-[#292929]">Properti Aset Bank</p>
        <p className="text-base mobile:text-sm text-[#1078CA] font-bold cursor-pointer"  onClick={() => {
          navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(setLongLat(position.coords.longitude, position.coords.latitude));
            window.location.href = `/properti-secondary?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
          });
          localStorage.removeItem('FilterInfoLelang')
          localStorage.removeItem('infolelangDetail')
          localStorage.removeItem('infolelangUtj')
          }
        }>Lihat Semua</p>
        </div>
        <p className="text-[#777777] mobile:pl-3 pl-6 font-medium pt-2">
        Cari properti menarik dengan harga murah meriah dan dijamin aman
        </p>
        <div className="mobile:-ml-3 ml-3">
        <InfoLelangCarousel
          is360={false}
          property={infolelangdata || []}
        />
        </div>
      </div>
      }
      </div>
      {/* <div className="mb-8 mt-9">
        <CarouselPromosi images={sliderPromoConst} />
      </div> */}
      <div className="py-12 px-12 mobile:px-1">
      <div id="kalkulator" style={{ backgroundImage:`url("images/Simulasi KPR.png")`, backgroundRepeat: "no-repeat", backgroundSize:"100% 100%", width:"auto", height:"auto" }}>
        <div className="flex flex-row mobile:px-5 mobile:flex-col largePc:justify-between largePc:gap-0 xxl:justify-center xxl:gap-16 miniPc:justify-center miniPc:gap-16 small:justify-center small:gap-16">
      <div className="flex flex-col w-[450px] h-[290px] mobile:w-[328px] mobile:h-[76px] justify-center mobile:justify-start mobile:items-start mobile:pt-2 items-center pt-12">
        <p className="text-[28px] leading-[42px] font-bold text-center mobile:text-lg mobile:text-start">Simulasi KPR</p>
        <p className="text-base font-medium text-center text-[#666666] mobile:text-start mobile:text-sm">Lihat hasil simulasi cicilan KPR dengan mudah sesuai pilihanmu.</p>
        <img className="w-[347px] h-[180px] mobile:hidden" src="images/Rectangle 10184.png"></img>
      </div>
      <div className="w-[726px] mobile:w-[360px] flex flex-col pt-12 pb-12 pr-12 mobile:pr-0 mobile:pt-2">
      <div className="flex flex-row gap-2 pb-4 mobile:pt-2 mobile:flex-row mobile:overflow-x-scroll mobile:w-[362px]">
      <div className={`border flex w-[251px] px-1 flex-shrink-0 -mt-1 rounded-[36px] justify-center cursor-pointer ${switchPenghasilan === true ? "bg-[#DDEFFC] border-[#1078CA]": "bg-[#FFFFFF] border-[#D3D4D4]"}`} onClick={handleCalcPenghasilan}>
      <p className={`${switchPenghasilan === true ? "text-[#1078CA]" : "text-[#777777]"} py-2 px-4 whitespace-nowrap text-sm text-center font-semibold mobile:whitespace-nowrap`}>Hitung berdasarkan Penghasilan</p> 
      </div>
      <div className={`border flex w-[251px] px-1 flex-shrink-0 -mt-1 rounded-[36px] justify-center cursor-pointer ${switchProperti === true ? "bg-[#DDEFFC] border-[#1078CA]": "bg-[#FFFFFF] border-[#D3D4D4]"}`} onClick={handleCalcProperti}>
      <p className={`${switchProperti === true ? "text-[#1078CA]" : "text-[#777777]"} py-2 px-4 whitespace-nowrap text-sm text-center font-semibold mobile:whitespace-nowrap`}>Hitung berdasarkan Harga Properti</p>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mobile:flex mobile:flex-col">
      {switchPenghasilan && (
              <>
            <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
              <LabelCalc text="Penghasilan Perbulan*" />
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="gajiBulanan"
                placeholder="Masukkan Penghasilan Perbulan"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={calcState?.gajiBulanan?.value}
                onValueChange={(value) => handleGajiBulanan("gajiBulanan", value || 0)}
              />
            </div>
            <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
              <LabelCalc text="Cicilan Lainnya*" />
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="uangCicilan"
                placeholder="Masukkan Cicilan Lainnya"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                // disabled={!calcState?.hargaRumah?.isValid}
                value={calcState?.uangCicilan?.value}
                onValueChange={(value) => handleUangCicilan("uangCicilan", value)}
                warnText={calcState?.uangCicilan?.msgError}
              />
            </div>
            <div className="flex flex-col gap-2 mobile:w-[355px]">
              <div className="text-[#292929] font-semibold whitespace-nowrap">
                <LabelCalc text="Program Suku Bunga*" />
              </div>
              <div className="-mb-2">
              <Dropdown
                value={calcState?.gimmick?.value}
                onChange={(value) => handleChangeGimmick(value, "gimmick")}
                data={gimmickOptions}
              />
              </div>
              <p className="landing-page calc-kpr__interest-info">
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mobile:gap-1 mobile:w-[350px]">
            <div className="flex flex-col gap-2">
            <div className="text-[#292929] font-semibold whitespace-nowrap">
            <LabelCalc text="Suku Bunga" />
            </div>
            <div className="-mt-2">
            <InputMasked
              className="textbox-label__currency placeholder:bg-[#EAEBEB] text-[#929393]"
              placeholder=""
              name="fixedRate"
              rightLabel="%"
              requireDecimal={true}
              value={calcState?.gimmick?.value?.fixedRate}
              onChange={(e) => handleChangeCalc("fixedRate", e.target.value)}
              disabled={true}
              rightLabelBorder={false}
            />
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="text-[#292929] font-semibold whitespace-nowrap">
            <LabelCalc text="Masa Kredit Fix" />
            </div>
            <div className="">
            <TextboxLabel
              className="text-[#929393]"
              name="masaKreditFix"
              rightLabel="tahun"
              rightLabelBorder={false}
              placeholder=""
              value={`${typeof calcState?.gimmick?.value?.tenorFixedRate !== 'undefined' ? calcState?.gimmick?.value?.tenorFixedRate / 12 : ""}`}
              maxLength={3}
              disabled={true}
            />
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="text-[#292929] font-semibold whitespace-nowrap">
            <LabelCalc text="Jangka Waktu*" />
            </div>
            <div className="">
            <TextboxLabel
              name="jangkaWaktu"
              rightLabel="tahun"
              placeholder=""
              rightLabelBorder={false}
              value={calcState?.jangkaWaktu?.value}
              onChange={(e) => handleJangkaWaktu("jangkaWaktu", e.target.value)}
              maxLength={2}
            />
            </div>
            {calcState?.jangkaWaktu?.msgError && (
        <span className="text-[#F04438] text-[12px] font-semibold">
          {calcState?.jangkaWaktu?.msgError}
        </span>
           )}
                </div>
              </div>
              <p className="text-[#777777] text-xs font-medium w-[726px] mobile:w-[355px]">
            *Perhitungan ini hanyalah estimasi, untuk hasil yang lebih akurat dan lengkap, silakan kunjungi kantor BRI terdekat.
            </p>
            </>
            )}
            {switchProperti && (
              <>
            <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
              <LabelCalc text="Harga Properti" />
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="hargaRumah"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={calcState?.hargaRumah?.value}
                onValueChange={(value) => handleChangeAlt("hargaRumah", value || 0)}
              />
            </div>
            {/* <div>
              <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
                <LabelCalc text="Jumlah Pinjaman" />
                <CurrencyInputCalc
                  className="textbox-label__currency"
                  name="jumlahPinjaman"
                  placeholder="0"
                  decimalsLimit={2}
                  groupSeparator="."
                  decimalSeparator=","
                  maxLength={16}
                  value={
                    calcState?.jumlahPinjaman?.value ||
                    calcState?.hargaRumah?.value - (calcState?.hargaRumah?.value * 5) / 100 ||
                    ""
                  }
                  disabled={true}
                  allowNegativeValue={false}
                  onValueChange={(value) => handleChangeAlt("jumlahPinjaman", value)}
                />
              </div>
            </div> */}
            <div className="flex flex-col gap-2 text-[#292929] font-semibold mobile:w-[355px]">
              <LabelCalc text="Uang Muka" />
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="dp"
                placeholder="0"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                // disabled={!calcState?.hargaRumah?.isValid}
                value={calcState?.dp?.value || ""}
                onValueChange={(value) => handleUangMuka("dp", value)}
                warnText={calcState?.dp?.msgError}
              />
               {(!calcState || !calcState.dp?.msgError) && (
              <p className="landing-page calc-kpr__interest-info mobile:hidden">
               Minimal 5% dari harga properti{" "}
               {!calcState && (
              <span className="text-[#F04438]">*Wajib diisi untuk melihat kalkulasi</span>
               )}
               </p>
               )}
            </div>
            <div className="flex flex-col gap-2 -mt-1 mobile:w-[355px]">
              <div className="text-[#292929] font-semibold">
                <LabelCalc text="Program Suku Bunga" />
              </div>
              <div className="">
              <Dropdown
                value={calcState?.gimmick?.value}
                onChange={(value) => handleChangeGimmick(value, "gimmick")}
                data={gimmickOptions}
                placeholder={"Pilih Program Suku Bunga"}
              />
              </div>
              <p className="landing-page calc-kpr__interest-info">
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mobile:w-[355px] mobile:gap-1">
            <div className="flex flex-col -mt-1 gap-2">
            <div className="text-[#292929] font-semibold">
            <LabelCalc text="Suku Bunga" />
            </div>
            <div className="-mt-2">
            <InputMasked
              className="textbox-label__currency text-[#929393]"
              placeholder=""
              rightLabel="%"
              name="fixedRate"
              requireDecimal={true}
              value={calcState?.gimmick?.value?.fixedRate}
              onChange={(e) => handleChangeCalc("fixedRate", e.target.value)}
              disabled={true}
              rightLabelBorder={false}
            />
            </div>
            </div>
            <div className="flex flex-col gap-2 -mt-1">
            <div className="text-[#292929] font-semibold">
            <LabelCalc text="Masa Kredit Fix" />
            </div>
            <TextboxLabel
              className="text-[#929393]"
              name="masaKreditFix"
              rightLabel="tahun"
              rightLabelBorder={false}
              placeholder=""
              value={`${typeof calcState?.gimmick?.value?.tenorFixedRate !== 'undefined' ? calcState?.gimmick?.value?.tenorFixedRate / 12 : ""}`}
              maxLength={3}
              disabled={true}
            />
            </div>  
            <div className="flex flex-col gap-2 -mt-1 flex-shrink-0">
            <div className="text-[#292929] font-semibold">
            <LabelCalc text="Jangka Waktu*" />
            </div>
            <div className="relative">
            <TextboxLabel
              name="jangkaWaktu"
              rightLabel="tahun"
              placeholder=""
              rightLabelBorder={false}
              disabled={!calcState?.hargaRumah?.isValid}
              value={calcState?.jangkaWaktu?.value}
              onChange={(e) => handleJangkaWaktu("jangkaWaktu", e.target.value)}
              maxLength={2}
            />
                  </div>
                  {calcState?.jangkaWaktu?.msgError && (
        <span className="text-[#F04438] text-[12px] font-semibold">
          {calcState?.jangkaWaktu?.msgError}
        </span>
           )}
                </div>
              </div>
           <p className="text-[#777777] pt-1 text-xs font-medium w-[726px] mobile:w-[355px]">
            *Perhitungan ini hanyalah estimasi, untuk hasil yang lebih akurat dan lengkap, silakan kunjungi kantor BRI terdekat.
            </p>
            </>
            )}
      </div>

            <div className="flex flex-row gap-2 justify-end py-2 mobile:flex-col">
            <Button
              className="border border-[#1078CA] text-[#1078CA] disabled:bg-[#EAEBEB] disabled:border-[#EAEBEB] disabled:text-[#B5B6B6] h-12 mobile:w-[355px]"
              onClick={handleResetCacl}
              paddingSize={"padding-0"}
              disabled={switchPenghasilan === true ? calcGajiArr.filter(Boolean).length === 0 : calcKPRSimArr.filter(Boolean).length === 0 }
            >
              <p className="text-base font-bold whitespace-nowrap px-3">Reset</p>  
            </Button>
            {switchPenghasilan &&
            <Button
              className="bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:border-[#EAEBEB] disabled:text-[#B5B6B6] h-12 mobile:w-[355px]"
              onClick={handlePenghasilanCalc}
              paddingSize={"padding-0"}
              disabled={disableButton === true}
            >
              <p className="text-base font-bold  px-3">Lihat Hasil Simulasi</p>
            </Button>}
            {switchProperti &&
            <Button
              className="bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:border-[#EAEBEB] disabled:text-[#B5B6B6] h-12 mobile:w-[355px]"
              onClick={handleSimulasiCalc}
              paddingSize={"padding-0"}
              disabled={calcKPRSimArr.filter(Boolean).length !== 3}
            >
              <p className="text-base font-bold  px-3">Lihat Hasil Simulasi</p>
            </Button>}
  
            </div>
            {switchPenghasilan &&
              <>
            {resultPenghasilan && (
            <div className="text-[20px] leading-[30px] font-bold py-4">
              <hr className="pb-4"></hr>
                  Hasil Simulasi KPR
                <div className="grid grid-cols-2 gap-3 mobile:flex mobile:flex-col py-2">
                  <div className="border border-[#F87304] bg-[#FEEDDF] flex flex-col rounded-lg">
                    <p className="text-sm whitespace-nowrap px-1 py-1">
                      Maksimum Plafon
                    </p>
                    <p className="text-[24px] leading-[36px] font-bold px-1 py-1">
                      {formatRupiahNumber(maximumPlafon)}
                    </p>
                  </div>
                  <div className="border flex flex-col bg-[#ffff] rounded-lg">
                    <p className="text-sm whitespace-nowrap px-1 py-1">
                      Angsuran Maksimal
                    </p>
                    <p className="text-[24px] leading-[36px] font-bold px-1 py-1">
                      {formatRupiahNumber(maximumAngsuran)}/bulan
                    </p>
                  </div>
                </div>
                </div>
            )}
            </>
            }
      </div>
      </div>
      </div>
      </div>
      {typeof dataArticle !== 'undefined' &&
      <div className="" style={{ backgroundImage: `url("images/background-nearby.png")`, backgroundRepeat: "no-repeat", backgroundSize:"100% 100%", width:"auto", height:"auto" }}>
      <div className="px-12 py-10 mobile:px-2">
      <div className="flex flex-row justify-between px-2 mobile:px-3 pt-3">
        <p className="text-[28px] leading-[42px] mobile:text-[18px] mobile:leading-[28px] font-bold text-[#292929]">Cari Info Tentang Properti?</p>
        <p className="text-base mobile:text-sm mobile:pt-1 text-[#1078CA] font-bold cursor-pointer whitespace-nowrap" onClick={() => window.location.href = `/homespot-update`}>Lihat Semua</p>
        </div>
        <p className="text-[#777777] font-medium mobile:text-sm mobile:pl-3 mobile:px-1 px-2 pt-1 pb-6">
        Jelajahi informasi terlengkap tentang properti tanpa bingung lagi
        </p>
        <div>
          <FrameArticle 
            data={dataArticle || []}
          />
          </div>
      </div>
      </div>
      }
      <div className="px-12 py-6 mobile:px-1">
         <div className="" style={{ backgroundImage: `${window.innerWidth <=768 ? `url("images/background-download.png")` : `url("images/Download App Banner_banner.png")`}`, backgroundRepeat: "no-repeat", backgroundSize:`${window.innerWidth <=768 ? "100% 50%" : "100% 100%"}`, width:"auto", height:"auto" }}>
          <div className="flex flex-col pl-[60px] mobile:pl-[20px] mobile:pt-[20px] pt-[60px] pb-[60px] w-[454px] mobile:w-[328px]">
            <p className="text-[28px] leading-[42px] mobile:text-[20px] mobile:leading-[30px] font-bold text-[#ffff]">Lebih Mudah Cari Rumah dengan Aplikasi Homespot</p>
            <p className="text-base font-medium mobile:text-sm text-[#ffff]">Download sekarang untuk cari rumah impianmu dengan mudah.</p>
            <p className="text-sm mobile:text-xs font-medium text-[#ffff] mt-4">Tersedia di</p>
          <div className="flex flex-row mt-4 gap-4">
          <img className="mobile:w-[142px] cursor-pointer" src="icons/Google-Play.svg" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.mobile.homespot_mobile_apps", "_blank")}></img>
          <img className="mobile:w-[142px] cursor-pointer" src="icons/App-Store.svg " onClick={() => window.open("https://apps.apple.com/id/app/homespot-mobile-apps/id6471478561?l=id", "_blank")}></img>
          </div>
          </div>
          <img className="pl-14 -mt-12 hidden mobile:block " src="images/mockup.png"></img>
          </div>
      </div>
      <br/>
      <div></div>
      <Footer />
    </div>
  );
};

export default Dashboard;
