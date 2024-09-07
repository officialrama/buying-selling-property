import { Breadcrumb } from "flowbite-react"
import React, { useEffect, useRef, useState } from "react"
import SearchbarArticle from "../../components/molecules/Searchbar/searchbar-article"
import { useNavigate } from "react-router-dom"
import useArticleHooks from "../../hooks/useArticleHooks"
import ArticleCard from "../../components/organisms/Card/Article/ArticleCard"
import { useDispatch } from "react-redux"
import { ListCategories, listLandingPage } from "../../store/actions/fetchData/article-fetch"
import { IoIosList } from "react-icons/io"
import DropdownCategory from "../../components/molecules/DropdownMenu/Article/Category"
import { Footer, LabelTag } from "../../components/molecules"
import { tagCategory } from "../../static/articleStaticConst"
import moment from "moment"

const ResultsSearchArticle = ({}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dropdownRef = useRef(null)
    const {
        searchTerm,
        setSearchTerm,
        paramsArticle,
        setParamsArticle
    } = useArticleHooks()
    const [data, setData] = useState([])
    const [initialData, setInitialData] = useState([])
    const [listCategorie, setListCategorie] = useState([])
    const [activeType, setActiveType] = useState("article")
    const [sorting, setSorting] = useState("")
    const [conditionParams, setConditionParams] = useState({
        searchBtn: false,
        propertiType: "",
        nameType: ""
    })
    const [isDropdown, setIsDropdown] = useState({
        category: false,
        filter: false
    })
    const [checkedItem, setCheckedItem] = useState({
        all: {
            id: 0,
            name: "Semua",
            checked: false
        }
    })
    const [paramsSearch, setParamsSearch] = useState([])
    const params = JSON.parse(window.localStorage.getItem("filterArticle"))

    useEffect(() => {
        dispatch(ListCategories(listCategorie,setListCategorie,setCheckedItem))
        dispatch(listLandingPage(params, setInitialData))
        setSearchTerm(params?.search)
        setActiveType(params?.type ?? "article")
        setConditionParams({...conditionParams, search: params?.search})
    },[])

    useEffect(() => {
        if(initialData?.length === 0){
            dispatch(listLandingPage({
                ...paramsSearch, 
                search: paramsSearch?.search ? paramsSearch?.search : params?.search,
                type: paramsSearch?.type ? paramsSearch?.type : params?.type,
                }, setData))
        }
    },[paramsSearch])

    useEffect(() => {
        const key = Object.keys(checkedItem).find(key => checkedItem[key].checked === true)
        const data = checkedItem[key]
        if(key === "all"){
            setParamsSearch({
                ...paramsArticle,
                ...paramsSearch,
                all: true,
                limit: activeType === "article" ? 15 : 20
            })
            setConditionParams({
                category: "Semua",
                nameType: "all"
            })
        }else{
            setParamsSearch({
                ...paramsArticle,
                ...paramsSearch,
                category_id: data?.id,
                all: false,
                limit: activeType === "article" ? 15 : 20
            })
            setConditionParams({
                category: data?.name,
                nameType: data?.name
            })
        }
    }, [checkedItem])

    const handleSearchbarClick = (e) => {
        e.stopPropagation() // Prevent event bubbling to the parent div
    }
    const handleKeyDown = (e) => {
        if (conditionParams?.searchBtn === true) {
            if (e.key === "Enter" || e.type === "click") {
                setCheckedItem(prevItems => 
                    Object.keys(prevItems).reduce((acc, key) => {
                      acc[key] = { ...prevItems[key], checked: false };
                      return acc;
                    }, {})
                )
                setSorting("")            
                setActiveType(paramsArticle?.type ?? "article")
                dispatch(listLandingPage({
                    ...paramsArticle,
                    search: searchTerm,
                    limit: paramsArticle?.type === "article" ? 15 : 20,
                    type: paramsArticle?.type },setData))
            }
        }
    }

    const orderBy = [
        {
            name: "Terbaru",
            terms: "-created_at",
        },
        {
            name: "A-Z",
            terms: "title",
        },
        {
            name: "Z-A",
            terms: "-title",
        },
    ]

    const handleType = (type) => {
        setInitialData([])
        setActiveType(type)
        setParamsSearch({
            ...paramsSearch,
            ...paramsArticle,
            type: type
        })
    }

    const handleCheckboxChange = (name, isChecked) => {
        setInitialData([])
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

    const handleFiltering = (name, terms) => {
        setInitialData([])
        setSorting(name)
        setParamsSearch({
            ...paramsArticle,
            ...paramsSearch,
            type: activeType,
            order: terms
        })
    }
    const handleLoadMore = () => {
        const total = data.length + 15
        paramsArticle.limit = total
        dispatch(listLandingPage({
            ...paramsArticle,
            search: searchTerm,
            limit: total,
            type: paramsArticle?.type }, setData))
    }

    const inputsArr = [
        paramsArticle?.search !== "" && paramsArticle?.search.length > 3,
        Object.values(conditionParams)?.some((item) => item?.propertiType?.length > 0)
    ]

    
    return (
        <>
            <div className="absolute top-0 -z-10" style={{ backgroundImage: `url("images/backdrop-article.png")`, backgroundRepeat: "no-repeat", backgroundSize:"cover", height: "200px", width: "100%" }}></div>
            <div className="mx-[48px] mobile:mx-[20px] pb-6 min-h-screen">
                <Breadcrumb className="text-sm py-4">
                    <span className="font-semibold text-[#1078CA]">Home</span>
                    <Breadcrumb.Item>
                        <span className="font-semibold text-[#1078CA]">Homespot Update</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="font-medium text-[#777777]">Hasil Pencarian</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex flex-col gap-6 pb-6">
                    <div>
                        <p className="font-bold text-[28px] text-[#292929] text-center">Homespot Update</p>
                        <p className="font-medium text-[#525252] text-[16px] text-center">Temukan beragam artikel dan video menarik seputar Homespot sesuai kebutuhanmu di sini!</p>
                    </div>
                    <div className="z-40 
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
                        <SearchbarArticle 
                            handleKeyDown={handleKeyDown}
                            enableLabelClick={inputsArr?.filter(Boolean)?.length === 2}
                            conditionParams={conditionParams}
                            setConditionParams={setConditionParams}
                            setParamsArticle={setParamsArticle}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            paramsArticle={paramsArticle}
                        />
                    </div>
                </div>
                <div id="list-content pb-12">
                    {initialData?.filter(prev => prev.type === (params?.type ?? 'article'))?.length > 0 || data?.filter(prev => prev.type === (activeType ?? 'article'))?.length > 0  ? (
                        <>
                            <div className="flex flex-col gap-4">
                                <p className="font-medium text-base text-[#777777]">Menampilkan 1-{initialData ? initialData?.length : data?.length} hasil pencarian dari total {initialData ? initialData?.length : data?.length} untuk "<span className="font-bold">{searchTerm}</span>"</p>
                                <div className="flex flex-row justify-between">
                                    <div id="buttonTypeArticle" className="flex flex-row gap-2">
                                        <UnitButton type="Artikel" active={activeType === 'article'} handleClick={() => handleType("article")} />
                                        <UnitButton type="Video" active={activeType === 'video'} handleClick={() =>  handleType("video")} />
                                    </div>
                                    <div id="filtering-button" className="flex flex-row gap-2">
                                        <div id="chooseCategory">
                                            <div className="relative border bg-white rounded-lg flex flex-col text-center items-center mobile:w-full px-3" onClick={() => {
                                                setIsDropdown({category: !isDropdown.category})
                                            }}>
                                                <div className="flex justify-between mobile:h-10 text-center items-center m-3 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full">
                                                    <div className="flex flex-row gap-2">
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
                                                {isDropdown?.category ? (
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
                                        <div className="relative border bg-white rounded-lg flex flex-col text-center items-center mobile:w-full px-3" onClick={() => { setIsDropdown({filter: !isDropdown.filter}) }}>
                                                <div className="flex justify-between mobile:h-10 text-center items-center m-3 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full">
                                                    <div className="flex flex-row gap-2 mobile:whitespace-nowrap">
                                                        <div className="flex items-center"><IoIosList color="#777777" /></div>
                                                        {sorting || "Urutkan Berdasarkan"}
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
                                                {isDropdown?.filter ? (
                                                    <div className="w-[260px] absolute z-30 bg-[#FFFFFF] rounded-md divide-y divide-gray-100 shadow-xl border border-[#E4E7EC] border-solid mt-11" ref={dropdownRef}>
                                                        <div className="dropdown-list__listWrap"
                                                            aria-labelledby="dropdown-homepage"
                                                        >
                                                            {orderBy?.map((dataMap, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={
                                                                        sorting === dataMap.name
                                                                            ? "block font-bold py-4 px-4 bg-[#DDEFFC] cursor-pointer w-full"
                                                                            : "block py-4 px-4 bg-[#FFFFFF] hover:bg-[#DDEFFC] cursor-pointer w-full"
                                                                    }
                                                                >
                                                                    <div className="text-start" onClick={(e) => handleFiltering(dataMap.name, dataMap.terms)}>
                                                                        {dataMap.name}
                                                                    </div>
                                                                </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                ) : <></>}
                                        </div>
                                    </div>
                                </div>
                                <div id="grid-content" className="grid grid-cols-3 gap-6">
                                    {params?.type === "article" || activeType === "article" ? (
                                        <ArticleCard data={initialData?.filter(prev => prev.type === "article")?.length > 0 ? initialData?.filter(prev => prev.type === "article") : data} navigate={navigate} />
                                    ) : (
                                        initialData?.filter(prev => prev.type === "video")?.length > 0 ? initialData?.filter(prev => prev.type === "video")?.map((data, idx) => {
                                            return (
                                                <div key={idx} className="relative w-[318px] h-[265px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                                                    <div className={`bg-white ${params?.type === "article" || activeType === "article" ? "border border-[#EAEBEB]" : ""} rounded-lg shadow items-center`}>
                                                        <div id="thumb-image" className="relative w-full h-[159px]">
                                                            <div className="absolute top-0 z-30 left-[-8%]">
                                                                <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                                                            </div>
                                                            <div className="w-full h-[159px]">
                                                                <img
                                                                    className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg object-cover"
                                                                    src={data?.image_url}
                                                                    alt="img"
                                                                />
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
                                       : data?.filter(prev => prev.type === "video")?.map((data, idx) => {
                                            return (
                                                <div key={idx} className="relative w-[318px] h-[265px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                                                    <div className={`bg-white ${params?.type === "article" || activeType === "article" ? "border border-[#EAEBEB]" : ""} rounded-lg shadow items-center`}>
                                                        <div id="thumb-image" className="relative w-full h-[159px]">
                                                            <div className="absolute top-0 z-30 left-[-8%]">
                                                                <LabelTag bgColor={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor} bgColor2={tagCategory.find(tag => tag.name === data?.category?.name)?.bgColor2} text={data?.category?.name} />
                                                            </div>
                                                            <div className="w-full h-[159px]">
                                                                <img
                                                                    className="bg-cover bg-center bg-no-repeat w-full h-full rounded-lg object-cover"
                                                                    src={data?.image_url}
                                                                    alt="img"
                                                                />
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
                                {data && (paramsArticle?.type === "article" ? data.length > 14 : data.length > 19) && (
                                    <div className="flex justify-center">
                                        <button className="items-center text-center px-4 py-3 border border-solid border-[#1078CA] rounded-md w-fit h-[48px]" onClick={handleLoadMore}>
                                            <p className="text-[#1078CA] font-bold miniPc:text-[16px] small:text-[14px] xxl:text-[16px] xl:text-[13px]">Muat Lebih Banyak</p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-8 items-center text-center">
                            <div className="object-cover w-fit h-fit">
                                <img alt="article_404" src="/images/article-404.png"/>
                            </div>
                            <div>
                                <p className="font-bold text-2xl text-[#292929]">Pencarian Tidak Ditemukan</p>
                                <p className="text-base text-[#777777]">Cek ulang kata kunci yang kamu cari atau cari dengan kata kunci lainnya, yuk!</p>
                            </div>
                        </div>
                    )}
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

export default ResultsSearchArticle