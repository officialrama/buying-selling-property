import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AutocompleteProvincies, Button, CurrencyInputCalc } from '../../atoms';
import { Checkbox } from '../../molecules';
import { infoLelangSearch } from '../../../store/actions/fetchData/info-lelang';
import { invalidNumRegex } from '../../../helpers/regex';
import { provincies } from '../../../store/actions/fetchData/branch';
import useFormStepperHooks from '../../../hooks/useFormStepperHooks';
import useInputHooks from '../../../hooks/useInputHooks';
import { formatRupiahNumber } from '../../../helpers/string';

const DropdownRangeHarga = ({setDataProperty, dataProperty, filter, currentPage, setTotalData, setProperty, property}) => {
  const dispatch = useDispatch();
  const existingFilter = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
  const [showInputs, setShowInputs] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [semuaChecked, setSemuaChecked] = useState(false);
  const [hargaClearChecked, setHargaClearChecked] = useState(false);
  const [hotDealChecked, setHotDealChecked] = useState(false);
  const [isSimpanClicked, setIsSimpanClicked] = useState(false);

  const handleDropdownClick = () => {
    setShowInputs(!showInputs);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value.replace(invalidNumRegex, ''));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value.replace(invalidNumRegex, ''));
  };

  const handleSemuaCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setSemuaChecked(isChecked);
    setHargaClearChecked(isChecked);
    setHotDealChecked(isChecked);
  };

  const handleCheckboxChange = (name, isChecked) => {
    if (name === 'Semua') {
      handleSemuaCheckboxChange({ target: { checked: isChecked } });
    } else if (name === 'Clean & Clear') {
      setHargaClearChecked(isChecked);
    } else if (name === 'Hot Deals') {
      setHotDealChecked(isChecked);
    }
  };

  const handleSimpanClick = () => {
    const existingData = JSON.parse(localStorage.getItem("FilterInfoLelang")) || {};
    existingData.tags = [];
    if (hargaClearChecked) existingData.tags.push('Clean & Clear');
    if (hotDealChecked) existingData.tags.push('Hot Deals');
    existingData.maxPrice = maxPrice;
    existingData.minPrice = minPrice;
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
          {(isSimpanClicked || existingFilter.minPrice && existingFilter.maxPrice) ?
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.18468 5.12033C6.01024 4.95133 5.77037 4.86683 5.46509 4.86683H4.18944V6.65765H5.46509C5.77037 6.65765 6.01024 6.5786 6.18468 6.42051C6.36458 6.26241 6.45453 6.04163 6.45453 5.75815C6.45453 5.49648 6.36458 5.28387 6.18468 5.12033Z" fill="#1078CA"/>
            <path d="M9.9625 8.60383C10.1533 8.86005 10.4122 8.98816 10.7393 8.98816C11.0828 8.98816 11.3499 8.8655 11.5407 8.62018C11.7315 8.36941 11.8269 8.02052 11.8269 7.5735C11.8269 7.12102 11.7315 6.77213 11.5407 6.52681C11.3499 6.2815 11.0828 6.15884 10.7393 6.15884C10.4122 6.15884 10.1533 6.28695 9.9625 6.54317C9.7717 6.79393 9.6763 7.13738 9.6763 7.5735C9.6763 8.00416 9.7717 8.34761 9.9625 8.60383Z" fill="#1078CA"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.18944 9.72411H3.2V4.00005H5.46509C5.8685 4.00005 6.21739 4.07364 6.51177 4.22083C6.8116 4.36802 7.04057 4.57245 7.19866 4.83413C7.36221 5.0958 7.44398 5.40381 7.44398 5.75815C7.44398 6.19427 7.3295 6.55952 7.10053 6.8539C6.87157 7.14283 6.55539 7.33908 6.15198 7.44266L7.68929 9.56056V9.72411H6.63443L5.0644 7.52443H4.18944V9.72411ZM9.6763 11.4986H8.71956V5.41471H9.59452L9.66812 5.9217C9.9516 5.51829 10.3659 5.31658 10.9111 5.31658C11.2927 5.31658 11.6225 5.40926 11.9005 5.59461C12.184 5.77996 12.4048 6.04163 12.5629 6.37962C12.721 6.71216 12.8 7.11012 12.8 7.5735C12.8 8.03142 12.721 8.42938 12.5629 8.76737C12.4102 9.10536 12.1922 9.36703 11.9087 9.55239C11.6252 9.73228 11.2927 9.82223 10.9111 9.82223C10.3714 9.82223 9.95977 9.62325 9.6763 9.2253V11.4986Z" fill="#1078CA"/>
            </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.11628C6.19823 3.11628 3.11628 6.19823 3.11628 10C3.11628 13.8018 6.19823 16.8837 10 16.8837C13.8018 16.8837 16.8837 13.8018 16.8837 10C16.8837 6.19823 13.8018 3.11628 10 3.11628ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#777777"/>
          <path d="M5.72059 11.6039H6.641V9.55765H7.45492L8.91541 11.6039H9.89668V11.4517L8.46662 9.48159C8.84188 9.38524 9.13601 9.20267 9.349 8.9339C9.56199 8.66006 9.66848 8.32029 9.66848 7.9146C9.66848 7.58498 9.59241 7.29846 9.44028 7.05504C9.29321 6.81163 9.08023 6.62146 8.80131 6.48454C8.52747 6.34762 8.20292 6.27916 7.82765 6.27916H5.72059V11.6039ZM7.82765 7.08547C8.11164 7.08547 8.33477 7.16407 8.49704 7.32128C8.66439 7.47341 8.74807 7.67119 8.74807 7.9146C8.74807 8.1783 8.66439 8.38368 8.49704 8.53075C8.33477 8.67781 8.11164 8.75134 7.82765 8.75134H6.641V7.08547H7.82765Z" fill="#777777"/>
          <path d="M10.8551 13.2545H11.7451V11.1399C12.0088 11.51 12.3916 11.6951 12.8937 11.6951C13.2487 11.6951 13.558 11.6115 13.8217 11.4441C14.0854 11.2717 14.2882 11.0283 14.4302 10.7139C14.5773 10.3995 14.6508 10.0293 14.6508 9.6033C14.6508 9.17225 14.5773 8.80205 14.4302 8.49271C14.2832 8.1783 14.0778 7.93489 13.8141 7.76247C13.5555 7.59005 13.2487 7.50384 12.8937 7.50384C12.3866 7.50384 12.0011 7.69147 11.7374 8.06674L11.669 7.59512H10.8551V10.4248V13.2545ZM12.7339 10.9193C12.4297 10.9193 12.1888 10.8001 12.0113 10.5617C11.8338 10.3234 11.7451 10.0039 11.7451 9.6033C11.7451 9.1976 11.8338 8.87812 12.0113 8.64485C12.1888 8.4065 12.4297 8.28733 12.7339 8.28733C13.0534 8.28733 13.3019 8.40143 13.4794 8.62963C13.6569 8.85784 13.7456 9.18239 13.7456 9.6033C13.7456 10.0191 13.6569 10.3437 13.4794 10.577C13.3019 10.8052 13.0534 10.9193 12.7339 10.9193Z" fill="#777777"/>
          </svg>
           }
          <p className={`${(isSimpanClicked || existingFilter.minPrice && existingFilter.maxPrice) ? "mr-0" : "mobile:mr-[224px] mr-[190px]"}`}>
            {(isSimpanClicked || existingFilter.minPrice && existingFilter.maxPrice) ? `${formatRupiahNumber(existingFilter.minPrice)} - ${formatRupiahNumber(existingFilter.maxPrice)}` : 'Harga'}
          </p>
          <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          </span>
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
            <div className="px-4 py-2">
              <CurrencyInputCalc
                className="textbox-label__currency"
                name="minPrice"
                placeholder="Harga Terendah"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="px-4 py-2">
              {/* Max price input */}
              <CurrencyInputCalc
                className="textbox-label__currency border-b border-[#EAEBEB]"
                name="maxPrice"
                placeholder="Harga Tertinggi"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className="px-4 py-2 text-[#777777]">
            <Checkbox
                fontColor='#777777'
                label="Semua"
                name="Semua"
                checked={semuaChecked}
                onChange={(e) => handleCheckboxChange('Semua', e.target.checked)}
              />
              <Checkbox
                fontColor='#777777'
                label="Harga Normal"
                name="Clean & Clear"
                checked={hargaClearChecked}
                onChange={(e) => handleCheckboxChange('Clean & Clear', e.target.checked)}
              />
              <Checkbox
                label="Hot Deals"
                name="Hot Deals"
                checked={hotDealChecked}
                onChange={(e) => handleCheckboxChange('Hot Deals', e.target.checked)}
              />
            </div>
            <div className="px-4 py-2">
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

export default DropdownRangeHarga;
