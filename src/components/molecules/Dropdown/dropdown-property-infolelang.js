import React, { useEffect, useState } from 'react';
import { Button, CurrencyInputCalc } from '../../atoms';
import { Checkbox } from '..';
import { infoLelangSearch } from '../../../store/actions/fetchData/info-lelang';
import { useDispatch } from 'react-redux';

const DropdownProperty = ({setDataProperty, dataProperty, filter, currentPage, setTotalData, setProperty, property}) => {
  const dispatch = useDispatch();
  const [showInputs, setShowInputs] = useState(false);
  const [semuaChecked, setSemuaChecked] = useState(false);
  const [propertyRumahChecked, setPropertyRumahChecked] = useState(false);
  const [propertyRukoChecked, setPropertyRukoChecked] = useState(false);
  const [propertyApartemenChecked, setPropertyApartemenChecked] = useState(false);
  const [propertyKontrakanChecked, setPropertyKontrakanChecked] = useState(false);
  const [propertyKavlingChecked, setPropertyKavlingChecked] = useState(false);
  const [isSimpanClicked, setIsSimpanClicked] = useState(false);
  const existingData = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
  const handleDropdownClick = () => {
    setShowInputs(!showInputs);
  };

  const handleSemuaCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setSemuaChecked(isChecked);
    setPropertyRumahChecked(isChecked);
    setPropertyRukoChecked(isChecked);
    setPropertyApartemenChecked(isChecked);
    setPropertyKontrakanChecked(isChecked);
    setPropertyKavlingChecked(isChecked);
  };

  const handleCheckboxChange = (name, isChecked) => {
    if (name === 'Semua') {
      handleSemuaCheckboxChange({ target: { checked: isChecked } });
    } else if (name === '1') {
      setPropertyRumahChecked(isChecked);
    } else if (name === '2') {
      setPropertyRukoChecked(isChecked);
    } else if (name === '3') {
      setPropertyApartemenChecked(isChecked);
    } else if (name === '5') {
      setPropertyKontrakanChecked(isChecked);
    } else if (name === '26') {
      setPropertyKavlingChecked(isChecked);
    }
  };

  const handleSimpanClick = () => {
    const existingData = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
    existingData.subCategories = [];
    if (propertyRumahChecked) existingData.subCategories.push('1');
    if (propertyRukoChecked) existingData.subCategories.push('2');
    if (propertyApartemenChecked) existingData.subCategories.push('3');
    if (propertyKontrakanChecked) existingData.subCategories.push('5');
    if (propertyKavlingChecked) existingData.subCategories.push('26');
    localStorage.setItem("FilterInfoLelang", JSON.stringify(existingData));
    setIsSimpanClicked(true);
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== '/properti-secondary?search') {
      window.location.href = '/properti-secondary?search';
    } else {
      dispatch(infoLelangSearch(setDataProperty, dataProperty, {filter}, currentPage, setTotalData))
      setShowInputs(!showInputs);
    }
  };


  return (
    <div className="relative inline-block text-left">
      <div className="">
        <button
          type="button"
          className="inline-flex flex-row justify-between w-[320px] mobile:w-[350px] h-11 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          onClick={handleDropdownClick}
        >  
          {(isSimpanClicked || existingData.subCategories) ?
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.0349 3H12.2907C12.098 3 11.9419 3.15868 11.9419 3.35443V3.39619L14.3837 5.381V3.35443C14.3837 3.15868 14.2275 3 14.0349 3Z" fill="#1078CA"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62791 7.60759C8.62791 7.11823 9.01836 6.72152 9.5 6.72152C9.98164 6.72152 10.3721 7.11823 10.3721 7.60759C10.3721 8.09696 9.98164 8.49367 9.5 8.49367C9.01836 8.49367 8.62791 8.09696 8.62791 7.60759Z" fill="#1078CA"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6046 8.64286L16.1499 9.08603C16.3755 9.26945 16.7048 9.23228 16.8853 9.003C17.0658 8.77372 17.0293 8.43916 16.8036 8.25574L11.1344 3.64763C10.1789 2.87096 8.82114 2.87096 7.86563 3.64763L2.1964 8.25574C1.97074 8.43916 1.93415 8.77372 2.11468 9.003C2.29521 9.23228 2.62449 9.26945 2.85015 9.08603L3.39536 8.64286V15.9367H2.52327C2.23429 15.9367 2.00002 16.1747 2.00002 16.4684C2.00002 16.762 2.23429 17 2.52327 17H16.4767C16.7657 17 17 16.762 17 16.4684C17 16.1747 16.7657 15.9367 16.4767 15.9367H15.6046V8.64286ZM7.5814 7.60759C7.5814 6.53099 8.44039 5.65823 9.5 5.65823C10.5596 5.65823 11.4186 6.53099 11.4186 7.60759C11.4186 8.6842 10.5596 9.55696 9.5 9.55696C8.44039 9.55696 7.5814 8.6842 7.5814 7.60759ZM9.53444 10.2658C9.9983 10.2658 10.398 10.2658 10.718 10.3095C11.061 10.3563 11.3898 10.462 11.6565 10.733C11.9232 11.0039 12.0272 11.338 12.0733 11.6865C12.1136 11.9914 12.1161 12.3673 12.1163 12.8014C12.1163 12.8304 12.1163 12.8596 12.1163 12.8891L12.1163 15.9367H11.0698V12.9241C11.0698 12.4078 11.0687 12.0741 11.0361 11.8282C11.0056 11.5976 10.9563 11.5253 10.9165 11.4848C10.8767 11.4444 10.8055 11.3943 10.5786 11.3633C10.3366 11.3302 10.0081 11.3291 9.5 11.3291C8.99188 11.3291 8.66343 11.3302 8.42142 11.3633C8.19446 11.3943 8.12333 11.4444 8.08349 11.4848C8.04366 11.5253 7.9944 11.5976 7.96389 11.8282C7.93135 12.0741 7.93024 12.4078 7.93024 12.9241V15.9367H6.88373L6.88373 12.8891C6.8837 12.4178 6.88368 12.0117 6.92671 11.6865C6.97282 11.338 7.07682 11.0039 7.3435 10.733C7.61018 10.462 7.93897 10.3563 8.28197 10.3095C8.60203 10.2658 9.0017 10.2658 9.46556 10.2658H9.53444Z" fill="#1078CA"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62791 7.60759C8.62791 7.11823 9.01836 6.72152 9.5 6.72152C9.98164 6.72152 10.3721 7.11823 10.3721 7.60759C10.3721 8.09696 9.98164 8.49367 9.5 8.49367C9.01836 8.49367 8.62791 8.09696 8.62791 7.60759Z" fill="#1078CA"/>
          </svg>          
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4651 4.02439V5.17822L13.8605 6.2709V4.02439H12.4651ZM14.907 7.09041V3.85366C14.907 3.3822 14.5165 3 14.0349 3H12.2907C11.809 3 11.4186 3.3822 11.4186 3.85366V4.3587L11.1344 4.13613C10.1789 3.38788 8.82114 3.38788 7.86563 4.13613L2.1964 8.57565C1.97074 8.75237 1.93415 9.07469 2.11468 9.29558C2.29521 9.51647 2.62449 9.55228 2.85015 9.37557L3.39536 8.94861V15.9756H2.52327C2.23429 15.9756 2.00002 16.2049 2.00002 16.4878C2.00002 16.7707 2.23429 17 2.52327 17H16.4767C16.7657 17 17 16.7707 17 16.4878C17 16.2049 16.7657 15.9756 16.4767 15.9756H15.6046V8.94861L16.1499 9.37557C16.3755 9.55228 16.7048 9.51647 16.8853 9.29558C17.0658 9.07469 17.0293 8.75237 16.8036 8.57565L14.907 7.09041ZM14.5581 8.1291L10.4806 4.93604C9.90732 4.48709 9.09268 4.48709 8.51938 4.93604L4.44187 8.1291V15.9756H6.88373L6.88373 13.0395C6.8837 12.5854 6.88368 12.1942 6.92671 11.8809C6.97282 11.5451 7.07682 11.2233 7.3435 10.9623C7.61018 10.7012 7.93897 10.5994 8.28197 10.5543C8.60203 10.5121 9.0017 10.5122 9.46556 10.5122H9.53444C9.9983 10.5122 10.398 10.5121 10.718 10.5543C11.061 10.5994 11.3898 10.7012 11.6565 10.9623C11.9232 11.2233 12.0272 11.5451 12.0733 11.8809C12.1163 12.1942 12.1163 12.5854 12.1163 13.0395L12.1163 15.9756H14.5581V8.1291ZM11.0698 15.9756V13.0732C11.0698 12.5758 11.0687 12.2543 11.0361 12.0174C11.0056 11.7952 10.9563 11.7256 10.9165 11.6866C10.8767 11.6476 10.8055 11.5994 10.5786 11.5695C10.3366 11.5377 10.0081 11.5366 9.5 11.5366C8.99188 11.5366 8.66343 11.5377 8.42142 11.5695C8.19446 11.5994 8.12333 11.6476 8.08349 11.6866C8.04366 11.7256 7.9944 11.7952 7.96388 12.0174C7.93135 12.2543 7.93024 12.5758 7.93024 13.0732V15.9756H11.0698ZM9.5 7.09756C9.01836 7.09756 8.62791 7.47976 8.62791 7.95122C8.62791 8.42268 9.01836 8.80488 9.5 8.80488C9.98164 8.80488 10.3721 8.42268 10.3721 7.95122C10.3721 7.47976 9.98164 7.09756 9.5 7.09756ZM7.5814 7.95122C7.5814 6.914 8.44039 6.07317 9.5 6.07317C10.5596 6.07317 11.4186 6.914 11.4186 7.95122C11.4186 8.98844 10.5596 9.82927 9.5 9.82927C8.44039 9.82927 7.5814 8.98844 7.5814 7.95122Z" fill="#777777"/>
          </svg>
           }
         <p className={`${(isSimpanClicked || existingData.subCategories) ? "mr-0" : "mobile:mr-[180px] mr-[150px] "} whitespace-nowrap overflow-hidden overflow-ellipsis`}>
            {(isSimpanClicked || existingData.subCategories) 
              ? (existingData.subCategories.length === 5 ? "Semua" :
                  (existingData.subCategories.map(category => {
                    if (category === '1') return 'Rumah';
                    if (category === '2') return 'Ruko';
                    if (category === '3') return 'Apartemen';
                    if (category === '5') return 'Kontrakan';
                    if (category === '26') return 'Tanah Kavling';
                    return category;
                  }).join(', ').length > 20 
                    ? `${existingData.subCategories.map(category => {
                        if (category === '1') return 'Rumah';
                        if (category === '2') return 'Ruko';
                        if (category === '3') return 'Apartemen';
                        if (category === '5') return 'Kontrakan';
                        if (category === '26') return 'Tanah Kavling';
                        return category;
                      }).join(', ').substring(0, 20)}...` 
                    : existingData.subCategories.map(category => {
                        if (category === '1') return 'Rumah';
                        if (category === '2') return 'Ruko';
                        if (category === '3') return 'Apartemen';
                        if (category === '5') return 'Kontrakan';
                        if (category === '26') return 'Tanah Kavling';
                        return category;
                      }).join(', ')))
              : 'Tipe Properti'}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {showInputs && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-[324px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <div className="px-4 py-2 font-normal text-[#777777]">
            <Checkbox 
             fontColor='#777777'
             label="Semua" 
             name="Semua"
             checked={semuaChecked}
             onChange={(e) => handleCheckboxChange('Semua', e.target.checked)}
            />
            <Checkbox 
             fontColor='#777777'
             label="Rumah" 
             name="1"
             checked={propertyRumahChecked}
             onChange={(e) => handleCheckboxChange('1', e.target.checked)}
            />
            <Checkbox 
             fontColor='#777777'
             label="Ruko"
             name="2"
             checked={propertyRukoChecked} 
             onChange={(e) => handleCheckboxChange('2', e.target.checked)}
            />
            <Checkbox 
             fontColor='#777777'
             label="Apartemen"
             name="3"
             checked={propertyApartemenChecked}
             onChange={(e) => handleCheckboxChange('3', e.target.checked)} 
            />
            <Checkbox 
             fontColor='#777777'
             label="Kos / Kontrakan" 
             name="5"
             checked={propertyKontrakanChecked}
             onChange={(e) => handleCheckboxChange('5', e.target.checked)}
            />
            <Checkbox
             fontColor='#777777'
             label="Tanah Kavling Siap Bangun" 
             name="26"
             checked={propertyKavlingChecked}
             onChange={(e) => handleCheckboxChange('26', e.target.checked)}
            />
            </div>
            <div className='px-4 py-2 '>
            <Button className="w-full" onClick={handleSimpanClick}>
           Terapkan
          </Button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropdownProperty;
