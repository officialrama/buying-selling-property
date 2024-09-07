/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DropdownMenuList, DropdownMenuPriceSlider } from "..";
import { typeConst } from "../../../static/homepage/typeConst";
import { DropdownSearch, SearchHomepage } from "../../atoms";

const SearchBarHomepage = ({
  onChangeSlider,
  minRange,
  maxRange,
  defaultValue,
  value,
  onChangeType,
  filterDataLoc,
  setFilterDataLoc,
  handleKeyDown,
  handleInputChange,
  handleChangePrice,
  enableLabelClick
}) => {
  useEffect(() => {
    setFilterDataLoc({
      ...filterDataLoc,
      minPrice: defaultValue[0],
      maxPrice: defaultValue[1],
      searchBtn: false
    });
  }, []);

  const [isDropdown, setIsDropdown] = useState({
    typeDropdown: false,
    priceDropdown: false,
  });

  return (
    <div className="mt-[80px]">
      <div className="p-[30px] mobile:mr-[0px] tab:mr-[0px] largePc:mr-[20px] smallPc:mr-[20px] bg-white rounded-2xl">
        <SearchHomepage
          handleKeyDown={handleKeyDown}
          handleInputChange={handleInputChange}
          enableLabelClick={enableLabelClick}
        />
        <div className="my-5 w-full border-t border-gray-300" />
        <div className="flex">
          <div>
            <DropdownSearch
              placeholder={filterDataLoc?.nameType || "Pilih Tipe"}
              onClickDrop={() => {
                setIsDropdown({
                  priceDropdown: false,
                  typeDropdown: !isDropdown.typeDropdown,
                });
              }}
            />
            {isDropdown.typeDropdown ? (
              <DropdownMenuList
                onClick={onChangeType}
                filterDataLoc={filterDataLoc}
                data={typeConst}
                isDropdown={isDropdown}
                setIsDropdown={setIsDropdown}
              />) : <></>
            }
          </div>
          <div className="mr-[4vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarHomepage;
