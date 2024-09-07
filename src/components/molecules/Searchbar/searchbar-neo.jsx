/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { 
  DropdownMenuList, 
  DropdownMenuPriceSlider,
  DropdownSearchInput } from ".."
import { typeConst } from "../../../static/homepage/typeConst"
import { DropdownSearch, SearchHomepage, SearchNeo } from "../../atoms"
import { Button } from "flowbite-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import DropdownProperti from "../DropdownMenu/Homepage/DropdownProperti"

const SearchBarNeo = ({
  defaultValue,
  onChangeType,
  filterDataLoc,
  setFilterDataLoc,
  handleKeyDown,
  handleChangePrice,
  fetch,
  lngLat,
  enableLabelClick
}) => {
const dispatch = useDispatch()
useEffect(() => {
  setFilterDataLoc({
    ...filterDataLoc,
    minPrice: defaultValue[0],
    maxPrice: defaultValue[1],
    searchBtn: false
  });
}, [])
const [isDropdown, setIsDropdown] = useState({
  typeDropdown: false,
  priceDropdown: false,
  searchInput: false,
})
const [checkedItem, setCheckedItem] = useState({
  properti: {
    all: false,
    apartment: false,
    rumah: false,
    ruko: false,
    villa: false
  },
  budget: {
    all: false,
    "0.5-1m": false,
    "1m-2m": false,
    "3m-4m": false,
    "4m+": false
  }
})
const dropdownRef = useRef(null)

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
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  }
}, [])

useEffect(() => {
  const findCheckedItemProperti = (lowerCase = false) => {
    const checkedType = []
    for (const key in checkedItem.properti) {
      if (checkedItem.properti[key]) {
        if(lowerCase){
          checkedType.push(key)
        } else {
          if(key === "all"){
            checkedType.push("Semua")
          } else if(key === "apartment"){
            checkedType.push("Apartemen")
          }else {
            checkedType.push(key.charAt(0).toUpperCase() + key.slice(1))
          }
        }
      }
    }
    return checkedType.length > 0 ? checkedType : null
}

  const budgetMapping = {
    "all" : [defaultValue[0], defaultValue[1], "Semua"],
    "0.5-1m": [500000000, 1000000000, "Rp500 Jt - 1 M"],
    "1m-2m": [1000000000, 2000000000, "Rp1 M - 2 M"],
    "3m-4m": [3000000000, 4000000000, "Rp3 M - 4 M"],
    "4m+": [4000000000, 4000000000, "> Rp4 M"]
  }

  const findCheckedBudget = () => {
    for (const key in checkedItem.budget) {
      if (checkedItem.budget[key]) {
        return budgetMapping[key]
      }
    }
    return null;
  }

  const checkedBudget = findCheckedBudget()
  setFilterDataLoc({
    ...filterDataLoc,
    minPrice: checkedBudget ? checkedBudget[0] : defaultValue[0],
    maxPrice: checkedBudget ? checkedBudget[1] : defaultValue[1],
    nameType: checkedBudget ? checkedBudget[2] : "",
    propertiType: findCheckedItemProperti()?.[0],
    type: findCheckedItemProperti(true)
  })
},[checkedItem])

const handleCheckboxChange = (type, name, isChecked) => {
  setCheckedItem((prevItems) => {
    const updatedCheckedItem = { ...prevItems };
    if (type === 'properti') {
      updatedCheckedItem[type][name] = isChecked;
    } else {
      if (isChecked) {
        for (const key in updatedCheckedItem[type]) {
          if (key !== name) {
            updatedCheckedItem[type][key] = false;
          }
        }
        updatedCheckedItem[type][name] = true;
      } else {
        updatedCheckedItem[type][name] = false;
      }
    }
    return updatedCheckedItem;
  });
}

const [kotaKabupaten, setKotaKabupaten] = useState([])
const [listProyek, setListProyek] = useState([])
const navigate = useNavigate()

