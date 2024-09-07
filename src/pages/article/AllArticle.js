import { Breadcrumb } from "flowbite-react"
import useWindowDimensions from "../../utils/dimensions"
import { useNavigate, useParams } from "react-router-dom"
import { upperCase } from "lodash-contrib"
import React, { useState, useEffect, useRef } from "react"
import { ListCategories, listLandingPage } from "../../store/actions/fetchData/article-fetch"
import { useDispatch } from "react-redux"
import ArticleCard from "../../components/organisms/Card/Article/ArticleCard"
import { Footer, LabelTag } from "../../components/molecules"
import { tagCategory } from "../../static/articleStaticConst" 
import moment from "moment"
import DropdownCategory from "../../components/molecules/DropdownMenu/Article/Category"
import { IoIosList } from "react-icons/io"
import useArticleHooks from "../../hooks/useArticleHooks"



const HomespotAllArticle = () => {
    const {slug} = useParams()
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState("all")
    const [listCategorie, setListCategorie] = useState([])
    const [sorting, setSorting] = useState("")
    const [data, setData] = useState([])
    const dropdownRef = useRef(null)
    const [limit, setLimit] = useState(0)
    const [isDropdown, setIsDropdown] = useState(false)
    const {
        paramsArticle,
        setParamsArticle
    } = useArticleHooks()
    const typeData = slug == "artikel" ? "article" : slug

    useEffect(() => {
        dispatch(listLandingPage({type: typeData, order: "-created_at", limit: 15}, setData))
        dispatch(ListCategories(listCategorie,setListCategorie))
        setLimit(15)
    },[])
    useEffect(() => {
        dispatch(listLandingPage(paramsArticle, setData))
    }, [paramsArticle])

    const handleType = (type, title) => {
        if(title == "Semua"){
            setCategory("all")
            setParamsArticle({
                type: typeData,
                limit: 15,
                order: sorting ?? "-created_at"
            })
        }else{
            setCategory(title)
            setParamsArticle({
                ...paramsArticle,
                type: typeData,
                order: sorting ?? "-created_at",
                category_id: type
            })
        }
    }

    const handleLoadMore = () => {
        const total = data.length + 15
        setLimit(total)
        paramsArticle.limit = total
        dispatch(listLandingPage(paramsArticle, setData))
    }

    const handleFiltering = (name, terms) => {
        setSorting(name)
        setParamsArticle({
            ...paramsArticle,
            type: typeData,
            order: terms
        })
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

    return (
        <>
        <div className="mx-[48px] mobile:mx-[20px] pb-6 min-h-screen">
            <Breadcrumb className="text-sm py-4">
                <span className="font-semibold text-[#1078CA]">Home</span>
                <Breadcrumb.Item>
                    <span className="font-semibold text-[#1078CA]">Homespot Updates</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span className="font-medium text-[#777777]">{slug.charAt(0).toUpperCase() + slug.slice(1)}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex flex-col gap-4">
                <div id="header" className="flex flex-col gap-2">
                    <p className="font-bold text-[#292929] text-[28px]">{slug.charAt(0).toUpperCase() + slug.slice(1)} Homespot</p>
                    <p className="font-medium text-[#525252] text-base">{slug == "artikel" ? "Dapatkan tips, panduan, dan berbagai informasi menarik lainnya di sini. Yuk, baca artikelnya!" : "Tonton beragam video seputar tips, berita terbaru, dan lainnya dari Homespot di sini!" }</p>
                </div>
                <div className="flex mobile:flex-col mobile:gap-4 justify-between">
                    <div className="flex flex-row gap-2 mobile:overflow-x-auto" style={{msOverflowStyle: "none", scrollbarWidth: "none"}}>
                        <UnitButton type="all" active={category === 'all'} title={"Semua"} handleClick={handleType}/>
                        {listCategorie?.map((data, index) => {
                            return (
                                <UnitButton key={index} type={data.id} active={category === data.name} title={data.name} handleClick={handleType} />
                            )
                        })}
                    </div>
                    <div id="chooseCategory">
                        <div className="relative border bg-white rounded-lg flex flex-col text-center items-center mobile:w-full px-3" onClick={() => {
                            setIsDropdown(!isDropdown)
                        }}>
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
                            {isDropdown ? (
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
                            ) : <></>
                            }
                        </div>
                    </div>
                </div>
                <div id="list-content" className="flex flex-col gap-6">
                    <div className={`grid ${slug == "artikel" ? "grid-cols-3" : "small:grid-cols-4 xl:grid-cols-3"} mobile:grid-cols-1 gap-6`}>
                        {slug == "artikel" ? (
                            <ArticleCard data={data} navigate={navigate} />
                        ) : (
                            data?.map((data, idx) => {
                                return (
                                    <div key={idx} className="relative w-[318px] h-[265px]" onClick={() => navigate(`/homespot-update/${data?.slug}`)}>
                                        <div className={`bg-white ${typeData === "article" ? "border border-[#EAEBEB]" : ""} rounded-lg shadow items-center`}>
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
                        { slug === "video" && data?.length > 19 && data?.length === limit || slug === "artikel" && data?.length > 14 && data?.length === limit && (
                            <div className="flex justify-center">
                                <button className="items-center text-center px-4 py-3 border border-solid border-[#1078CA] rounded-md w-fit h-[48px]" onClick={handleLoadMore}>
                                    <p className="text-[#1078CA] font-bold miniPc:text-[16px] small:text-[14px] xxl:text-[16px] xl:text-[13px]">Muat Lebih Banyak</p>
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </div>
        <Footer className="pt-6" />
        </>
    )
}

const UnitButton = ({type, active, title, handleClick}) => {
    return (
        <button
            className={`items-center px-4 py-2 rounded-full w-fit mobile:whitespace-nowrap h-[48px] ${active ? 'bg-[#DDEFFC] text-[#1078CA]' : 'border border-solid bg-[#FFFFFF] border-[#D3D4D4] text-[#777777]'} `}
            onClick={() => handleClick(type, title)}
        >
            <p className="font-semibold text-[14px] text-center px-4">{title}</p>
        </button>
    )
}

export default HomespotAllArticle