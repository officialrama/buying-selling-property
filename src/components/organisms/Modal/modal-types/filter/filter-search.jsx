/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSearchPropertyHooks from '../../../../../hooks/useSearchPropertyHooks';
import { selectConst } from '../../../../../static/selectConst';
import { filterSearch } from '../../../../../store/actions/changeState';
import { inquiryListPropFilter } from '../../../../../store/actions/fetchData/inquiryProp';
import { Button, CurrencyInputCalc, LabelInputTextbox, RadioButtonWithLabel } from '../../../../atoms';
import { Checkbox, Dropdown, TextboxLabel } from '../../../../molecules';
import FilterCard from '../../../../molecules/Cards/search/filter/filter-card';
import { iconConst } from '../../../../theme/icon/icon-const';
import { FiSearch } from 'react-icons/fi';

const FilterSearch = ({ otherProps, closeModal }) => {
  const state = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { bodyFilterProp, initialBodyFilter, setBodyFilterProp, handleRadioDropChange, handleCheckboxChange, handleNumberInput, handleChangePrice, priceSlider, setPriceSlider, initialDropdown, dropdownVal, setDropdownVal, selectAllFasilitas, setSelectAllFasilitas, selectAllAkses, setSelectAllAkses, selectAllKelengkapan, setSelectAllKelengkapan, handleSelectAllChange, handleHarga, handleKeyword } = useSearchPropertyHooks();
  useEffect(() => {
    if (Object.keys(state.filterSearch).length !== 0 || !_.isEqual(bodyFilterProp, initialBodyFilter)) {
      setBodyFilterProp({ ...state.filterSearch });
      setDropdownVal({
        ...dropdownVal,
        propertyType: selectConst.propertyType.filter((e) => e.value === state.filterSearch.tipe)[0],
        bedroom: selectConst.bedroom.filter((e) => e.value === state.filterSearch.jmlKmrTidur)[0],
        bathroom: selectConst.bathroom.filter((e) => e.value === state.filterSearch.jmlKmrMandi)[0]
      });
    }
  }, [state.filterSearch]);

  return (
    <div>
      <div className="grid grid-flow-row gap-6 h-[64vh] mb-[3vh] overflow-y-scroll px-6">
        <div className='flex text-center justify-center'>
        <p className='font-bold text-[#292929] text-2xl'>Filter</p>
        </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[#292929] font-bold text-lg'>Jenis Properti</p>
          <div className="flex flex-row gap-3">
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "all"} name="all" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Semua" />
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "subsidi"} name="subsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Subsidi" />
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "nonsubsidi"} name="nonsubsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Non-Subsidi" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <p className='text-[#292929] font-bold text-lg'>Tipe Properti</p>
              <Dropdown
                placeholder="Pilih Tipe Properti"
                value={dropdownVal.propertyType}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, propertyType: value });
                  handleRadioDropChange("tipe", value.value);
                }}
                data={selectConst.propertyType}
              />
            </div>
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-bold text-lg'>Lokasi</p>
                  <TextboxLabel
                    name="keyword"
                    placeholder="Cari Kota/Kabupaten"
                    onChange={(e) => 
                      handleKeyword(e,"keyword")
                    }
                    value={bodyFilterProp?.keyword}
                    rightLabelBorder={false}
                    leftLabel={<FiSearch color={"#777777"} />}
                  />  
            </div>
            {/* <div className="">
              <Dropdown
                value={{ name: bodyFilterProp.minPrice !== 0 || bodyFilterProp.maxPrice !== 100000000000 ? `Rp${new Intl.NumberFormat("id-ID").format(bodyFilterProp?.minPrice)} - Rp${new Intl.NumberFormat("id-ID").format(bodyFilterProp?.maxPrice)}` : "Harga" }}
                onChange={() => {}}
                data={selectConst.price}
                icons={iconConst.smallIcons.priceBlue}
                showOptions={false}
                priceSlider={true}
                minRangePrice={100000000}
                maxRangePrice={100000000000}
                defaultValuePrice={[0, 100000000000]}
                valuePrice={[bodyFilterProp?.minPrice || 0, bodyFilterProp?.maxPrice || 0]}
                handleChangePrice={handleChangePrice}
                onChangePriceSlider={(props) => {
                  setBodyFilterProp({ ...bodyFilterProp, minPrice: props[0], maxPrice: props[1] });
                }}
                onClickResetPrice={() => {
                  setBodyFilterProp({ ...bodyFilterProp, minPrice: 0, maxPrice: 100000000000 });
                  setPriceSlider({ ...priceSlider, value: "Harga" });
                }}
                onClickButton={() => {
                  setPriceSlider({ ...priceSlider, slider: !priceSlider.slider });
                }}
                showPriceSlider={priceSlider.slider}
                onClickSavePrice={() => setPriceSlider({ ...priceSlider, slider: !priceSlider.slider })}
              />
            </div> */}
            <p className='text-[#292929] font-bold text-lg'>Harga</p>
            <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Harga Terendah</p>
            <CurrencyInputCalc
                className="textbox-label__currency"
                name="minPrice"
                placeholder="Masukkan Harga Terendah"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={bodyFilterProp.minPrice}
                onValueChange={(e) => 
                  handleHarga("minPrice", e)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Harga Tertinggi</p>
            <CurrencyInputCalc
                className="textbox-label__currency"
                name="maxPrice"
                placeholder="Masukkan Harga Tertinggi"
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                maxLength={16}
                allowNegativeValue={false}
                value={bodyFilterProp.maxPrice}
                onValueChange={(e) => 
                  handleHarga("maxPrice", e)
                }
              />
            </div>
            </div>
            <p className='text-[#292929] font-bold text-lg'>Spesifikasi</p>
          <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Kamar Tidur</p>
              <Dropdown
                placeholder="Pilih Jumlah Kamar Tidur"
                value={dropdownVal.bedroom}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, bedroom: value });
                  handleRadioDropChange("jmlKmrTidur", value.value);
                }}
                data={selectConst.bedroom}
              />
            </div>
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Kamar Mandi</p>
              <Dropdown
                placeholder="Pilih Jumlah Kamar Mandi"
                value={dropdownVal.bathroom}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, bathroom: value });
                  handleRadioDropChange("jmlKmrMandi", value.value);
                }}
                data={selectConst.bathroom}
              />
            </div>        
          <div className="flex flex-col gap-2">
               <p className='text-[#292929] font-semibold text-xs'>Luas Tanah minimal</p>
              <TextboxLabel name="LT" placeholder="Luas Tanah Minimal" rightLabelBorder={false} rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LT || ""} onChange={handleNumberInput} />
          </div>
          <div className="flex flex-col gap-2">
          <p className='text-[#292929] font-semibold text-xs'>Luas Tanah Maksimal</p>
              <TextboxLabel name="LT2" placeholder="Luas Tanah Maksimal" rightLabelBorder={false} rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LT2 || ""} onChange={handleNumberInput}/>
          </div>
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Luas Bangunan minimal</p>
              <TextboxLabel name="LB" placeholder="Luas Bangunan Minimal" rightLabelBorder={false} rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LB || ""} onChange={handleNumberInput} />
            </div>
            <div className="flex flex-col gap-2">
            <p className='text-[#292929] font-semibold text-xs'>Luas Bangunan Maksimal</p>
            <TextboxLabel name="LB2" placeholder="Luas Bangunan Maksimal" rightLabelBorder={false} rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LB2 || ""} onChange={handleNumberInput} />
            </div>
          </div>

        {/* <FilterCard title="Tipe Properti">
          <div className="filter-search__wrapper__baseOptions">
            <div className="filter-search__wrapper__options">
              <RadioButtonWithLabel checked={bodyFilterProp.tipe === "all"} name="all" onChange={(event) => handleRadioDropChange("tipe", event.target.value)} text="Semua" />
              <RadioButtonWithLabel checked={bodyFilterProp.tipe === "apartment"} name="apartment" onChange={(event) => handleRadioDropChange("tipe", event.target.value)} text="Apartment" />
              <RadioButtonWithLabel checked={bodyFilterProp.tipe === "rumah"} name="rumah" onChange={(event) => handleRadioDropChange("tipe", event.target.value)} text="Rumah" />
            </div>
            <div className="filter-search__wrapper__options">
              <RadioButtonWithLabel checked={bodyFilterProp.tipe === "ruko"} name="ruko" onChange={(event) => handleRadioDropChange("tipe", event.target.value)} text="Ruko" />
              <RadioButtonWithLabel checked={bodyFilterProp.tipe === "villa"} name="villa" onChange={(event) => handleRadioDropChange("tipe", event.target.value)} text="Villa" />
            </div>
          </div>
        </FilterCard> */}

        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
          <div className='flex flex-row justify-between items-start'>
        <p className="filter-search__text__title whitespace-nowrap">Kelengkapan Rumah</p>
           <button
              className='bg-[#ffffff] text-[#292929] text-sm font-medium pt-2'
              label="Pilih Semua"
              name="selectAllKelengkapan"
              checked={selectAllKelengkapan}
              onClick={(e) => handleSelectAllChange('kelengkapan', e.target.checked)}
              >Pilih Semua
              </button>
              </div>
          <div className="flex flex-row gap-2">
            <div className="filter-search__wrapper__options">
              <Checkbox customStyles='w-[24px] h-[24px]' label="Dapur" fontSize="16px" name="dapur" checked={bodyFilterProp.dapur} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Jalur Listrik" fontSize="16px" name="listrik" checked={bodyFilterProp.listrik} onChange={handleCheckboxChange} />
              </div>
              <div className="filter-search__wrapper__options">
              <Checkbox customStyles='w-[24px] h-[24px]' label="Jalur Telepon" fontSize="16px" name="jalurTelepon" checked={bodyFilterProp.jalurTelepon} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Jalur PDAM" fontSize="16px" name="pdam" checked={bodyFilterProp.pdam} onChange={handleCheckboxChange} />
            </div>
            <div className="filter-search__wrapper__options">
              <Checkbox customStyles='w-[24px] h-[24px]' label="Ruang Keluarga" fontSize="16px" name="ruangKeluarga" checked={bodyFilterProp.ruangKeluarga} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Ruang Kerja" fontSize="16px" name="ruangKerja" checked={bodyFilterProp.ruangKerja} onChange={handleCheckboxChange} />
            </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
          <div className='flex flex-row justify-between items-start'>
          <p className="filter-search__text__title whitespace-nowrap">Fasilitas & Akses</p>
              <button
              className='bg-[#ffffff] text-[#292929] text-sm font-medium pt-2'
              label="Pilih Semua"
              name="selectAllAkses"
              checked={selectAllAkses}
              onClick={(e) => handleSelectAllChange('akses', e.target.checked)}
              >Pilih Semua
              </button>
              </div>
          <div className="grid grid-cols-3 gap-4">
              <Checkbox customStyles='w-[24px] h-[24px]' label="Rumah Sakit" fontSize="16px" name="rumahSakit" checked={bodyFilterProp.rumahSakit} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Jalan Tol" fontSize="16px" name="jalanTol" checked={bodyFilterProp.jalanTol} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Sekolah" fontSize="16px" name="sekolah" checked={bodyFilterProp.sekolah} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Mall" fontSize="16px" name="mall" checked={bodyFilterProp.mall} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Bank / ATM" fontSize="16px" name="bankAtm" checked={bodyFilterProp.bankAtm} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Taman" fontSize="16px" name="taman" checked={bodyFilterProp.taman} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Pasar" fontSize="16px" name="pasar" checked={bodyFilterProp.pasar} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Farmasi" fontSize="16px" name="farmasi" checked={bodyFilterProp.farmasi} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Rumah Ibadah" fontSize="16px" name="rumahIbadah" checked={bodyFilterProp.rumahIbadah} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Restoran" fontSize="16px" name="restoran" checked={bodyFilterProp.restoran} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Bioskop" fontSize="16px" name="bioskop" checked={bodyFilterProp.bioskop} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Bar" fontSize="16px" name="bar" checked={bodyFilterProp.bar} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Halte" fontSize="16px" name="halte" checked={bodyFilterProp.halte} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Stasiun" fontSize="16px" name="stasiun" checked={bodyFilterProp.stasiun} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Bandara" fontSize="16px" name="bandara" checked={bodyFilterProp.bandara} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Gerbang Tol" fontSize="16px" name="gerbangTol" checked={bodyFilterProp.gerbangTol} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="SPBU" fontSize="16px" name="spbu" checked={bodyFilterProp.spbu} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Gymnasium" fontSize="16px" name="gymnasium" checked={bodyFilterProp.gymnasium} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Kolam Renang" fontSize="16px" name="kolamRenang" checked={bodyFilterProp.kolamRenang} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Tempat Parkir" fontSize="16px" name="tempatParkir" checked={bodyFilterProp.tempatParkir} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Keamanan" fontSize="16px" name="keamanan24Jam" checked={bodyFilterProp.keamanan24Jam} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Penghijauan" fontSize="16px" name="penghijauan" checked={bodyFilterProp.penghijauan} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Lift" fontSize="16px" name="lift" checked={bodyFilterProp.lift} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Elevator" fontSize="16px" name="elevator" checked={bodyFilterProp.elevator} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Gym" fontSize="16px" name="gym" checked={bodyFilterProp.gym} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Garasi" fontSize="16px" name="garasi" checked={bodyFilterProp.garasi} onChange={handleCheckboxChange} />
              <Checkbox customStyles='w-[24px] h-[24px]' label="Row Jalan 12" fontSize="16px" name="rowJalan12" checked={bodyFilterProp.rowJalan12} onChange={handleCheckboxChange} />
          </div>
          </div>
          {/* <p className="filter-search__text__title gap-[205px] flex flex-row mobile:flex-col mobile:gap-[8px] mobile:justify-start">Fasilitas 
              <div>
              <button
              className='bg-[#ffffff] text-[#1078CA]'
              label="Pilih Semua"
              fontSize="16px"
              name="selectAllFasilitas"
              checked={selectAllFasilitas}
              onClick={(e) => handleSelectAllChange('fasilitas', e.target.checked)}
              >Pilih Semua</button>
              </div></p> */}
        </div>
        <div className="flex flex-row gap-3 mobile:px-5 mobile:py-1">
      <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} 
          onClick={() => { 
            setBodyFilterProp(initialBodyFilter);
            setDropdownVal(initialDropdown);
        }}>
          Reset
        </Button> 
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"}
          onClick={() => { 
            closeModal();
            dispatch(filterSearch(bodyFilterProp));
            if (!_.isEqual(bodyFilterProp, initialBodyFilter)) {
              otherProps.setDataProperty([])
              otherProps.setLoadMoreType('city') // reset
              dispatch(inquiryListPropFilter({
                ...bodyFilterProp,
                pageStart: 0, // reset page
                tipe: bodyFilterProp.tipe === "" ? "all" : bodyFilterProp.tipe,
                jmlKmrTidur: bodyFilterProp.jmlKmrTidur === "" ? 'all' : bodyFilterProp.jmlKmrTidur,
                jmlKmrMandi: bodyFilterProp.jmlKmrMandi === "" ? 'all' :bodyFilterProp.jmlKmrMandi,
                LT  : bodyFilterProp.LT   === "" ?  0 : Number(bodyFilterProp.LT),
                LT2 : bodyFilterProp.LT2  === "" ?  1000000000 : Number(bodyFilterProp.LT2),
                LB  : bodyFilterProp.LB   === "" ?  0 : Number(bodyFilterProp.LB),
                LB2 : bodyFilterProp.LB2  === "" ?  1000000000 : Number(bodyFilterProp.LB2),
                keyword : bodyFilterProp.keyword ? bodyFilterProp.keyword : ""
              }, otherProps.setDataProperty, otherProps.dataProperty, otherProps.setTotalData)); 
            } else {
              dispatch(filterSearch(initialBodyFilter));
            }
        }}>
          Terapkan
        </Button>
      </div>
      </div>
    </div>
  );
};

export default FilterSearch;