const rangePrice = [
  { name: 'Semua', value: "all" },
  { name: 'Rp500 Jt - 1 M', value: "0.5-1m" },
  { name: 'Rp1 M - 2 M', value: "1m-2m" },
  { name: 'Rp3 M - 4 M', value: "3m-4m" },
  { name: '> Rp4 M', value: "4m+" }
]

  const [searchTerm, setSearchTerm] = useState("")
  const [suggestion, setSuggestion] = useState([])

  useEffect(() => {
    if(searchTerm !== ""){
      dispatch(fetch(searchTerm,lngLat,setKotaKabupaten,setListProyek))
      setFilterDataLoc({
        ...filterDataLoc,
        search: searchTerm,
        type: ["all"]
      })
    }else{
      setIsDropdown({
        ...isDropdown,
        searchInput: false
      })
    }
  }, [searchTerm])

  const handleInputChange = (evt) => {
    if (evt.target.value !== "") {
      if(evt.target.value.length >= 3){
        setSearchTerm(evt.target.value)
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
      if (
        filterDataLoc.nameType === undefined ||
        (filterDataLoc.nameType === "" && filterDataLoc.type === undefined) ||
        filterDataLoc.type === ""
      ) {
        if (filterDataLoc.minPrice > 0 || filterDataLoc.maxPrice < 100000000000) {
          setFilterDataLoc({
            ...filterDataLoc,
            search: evt.target.value,
            nameType: "Semua",
            type:[ "all"],
            searchBtn: true,
          });
        } else {
          setFilterDataLoc({
            ...filterDataLoc,
            search: evt.target.value,
            nameType: "Semua",
            type: ["all"],
            minPrice: Number(0),
            maxPrice: Number(100000000000),
            searchBtn: true,
          });
        }
      } else {
        setFilterDataLoc({
          ...filterDataLoc,
          search: evt.target.value,
          searchBtn: true,
        });
      }
    } else {
      setFilterDataLoc({
        ...filterDataLoc,
        search: evt.target.value,
        searchBtn: false,
      });
    }
  }


  const [viewPort, setViewPort] = useState(window.innerWidth < 768)
    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleSeeAllProyek = () => {
      if (!!filterDataLoc) {
        window.localStorage.setItem("filterLoc", JSON.stringify(filterDataLoc))
        navigate({
          pathname: "/v2/search",
          search: "?type=price",
        })
      }
    }

  const handleClickCity = (v) => {
    setFilterDataLoc({
      ...filterDataLoc,
      search: v
    })
    setIsDropdown({
      ...isDropdown,
      searchInput: false
    })
  }

  const handleClickProject = (v) => {
    if(v){
      const uriId = encodeURIComponent(v)
      console.log("[DEBUG]: search bar neo handle click project :", v, uriId)
      navigate({
        pathname: `/unit-details/${uriId}`,
        search: "?fromneosearch=true",
      })
    }
  }

  return (
    <div className="flex flex-col mobile:flex-col p-[17px] bg-[#FFFFFF] border-[#EAEBEB] border-1 rounded-xl shadow-md">
      <p className="text-[#292929] text-[22px] pb-3 font-semibold">Cari Properti Impianmu</p>
      {!viewPort ? <>
        <div className="flex flex-row gap-2">
          <div className="relative w-[58%] mobile:w-full mobile:h-10">
            <SearchNeo
              handleKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              enableLabelClick={enableLabelClick}
              value={filterDataLoc?.search}
            />
            {isDropdown.searchInput ? (
              <DropdownSearchInput
                ref={dropdownRef}
                kota={kotaKabupaten}
                proyek={listProyek}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isDropdown={isDropdown}
                setIsDropdown={setIsDropdown}
                onClick={handleSeeAllProyek}
                otherProps = {{
                  handleClickCity,
                  handleClickProject
                }}
              />
            ) : <></>}
          </div>
          <div className="relative border bg-white rounded-lg w-[19%] flex flex-col text-center items-center mobile:w-full" onClick={() => {
            setIsDropdown({
              priceDropdown: false,
              searchInput: false,
              typeDropdown: !isDropdown.typeDropdown,
            });
          }}>
            <div className="flex justify-between mobile:h-10 text-center items-center mt-2 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full px-3">
              {filterDataLoc?.propertiType || "Pilih Tipe"}
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
            {isDropdown.typeDropdown ? (
                <DropdownProperti 
                    ref={dropdownRef}
                    onClick={onChangeType}
                    data={typeConst}
                    type="properti"
                    handleCheckboxChange={handleCheckboxChange}
                    checkedItem={checkedItem.properti}
                    filterDataLoc={filterDataLoc}
                  />
              ) : <></>
            }
          </div>
          <div className="relative border bg-white rounded-lg w-[23%] flex flex-col text-center items-center mobile:w-full" onClick={() => {
            setIsDropdown({
              priceDropdown: !isDropdown.priceDropdown,
              searchInput: false,
              typeDropdown: false
            });
          }}>
            <div className="flex justify-between mobile:h-10 text-center items-center mt-2 mobile:mt-0 text-[#777777] gap-2 mobile:gap-44 cursor-pointer w-full px-3">
              {filterDataLoc?.nameType || "Rentang Budget"}
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
            {isDropdown.priceDropdown ? (
                  <DropdownProperti 
                    ref={dropdownRef}
                    onClick={onChangeType}
                    filterDataLoc={filterDataLoc}
                    data={rangePrice}
                    type="budget"
                    handleCheckboxChange={handleCheckboxChange}
                    checkedItem={checkedItem.budget}
                  />
               ) : <></>
            }
          </div>
          <div className="w-fit mobile:w-full mobile:h-10">
            <Button className="w-fit h-full border-0 bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6]" onClick={handleKeyDown} disabled={enableLabelClick === true ? false : true}>
              Cari
            </Button>
          </div>
        </div>
      </> : <>
          <div className="relative w-2/4 mobile:w-full mobile:h-10 gap-3">
            <SearchNeo
              handleKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              enableLabelClick={enableLabelClick}
            />
            {isDropdown.searchInput ? (
              <DropdownSearchInput
                ref={dropdownRef}
                kota={kotaKabupaten}
                proyek={listProyek}
                searchTerm={searchTerm}
                isDropdown={isDropdown}
                setIsDropdown={setIsDropdown}
              />
            ) : <></>}
          </div>
          <div className="flex flex-row gap-2 py-2">
            <div className="border bg-white rounded-lg flex flex-col text-center items-center mobile:w-2/4" onClick={() => {
                setIsDropdown({
                  priceDropdown: false,
                  searchInput: false,
                  typeDropdown: !isDropdown.typeDropdown,
                });
              }}>
                <div className="flex flex-column text-center items-center mt-2 mobile:mt-0 mobile:h-10 text-[#777777] gap-2 cursor-pointer">
                  {filterDataLoc?.propertiType || "Pilih Tipe"} <img src="/icons/small-icons/arrow-down-new.svg" alt="arrow-down" />
                </div>
                {isDropdown.typeDropdown ? (
                    <DropdownMenuList
                      ref={dropdownRef}
                      onClick={onChangeType}
                      filterDataLoc={filterDataLoc}
                      data={typeConst}
                      isDropdown={isDropdown}
                      setIsDropdown={setIsDropdown}
                    /> ) : <></>
                }
              </div>
              <div className="border bg-white rounded-lg flex flex-col text-center items-center mobile:w-2/4" onClick={() => {
                setIsDropdown({
                  priceDropdown: !isDropdown.priceDropdown,
                  searchInput: false,
                  typeDropdown: false
                });
              }}>
                <div className="flex flex-column text-center items-center mt-2 mobile:mt-0 mobile:h-10 text-[#777777] gap-2 cursor-pointer">
                  {filterDataLoc?.nameType || "Rentang Budget"} <img src="/icons/small-icons/arrow-down-new.svg" alt="arrow-down" />
                </div>
                {isDropdown.priceDropdown ? (
                    <DropdownMenuList
                      ref={dropdownRef}
                      onClick={handleChangePrice}
                      filterDataLoc={filterDataLoc}
                      data={rangePrice}
                      isDropdown={isDropdown}
                      setIsDropdown={setIsDropdown}
                    /> ) : <></>
                }
              </div>
          </div>
          <div className="w-1/6 mobile:w-full mobile:h-10">
              <Button className="w-full h-full border-0 bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6]" onClick={handleKeyDown} disabled={enableLabelClick === true ? false : true}>
                Cari
              </Button>
          </div>
      </>}
    </div>
  );
};

export default SearchBarNeo;