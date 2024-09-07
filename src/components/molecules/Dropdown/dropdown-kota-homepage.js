
import React, { useEffect, useRef, useState } from "react";
import { AutocompleteProvincies, Title } from "../../atoms";
import { GMapsApp } from "../../organisms";
import { useDispatch } from "react-redux";
import { provincies } from "../../../store/actions/fetchData/branch";
import { infoLelangSearch } from "../../../store/actions/fetchData/info-lelang";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import useInputHooks from "../../../hooks/useInputHooks";
import { FiSearch } from "react-icons/fi";
import TextboxLabel from "../Input/textbox-custom/textbox-label";

const DropdownKota = ({placeholder, className, setInputs, inputs}) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cityData, setCityData] = useState();

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_URL_SALES_REF_API}/api/search/kota`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((res) => {
        setCityData(res.responseData);
      })
      .catch((error) => {
        console.error(error);
      });
    }catch (error) {
      console.error(error);
    }
    }, [])

    const handleSelectItem = (val) => {
      const cityName = val.kotaKabupaten
      if (window.location.pathname.includes("/visitor/activate")) {
        setInputs({
          ...inputs,
        ['location']: { isValid: !!val, value: val.kotaKabupaten, msgError: "" },
        });
        setSearchText(val.kotaKabupaten)
        setSuggestions([])
      } else {
        window.location.href = `/v2/search?type=city-only&cityName=${cityName}`;
      }
    };

    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
      const inputValue = e.target.value.toLowerCase();
      const filteredSuggestions = cityData.filter((item) =>
        item.kotaKabupaten.toLowerCase().includes(inputValue)
      ).slice(0, 5);
    
      setSuggestions(filteredSuggestions);
    };
  

  return (
    <div className="relative inline-block text-left">
              <div className={`relative mobile:w-[365px] h-auto bg-transparent ${className ? className : "w-[400px]"}`}>
                <div className="py-2 relative ">
                  <TextboxLabel
                    placeholder={placeholder}
                    onChange={handleSearchChange}
                    value={searchText}
                    rightLabelBorder={false}
                    leftLabel={<img src="/icons/small-icons/Location-City.svg" />}
                    rightLabel={<FiSearch color={"#777777"} />}
                  />
                {/* <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Location..."
                    className="autocompSearch__textbox rounded-lg"
                  />
                  <FiSearch color={"#777777"} /> */}
                  </div>
                  { searchText !== '' && (
                      <div className={`px-4 py-2 bg-[#ffff] border border-[#EAEBEB] rounded-lg w-[396px] mobile:w-[360px] z-10 ${className ? className : "w-[400px]"}`}>
                        <ul>
                        {suggestions.map((suggestion, index) => {
                          const indexMatch = suggestion.kotaKabupaten.toLowerCase().indexOf(searchText.toLowerCase());
                          const firstPart = suggestion.kotaKabupaten.slice(0, indexMatch);
                          const secondPart = suggestion.kotaKabupaten.slice(indexMatch + searchText.length);

                return (
                  <li className="cursor-pointer" key={index} onClick={() => handleSelectItem(suggestion)}>
                    <span>{firstPart}</span>
                    <span style={{ color: '#1078CA' }}>{suggestion.kotaKabupaten.substr(indexMatch, searchText.length)}</span>
                    <span>{secondPart}</span>
                  </li>
                );
              })}
                        </ul>
                      </div>
                    )} 
              </div>
    </div>
  );
};
export default DropdownKota;
