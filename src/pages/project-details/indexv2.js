import _ from "lodash-contrib"
import cookie from "hs-cookie"
import { useEffect, useRef, useState } from "react"
import { openLink } from "../../helpers/newTab"
import { useDispatch, useSelector } from "react-redux"
import { json, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { 
    DetailsCard,
    Dropdown, 
    Footer, 
    Image3FramePrj, 
    Textbox,
    TextboxLabel, 
    EmptyState } from "../../components/molecules"
import { projectDetail, unitDetail, unitDetail2, recommendation, fasilitasUnitDetail, eventView} from "../../store/actions/fetchData/v2/detailProjectV2"
import useInputHooks from "../../hooks/useInputHooks"
import { Breadcrumb } from "flowbite-react"
import InitialsAvatar from "react-initials-avatar"
import { trimStr } from "../../helpers/string"
import { GmapsDetail, CarouselDetail, Modal } from "../../components/organisms"
import youtubeEmbed from "youtube-embed"
import ButtonGalery from "../../components/atoms/Button/button-galery"
import { formatRupiahWord } from "../../helpers/string"
import useSearchPropertyHooks from "../../hooks/useSearchPropertyHooks";
import { CurrencyInput, CurrencyInputCalc } from "../../components/atoms"
import { showApprovalKprModal, showMethodPaymentModal } from "../../store/actions/changeModalState"
import { showModalLogin } from "../../store/actions/changeState"
import { fetchPost } from "../../helpers/fetchApi"
import { invalidNumRegex } from "../../helpers/regex"
import Lightbox from "react-awesome-lightbox"
import { SA_SUCCESS } from "../../store/actions/types"
import { deleteSavedProp, inquiryListFavProp, saveProperty } from "../../store/actions/fetchData/favoriteProp"
import { closeModalFail, closeModalSuccess } from "../../store/actions/fetchData/superAdminState"
import { encryptStr, decryptStr } from "../../helpers/encryptDecrypt"
import { navItems } from "../../static/v2/detail-project/leftNav"
import { listFasilitas } from "../../static/v2/detail-project/typeFasilitas"
import ModalDetailPage from "../../components/organisms/Modal/modal-types/DetailPage/Component"
import { ModalListPropFavorite } from "../../components/organisms/Modal/modal-types/DetailPage/listFavoriteModal"
import useWindowDimensions from "../../utils/dimensions"

const ProjectDetails = ({email, emailView, userStatus, isType }) => {
    const { width } = useWindowDimensions()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [queryParam] = useSearchParams()
    const { id } = useParams()
    const [ activeTab, setActiveTab ] = useState(0)
    const onTabClick = (e, index) => setActiveTab(index)
    const state = useSelector((state) => state.stateReducer)
    const [gimmickOptions, setGimmickOptions] = useState([])
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
    })
    const [unitListData, setUnitListData] = useState({cluster: null, uncluster: null})
    const [prjData, setPrjData] = useState(null)
    const [fasData, setFasData] = useState(null)
    const [showLargeImg, setShowLargeImg] = useState(false)
    const [startIndexImg, setStartIndexImg] = useState(0)
    const [listImgSrc, setListImgSrc] = useState([])
    const [unitDtlData, setUnitDtlData] = useState(null)
    const [loadingDtlUnit, setLoadingDtlUnit] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const saState = useSelector((state) => state.superAdminReducer)
    const stateModal = useSelector((stateModal) => stateModal.modalReducer)
    const [recommendationUnit, setRecommendationUnit] = useState(null)
    const { lngLat } = useSearchPropertyHooks()
    const [Discount, setDiscount] = useState({})
    const [jangkaWaktu, setJangkaWaktu] = useState(dataInputCalc?.lamaPinjaman?.value || '')
    const [saveState, setSaveState] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [isModal, setIsModal] = useState({favProperti: false, zeroFavProperti: false, sameProperti: false})
    const [isModalFav, setIsModalFav] = useState(false)
    const [isSnackbar, setIsSnackbar] = useState(false)
    const [rangePrice, setRangePrice] = useState([])
    const [isSecondary, setIsSecondary] = useState()

    const [viewPort, setViewPort] = useState()

    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if(isType === "unit" && !queryParam?.get("fromneosearch")){
            dispatch(unitDetail({
                unitId: decodeURIComponent(id),
                setData: setPrjData,
                setLoading: setLoadingDtlUnit
            }))
            dispatch(fasilitasUnitDetail({
                unitId: decodeURIComponent(id),
                setData: setFasData,
                setLoading: setLoadingDtlUnit
            }))
        }else if (isType === "unit" && !!queryParam?.get("fromneosearch")) {
            dispatch(unitDetail2({
                unitId: decodeURIComponent(id),
                setData: setPrjData,
                setLoading: setLoadingDtlUnit
            }))
            dispatch(fasilitasUnitDetail({
                unitId: decodeURIComponent(id),
                setData: setFasData,
                setLoading: setLoadingDtlUnit
            }))
        } else if (!!queryParam?.get("fromrecommendation")){
            dispatch(projectDetail({ prjId: id, setData: setPrjData, email: email, from: "recommendation" }));
            localStorage.removeItem('infolelangUtj')
        } else {
            dispatch(projectDetail({ prjId: id, setData: setPrjData, email: email }));
            localStorage.removeItem('infolelangUtj')
        }
    }, [])

    useEffect(() => {
        const rangePrice = prjData?.responseData?.[0]?.project ? prjData?.responseData?.[0]?.project?.kisaranHarga.split(",") : prjData?.project?.kisaranHarga.split(",") || []
        setRangePrice(rangePrice)
        setIsSecondary(prjData?.detailProperti?.groupProperti ? decryptStr(prjData?.detailProperti?.groupProperti)?.split("|")[1] === "PROPERTI_SECONDARY" ? true : false : false)
        if(prjData && cookie.get("morgateCookie") && isType === "unit")
            dispatch(eventView(prjData, "unit-view"))
    },[prjData])
    
    useEffect(() => {
        const detailProperti = JSON.parse(localStorage.getItem("hargaProperti"))
        const detailUnit = JSON.parse(localStorage.getItem("detailUnit"))
        if(isType === "project"){
            if(detailProperti)
                setDiscount({
                    ...detailProperti,
                    isDiscount: detailProperti.diskonPersen && detailProperti.diskonPersen > 0 || detailProperti.diskonNominal && detailProperti.diskonNominal > 0
                })
        }else{
            if(detailUnit)
                setDiscount({
                    ...detailUnit,
                    isDiscount: detailUnit.diskonPersen && detailUnit.diskonPersen > 0 || detailUnit.diskonNominal && detailUnit.diskonNominal > 0
                })
        }
    },[localStorage.getItem("hargaProperti"), localStorage.getItem("detailUnit")])

    const [developerDetail, setDeveloperDetail] = useState({})
    useEffect(() => {
        if(prjData?.responseData?.[0]?.metadataUser){
            const data = {
                metadata: prjData?.responseData?.[0]?.metadataUser,
                mobileNoDeveloper: prjData?.responseData?.[0]?.mobileNoDeveloper
            }
            localStorage.setItem("detailDeveloper", JSON.stringify(data));
        }
    }, [prjData?.responseData?.[0]?.metadataUser, prjData?.responseData?.[0]?.mobileNoDeveloper]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("detailDeveloper"))
        if (data) {
          const metadata = JSON.parse(data.metadata);
          const mobileNoDeveloper = decryptStr(data.mobileNoDeveloper)
    
          setDeveloperDetail({
            nama: metadata.name ? metadata.name : "-",
            alamat: _.isJSON(metadata.address) ? JSON.parse(metadata.address)?.alamat : "-",
            mobileNoDeveloper: mobileNoDeveloper ? mobileNoDeveloper.replace("|", "").replace("+", "").replace(/^0/g, "62") : "-"
          })
        }
      }, [localStorage.getItem("detailDeveloper")])

    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const [mapsState, setMapsState] = useState({
        center: {
            lat: -6.22472,
            lng: 106.80778,
        },
        address: "",
        zoom: 17,
        gestureHandling: "cooperative",
    })

    useEffect(() => {
        if (prjData?.ownedBy === decryptStr(emailView)) {
            setSaveState(true);
          } else {
            setSaveState(false);
          }
    },[prjData?.detailProperti])

    useEffect(() => {
        if(queryParam.get('secondary') === 'true') {
            dispatch(recommendation({
                lat: Number(prjData?.project?.alamatProperti?.latitude),
                lng: Number(prjData?.project?.alamatProperti?.longitude),
                rentangHarga: {
                    min: rangePrice[0],
                    max: rangePrice[1],
                },
                type: "PropertySecond",
                setData: setRecommendationUnit
            }))
        } else if(isType === "unit"){
            dispatch(recommendation({
                lat: Number(prjData?.project?.alamatProperti?.latitude),
                lng: Number(prjData?.project?.alamatProperti?.longitude),
                rentangHarga: {
                    min: rangePrice[0],
                    max: rangePrice[1],
                },
                type: "Unit",
                setData: setRecommendationUnit
            }))
        } else if(isType === "project" ) {
            dispatch(recommendation({
                lat: Number(prjData?.responseData?.[0]?.project?.alamatProperti?.latitude),
                lng: Number(prjData?.responseData?.[0]?.project?.alamatProperti?.longitude),
                rentangHarga: {
                    min: rangePrice[0],
                    max: rangePrice[1],
                },
                type: "Project",
                setData: setRecommendationUnit
            }))
        } else {
            dispatch(recommendation({
                lat: -6.237383889005493,
                lng: 106.76236204825535,
                type: isType?.toUpperCase(),
                setData: setRecommendationUnit
            }))
        }
    },[rangePrice])

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
          fetchPost(
            `${process.env.REACT_APP_URL_MORTGAGE_API}/mes/api/v1/promo/listGimmick`,
            {
              status: "active",
              pageStart: 1,
              sortBy: "createdAt",
              sortDirection: "desc",
              nameSearch: "",
              requestType:"visitor",
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
    }, [])

    useEffect(() => {
        if (prjData?.responseData?.[0]?.imagesProject) {
          prjData?.responseData?.[0]?.imagesProject?.map((data) => {
            return setListImgSrc(listImgSrc => [...listImgSrc, { url: data?.sharedUrl, title: "" }]);
          })
        } else if (prjData?.imagesProperti){
            prjData?.imagesProperti?.map((data) => {
                return setListImgSrc(listImgSrc => [...listImgSrc, { url: data?.sharedUrl, title: ""}])
            })
        }
    }, [prjData?.responseData?.[0]?.imagesProject])

    useEffect(() => {
        if (prjData?.responseData?.[0]?.listClusters && _.isNull(unitListData) && prjData) {
            const AllCls = {propertiImagesMap :[] , properties: []}
            Object.keys(prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes).forEach((key) => {
                const properties = prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes[key].properties
                const propertiImagesMap = prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes[key].propertiImagesMap
                if (Array.isArray(properties)) {
                    AllCls.properties = AllCls.properties.concat(properties);
                }
                Object.keys(propertiImagesMap).forEach((imageKey) => {
                    AllCls.propertiImagesMap[imageKey] = propertiImagesMap[imageKey];
                })
              })
              setUnitListData({cluster: AllCls})
              setActiveType("cluster")
        }else{
            setUnitListData({uncluster: prjData?.responseData?.[0]?.propertiUnclustered?.[0]})
            setActiveType("uncluster")
        }
    }, [prjData?.responseData?.[0]])

    useEffect(() => {
        if(unitDtlData){
            setMapsState({
                ...mapsState,
                center: {
                    lat: Number(unitDtlData.project.alamatProperti.latitude),
                    lng: Number(unitDtlData.project.alamatProperti.longitude)
                }
            })
        }
    },[unitDtlData])


    const showImg = (imgIndex) => {
        setStartIndexImg(imgIndex);
        setShowLargeImg(true);
    }

    const takeListUnit = (type) => {
        if(type === "cluster"){
            if(prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes){
                const AllCls = {propertiImagesMap :[] , properties: []}
                Object.keys(prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes).forEach((key) => {
                    const properties = prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes[key].properties
                    const propertiImagesMap = prjData?.responseData?.[0]?.listClusters?.[0]?.detailDataClustersDtoRes[key].propertiImagesMap
                    if (Array.isArray(properties)) {
                        AllCls.properties = AllCls.properties.concat(properties);
                    }
                    Object.keys(propertiImagesMap).forEach((imageKey) => {
                        AllCls.propertiImagesMap[imageKey] = propertiImagesMap[imageKey];
                    })
                  })
                  setUnitListData({cluster: AllCls})
            } else {
                setUnitListData({cluster: null, uncluster: null})
            }
        }else{
            setUnitListData({uncluster: prjData?.responseData?.[0]?.propertiUnclustered?.[0]})
        }
    }

    const [activeIndex, setActiveIndex] = useState(null)
    const navRef = useRef([])
    
    useEffect(() => {
        const handleIntersection = (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = navRef.current.indexOf(entry.target);
              setActiveIndex(index);
            }
          });
        };
    
        const observer = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: '10px',
          threshold: 1,
        });
    
        navRef.current.forEach(section => {
          if (section) {
            observer.observe(section);
          }
        });
    
        return () => {
          navRef.current.forEach(section => {
            if (section) {
              observer.unobserve(section);
            }
          });
        };
      }, [])

    const [activeType, setActiveType] = useState(null);
    const handleType = (type) => {
        takeListUnit(type)
        setActiveType(type)
    }

    const handleShareButton = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        localStorage.setItem("snackBarSucces", "true")
        setIsSnackbar(true)
    }

    const handle360button = () => {
        openLink((isType === "unit") ? prjData?.project?.mediaProject?.virtual360Url : prjData?.responseData?.[0]?.project?.mediaProject?.virtual360Url, true)
    }

    const is360 = () => {
        if(prjData?.project?.mediaProject?.virtual360Url || prjData?.responseData?.[0]?.project?.mediaProject?.virtual360Url){
            return true
        }else{
            return false
        }
    }

    const [activeCategory, setActiveCategory] = useState("semua");
    const handleFilter = (category) => {
        setActiveCategory(category);
    }
    const handleBrosur = () => {
        openLink((isType === "unit") ? prjData?.brosurUrl : prjData?.responseData?.[0]?.brosurUrl, true)
    }

    const [notFound, setNotFound] = useState(false)
    const [listProp, setListProp] = useState({})
    const [checkListFavModal, setCheckListFavModal] = useState(false)

    useEffect(() => {
        if (checkListFavModal) {
            const filtered = listProp?.fetchedListProp?.filter((val) => {
                return !String(val.detailProperti.namaProperti)?.includes(prjData?.detailProperti?.namaProperti)
            })
            const hasSameProperti = {
                same: listProp?.fetchedListProp?.some((val) => String(val.detailProperti.namaProperti)?.includes(prjData?.detailProperti?.namaProperti)),
                data: listProp?.fetchedListProp?.filter((val) => {
                    return String(val.detailProperti.namaProperti)?.includes(prjData?.detailProperti?.namaProperti)
                })
            }
            if (!notFound && filtered.length > 0) {
                setListProp({data: listProp.fetchedListProp, sameProperti: hasSameProperti?.data?.[0]})
                setIsModalFav(true)
            } else if (!notFound && hasSameProperti?.same){
                setIsModal({ sameProperti: true})
            } else {
                setIsModal({ zeroFavProperti: true })
            }
          setCheckListFavModal(false)
        }
    }, [listProp, prjData?.detailProperti?.namaProperti, checkListFavModal])
      
    const handleCompare = (type, val) => {
        if(type === "openModal"){
            if(cookie.get("morgateCookie")){
                dispatch(inquiryListFavProp(email, (fetchedListProp) => {
                    setListProp({...listProp, fetchedListProp})
                    setCheckListFavModal(true)
                }, setNotFound))
            }else{
                dispatch(showModalLogin(!state.showModalLogin))
            }
        }else{
            openLink(`/unit-details/${encodeURIComponent(prjData?.detailProperti?.id)}/compare/${encodeURIComponent(val)}/?secondary=${isSecondary}&from=${prjData?.detailProperti?.namaProperti}`)
        }
    }

    const filteredFasilitasAkses = () => {
        if (isType === "project"){
        return prjData?.responseData?.[0]?.fasAksesProperti?.filter(field => {
          switch (activeCategory) {
            case 'transportasi':
              return field.tipeFasilitas === 'Halte' || field.tipeFasilitas === 'Gerbang Tol' || field.tipeFasilitas === 'Stasiun';
            case 'sekolah_universitas':
              return field.tipeFasilitas === 'Sekolah' || field.tipeFasilitas === 'Universitas';
            case 'fasilitas_umum':
              return field.tipeFasilitas === 'Taman' || field.tipeFasilitas === 'Apotek' || field.tipeFasilitas === 'Rumah Ibadah' || field.tipeFasilitas === 'Restoran' || field.tipeFasilitas === 'Pasar' || field.tipeFasilitas === 'Rumah Sakit';
            case 'hiburan':
              return field.tipeFasilitas === 'Mall' || field.tipeFasilitas === 'Kolam Renang' || field.tipeFasilitas === 'Bioskop' || field.tipeFasilitas === 'Gym';
            default:
              return true;
          }
        });
    }

    if (isType === "unit"){
        return fasData?.fasAksesProperti?.filter(field => {
          switch (activeCategory) {
            case 'transportasi':
              return field.tipeFasilitas === 'Halte' || field.tipeFasilitas === 'Gerbang Tol' || field.tipeFasilitas === 'Stasiun';
            case 'sekolah_universitas':
              return field.tipeFasilitas === 'Sekolah' || field.tipeFasilitas === 'Universitas';
            case 'fasilitas_umum':
              return field.tipeFasilitas === 'Taman' || field.tipeFasilitas === 'Apotek' || field.tipeFasilitas === 'Rumah Ibadah' || field.tipeFasilitas === 'Restoran' || field.tipeFasilitas === 'Pasar' || field.tipeFasilitas === 'Rumah Sakit';
            case 'hiburan':
              return field.tipeFasilitas === 'Mall' || field.tipeFasilitas === 'Kolam Renang' || field.tipeFasilitas === 'Bioskop' || field.tipeFasilitas === 'Gym';
            default:
              return true;
          }
        });
    }
      };

    const splitListFasilitas = (array) => {
        const midpoint = Math.ceil(array?.length / 2);
        const firstHalf = array?.slice(0, midpoint);
        const secondHalf = array?.slice(midpoint);
        return [firstHalf, secondHalf];
    }
    const filteredListFasilitas = filteredFasilitasAkses()
    const [firstHalf, secondHalf] = splitListFasilitas(filteredListFasilitas)
    const [seeAllFasilitas, setSeeAllFasilitas] = useState(false)
    const splitListFasilitasMobile = seeAllFasilitas ? filteredListFasilitas : filteredListFasilitas?.slice(0,5)
    const allFasilitas = () => {
        if(filteredListFasilitas.filter(Boolean).length > 5)
            setSeeAllFasilitas((prevState) => !prevState)
    }

    useEffect(() => {
        setDataInputCalc({
          ...dataInputCalc,
          hargaProperti: {
            ...dataInputCalc?.hargaProperti,
            value: Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti,
          },
          hargaAkhir:{
            ...dataInputCalc?.hargaAkhir,
            value: Discount?.hargaAkhir,
          },
          jumlahPinjaman: {
            ...dataInputCalc?.jumlahPinjaman,
            value: Discount?.hargaAkhir !== null ? (Discount?.hargaAkhir) - Number(dataInputCalc?.uangMuka?.value) : (Discount?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value),
          },
          uangMuka: {
            ...dataInputCalc?.uangMuka,
            value: Discount?.hargaAkhir !== null ? Discount?.hargaAkhir * 5 / 100 : Discount?.hargaProperti * 5 / 100,
            isValid: true,
          },
        })
    }, [])

    useEffect(() => {
        if (Number(dataInputCalc?.uangMuka?.value) < Number(Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti)) {
            setDataInputCalc({
                ...dataInputCalc,
                jumlahPinjaman: {
                    ...dataInputCalc?.jumlahPinjaman,
                    value: Number(Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
                }
            });
        } else if (Number(dataInputCalc?.uangMuka?.value) >= Number(Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti)) {
            setDataInputCalc({
            ...dataInputCalc,
            uangMuka: {
                ...dataInputCalc.jumlahPinjaman,
                msgError: "Uang Muka tidak boleh sama atau melebihi harga Properti"
            },
            jumlahPinjaman: {
                ...dataInputCalc?.jumlahPinjaman,
                value: 0
            }
            })
        } else if (isNaN(Number(dataInputCalc?.uangMuka?.value))) {
            setDataInputCalc({
            ...dataInputCalc,
            uangMuka: {
                ...dataInputCalc?.uangMuka,
                value: Discount?.hargaAkhir !== null ? Discount?.hargaAkhir * 5 / 100 : Discount?.hargaProperti * 5 / 100,
                isValid: true,
            }
            })
        } else {
            setDataInputCalc({
                ...dataInputCalc,
                uangMuka: {
                    ...dataInputCalc.uangMuka,
                    isValid: !!Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
                    msgError: "Uang Muka tidak boleh sama dengan Harga Properti"
            },
            jumlahPinjaman: {
                ...dataInputCalc?.jumlahPinjaman,
                value: Number(Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti) - Number(dataInputCalc?.uangMuka?.value)
            }
            })
        }
    }, [dataInputCalc?.uangMuka?.value])

    const handleUangMuka = (value, name) => {
        if(name === "uangMuka") {
            const hargaAkhir = parseInt(Discount?.hargaAkhir * 5 / 100)
            const hargaProperti = parseInt(Discount?.hargaProperti * 5 / 100)
            if (hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
                });
            } else if (hargaAkhir !== null ? value === hargaAkhir : value === dataInputCalc?.hargaProperti?.value) {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: false, value: value, msgError: "Uang Muka tidak boleh sama dengan atau melebihi harga properti" },
                });
            } else {
                setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" },
                });
            }
        } else if(name === "jumlahPinjaman") {
            setDataInputCalc({
                ...dataInputCalc, [name]: { isValid: true, value: value, msgError: "" }
            })
        }
    }

    const handleChangeAlt = (value, name) => {
        const hargaAkhir = parseInt(Discount?.hargaAkhir?.value * 5 / 100)
        const hargaProperti = parseInt(Discount?.hargaProperti * 5 / 100);
        if (name === "uangMuka" && hargaAkhir !== null ? hargaAkhir > value : hargaProperti > value) {
          setDataInputCalc({
            ...dataInputCalc, [name]: { isValid: !!value, value: value, msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti" },
          });
        } else if (name === "uangMuka" && value === 0 || name === "uangMuka" && isNaN(value)) {
          setDataInputCalc({
            ...dataInputCalc,
            jumlahPinjaman: {
              ...dataInputCalc.jumlahPinjaman,
              isValid: !!Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti),
              value: Number(dataInputCalc?.hargaAkhir !== null ? dataInputCalc?.hargaAkhir : dataInputCalc?.hargaProperti)
            },
            [name]: {
              isValid: false,
              value: value,
              msgError: "Uang Muka tidak boleh dibawah dari 5% Harga Properti"
            }
          })
        } else {
          setDataInputCalc({
            ...dataInputCalc, [name]: { isValid: !!value, value: value, msgError: "" },
          });
        }
    }

    const handleLamaPinjaman = (evt) => {
        if (evt.target.value.length < 1 ) {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: false, value: evt.target.value.replace(invalidNumRegex, ""), msgError: "Jangka waktu wajib diisi" },
          });
        } else if (evt.target.value === "0") {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: false, value: "", msgError: "Jangka waktu tidak boleh bernilai nol" },
          });
        } else if (evt.target.value < dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 ) {
            setDataInputCalc({
                ...dataInputCalc,
                [evt.target.name]: { isValid: false, value: evt.target.value, msgError: "Tidak boleh kurang dari Masa Kredit Fix" },
              });
        }else {
          setDataInputCalc({
            ...dataInputCalc,
            [evt.target.name]: { isValid: true, value: evt.target.value.replace(invalidNumRegex, "")},
          });
        }
        setJangkaWaktu(evt.target.value)
    }


    const calculatorCondition = [
        dataInputCalc?.uangMuka?.isValid,
        dataInputCalc?.lamaPinjaman?.isValid,
        dataInputCalc?.gimmick?.value?.name !== "Pilih Program Suku Bunga"
    ]

    const [currentLngLat, setCurrentLngLat] = useState({
        longitude: 0,
        latitude: 0
    })
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLngLat({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            })
          })
        } else {
          console.error("Geolocation is not supported in this browser.")
        }
    }, [])

    const handleConvertCalc = () => {
        window.localStorage.setItem(
            "simulasiCalc",
            JSON.stringify({ ...dataInputCalc, hargaAkhir: Discount?.hargaAkhir, hargaProperti: Discount?.hargaProperti, productDetail: true })
        );
        window.localStorage.setItem("detailProperti", JSON.stringify({ ...prjData }));
        window.location.href = "/kpr/simulasi";
    }

    const handleResetCalc = () => {
        setDataInputCalc({
            ...dataInputCalc,
            floatingRate: "0",
            tenorFixedRate: "0",
            lamaPinjaman: {
                value: "0",
                msgError: ""
            },
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
        })
    }

    const checkSpesification = [
        !!prjData?.detailProperti?.lt,
        !!prjData?.detailProperti?.jmlKmrMandi,
        !!prjData?.detailProperti?.kelengkapanProperti?.dapur,
        !!prjData?.detailProperti?.informasiProperti?.dayaListrik,
        !!prjData?.detailProperti?.informasiProperti?.hadapRumah,
        !!prjData?.detailProperti?.lb,
        !!prjData?.detailProperti?.parkirMobil,
        !!prjData?.detailProperti?.kelengkapanProperti?.jalurPDAM,
        !!prjData?.detailProperti?.kelengkapanProperti?.ruangKerja,
        !!prjData?.detailProperti?.informasiProperti?.sertifikat,
        !!prjData?.detailProperti?.jmlKmrTidur,
        !!prjData?.detailProperti?.kelengkapanProperti?.ruangKeluarga,
        !!prjData?.detailProperti?.kelengkapanProperti?.jalurTelepone,
        !!prjData?.detailProperti?.informasiProperti?.tahunBangun
    ]

    const [allSpesification, setAllSpesification] = useState(false)
    const seeAllSpesification = () => {
        if(checkSpesification.filter(Boolean).length > 5)
            setAllSpesification((prevState) => !prevState)
    }

    // console.log((isType === "unit") ? "[DEBUG]: Unit Mode" : "[DEBUG]: Project Mode", prjData)
    // console.log("here data from unitDtlData :", unitDtlData)
    // console.log("[DEBUG]: Total true calculator ?/4", calculatorCondition)
    // console.log("[DEBUG]: data from dataInputCalc :", dataInputCalc, calculatorCondition)
    // console.log("Discount Variable", Discount)
    // console.table("here data from unitListData: ", unitListData)
    // console.table("here data from recommendationUnit: ", recommendationUnit)

    const handleFavorite = () => {
        if(cookie.get("morgateCookie")){
            const data = {
                email: email,
                emailView: emailView,
                id: unitDtlData ? encryptStr(decryptStr(unitDtlData?.detailProperti?.id)) : encryptStr(decryptStr(prjData?.detailProperti?.id))
            }
            if(!saveState && !saveLoading){
                dispatch(saveProperty({
                    email: data.email,
                    propertiId: data.id,
                },
                    setSaveLoading,
                    data.emailView,
                    setSaveState
                ))
                setIsModal({favProperti: true})
                dispatch(eventView({...prjData, status: true}, "unit-wishlist"))
            }else{
                dispatch(deleteSavedProp(
                    data.email,
                    data.id,
                    setSaveState
                ))
                dispatch(eventView({...prjData, status: false}, "unit-wishlist"))
            }
        } else {
            dispatch(showModalLogin(!state.showModalLogin))
        }
    }

    return (
        <div className="min-h-screen">
            {showLargeImg && <Lightbox showTitle={false} images={listImgSrc} onClose={() => setShowLargeImg(false)} startIndex={startIndexImg} />}
            {stateModal.showApprovalKprModal === true ? (
                <Modal
                    closeModal={() => {
                        dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal))
                    }}
                    modalTypes="KprSubmissionV2"
                    title="Pengajuan Pembelian KPR"
                    data={prjData}
                    otherProps={{
                        dataInputCalc,
                        gimmickOptions,
                        setDataInputCalc,
                        Discount
                    }}
                />
            ) : (<></>)
            }
            {isSnackbar === true && localStorage.getItem("snackBarSucces") && (
                <Snackbar message="Berhasil menyalin tautan" />
            )}
            {saState.success === true && !isModal.favProperti && !isModal.zeroFavProperti && (
                <Modal
                    closeModal={() => dispatch(closeModalSuccess())}
                    modalTypes="modalSF"
                    title=""
                    titleBody={saState.titleSuccess}
                    descBody={saState.msgSuccess}
                />
            )}
            {isModal.favProperti === true && (
                <ModalDetailPage
                    closeModal={() => { 
                        setIsModal({favProperti: false})
                        dispatch(closeModalSuccess())
                    }}
                    onClickLanjut={() => {
                        setIsModal({favProperti: false})
                        dispatch(closeModalSuccess())
                    }}
                    isModal={isModal.favProperti}
                    isFavProperty={false}
                />
            )}
            {isModal.zeroFavProperti === true && (
                <ModalDetailPage
                    closeModal={() => { 
                        setIsModal({zeroFavProperti: false});
                        dispatch(closeModalSuccess());
                    }}
                    onClickLanjut={() => openLink("/", false)}
                    isModal={isModal.zeroFavProperti}
                    isFavProperty={true}
                />
            )}
            {isModal.sameProperti === true && (
                <ModalDetailPage
                    closeModal={() => { 
                        setIsModal({sameProperti: false});
                        dispatch(closeModalSuccess());
                    }}
                    onClickLanjut={() => openLink("/", false)}
                    isModal={isModal.sameProperti}
                    isFavProperty={true}
                    isSameProperty={true}
                />
            )}
            {isModalFav === true && (
                <ModalListPropFavorite closeModal={() => {
                    setIsModalFav(false);
                    dispatch(closeModalSuccess())
                }} isModal={isModalFav} data={listProp} handleCompare={handleCompare} />
            )}
            <div className="prj-detail-v2__background_img" 
                style={{ backgroundImage: `url("/images/Backdrop_detailPage.svg")`, 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize:"cover", 
                    height: width < 768 ? "532px" : "341px", width: "100%" }}
            ></div>
                <div className="prj-detail-v2__wrapper">
                    <div className="prj-detail-v2__breadcrumb">
                        <Breadcrumb>
                            <span className="font-semibold text-sm cursor-pointer text-[#1078CA]" onClick={() => navigate('/', { replace: true}) } >
                                Home
                            </span>
                            { isType === "unit" && (
                                <Breadcrumb.Item>
                                    <span className="font-semibold text-sm cursor-pointer text-[#1078CA]" onClick={() => openLink(`/project-details/${encodeURIComponent(prjData?.project?.id)}`) }>{ prjData?.project?.namaProyek }</span>
                                </Breadcrumb.Item>
                            )
                            }
                            <Breadcrumb.Item>
                                <span className="text-sm font-medium text-[#777777]">{ isType === "project" ? prjData?.responseData?.[0]?.project?.namaProyek : prjData?.detailProperti?.namaProperti }</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Image3FramePrj
                        isMobile={width < 768 ? true : false}
                        type={isType}
                        dataImg={ (isType === "unit") ? prjData?.imagesProperti : prjData?.responseData?.[0]?.imagesProject}
                        onClickImg0={() => showImg(0)}
                        onClickImg1={() => showImg(1)}
                        onClickImg2={() => showImg(2)}
                        isDiscount={Discount}
                        isSave= {saveState}
                        is360={is360()}
                        isSecondary={isSecondary}
                        functionButton={
                            {
                                handleShareButton,
                                handle360button,
                                handleFavorite,
                                handleBrosur
                            }
                        }
                    />
                    <div className="prj-detail-v2__content">
                        {width > 768 && (
                            <div className="prj-detail-v2__left-content">
                                {navItems(isType).map((nav, index) => (
                                    <LeftNav
                                        key={index}
                                        name={nav.name}
                                        link={nav.link}
                                        isActive={activeIndex === index}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="prj-detail-v2__right-content">
                            <section>
                                <div id="informasiProperti" ref={el => navRef.current[0] = el}>
                                    <div className="prj-detail-v2__informationProperti__priceSection">
                                        { isType !== "unit" && Discount?.isDiscount && (
                                            <p className="text-[#777777] font-medium text-[14px] content-end">Mulai Dari</p>
                                        )}
                                        <p className={`${isType !== "unit" ?(Discount?.isDiscount ? 'content-start' : 'row-span-2 content-center') : 'row-span-2 content-center'}`}>
                                            { Discount?.isDiscount ? (
                                                <div className="flex justify-center items-center">
                                                    <span className="prj-detail-v2__informationProperti__oldPrice">{formatRupiahWord(Discount?.hargaProperti || prjData?.responseData?.[0]?.project?.kisaranHarga?.split(",")[0] || prjData?.detailProperti?.hargaAkhir)}</span>
                                                    <span className="prj-detail-v2__informationProperti__price">{formatRupiahWord(Discount?.hargaAkhir || prjData?.responseData?.[0]?.project?.kisaranHarga?.split(",")[0] || prjData?.detailProperti?.hargaProperti)}</span>
                                                </div>
                                            ) : (
                                                <span className="prj-detail-v2__informationProperti__price">{formatRupiahWord(Discount?.hargaAkhir || prjData?.responseData?.[0]?.project?.kisaranHarga?.split(",")[0] || prjData?.detailProperti?.hargaProperti)}</span>
                                            )}
                                            
                                        </p>
                                        {width > 768 && (
                                            <div className="row-span-2 content-center">
                                                {isType === "unit" ? <>
                                                <button className="flex items-center px-3 py-2 border border-solid border-[#1078CA] rounded-md w-full h-[48px] gap-2" onClick={() => handleCompare("openModal")}>
                                                    <img src="/icons/small-icons/Bandingkan_properti.svg" alt="icon-neraca"/>
                                                    <p className="text-[#1078CA] font-bold text-[16px]">Bandingkan Properti</p>
                                                </button></> : 
                                                <>
                                                <button className="flex items-center px-3 py-2 border border-solid border-[#1078CA] rounded-md w-full h-[48px]" onClick={() => handleBrosur()}>
                                                    <p className="text-[#1078CA] font-bold text-[16px]">Download Brosur</p>
                                                </button>
                                                </>}
                                            </div>
                                        )}
                                    </div>
                                    <p className="prj-detail-v2__informationProperti__title">{isType === "project" ? prjData?.responseData?.[0]?.project?.namaProyek : prjData?.detailProperti?.namaProperti }</p>
                                    { isType === "project" ? <>
                                    <p className="prj-detail-v2__informationProperti__title-2">{
                                        _.isJSON(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat) ?
                                            JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(prjData?.responseData?.[0]?.project?.alamatProperti?.alamat)?.provinsi
                                            : "-"
                                        }
                                    </p></> : <>
                                    <p className="prj-detail-v2__informationProperti__title-2">{
                                        _.isJSON(prjData?.project?.alamatProperti?.alamat) ?
                                            JSON?.parse(prjData?.project?.alamatProperti?.alamat)?.kecamatan + ", " + JSON?.parse(prjData?.project?.alamatProperti?.alamat)?.provinsi
                                            : "-"
                                        }
                                    </p>
                                    { isSecondary  && (
                                        <div className="pt-3">
                                            <div className="bg-[#FCF2D2] rounded-full w-fit p-2">
                                                <p className="font-semibold text-[#DEAB10] text-[10px]">Properti Secondary</p>
                                            </div>
                                        </div>
                                    )}
                                    </>}
                                    {width > 768 ? (
                                        <div className="py-6">
                                            <hr className="bg-[#D3D4D4] border-[1px]" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-row gap-2 py-4 w-full">
                                            <ButtonGalery setClass="grow" type="v360" onClick={handle360button}/>
                                            {isType === "unit" && <ButtonGalery setClass="grow" type={saveState ? "liked" : "like"} onClick={handleBrosur} /> }
                                            {isType === "unit" && <ButtonGalery setClass="grow" type="compare" /> }
                                            <ButtonGalery setClass="grow" type="share" onClick={handleShareButton} />
                                            <ButtonGalery setClass="grow" type="download" onClick={handleBrosur} />
                                        </div>
                                    )}
                                    {width < 768 && (
                                        <div className="prj-detail-v2__left-content prj-detail-v2__left-content-mobile ">
                                        {navItems(isType).map((nav, index) => (
                                            <LeftNav
                                                key={index}
                                                name={nav.name}
                                                link={nav.link}
                                                isActive={activeIndex === index}
                                                setClass="flex"
                                            />
                                        ))}
                                        </div>
                                    )}
                                    <div className="gap-2">
                                        <p className="text-[20px] font-bold text-[#292929]">{ isType === "project" ? "Informasi Perumahan" : "Informasi Properti" }</p>
                                        { isType === "project" ? <>
                                            <p className="text-justify">{unitDtlData?.detailProperti?.deskripsiProperti || prjData?.responseData?.[0]?.project?.deskripsiProyek}</p>
                                        </> : <>
                                            <p className="text-justify">{prjData?.detailProperti?.deskripsiProperti}</p>
                                        </>}
                                    </div>
                                    <div className="gap-2">
                                        <p className="text-[#292929] text-[16px] font-bold py-4">{isSecondary ? "Kantor Cabang" : "Developer"}</p>
                                        <DetailsCard>
                                            <div className="prod-detail__pages__property__detailBuying__left__dev-info__wrapper">
                                                <div className="prod-detail__pages__property__detailBuying__left__dev-info__profile-dev">
                                                    <InitialsAvatar
                                                        className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic"
                                                        name={isSecondary ? prjData?.adminCabang?.kanwil : developerDetail?.nama ?? "-"}
                                                    />
                                                    <div className="prod-detail__pages__property__detailBuying__left__dev-info__name">
                                                        <p>{isSecondary ? trimStr({string: prjData?.adminCabang?.kanwil, maxLength: 50}) : trimStr({string: developerDetail?.nama, maxLength: 50}) ?? "-"}</p>
                                                        <p className="prod-detail__pages__property__detailBuying__left__dev-info__location">{isSecondary ? prjData?.adminCabang?.kancab : developerDetail?.alamat ?? "-"}</p>
                                                    </div>
                                                    {width > 768 ? (
                                                        <div className="prod-detail__pages__property__detailBuying__left__dev-info__wa-btn">
                                                            <button className="flex flex-row gap-2 items-center px-3 py-2 border border-solid border-[#1078CA] rounded-md w-full h-[48px]" onClick={() => openLink(`https://api.whatsapp.com/send?phone=${isSecondary ? decryptStr(prjData?.project?.noHpPic)?.replace("|", "").replace("+", "").replace(/^0/g, "62") : developerDetail?.mobileNoDeveloper ? developerDetail?.mobileNoDeveloper : ''}`, true)}>
                                                                <img src="/icons/small-icons/whatsapp-blue.svg" alt="wa-icon" />
                                                                <p className="text-[#1078CA] font-bold miniPc:text-[16px] small:text-[14px] xxl:text-[16px] xl:text-[13px]">Hubungi {isSecondary ? "Penjual" : "Developer"}</p>
                                                            </button>
                                                        </div>
                                                    ) : (<></>)}
                                                </div>
                                            </div>
                                        </DetailsCard>
                                    </div>
                                    {isType === "unit" && (
                                        <div className="gap-2">
                                            <p className="text-[#292929] text-[16px] font-bold py-4">Spesifikasi</p>
                                            {width > 768 ?
                                                    (<div className="border rounded-xl border-[#D3D4D4]">
                                                        <div className="flex p-4">
                                                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-transparent">
                                                                { 
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/LT_Normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.lt} m²</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorshower.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.jmlKmrMandi} Kamar Mandi</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.dapur ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/kitchen.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Dapur</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/electricity.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900 text-center">{prjData?.detailProperti?.informasiProperti?.dayaListrik} kwH</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/house_normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.informasiProperti?.hadapRumah.toUpperCase()}</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </div>
                                                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-l border-[#D3D4D4]">
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/LB_Normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.lb} m²</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.parkirMobil ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorgarage.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Carport</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.jalurPDAM ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/pdam_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Jalur PDAM</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.ruangKerja ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/study_room.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Ruang Kerja</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/note_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Dokumen {prjData?.detailProperti?.informasiProperti?.sertifikat.toUpperCase()}</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </div>
                                                            <div className="flex flex-col gap-4 w-1/3 p-4 border-r border-transparent">
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorbeedroom.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.jmlKmrTidur} Kamar Tidur</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.ruangKeluarga ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/Living_Room_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Ruang Keluarga</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.jalurTelepone ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorsambungan_telepon.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Sambungan Telepon</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/house_normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Dibangun Tahun {prjData?.detailProperti?.informasiProperti?.tahunBangun}</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>)
                                            : (
                                                <div className="grid grid-cols-1 gap-3 p-4 border rounded-xl border-[#D3D4D4]">

                                                    { 
                                                        isType === "unit" ? (
                                                            <div className="flex flex-row gap-2">
                                                                <img src="/icons/small-icons/LT_Normal.svg"/>
                                                                <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.lt} m²</div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    {
                                                        isType === "unit" ? (
                                                            <div className="flex flex-row gap-2">
                                                                <img src="/icons/small-icons/properti-secondary/Vectorshower.svg"/>
                                                                <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.jmlKmrMandi} Kamar Mandi</div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    {
                                                        isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.dapur ? (
                                                            <div className="flex flex-row gap-2">
                                                                <div className="w-[21px] h-[21px]">
                                                                    <img src="/icons/small-icons/kitchen.svg"/>
                                                                </div>
                                                                <div className="font-medium text-sm text-gray-900">Dapur</div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    {
                                                        isType === "unit" ? (
                                                            <div className="flex flex-row gap-2">
                                                                <img src="/icons/small-icons/electricity.svg"/>
                                                                <div className="font-medium text-sm text-gray-900 text-center">{prjData?.detailProperti?.informasiProperti?.dayaListrik} kwH</div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    {
                                                        !!allSpesification && (
                                                            <>
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/house_normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.informasiProperti?.hadapRumah.toUpperCase()}</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/LB_Normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.lb} m²</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.parkirMobil ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorgarage.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Carport</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.jalurPDAM ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/pdam_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Jalur PDAM</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.ruangKerja ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/study_room.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Ruang Kerja</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/note_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Dokumen {prjData?.detailProperti?.informasiProperti?.sertifikat.toUpperCase()}</div>
                                                                        </div>
                                                                    ) : null
                                                                }{
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorbeedroom.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">{prjData?.detailProperti?.jmlKmrTidur} Kamar Tidur</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.ruangKeluarga ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/detail-page/Living_Room_detail.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Ruang Keluarga</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" && prjData?.detailProperti?.kelengkapanProperti?.jalurTelepone ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/properti-secondary/Vectorsambungan_telepon.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Sambungan Telepon</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {
                                                                    isType === "unit" ? (
                                                                        <div className="flex flex-row gap-2">
                                                                            <img src="/icons/small-icons/house_normal.svg"/>
                                                                            <div className="font-medium text-sm text-gray-900">Dibangun Tahun {prjData?.detailProperti?.informasiProperti?.tahunBangun}</div>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        checkSpesification.filter(Boolean).length > 5 &&  (
                                                            <div className="flex flex-row gap-2 justify-center items-center cursor-pointer" onClick={() => seeAllSpesification()}>
                                                                <p className="font-bold text-[#1078CA] text-[14px]">{!allSpesification ? "Lihat Lebih Banyak" : "Lihat Lebih Sedikit"}</p>
                                                                <img src="/icons/small-icons/detail-page/chevron_down.svg" alt="cursor dropdown" />
                                                            </div> 
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {isType === "project" && (
                                    <div id="pilihanUnit" className="gap-2" ref={el => navRef.current[1] = el}>
                                        <div className="gap-4">
                                            <p className="text-[20px] font-bold text-[#292929] py-4">Pilihan Unit</p>
                                            <div className="flex flex-row gap-2">
                                                <UnitButton type="Cluster" active={activeType === 'cluster'} handleClick={() => handleType("cluster")} />
                                                <UnitButton type="Non Cluster" active={activeType === 'uncluster'} handleClick={() =>  handleType("uncluster")} />
                                            </div>
                                        </div>
                                        <div id="unit">
                                            {
                                                activeType === "cluster" ? (
                                                    !unitListData.cluster ? (
                                                        <EmptyState Header="Unit Cluster Tidak Tersedia" Subheader="Saat ini belum ada unit cluster yang ditawarkan. coba cek pilihan unit non cluster, yuk." />
                                                    ) : (
                                                        <div className="py-4 max-w-[1110px]">
                                                            <CarouselDetail
                                                                cols={width <= 1700 ? 2 : 3}
                                                                isProject={isType === "project" ? true : false}
                                                                typeCarousel="properti"
                                                                property={unitListData.cluster}
                                                            />
                                                        </div>
                                                    ) 
                                                ) : (
                                                    !unitListData.uncluster ? (
                                                        <EmptyState Header="Unit Non Cluster Tidak Tersedia" Subheader="Saat ini belum ada unit non cluster yang ditawarkan. coba cek pilihan unit cluster, yuk." />
                                                    ) : (
                                                        <div className="py-4 max-w-[1110px]">
                                                            <CarouselDetail
                                                                cols={width <= 1700 ? 2 : 4}
                                                                isProject={isType === "project" ? true : false}
                                                                typeCarousel="properti"
                                                                property={unitListData.uncluster}
                                                            />
                                                        </div>
                                                    ) 
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                <div id="aksesDanfasilitas" ref={isType === "project" ? el => navRef.current[2] = el : el => navRef.current[1] = el}>
                                <h1 className="font-bold text-[20px] pt-4">Akses & Fasilitas</h1>
                                    {width < 768 ? (
                                        <>
                                        <div className="prj-detail-v2__left-content prj-detail-v2__left-content-mobile">
                                            <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-full ${activeCategory === "semua" ? 'bg-[#DDEFFC] text-[#1078CA] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("semua")}><p className="flex items-center mobile:whitespace-nowrap">Semua</p></button>
                                            <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-full ${activeCategory === "transportasi" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("transportasi")}><p className="flex items-center mobile:whitespace-nowrap">Transportasi</p></button>
                                            <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-full ${activeCategory === "sekolah_universitas" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4] '}`} onClick={() => handleFilter("sekolah_universitas")}><p className="flex items-center mobile:whitespace-nowrap">Sekolah & Universitas</p></button>
                                            <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-full ${activeCategory === "fasilitas_umum" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4]'}`} onClick={() => handleFilter("fasilitas_umum")}><p className="flex items-center mobile:whitespace-nowrap">Fasilitas Umum</p></button>
                                            <button className={`flex items-center px-4 py-2 font-medium text-sm rounded-[16px] border border-solid w-full ${activeCategory === "hiburan" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border-[#D3D4D4]'}`} onClick={() => handleFilter("hiburan")}><p className="flex items-center mobile:whitespace-nowrap">Hiburan</p></button>
                                        </div>
                                        <div className="p-4 grid grid-cols-1 gap-3 border rounded-xl border-[#D3D4D4]">
                                            {splitListFasilitasMobile?.map((field, index) => {
                                                const facility = listFasilitas.type[field?.tipeFasilitas?.replaceAll(" ", "")]
                                                return (
                                                    <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                                        <div className="flex flex-row items-center">
                                                            <img src={facility?.img} alt={facility?.text} />
                                                            <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas}</p>
                                                        </div>
                                                        <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh} {field.satuan}</p>
                                                    </div>
                                                )
                                            })}
                                            { splitListFasilitasMobile?.length < 1 && (
                                                <div className="flex flex-col gap-4 justify-between items-center w-full">
                                                    <img alt="noAkses&Fasilitas" src="/images/No_Akses_Fasilitas.svg" />
                                                    <p className="font-bold text-[#292929] whitespace-nowrap text-start text-xs">Informasi Akses & Fasilitas belum tersedia</p>
                                                </div>
                                            )}  
                                            { filteredListFasilitas?.filter(Boolean).length > 5 && (
                                                <div className="flex flex-row gap-2 justify-center items-center cursor-pointer" onClick={() => allFasilitas()}>
                                                    <p className="font-bold text-[#1078CA] text-[14px]">{!seeAllFasilitas ? "Lihat Lebih Banyak" : "Lihat Lebih Sedikit"}</p>
                                                    <img src="/icons/small-icons/detail-page/chevron_down.svg" alt="cursor dropdown" />
                                                </div> 
                                            )}
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                        <div className="flex flex-row mt-4 h-[36px] gap-2 w-full">
                                            <button className={`px-4 py-2 rounded-md font-medium text-sm w-fit ${activeCategory === "semua" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border border-solid border-[#D3D4D4] rounded-[16px]'}`} onClick={() => handleFilter("semua")}><p className="flex items-center mobile:whitespace-nowrap">Semua</p></button>
                                            <button className={`px-4 py-2 rounded-md font-medium text-sm w-fit ${activeCategory === "transportasi" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border border-solid border-[#D3D4D4] rounded-[16px]'}`} onClick={() => handleFilter("transportasi")}><p className="flex items-center mobile:whitespace-nowrap">Transportasi</p></button>
                                            <button className={`px-4 py-2 rounded-md font-medium text-sm w-fit ${activeCategory === "sekolah_universitas" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border border-solid border-[#D3D4D4] rounded-[16px]'}`} onClick={() => handleFilter("sekolah_universitas")}><p className="flex items-center mobile:whitespace-nowrap">Sekolah & Universitas</p></button>
                                            <button className={`px-4 py-2 rounded-md font-medium text-sm w-fit ${activeCategory === "fasilitas_umum" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border border-solid border-[#D3D4D4] rounded-[16px]'}`} onClick={() => handleFilter("fasilitas_umum")}><p className="flex items-center mobile:whitespace-nowrap">Fasilitas Umum</p></button>
                                            <button className={`px-4 py-2 rounded-md font-medium text-sm w-fit ${activeCategory === "hiburan" ? 'bg-[#DDEFFC] text-[#1078CA] rounded-[16px] font-semibold' : 'bg-[#ffffff] text-[#777777] border border-solid border-[#D3D4D4] rounded-[16px]'}`} onClick={() => handleFilter("hiburan")}><p className="flex items-center mobile:whitespace-nowrap">Hiburan</p></button>
                                        </div>
                                        <div className="py-4 w-full h-fit">
                                            <div className={`flex flex-row border rounded-xl border-[#D3D4D4] justify-start gap-5 w-full`}>
                                                {firstHalf?.length > 0 ? (
                                                    <>
                                                        <div className="relative flex flex-col gap-4 w-full justify-start items-start pl-5 p-5 pr-5 h-fit">
                                                        {firstHalf?.map((field, index) => {
                                                            const facility = listFasilitas.type[field?.tipeFasilitas?.replaceAll(" ", "")]
                                                            return (
                                                                    <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                                                        <div className="flex flex-row items-center">
                                                                            <img src={facility?.img} alt={facility?.text} />
                                                                            <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas}</p>
                                                                        </div>
                                                                        <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh} {field.satuan}</p>
                                                                    </div>
                                                                )
                                                        })}
                                                        </div>
                                                        <div className="border-r py-5 m-5"></div>
                                                        <div className="relative flex flex-col gap-4 w-full justify-start items-start pl-5 p-5 h-fit">
                                                            {secondHalf?.map((field, index) => {
                                                                const facility = listFasilitas.type[field?.tipeFasilitas?.replaceAll(" ", "")]
                                                                return (
                                                                    <div key={index} className="flex flex-row gap-2 justify-between items-center w-full">
                                                                        <div className="flex flex-row items-center">
                                                                            <img src={facility?.img} alt={facility?.text} />
                                                                            <p className="font-medium text-[#292929] whitespace-nowrap px-4 w-[180px] text-sm">{field.namaFas}</p>
                                                                        </div>
                                                                        <p className="font-medium text-[#929393] whitespace-nowrap text-start text-sm w-[57px]">{field.jarakWaktuTempuh} {field.satuan}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </>
                                                ) : (<>
                                                    { firstHalf?.length < 1 && (
                                                        <div className="flex justify-center items-center p-[33.5px] w-full">
                                                            <div className="flex flex-col gap-4 justify-center items-center">
                                                                <img alt="noAkses&Fasilitas" src="/images/No_Akses_Fasilitas.svg" />
                                                                <p className="font-bold text-[#292929] whitespace-nowrap text-start text-[22px]">Informasi Akses & Fasilitas belum tersedia</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>)}
                                            </div>
                                        </div>
                                        </>
                                    )}
                                </div>
                                <div id="video" ref={el => navRef.current[3] = el}>
                                    {prjData?.responseData?.[0]?.project?.mediaProject?.youtubeUrl ?
                                    <>
                                    <p className="text-[20px] font-bold text-[#292929] py-4">Video</p>
                                        <DetailsCard>
                                            <div className="w-full h-[390px] my-3">
                                                <div className="w-full h-full relative top-0 right-0 bottom-0 left-0 m-auto overflow-hidden rounded-lg my-2 ">
                                                    <iframe
                                                        className="about__iframe"
                                                        src={youtubeEmbed(prjData?.responseData?.[0]?.project?.mediaProject?.youtubeUrl)}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowfullscreen="allowfullscreen"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </DetailsCard>
                                    </> : "" }
                                </div>
                                <div id="alamat" ref={isType === "project" ? el => navRef.current[4] = el : el => navRef.current[2] = el}>
                                    <p className="text-[20px] font-bold text-[#292929] py-4">Alamat</p>
                                    <DetailsCard className="h-[350px]">
                                        <div className="prod-detail__pages__property__detailBuying__left__address__colWrapper">
                                            {prjData?.responseData?.[0]?.project?.alamatProperti && 
                                            // { {unitDtlData?.project.alamatProperti &&
                                                <GmapsDetail
                                                    mapsState={mapsState}
                                                    lat= {Number(prjData?.responseData?.[0]?.project.alamatProperti.latitude)}
                                                    lng= {Number(prjData?.responseData?.[0]?.project.alamatProperti.longitude)}
                                                    // lat= {Number(unitDtlData?.project.alamatProperti.latitude)}
                                                    // lng= {Number(unitDtlData?.project.alamatProperti.longitude)}
                                                    origin= {currentLngLat}
                                                    proyek={ isType === "project" ? prjData?.responseData?.[0]?.project?.namaProyek : prjData?.detailProperti?.namaProperti }
                                                    alamat={ isType === "project" ? prjData?.responseData?.[0]?.project?.alamatProperti ? JSON.parse( prjData?.responseData?.[0]?.project?.alamatProperti.alamat)?.alamat : "" 
                                                    : _.isJSON(prjData?.project?.alamatProperti?.alamat) ? JSON.parse(prjData?.project?.alamatProperti?.alamat)?.alamat : ""}
                                                    // alamat={ isType === "project" ? _.isJSON(unitDtlData?.project?.alamatProperti?.alamat) ? JSON.parse(unitDtlData?.project?.alamatProperti?.alamat)?.alamat : "" 
                                                    // : _.isJSON(prjData?.project?.alamatProperti?.alamat) ? JSON.parse(prjData?.project?.alamatProperti?.alamat)?.alamat : ""}
                                                    mobile= {width < 768 ? true : false}
                                                />
                                            }
                                            { isType === "unit" && prjData?.project?.alamatProperti?.alamat && 
                                                <GmapsDetail
                                                    mapsState={mapsState}
                                                    lat= {Number(prjData?.project?.alamatProperti?.latitude)}
                                                    lng= {Number(prjData?.project?.alamatProperti?.longitude)}
                                                    origin= {currentLngLat}
                                                    proyek={isType === "project" ? prjData?.responseData?.[0]?.project?.namaProyek : prjData?.detailProperti?.namaProperti }
                                                    alamat={ isType === "project" ? _.isJSON(unitDtlData?.project?.alamatProperti?.alamat) ? JSON.parse(unitDtlData?.project?.alamatProperti?.alamat)?.alamat : "" 
                                                    : _.isJSON(prjData?.project?.alamatProperti?.alamat) ? JSON.parse(prjData?.project?.alamatProperti?.alamat)?.alamat : ""}
                                                    mobile= {width < 768 ? true : false}
                                                />
                                            }
                                        </div>
                                    </DetailsCard>
                                </div>
                                { isType === "unit" && (
                                    <>
                                    <div id="simulasiKpr" ref={el => navRef.current[3] = el}>
                                        <p className="text-[20px] text-[#292929] font-bold py-4">Simulasi KPR</p>
                                        <DetailsCard>
                                            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-[12px] font-semibold">Harga Properti<span className="text-[red]">*</span></p>
                                                    <CurrencyInputCalc
                                                        className="textbox-label__currency"
                                                        name="hargaProperti"
                                                        placeholder="0"
                                                        decimalsLimit={2}
                                                        groupSeparator="."
                                                        decimalSeparator="," 
                                                        maxLength={14}
                                                        value={Discount?.hargaAkhir !== null ? Discount?.hargaAkhir : Discount?.hargaProperti}
                                                        allowDecimals={false}
                                                        allowNegativeValue={false}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="font-semibold text-[12px] text-[#292929]">Jumlah Pinjaman</p>
                                                    <CurrencyInputCalc
                                                        className="textbox-label__currency"
                                                        name="jumlahPinjaman"
                                                        placeholder="0"
                                                        decimalsLimit={2}
                                                        groupSeparator="."
                                                        decimalSeparator="," 
                                                        maxLength={14}
                                                        value={dataInputCalc?.jumlahPinjaman?.value}
                                                        onValueChange={(value) => handleUangMuka(value, "jumlahPinjaman")}
                                                        allowDecimals={false}
                                                        allowNegativeValue={false}
                                                        warnText={dataInputCalc?.jumlahPinjaman?.msgError}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="font-semibold text-[12px] text-[#292929]">Uang Muka</p>
                                                    <CurrencyInputCalc
                                                        className="textbox-label__currency"
                                                        name="uangMuka"
                                                        placeholder="0"
                                                        decimalsLimit={2}
                                                        groupSeparator="."
                                                        decimalSeparator="," 
                                                        maxLength={16}
                                                        value={dataInputCalc?.uangMuka?.value }
                                                        onValueChange={(value) => handleUangMuka(value, "uangMuka")}
                                                        allowNegativeValue={false}
                                                        warnText={dataInputCalc?.uangMuka?.msgError}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-[12px] font-semibold">Program Suku Bunga<span className="text-[red]">*</span></p>
                                                    <Dropdown
                                                        value={dataInputCalc ? dataInputCalc?.gimmick?.value : "0"}
                                                        data={gimmickOptions}
                                                        onChange={(value) => handleChangeAlt(value, "gimmick")}
                                                    />
                                                </div>
                                                <div className="col-span-2 mobile:col-span-1 grid grid-cols-3 gap-4">
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-[#292929] text-[12px] font-medium">Suku Bunga</p>
                                                        <TextboxLabel
                                                            placeholder=""
                                                            rightLabel="%"
                                                            rightLabelBorder={true}
                                                            value={dataInputCalc?.gimmick?.value?.fixedRate}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="font-semibold text-[12px] text-[#292929]">Masa Kredit Fix</p>
                                                        <TextboxLabel
                                                            name="masaKreditFix"
                                                            placeholder=""
                                                            rightLabel="Tahun"
                                                            rightLabelBorder={true}
                                                            value={dataInputCalc ? dataInputCalc?.gimmick?.value?.tenorFixedRate / 12 : 0}
                                                            maxLength={3}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-[#292929] text-[12px] font-semibold">Jangka Waktu<span className="text-[red]">*</span></p>
                                                        <TextboxLabel
                                                            name="lamaPinjaman"
                                                            placeholder=""
                                                            rightLabel="Tahun"
                                                            rightLabelBorder={true}
                                                            value={dataInputCalc?.lamaPinjaman?.value}
                                                            onChange={(value) => handleLamaPinjaman(value)}
                                                            maxLength={2}
                                                            warnText={dataInputCalc?.lamaPinjaman?.msgError}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="col-span-2 mobile:col-span-1 font-medium text-[12px] text-[#777777]">*Perhitungan ini adalah bersifat simulasi / estimasi, untuk perhitungan yang akurat dan lengkap dapat menghubungi kantor BRI terdekat.
                                                </p>
                                                <div className="col-span-2 mobile:col-span-1 flex justify-end gap-2">
                                                    <button onClick={handleResetCalc} className={`${calculatorCondition.filter(Boolean).length >= 3 ? "border-[#1078CA]" : "border-[#EAEBEB]" } flex flex-row gap-2 border items-center justify-center px-4 py-3 bg-white  rounded-md h-[48px]`}>
                                                        <p className={`${calculatorCondition.filter(Boolean).length >= 3 ? "text-[#1078CA]" : "text-[#B5B6B6]" } font-bold text-[14px]`}>Reset</p>
                                                    </button>
                                                    <button  onClick={handleConvertCalc} className={`flex flex-row ${calculatorCondition.filter(Boolean).length >= 3 ? 'text-[#ffffff] bg-[#1078CA]' : 'text-[#B5B6B6] bg-white border border-[#EAEBEB] cursor-not-allowed'} gap-2 items-center justify-center px-4 py-3 rounded-md h-[48px]`}>
                                                        <p className='font-bold text-[14px]'>Lihat Hasil Simulasi</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </DetailsCard>
                                    </div>
                                    <div id="ajukanPembelian" ref={el => navRef.current[4] = el}>
                                        <p className="font-bold text-[20px] text-[#292929] py-4">Ajukan Pembelian</p>
                                        <DetailsCard>
                                        <div className="flex flex-col w-full relative gap-4">
                                            <p className="font-medium text-[12px] text-[#777777] pb-4">Tertarik beli properti ini? Yuk, ikuti langkah-langkah berikut untuk dapatkan rumah impianmu!</p>
                                            <div className="flex grid grid-cols-3 mobile:grid-cols-1 gap-2 mobile:gap-4">
                                                <div className="flex flex-row gap-4 sm:border-r mobile:border-b items-start">
                                                    <img src="/icons/small-icons/Icon_langkah1.svg" className="self-start" width={"48px"} height={"48px"} alt="icon-langkah" />
                                                    <div>
                                                        <p className="font-medium text-[12px] text-[#777777]">Langkah ke-1</p>
                                                        <p className="font-semibold text-[14px] text-[#292929] break-words w-5/6 mobile:pb-3">Buat akun di Homespot dan isi formulir pengajuan pembelian</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-4 sm:border-r mobile:border-b">
                                                    <img src="/icons/small-icons/Icon_langkah2.svg" className="self-start" width={"48px"} height={"48px"} alt="icon-langkah" />
                                                    <div>
                                                        <p className="font-medium text-[12px] text-[#777777]">Langkah ke-2</p>
                                                        <p className="font-semibold text-[14px] text-[#292929] break-words w-5/6 mobile:pb-3">Cek ringkasan pengajuan dan bayar UTJ atau Uang Tanda Jadi (opsional)</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-4 ">
                                                    <img src="/icons/small-icons/Icon_langkah3.svg" className="self-start" width={"48px"} height={"48px"} alt="icon-langkah" />
                                                    <div>
                                                        <p className="font-medium text-[12px] text-[#777777]">Langkah ke-3</p>
                                                        <p className="font-semibold text-[14px] text-[#292929] break-words w-5/6">Kantor Cabang BRI akan menghubungimu</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </DetailsCard>
                                    </div>
                                    </>
                                )}
                                <div id="rekomendasi" className="py-4 w-full" ref={el => navRef.current[5] = el}>
                                    <p className="text-[20px] font-bold text-[#292929] py-4">Rekomendasi Sesuai Pencarianmu</p>
                                    <div className="py-2 max-w-[1110px]">
                                        <CarouselDetail
                                            cols={width <= 1700 ? 2 : 4}
                                            isProject={isType === "project" ? true : false}
                                            typeCarousel="recommendation"
                                            property={recommendationUnit}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <Footer />
                {width < 768 ? 
                (
                    isType === "unit" && (
                        <div id="buttonAjukanPembelianMobile" className="z-10 bg-white w-full h-[80px] sticky bottom-0 shadow-xl relative flex justify-center items-center" style={{boxShadow: "0px 5px 5px 2px rgba(0, 0, 0, 1)"}}>
                            <div className="flex flex-row gap-2 px-4 w-full px-3 items-center">
                                <button className="flex flex-row gap-2 items-center justify-center px-3 py-2 border border-solid border-[#1078CA] rounded-md w-1/6 h-[48px]" onClick={() => openLink(`https://api.whatsapp.com/send?phone=${isSecondary ? decryptStr(prjData?.project?.noHpPic)?.replace("|", "").replace("+", "").replace(/^0/g, "62") : developerDetail?.mobileNoDeveloper ? developerDetail?.mobileNoDeveloper : ''}`, true)}>
                                    <img src="/icons/small-icons/whatsapp-blue.svg" alt="wa-icon" />
                                </button>
                                <button className="items-center px-3 py-2 rounded-md w-full h-[48px] bg-[#1078CA]" onClick={() => {
                                        cookie.get("morgateCookie") ?  dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal)) : dispatch(showModalLogin(!state.showModalLogin));
                                        localStorage.removeItem('infolelangUtj')
                                    }} >
                                        <p className="text-white font-bold text-[14px]">Ajukan Pembelian</p>
                                </button>
                            </div>
                        </div>
                    )
                ) :
                (
                    isType === "unit" && (
                        <div id="buttonAjukanPembelian" className="z-10 flex justify-center items-center bg-white w-full h-[96px] sticky bottom-0 shadow-xl relative" style={{boxShadow: "0px 5px 5px 2px rgba(0, 0, 0, 1)"}}>
                            <div className="w-full largePc:mx-[180px] xxl:mx-[276px] flex justify-end">
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex flex-row gap-2 items-center px-3 py-2 border border-solid border-[#1078CA] rounded-md w-full h-[48px]" onClick={() => openLink(`https://api.whatsapp.com/send?phone=${isSecondary ? decryptStr(prjData?.project?.noHpPic)?.replace("|", "").replace("+", "").replace(/^0/g, "62") : developerDetail?.mobileNoDeveloper ? developerDetail?.mobileNoDeveloper : ''}`, true)}>
                                        <img src="/icons/small-icons/whatsapp-blue.svg" alt="wa-icon" />
                                        <p className="text-[#1078CA] font-bold text-[14px]">Hubungi {isSecondary ? "Penjual" : "Developer"}</p>
                                    </button>
                                    <button className="items-center px-3 py-2 rounded-md w-full h-[48px] bg-[#1078CA]" onClick={() => {
                                        cookie.get("morgateCookie") ?  dispatch(showApprovalKprModal(!stateModal.showApprovalKprModal)) : dispatch(showModalLogin(!state.showModalLogin));
                                        localStorage.removeItem('infolelangUtj')
                                    }} >
                                        <p className="text-white font-bold text-[14px]">Ajukan Pembelian</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
        </div>
    )
}

const LeftNav = ({link, name, isActive, setClass}) => {
    return (
        <div className={`left-nav-container ${setClass}`}>
            <a className={`flex items-center px-3 py-2 border border-solid rounded-md w-full h-[48px] ${isActive ? 'border-[#1078CA] bg-[#DDEFFC]' : 'border-[#D3D4D4]'}` } href={link}>
                <p className={`${isActive ? 'text-[#1078CA] font-bold' : 'text-[#292929] font-medium'} text-[16px] mobile:whitespace-nowrap`}>{name}</p>
            </a>
        </div>
    )
}

const UnitButton = ({type, active, handleClick}) => {
    return (
        <button
            className={`items-center px-3 py-2 rounded-full w-fit h-[48px] ${active ? 'bg-[#DDEFFC] text-[#1078CA]' : 'border border-solid bg-[#FFFFFF] border-[#D3D4D4] text-[#777777]'} `}
            onClick={() => handleClick(type)}
        >
            <p className="font-semibold text-[14px] text-center px-4">{type}</p>
        </button>
    )
}

const Snackbar = ({ message, timeout = 5000 }) => {
    const [visible, setVisible] = useState(false)
    let showSnackbar = localStorage.getItem("snackBarSucces")
  
    useEffect(() => {
      if (showSnackbar) {
        setVisible(true)
        const timer = setTimeout(() => {
          setVisible(false)
          localStorage.removeItem("snackBarSucces")
        }, timeout)
  
        return () => {
          clearTimeout(timer)
        }
      }
    }, [showSnackbar])
  
    const handleClose = () => {
      setVisible(false)
      localStorage.removeItem("snackBarSucces")
    }
    return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-[104px]"
        style={
            { 
                display: visible ? 'block' : 'none',  
                backgroundColor: '#E1F8EB', 
                color: '#27AE60', 
                padding: '12px', 
                borderRadius: '4px', 
                width: '432px',
                maxWidth: '700px',
                zIndex: '9999'}
        }>
            <div className='flex flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_12234_4647)">
                        <path d="M8.00065 1.3335C4.32065 1.3335 1.33398 4.32016 1.33398 8.00016C1.33398 11.6802 4.32065 14.6668 8.00065 14.6668C11.6807 14.6668 14.6673 11.6802 14.6673 8.00016C14.6673 4.32016 11.6807 1.3335 8.00065 1.3335ZM6.19398 10.8602L3.80065 8.46683C3.54065 8.20683 3.54065 7.78683 3.80065 7.52683C4.06065 7.26683 4.48065 7.26683 4.74065 7.52683L6.66732 9.44683L11.254 4.86016C11.514 4.60016 11.934 4.60016 12.194 4.86016C12.454 5.12016 12.454 5.54016 12.194 5.80016L7.13398 10.8602C6.88065 11.1202 6.45398 11.1202 6.19398 10.8602Z" fill="#27AE60"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_12234_4647">
                            <rect width="16" height="16" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span className='font-medium text-[#525252] px-2' style={{fontSize: '12px', lineHeight: '18px', flex: '1 0 0'}}>{message}</span>
                <button className='mobile:hidden' 
                    style={
                        { 
                            float: 'right', 
                            backgroundColor: 'transparent', 
                            border: 'none', 
                            color: '#27AE60', 
                            cursor: 'pointer', 
                            paddingLeft:'8px' 
                        }
                    } onClick={handleClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_910_1350)">
                            <path d="M13.725 4.28249C13.4325 3.98999 12.96 3.98999 12.6675 4.28249L9.00004 7.94249L5.33254 4.27499C5.04004 3.98249 4.56754 3.98249 4.27504 4.27499C3.98254 
                            4.56749 3.98254 5.03999 4.27504 5.33249L7.94254 8.99999L4.27504 12.6675C3.98254 12.96 3.98254 13.4325 4.27504 13.725C4.56754 14.0175 5.04004 14.0175 5.33254 
                            13.725L9.00004 10.0575L12.6675 13.725C12.96 14.0175 13.4325 14.0175 13.725 13.725C14.0175 13.4325 14.0175 12.96 13.725 12.6675L10.0575 8.99999L13.725 
                            5.33249C14.01 5.04749 14.01 4.56749 13.725 4.28249Z" fill="#27AE60"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_910_1350">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
      </div>
    )
}

export default ProjectDetails