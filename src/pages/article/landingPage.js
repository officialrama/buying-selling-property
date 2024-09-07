import { Breadcrumb } from "flowbite-react"
import React, { useEffect, useRef, useState } from "react"
import SearchbarArticle from "../../components/molecules/Searchbar/searchbar-article"
import { useNavigate } from "react-router-dom"
import { CarouselArticle } from "../../components/organisms"
import ArticlePilihan from "../../components/organisms/Card/Article/ArticlePilihan"
import ArticleCard from "../../components/organisms/Card/Article/ArticleCard"
import useWindowDimensions from "../../utils/dimensions"
import { Footer, LabelTag } from "../../components/molecules"
import DropdownCategory from "../../components/molecules/DropdownMenu/Article/Category"
import useArticleHooks from "../../hooks/useArticleHooks"
import { useDispatch } from "react-redux"
import { ListCategories, listLandingPage } from "../../store/actions/fetchData/article-fetch"
import { IoIosList } from "react-icons/io"
import { tagCategory } from "../../static/articleStaticConst"
import moment from "moment"

const HomespotUpdateLandingPage = ({}) => {
    const dispatch = useDispatch()
    const { width } = useWindowDimensions()
    const navigate = useNavigate()
    const [artikelTerbaru, setArtikelTerbaru] = useState([])
    const [videoPilihan, setVideoPilihan] = useState([])
    const [artikelPilihan, setArtikelPilihan] = useState([])
    const [dataFilteringCategory, setDataFilteringCategory] = useState([])
    const [listCategorie, setListCategorie] = useState([])
    const [conditionParams, setConditionParams] = useState({
        searchBtn: false,
        propertiType: "",
        category: "",
        nameType: ""
    })
    const [checkedItem, setCheckedItem] = useState({
        all: {
            id: 0,
            name: "Semua",
            checked: false
        }
    })
    const [paramsCategory, setParamsCategory] = useState({
        limit: 9,
        page: 0,
        type: "article",
        all: true,
        order: "-created_at",
    })
    const handleSearchbarClick = (e) => {
        e.stopPropagation() // Prevent event bubbling to the parent div
    }
    const [activeType, setActiveType] = useState("article")
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const {
        searchTerm,
        setSearchTerm,
        paramsArticle,
        setParamsArticle
    } = useArticleHooks()

    useEffect(() => {
        dispatch(listLandingPage({type: "article", order: "-created_at"}, setArtikelTerbaru))
        dispatch(listLandingPage({type: "video"}, setVideoPilihan))
        dispatch(listLandingPage({highlighted: "true", type: "article"}, setArtikelPilihan))
        dispatch(listLandingPage(paramsCategory, setDataFilteringCategory))
        dispatch(ListCategories(listCategorie,setListCategorie))
    },[])

    useEffect(() => {
        dispatch(listLandingPage(paramsCategory, setDataFilteringCategory))
    }, [paramsCategory])

    useEffect(() => {
        listCategorie.map((data, index) => {
            setCheckedItem((prevItem) => ({
                ...prevItem,
                [data?.name]: {
                    id: data?.id,
                    name: data?.name,
                    checked: false
                }
            }))
        })
    }, [listCategorie])

    const handleKeyDown = (e) => {
        if (conditionParams?.searchBtn === true) {
            if (e.key === "Enter" || e.type === "click") {
              if (!!conditionParams) {
                window.localStorage.setItem("filterArticle", JSON.stringify(paramsArticle))
                navigate("/homespot-update/search")
              }
            }
        }
    }

    const handleType = (type) => {
        setActiveType(type)
        setParamsCategory({
            ...paramsCategory,
            type: type
        })
    }

    useEffect(() => {
        const key = Object.keys(checkedItem).find(key => checkedItem[key].checked === true)
        const data = checkedItem[key]
        if(key === "all"){
            setParamsCategory({
                ...paramsCategory,
                all: true,
                limit: 9
            })
            setConditionParams({
                ...paramsArticle,
                category: "Semua",
                nameType: "all"
            })
        }else{
            setParamsCategory({
                ...paramsCategory,
                category_id: data?.id,
                all: false,
                limit: 9
            })
            setConditionParams({
                ...paramsArticle,
                category: data?.name,
                nameType: data?.name
            })
        }
    }, [checkedItem])

    const handleCheckboxChange = (name, isChecked) => {
        setCheckedItem((prevItems) => {
            const updatedCheckedItem = { ...prevItems }
            if (isChecked) {
                for (const key in updatedCheckedItem) {
                    if (key?.name !== name) {
                        updatedCheckedItem[key].checked = false
                    }
                }
                updatedCheckedItem[name].checked = true
            } else {
                updatedCheckedItem[name].checked = false
            }
          return updatedCheckedItem
        })
    }

    const inputsArr = [
        paramsArticle?.search !== "" && paramsArticle?.search.length > 3,
        Object.values(checkedItem)?.some((item) => item.checked === true)
    ]

    return (
        <>
            <div className="absolute top-0 -z-10" style={{ backgroundImage: `url("images/background-nearby.png")`, backgroundRepeat: "no-repeat", backgroundSize:"cover", height: "200px", width: "100%" }}></div>
            <div className="mx-[48px] mobile:mx-[20px]">
                <Breadcrumb className="text-sm py-4">
                    <span className="font-semibold text-[#1078CA]">Home</span>
                    <Breadcrumb.Item>
                        <span className="font-medium text-[#777777]">Homespot Update</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex flex-col gap-6">
                    <div>
                        <p className="font-bold text-[28px] mobile:text-lg text-[#292929] text-center">Homespot Update</p>
                        <p className="font-medium text-[#525252] text-[16px] text-center">Temukan beragam artikel dan video menarik seputar Homespot sesuai kebutuhanmu di sini!</p>
                    </div>
                    <div className="
                        z-40 
                        xxl:px-[25%] 
                        largePc:px-[15%] 
                        miniPc:px-[20%]
                        small:px-[15%]
                        tab:px-[5%] 
                        lg:px-[10%]
                        xl:px-[15%]
                        smallPc:px-[4%]"
                        onClick={handleSearchbarClick}
                    >
                        <SearchbarArticle 
                            handleKeyDown={handleKeyDown}
                            enableLabelClick={inputsArr?.filter(Boolean)?.length === 2}
                            conditionParams={conditionParams}
                            setConditionParams={setConditionParams}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            paramsArticle={paramsArticle}
                            setParamsArticle={setParamsArticle}
                        />
                    </div>
                    <div id="list-content">
                        <div className="flex flex-col gap-4 pb-12">
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-[28px] text:mobile-lg text-[#292929]">Artikel Terbaru</p>
                                <p className="font-medium text-base text:mobile-sm text-[#525252]">Baca informasi properti paling baru</p>
                            </div>
                            <div id="article-slick" className="item-center">
                                <CarouselArticle data={artikelTerbaru} navigate={navigate} type="article" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 pb-12">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold text-[28px] mobile:text-lg text-[#292929]">Video Pilihan Homespot</p>
                                    <p className="font-medium text-base mobile:text-sm text-[#525252]">Rekomendasi berbagai artikel pilihan untuk kamu</p>
                                </div>
                                <p className="font-bold text-base mobile:text-sm text-[#1078CA] cursor-pointer mobile:text-nowrap mobile:w-fit" onClick={() => navigate("list-article/video")}>Lihat Semua</p>
                            </div>
                            <div id="article-slick" className="item-center">
                                <CarouselArticle data={videoPilihan} navigate={navigate} type="video" />
                            </div>
                        </div>
                        <div className="small:flex small:flex-col mobile:grid mobile:grid-cols-1 gap-4 pb-12">
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-[28px] mobile:text-lg text-[#292929]">Artikel Pilihan Homespot</p>
                                <p className="font-medium text-base mobile:text-sm text-[#525252]">Rekomendasi berbagai artikel pilihan untuk kamu</p>
                            </div>
                            <div className="flex flex-row small:gap-6 xl:gap-0 mobile:gap-0 item-center px-1">
                                <ArticlePilihan data={width == 1920 ? artikelPilihan.slice(0,5) : artikelPilihan.slice(0,4)} navigate={navigate}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-[#292929] mobile:text-lg text-[28px] pb-2">Cari Update Berdasarkan Kategori</p>
                            <p className="font-medium text-[#525252] mobile:text-sm text-base pb-4">Baca artikel atau tonton video berdasarkan topik yang kamu cari</p>
                            <div className="flex flex-row justify-between pb-6 mobile:flex-col mobile:gap-3">
                                <div id="buttonTypeArticle" className="flex flex-row gap-2">
                                    <UnitButton type="Article" active={activeType === 'article'} handleClick={() => handleType("article")} />
                                    <UnitButton type="Video" active={activeType === 'video'} handleClick={() =>  handleType("video")} />
                                </div>
                                <div id="chooseCategory">
                                    <div className="relative border bg-white rounded-lg flex flex-col text-center items-center mobile:w-full px-3" onClick={() => {
                                        setIsDropdown(!isDropdown)
                                    }}>
                                        <div className="flex justify-between mobile:h-10 text-center items-center m-3 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full">
                                            <div className="flex flex-row gap-2 text-nowrap w-fit">
                                                <div className="flex items-center"><IoIosList color="#777777" /></div>
                                                {conditionParams?.category || "Pilih Kategori"}
                                            </div>
                                            <div className="flex justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        {isDropdown ? (
                                            <DropdownCategory
                                                data={listCategorie}
                                                ref={dropdownRef}
                                                conditionParams={conditionParams}
                                                handleCheckboxChange={handleCheckboxChange}
                                                checkedItem={checkedItem}
                                            />
                                        ) : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`grid ${activeType === "article" ? 'grid-cols-3' : 'grid-cols-4'} gap-6 pb-6 mobile:grid-cols-1 mobile:h-[548px] mobile:overflow-x-auto`}>
                                {activeType === "article" ? (
                                    <ArticleCard data={dataFilteringCategory} navigate={navigate} />
                                ) : (
                                    dataFilteringCategory?.map((data, idx) => {
                                        return (
                                            <div key={idx} className="relative small:w-[318px] xl:w-[267px] h-[265px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                                                <div className={`bg-white "border border-[#EAEBEB] rounded-lg shadow items-center h-full`}>
                                                    <div id="thumb-image" className="relative w-full h-[159px]">
                                                        <div className="absolute top-0 z-30 left-[-6%] xl:left-[-8%]">
                                                            <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                                                        </div>
                                                        <div className="w-full h-[159px]">
                                                            <img
                                                                className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg object-cover"
                                                                src={data?.image_url}
                                                                alt="img"
                                                            />
                                                        </div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <img className="w-[18px] h-[24px]" src="/icons/play_button.svg" alt="play_button" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col cursor-default p-4 gap-1">
                                                        <p className="font-bold text-base text-black line-clamp-2">{data?.title}</p>
                                                        <p className="font-medium text-xs text-[#777777]">{moment(data?.created_at).format("DD MMMM YYYY")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                            {dataFilteringCategory?.length === 9 && (
                                <div className="flex justify-center pb-12 mobile:pt-4">
                                    <button className="items-center text-center px-4 py-3 border border-solid border-[#1078CA] rounded-md w-fit mobile:w-fit h-[48px]" onClick={() => navigate(`list-article/${activeType === "article" ? "artikel" : "video"}`) }>
                                        <p className="text-[#1078CA] font-bold miniPc:text-[16px] small:text-[14px] xxl:text-[16px] xl:text-[13px] text-nowrap">Lihat Lebih Banyak</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const UnitButton = ({type, active, handleClick}) => {
    return (
        <button
            className={`items-center px-4 py-2 rounded-full w-fit h-[48px] ${active ? 'bg-[#DDEFFC] text-[#1078CA]' : 'border border-solid bg-[#FFFFFF] border-[#D3D4D4] text-[#777777]'} `}
            onClick={() => handleClick(type)}
        >
            <p className="font-semibold text-[14px] text-center px-4">{type}</p>
        </button>
    )
}

export default HomespotUpdateLandingPage