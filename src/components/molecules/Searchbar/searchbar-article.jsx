import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button } from "../../atoms"
import { DropdownSearchArtikel, TextboxLabel } from ".."
import { FiSearch } from "react-icons/fi"
import DropdownProperti from "../DropdownMenu/Homepage/DropdownProperti"
import { articleType } from "../../../static/homepage/typeConst"
import { searchSuggestionArticle } from "../../../store/actions/fetchData/article-fetch"

const SearchbarArticle = ({
    enableLabelClick,
    handleKeyDown,
    conditionParams,
    setConditionParams,
    searchTerm,
    setSearchTerm,
    paramsArticle,
    setParamsArticle
}) => {
    const dispatch = useDispatch()
    const [viewPort, setViewPort] = useState(window.innerWidth < 768)
    const [listVideo, setListVideo] = useState([])
    const [listArticle, setListArticle] = useState([])
    const dropdownRef = useRef(null)
    const [isDropdown, setIsDropdown] = useState({
        searchInput: false,
        typeArticle: false
    })
    const [checkedItem, setCheckedItem] = useState({
        all: false,
        video: false,
        article: false
    })

    const handleCheckboxChange = (type, name, isChecked) => {
        setCheckedItem((prevItems) => {
            const updatedCheckedItem = { ...prevItems }
            if (isChecked) {
                for (const key in updatedCheckedItem) {
                    if (key !== name) {
                        updatedCheckedItem[key] = false
                    }
                }
                updatedCheckedItem[name] = true
            } else {
                updatedCheckedItem[name] = false
            }
          return updatedCheckedItem
        })
    }

    const handleInputChange = (evt) => {
        if (evt.target.value !== "") {
          if(evt.target.value.length >= 3){
            setSearchTerm(evt.target.value)
            setParamsArticle({
                ...paramsArticle,
                search: evt.target.value
            })
            setIsDropdown({
              ...isDropdown,
              searchInput: true
            })
          }else{
            setIsDropdown({
              ...isDropdown,
              searchInput: false
            })
          }
          setConditionParams({
            ...conditionParams,
            search: evt.target.value,
            searchBtn: true
          })
        } else {
          setConditionParams({
            ...conditionParams,
            search: evt.target.value,
            searchBtn: false,
          })
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdown({
            typeDropdown: false,
            priceDropdown: false,
            searchInput: false
          })
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const key = Object.keys(checkedItem).find(key => checkedItem[key] === true)
        if(key === "all"){
            setParamsArticle({
                ...paramsArticle,
                all: true 
            })
            setConditionParams({
                ...conditionParams,
                propertiType: "Semua"
            })
        }else{
            setParamsArticle({
                ...paramsArticle,
                limit: key === "article" ? 15 : 20,
                type: key 
            })
            setConditionParams({
                ...conditionParams,
                propertiType: key === "article" ? "Artikel" : key?.charAt(0).toUpperCase() + key?.slice(1)
            })
        }
    }, [checkedItem])
    
    useEffect(() => {
        if(searchTerm !== ""){
          dispatch(searchSuggestionArticle(paramsArticle,setListArticle,setListVideo))
        }else{
          setIsDropdown({
            ...isDropdown,
            searchInput: false
          })
        }
    }, [searchTerm])

    const handleClickList = (v) => {
        setConditionParams({
            ...conditionParams,
            search: v
        })
        setParamsArticle({
            ...paramsArticle,
            search: v
        })
        setIsDropdown({
            ...isDropdown,
            searchInput: false
        })
    }

    return (
        <>
            <div className="flex flex-col mobile:flex-col mobile:gap-3 p-[17px] bg-[#FFFFFF] border-[#EAEBEB] border-1 rounded-xl shadow-md">
                <p className="text-[#292929] text-md text-[22px] pb-3 font-semibold">Cari update apa hari ini?</p>
                {!viewPort ? <>
                    <div className="flex flex-row gap-2">
                        <div className="relative w-[70%] mobile:w-full mobile:h-10">
                            <TextboxLabel
                                placeholder="Cari kata kunci"
                                labelOnCLick={handleKeyDown}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                rightLabelBorder={false}
                                value={conditionParams.search}
                                rightLabel={<FiSearch color={"#777777"} />}
                            />
                            {isDropdown.searchInput ? (
                                <DropdownSearchArtikel
                                    ref={dropdownRef}
                                    artikel={listArticle}
                                    video={listVideo}
                                    searchTerm={searchTerm}
                                    isDropdown={isDropdown}
                                    setIsDropdown={setIsDropdown}
                                    otherProps = {{
                                        handleClickList
                                    }}
                                />
                            ) : <></>}
                        </div>
                        <div className="relative border bg-white rounded-lg w-[20%] flex flex-col text-center items-center mobile:w-full" onClick={() => {
                            setIsDropdown({
                                searchInput: false,
                                typeArticle: !isDropdown.typeArticle
                            })
                        }}>
                            <div className="flex justify-between mobile:h-10 text-center items-center mt-2 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full px-3">
                            {conditionParams?.propertiType || "Pilih Tipe"}
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
                            {isDropdown.typeArticle ? (
                                <DropdownProperti
                                    ref={dropdownRef}
                                    data={articleType}
                                    type="article"
                                    handleCheckboxChange={handleCheckboxChange}
                                    checkedItem={checkedItem}
                                    filterDataLoc={conditionParams}
                                />
                                ) : <></>
                            }
                        </div>
                        <div className="w-fit mobile:w-full mobile:h-10">
                            <Button className={`w-fit h-full border-0 ${enableLabelClick === true ? "bg-[#1078CA] text-white" : "bg-[#EAEBEB] text-[#B5B6B6]"} `} onClick={handleKeyDown} disabled={enableLabelClick ?? false}>
                            Cari
                            </Button>
                        </div>
                    </div>
                </> 
                : <>
                    <div className="relative mobile:w-full mobile:h-10 gap-3">
                        <TextboxLabel
                            placeholder="Cari kata kunci"
                            labelOnCLick={handleKeyDown}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            rightLabelBorder={false}
                            value={conditionParams.search}
                            rightLabel={<FiSearch color={"#777777"} />}
                        />
                        {isDropdown.searchInput ? (
                            <DropdownSearchArtikel
                                ref={dropdownRef}
                                artikel={listArticle}
                                video={listVideo}
                                searchTerm={searchTerm}
                                isDropdown={isDropdown}
                                setIsDropdown={setIsDropdown}
                                otherProps = {{
                                    handleClickList
                                }}
                            />
                        ) : <></>}
                    </div>
                    <div className="relative border bg-white rounded-lg flex flex-col text-center items-center mobile:w-full" onClick={() => {
                        setIsDropdown({
                            searchInput: false,
                            typeArticle: !isDropdown.typeArticle
                        })
                    }}>
                        <div className="relative flex justify-between mobile:h-10 text-center items-center mt-2 mobile:mt-0 text-[#777777] text-nowrap gap-2 mobile:gap-44 cursor-pointer w-full px-3">
                            {conditionParams?.propertiType || "Pilih Tipe"}
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
                            {isDropdown.typeArticle ? (
                                <DropdownProperti
                                    ref={dropdownRef}
                                    data={articleType}
                                    type="article"
                                    handleCheckboxChange={handleCheckboxChange}
                                    checkedItem={checkedItem}
                                    filterDataLoc={conditionParams}
                                />
                                ) : <></>
                            }
                    </div>
                    <div className="mobile:w-full mobile:h-10">
                        <Button className={`w-full h-full border-0 ${enableLabelClick === true ? "bg-[#1078CA] text-white" : "bg-[#EAEBEB] text-[#B5B6B6]"} `} onClick={handleKeyDown} disabled={enableLabelClick === true ? false : true}>
                        Cari
                        </Button>
                    </div>                   
                </>}
            </div>
        </>
    )
}

export default SearchbarArticle