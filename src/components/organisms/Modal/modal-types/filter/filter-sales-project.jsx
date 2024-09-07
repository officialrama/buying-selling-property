/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSalesProjectHooks from '../../../../../hooks/useSalesProjectHooks';
import useSearchPropertyHooks from '../../../../../hooks/useSearchPropertyHooks';
import { selectConst } from '../../../../../static/selectConst';
import { filterSalesProject } from '../../../../../store/actions/changeState';
import { inquiryListPropFilter } from '../../../../../store/actions/fetchData/inquiryProp';
import { salesProjectFilter } from '../../../../../store/actions/fetchData/salesReferral';
import { Button, LabelInputTextbox, RadioButtonWithLabel } from '../../../../atoms';
import { Checkbox, Dropdown, DropdownSales, TextboxLabel } from '../../../../molecules';
import FilterCard from '../../../../molecules/Cards/search/filter/filter-card';
import { iconConst } from '../../../../theme/icon/icon-const';

const FilterSalesProject = ({ otherProps, closeModal }) => {
  const state = useSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const [dataKamar, setDataKamar] = useState([]);
  const { bodyFilterProp, initialBodyFilter, setBodyFilterProp, handleRadioDropChange, handleCheckboxChange, handleNumberInput, handleChangePrice, priceSlider, setPriceSlider, initialDropdown, dropdownVal, setDropdownVal, setDataProperty, dataProperty } = useSalesProjectHooks();
  useEffect(() => {
    if (Object.keys(state.filterSalesProject).length !== 0 || !_.isEqual(bodyFilterProp, initialBodyFilter)) {
      setBodyFilterProp({ ...state.filterSalesProject });
      setDropdownVal({
        ...dropdownVal,
        propertyType: selectConst.propertyType.filter((e) => e.value === state.filterSalesProject.tipeProperti)[0],
        bedroom: selectConst.bedroom.filter((e) => e.value === state.filterSalesProject.jumlahKamarTidur)[0],
        bathroom: selectConst.bathroom.filter((e) => e.value === state.filterSalesProject.jumlahKamarMandi)[0]
      });
    }
  }, [state.filterSalesProject]);

  return (
    <div>
      <div className="filter-search__wrapper__baseModal">
        <FilterCard title="Filter">
          <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
            <div className="">
              <DropdownSales
                value={{ name: bodyFilterProp.hargaMin !== 0 || bodyFilterProp.hargaMax !== 100000000000 ? `Rp ${new Intl.NumberFormat("id-ID").format(bodyFilterProp?.hargaMin)} - Rp ${new Intl.NumberFormat("id-ID").format(bodyFilterProp?.hargaMax)}` : "Harga" }}
                onChange={() => {}}
                data={selectConst.price}
                icons={iconConst.smallIcons.priceBlue}
                showOptions={false}
                priceSlider={true}
                minRangePrice={100000000}
                maxRangePrice={100000000000}
                defaultValuePrice={[0, 100000000000]}
                valuePrice={[bodyFilterProp?.hargaMin || 0, bodyFilterProp?.hargaMax || 100000000000]}
                handleChangePrice={handleChangePrice}
                onChangePriceSlider={(props) => {
                  setBodyFilterProp({ ...bodyFilterProp, hargaMin: props[0], hargaMax: props[1] });
                }}
                onClickResetPrice={() => {
                  setBodyFilterProp({ ...bodyFilterProp, hargaMin: 0, hargaMax: 100000000000 });
                  setPriceSlider({ ...priceSlider, value: "Harga" });
                }}
                onClickButton={() => {
                  setPriceSlider({ ...priceSlider, slider: !priceSlider.slider });
                }}
                showPriceSlider={priceSlider.slider}
                onClickSavePrice={() => setPriceSlider({ ...priceSlider, slider: !priceSlider.slider })}
              />
            </div>
            <div className="">
              <DropdownSales
                value={dropdownVal.propertyType}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, propertyType: value });
                  handleRadioDropChange("tipeProperti", value.value);
                }}
                data={selectConst.propertyType}
                icons={iconConst.smallIcons.homeBlue}
              />
            </div>
            <div className="">
              <DropdownSales
                value={dropdownVal.bedroom}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, bedroom: value });
                  handleRadioDropChange("jumlahKamarTidur", value.value);
                }}
                data={selectConst.bedroom}
                icons={iconConst.smallIcons.bedroomBlue}
              />
            </div>
            <div className="">
              <DropdownSales
                value={dropdownVal.bathroom}
                onChange={(value) => {
                  setDropdownVal({ ...dropdownVal, bathroom: value });
                  handleRadioDropChange("jumlahKamarMandi", value.value);
                }}
                data={selectConst.bathroom}
                icons={iconConst.smallIcons.bathroomBlue}
              />
            </div>
          </div>
        </FilterCard>

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

        <FilterCard title="Jenis Properti">
          <div className="mb-2">
            <LabelInputTextbox text="Luas Tanah" />
          </div>
          <div className="filter-search__wrapper__baseInputTextProperti">
            <div className="filter-search__wrapper__options">
              <TextboxLabel name="LuasTanahMinimal" placeholder="Min" rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LuasTanahMinimal || ""} onChange={handleNumberInput} />
            </div>
            <div className="filter-search__wrapper__options">
              <TextboxLabel name="LuasTanahMaksimal" placeholder="Maks" rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LuasTanahMaksimal || ""} onChange={handleNumberInput}/>
            </div>
          </div>
          <div className="mb-2">
            <LabelInputTextbox text="Luas Bangunan" />
          </div>
          <div className="filter-search__wrapper__baseInputTextProperti">
            <div className="filter-search__wrapper__options">
              <TextboxLabel name="LuasBangunanMinimal" placeholder="Min" rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LuasBangunanMinimal || ""} onChange={handleNumberInput} />
            </div>
            <div className="filter-search__wrapper__options">
            <TextboxLabel name="LuasBangunanMaksimal" placeholder="Maks" rightLabel={<Fragment>m<sup>2</sup></Fragment>} value={bodyFilterProp.LuasBangunanMaksimal || ""} onChange={handleNumberInput} />
            </div>
          </div>
        </FilterCard>

        <FilterCard title="Jenis Properti">
          <div className="filter-search__wrapper__baseInputTextProperti">
            <div className="filter-search__wrapper__options">
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "all"} name="all" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Semua" />
            </div>
            <div className="filter-search__wrapper__options">
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "subsidi"} name="subsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Subsidi" />
            </div>
            <div className="filter-search__wrapper__options">
              <RadioButtonWithLabel checked={bodyFilterProp.jenisProperti === "nonsubsidi"} name="nonsubsidi" onChange={(event) => handleRadioDropChange("jenisProperti", event.target.value)} text="Non-Subsidi" />
            </div>
          </div>
        </FilterCard>

        <FilterCard title="Kelengkapan Rumah">
          <div className="filter-search__wrapper__baseInputText">
            <div className="filter-search__wrapper__options">
              <Checkbox label="Dapur" fontSize="16px" name="dapur" checked={bodyFilterProp.dapur} onChange={handleCheckboxChange} />
              <Checkbox label="Jalur Listrik" fontSize="16px" name="listrik" checked={bodyFilterProp.listrik} onChange={handleCheckboxChange} />
              <Checkbox label="Jalur PDAM" fontSize="16px" name="pdam" checked={bodyFilterProp.pdam} onChange={handleCheckboxChange} />
            </div>
            <div className="filter-search__wrapper__options">
              <Checkbox label="Jalur Telepon" fontSize="16px" name="jalurTelepon" checked={bodyFilterProp.jalurTelepon} onChange={handleCheckboxChange} />
              <Checkbox label="Ruang Keluarga" fontSize="16px" name="ruangKeluarga" checked={bodyFilterProp.ruangKeluarga} onChange={handleCheckboxChange} />
              <Checkbox label="Ruang Kerja" fontSize="16px" name="ruangKerja" checked={bodyFilterProp.ruangKerja} onChange={handleCheckboxChange} />
            </div>
          </div>

          <p className="filter-search__text__title">Akses</p>
          <div className="filter-search__wrapper__baseInputText">
            <div className="filter-search__wrapper__options">
              <Checkbox label="Rumah Sakit" fontSize="16px" name="rumahSakit" checked={bodyFilterProp.rumahSakit} onChange={handleCheckboxChange} />
              <Checkbox label="Jalan Tol" fontSize="16px" name="jalanTol" checked={bodyFilterProp.jalanTol} onChange={handleCheckboxChange} />
              <Checkbox label="Sekolah" fontSize="16px" name="sekolah" checked={bodyFilterProp.sekolah} onChange={handleCheckboxChange} />
              <Checkbox label="Mall" fontSize="16px" name="mall" checked={bodyFilterProp.mall} onChange={handleCheckboxChange} />
              <Checkbox label="Bank / ATM" fontSize="16px" name="bankAtm" checked={bodyFilterProp.bankAtm} onChange={handleCheckboxChange} />
              <Checkbox label="Taman" fontSize="16px" name="taman" checked={bodyFilterProp.taman} onChange={handleCheckboxChange} />
              <Checkbox label="Pasar" fontSize="16px" name="pasar" checked={bodyFilterProp.pasar} onChange={handleCheckboxChange} />
              <Checkbox label="Farmasi" fontSize="16px" name="farmasi" checked={bodyFilterProp.farmasi} onChange={handleCheckboxChange} />
              <Checkbox label="Rumah Ibadah" fontSize="16px" name="rumahIbadah" checked={bodyFilterProp.rumahIbadah} onChange={handleCheckboxChange} />
            </div>
            <div className="filter-search__wrapper__options">
              <Checkbox label="Restoran" fontSize="16px" name="restoran" checked={bodyFilterProp.restoran} onChange={handleCheckboxChange} />
              <Checkbox label="Bioskop" fontSize="16px" name="bioskop" checked={bodyFilterProp.bioskop} onChange={handleCheckboxChange} />
              <Checkbox label="Bar" fontSize="16px" name="bar" checked={bodyFilterProp.bar} onChange={handleCheckboxChange} />
              <Checkbox label="Halte" fontSize="16px" name="halte" checked={bodyFilterProp.halte} onChange={handleCheckboxChange} />
              <Checkbox label="Stasium" fontSize="16px" name="stasiun" checked={bodyFilterProp.stasiun} onChange={handleCheckboxChange} />
              <Checkbox label="Bandara" fontSize="16px" name="bandara" checked={bodyFilterProp.bandara} onChange={handleCheckboxChange} />
              <Checkbox label="Gerbang Tol" fontSize="16px" name="gerbangTol" checked={bodyFilterProp.gerbangTol} onChange={handleCheckboxChange} />
              <Checkbox label="SPBU" fontSize="16px" name="spbu" checked={bodyFilterProp.spbu} onChange={handleCheckboxChange} />
              <Checkbox label="Gymnasium" fontSize="16px" name="gymnasium" checked={bodyFilterProp.gymnasium} onChange={handleCheckboxChange} />
            </div>
          </div>

          <p className="filter-search__text__title">Fasilitas</p>
          <div className="filter-search__wrapper__baseInputText">
            <div className="filter-search__wrapper__options">
              <Checkbox label="Kolam Renang" fontSize="16px" name="kolamRenang" checked={bodyFilterProp.kolamRenang} onChange={handleCheckboxChange} />
              <Checkbox label="Tempat Parkir" fontSize="16px" name="tempatParkir" checked={bodyFilterProp.tempatParkir} onChange={handleCheckboxChange} />
              <Checkbox label="Keamanan" fontSize="16px" name="keamanan24Jam" checked={bodyFilterProp.keamanan24Jam} onChange={handleCheckboxChange} />
              <Checkbox label="Penghijauan" fontSize="16px" name="penghijauan" checked={bodyFilterProp.penghijauan} onChange={handleCheckboxChange} />
              <Checkbox label="Lift" fontSize="16px" name="lift" checked={bodyFilterProp.lift} onChange={handleCheckboxChange} />
              <Checkbox label="Club House" fontSize="16px" name="clubHouse" checked={bodyFilterProp.clubHouse} onChange={handleCheckboxChange} />
            </div>
            <div className="filter-search__wrapper__options">
              <Checkbox label="Elevator" fontSize="16px" name="elevator" checked={bodyFilterProp.elevator} onChange={handleCheckboxChange} />
              <Checkbox label="Gym" fontSize="16px" name="gym" checked={bodyFilterProp.gym} onChange={handleCheckboxChange} />
              <Checkbox label="Garasi" fontSize="16px" name="garasi" checked={bodyFilterProp.garasi} onChange={handleCheckboxChange} />
              <Checkbox label="Row Jalan 12" fontSize="16px" name="rowJalan12" checked={bodyFilterProp.rowJalan12} onChange={handleCheckboxChange} />
            </div>
          </div>
        </FilterCard>
      </div>
      <div className="flex flex-row gap-3 mobile:px-5 mobile:py-1">
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} 
          onClick={() => { 
            closeModal();
            dispatch(filterSalesProject(bodyFilterProp));
            {
              otherProps.setItem([])
              dispatch(salesProjectFilter({
                ...bodyFilterProp,
                tipeProperti: bodyFilterProp.tipeProperti === "" ? "" : bodyFilterProp.tipeProperti,
                jumlahKamarTidur: bodyFilterProp.jumlahKamarTidur === "" ? "all" : bodyFilterProp.jumlahKamarTidur,
                jumlahKamarMandi: bodyFilterProp.jumlahKamarMandi === "" ? "all" :bodyFilterProp.jumlahKamarMandi,
                LuasTanahMinimal  : bodyFilterProp.LuasTanahMinimal   === "" ?  0 : Number(bodyFilterProp.LuasTanahMinimal),
                LuasTanahMaksimal : bodyFilterProp.LuasTanahMaksimal  === "" ?  1000000000 : Number(bodyFilterProp.LuasTanahMaksimal),
                LuasBangunanMinimal  : bodyFilterProp.LuasBangunanMinimal   === "" ?  0 : Number(bodyFilterProp.LuasBangunanMinimal),
                LuasBangunanMaksimal : bodyFilterProp.LuasBangunanMaksimal  === "" ?  1000000000 : Number(bodyFilterProp.LuasBangunanMaksimal)
              }, otherProps.setItem, otherProps.item, otherProps.setTotalData)); 
            } 
        }}>
          Terapkan
        </Button>
        <Button buttonColor="blue" textColor="white" fullWidth={true} paddingSize={"padding-1"} 
          onClick={() => { 
            setBodyFilterProp(initialBodyFilter);
            setDropdownVal(initialDropdown);
        }}>
          Reset
        </Button> 
      </div>
    </div>
  );
};

export default FilterSalesProject;