import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { AutocompleteProvincies, Title } from "../../atoms";
import { GMapsApp } from "../../organisms";
import { useDispatch } from "react-redux";
import { provincies } from "../../../store/actions/fetchData/branch";
import { infoLelangSearch } from "../../../store/actions/fetchData/info-lelang";
import useFormStepperHooks from "../../../hooks/useFormStepperHooks";
import useInputHooks from "../../../hooks/useInputHooks";
import { Button } from "flowbite-react";

const ModalProvincies = ({isModalGmaps, setModalGmaps, setDataProperty, dataProperty, filter, currentPage, setTotalData, setProperty, property}) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const [kcDescVal, setKcDescVal] = useState("")
  const { setInputs } = useFormStepperHooks()
  const { inputs } = useInputHooks()
  const containerRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const closeModal = () => {
    setModalGmaps(false);
  };
  const handleSimpanClick = () => {
    const existingData = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
    const selectedNames = selectedItems.map(item => item.name);
    existingData.provincies = selectedNames
    localStorage.setItem("FilterInfoLelang", JSON.stringify(existingData));
    const currentPath = window.location.pathname + window.location.search;
  if (currentPath !== '/properti-secondary?search') {
    window.location.href = '/properti-secondary?search';
  } else {
    dispatch(infoLelangSearch(setDataProperty, dataProperty, {filter}, currentPage, setTotalData))
    setModalGmaps(false);
  }
  };
  const [kcList, setKcList] = useState([])
  const [kcForm, setKcForm] = useState({
      state: "other"
  })
  const [loadingLoc, setLoadingLoc] = useState({
      onLoading: false,
      failed: false
    })

  useEffect(() => {
        dispatch(provincies(setKcList, loadingLoc, setLoadingLoc))
    }, [kcForm.state])


    const handleDeleteItem = (itemToDelete) => {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
    };

    const handleResetClick = () => {
      setSelectedItems([]);
      setKcDescVal("");
    };

    // const handleSelectItem = (val) => {
    //   setKcDescVal(val);
    //   const selectedKc = kcList.find((e) => e.name.toString());
    
    //   if (selectedKc && !selectedItems.some((item) => item.id === selectedKc.id)) {
    //     setInputs({
    //       ...inputs,
    //       provinciesName: { isValid: true, value: selectedKc.name },
    //     });
    
    //     setSelectedItems((prevItems) => [...prevItems, selectedKc]);
    //     setKcDescVal("");
    //   }
    // };

    const handleSelectItem = (val) => {
      setKcDescVal(val);
      const selectedKc = kcList.find((e) => e.name === val.name);
      if (selectedKc && !selectedItems.some((item) => item.id === selectedKc.id)) {
        setInputs({
          ...inputs,
          provinciesName: { isValid: true, value: selectedKc.name },
        });
    
        setSelectedItems((prevItems) => [...prevItems, selectedKc]);
        setKcDescVal("");
        setSearchText("");
      }
    };
  
    function matchDataKc(state, value) {
      return (
        state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth;
      }
    }, [selectedItems]);
  
    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
      const inputValue = e.target.value.toLowerCase();
      let matchingItem;

      const filteredSuggestions = kcList.filter(item =>
        item.name.toLowerCase().includes(inputValue)
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
     
      if (inputValue === "jakarta") {
        matchingItem = kcList.find(item => {
          return item.name.toLowerCase().includes("dki jakarta");
        });
      } else if (inputValue === "yogyakarta" || inputValue === "jogjakarta") {
        matchingItem = kcList.find(item => {
          return item.name.toLowerCase().includes("d.i. yogyakarta");
        });
      } else if (inputValue === "aceh") {
        matchingItem = kcList.find(item => {
          return item.name.toLowerCase().includes("nanggroe aceh d");
        });
      } else {
        matchingItem = kcList.find(item => {
          return item.name.toLowerCase() === inputValue;
        });
      }
    
      if (matchingItem) {
        handleSelectItem(matchingItem);
        setSearchText('');
      }
    };
  return (
    <div
      className={`${
        isModalGmaps ? "flex" : "hidden"
      } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className="relative w-[760px] h-auto bg-transparent">
        <div className="px-4 pb-4 bg-white rounded-lg">
          <div className="flex items-start justify-between px-5 py-3 mb-4 border-solid border-gray-300 rounded-t">
            <div className="place-self-center">
              <Title
                className="text-[#292929] text-3xl fontweight__bold"
                text="Lokasi"
              />
            </div>
            <button
              className="bg-transparent text-black float-right place-self-center"
              onClick={closeModal}
            >
              <img src="/icons/Close_Circle.svg" alt="Close Button" />
            </button>
          </div>
          <span className=" px-4 text-[#929393] text-sm font-normal">Cari berdasarkan provinsi</span>
          <div className="px-4 py-2">
              <AutocompleteProvincies
                value={kcDescVal}
                items={kcList}
                getItemValue={(item) => `${item?.name}`}
                shouldItemRender={matchDataKc}
                renderMenu={item => (
            <div className="autocompSearch__dropdownWrap">
                {item}
            </div>
            )}
            renderItem={(item) => (
              <div className="autocompSearch__dropdownItem">
                {item?.name}
              </div>
            )}
            onChange={(event, val) => setKcDescVal(val)}
            wrapperStyle={{ position: "relative" }}
            wrapperProps={{
                className: "autocompSearch__wrapper"
            }}
            inputProps={{
               
                className: "autocompSearch__textbox",
            }}
            onSelect={(val) => handleSelectItem(val)}
            state={kcForm.state}
            selectedItems={selectedItems}
            handleDeleteItem={handleDeleteItem}
            handleSelectItem={handleSelectItem}
            handleSearchChange={handleSearchChange}
            searchText={searchText}
            setSearchText={setSearchText}
            containerRef={containerRef}
            />
            </div>
            { suggestions.length > 0 && searchText !== '' && (
                <div className="px-4 py-2 bg-[#ffff] border border-[#EAEBEB] rounded-lg w-[696px] mobile:w-[346px] absolute right-[32px] z-10">
                  <ul>
                    {suggestions.map((suggestion, index) => {
                      const indexMatch = suggestion.name.toLowerCase().indexOf(searchText.toLowerCase());
                      const firstPart = suggestion.name.slice(0, indexMatch);
                      const secondPart = suggestion.name.slice(indexMatch + searchText.length);

                      return (
                    <li className="cursor-pointer" key={index} onClick={() => handleSelectItem(suggestion)}>
                      <span>{firstPart}</span>
                      <span style={{ color: '#1078CA' }}>{suggestion.name.substr(indexMatch, searchText.length)}</span>
                      <span>{secondPart}</span>
                    </li>
                      );
                    })}
                  </ul>
                </div>
              )} 
            <div className="px-4 py-2 flex flex-row gap-4 place-content-end">
            <Button className="w-[77px] h-[48px] bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6] font-bold" disabled={selectedItems.length === 0} onClick={handleResetClick} >
                Reset
              </Button>
              <Button className="w-[104px] h-[48px] bg-[#1078CA] disabled:bg-[#EAEBEB] disabled:text-[#B5B6B6] font-bold" onClick={handleSimpanClick} disabled={selectedItems.length === 0}>
                Terapkan
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

ModalProvincies.propTypes = {
  children: PropTypes.any,
};

ModalProvincies.defaultProps = {
  children: "",
};

export default ModalProvincies;
