import { Listbox } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";
import { DropdownMenuPriceSlider } from "..";
import { LabelInputTextbox } from "../../atoms";

function DropdownFasilitas({
  topLabel,
  value,
  onChange,
  data,
  notWithArrow,
  icons,
  showOptions,
  onClick,
  priceSlider,
  showPriceSlider,
  minRangePrice,
  maxRangePrice,
  defaultValuePrice,
  valuePrice,
  handleChangePrice,
  onChangePriceSlider,
  onClickResetPrice,
  onClickSavePrice,
  onClickButton,
  warnText,
  placeholder,
  iconsList,
  disabled
}) {
  return (
    <div>
      {topLabel !== "" ? (
        <div className="mb-2">
          <LabelInputTextbox text={topLabel} />
        </div>
      ) : (
        <div></div>
      )}
      <div className="dropdown__wrapper" onClick={onClick}>
        <Listbox value={value} onChange={onChange}>
          <Listbox.Button className={`dropdown__listboxButton ${disabled === true ? "bg-[#EAEBEB] cursor-not-allowed" : ""}`} onClick={onClickButton}>
            {<img className="dropdown__icons" src={value?.name === 'Halte' ? "/icons/icon-fasilitas/Bus Stop.svg" :
                      value?.name === 'Gerbang Tol' ? "/icons/icon-fasilitas/Toll.svg" :
                      value?.name === 'Stasiun' ? "/icons/icon-fasilitas/Station.svg" :
                      value?.name === 'Sekolah' ? "/icons/icon-fasilitas/School.svg" :
                      value?.name === 'Universitas' ? "/icons/icon-fasilitas/School.svg" :
                      value?.name === 'Taman' ? "/icons/icon-fasilitas/Park.svg" :
                      value?.name === 'Apotek' ? "/icons/icon-fasilitas/Pharmacy.svg" :
                      value?.name === 'Rumah Ibadah' ? "/icons/icon-fasilitas/Rumah Ibadah.svg" :
                      value?.name === 'Bioskop' ? "/icons/icon-fasilitas/Cinema.svg" :
                      value?.name === 'Gym' ? "/icons/icon-fasilitas/Gym.svg" : 
                      value?.name === 'Restoran' ? "/icons/icon-fasilitas/Restaurant.svg":
                      value?.name === 'Pasar' ? "/icons/icon-fasilitas/Market.svg" :
                      value?.name === 'Rumah Sakit' ? "/icons/icon-fasilitas/Hospital.svg" :
                      value?.name === 'Mall' ? "/icons/icon-fasilitas/Mall.svg" :
                      value?.name === 'Kolam Renang' ? "/icons/icon-fasilitas/Swimming Pool.svg"
                     : ""} />}
            <p className="dropdown__value" title={value.name}>
            {value.name || placeholder}
            </p>
            {!notWithArrow && (
              <img
                className="dropdown__arrowDown"
                src="/icons/small-icons/arrow-down.svg"
                alt="dropdown"
              />
            )}
          </Listbox.Button>
          {showOptions && (
            <Listbox.Options className={`dropdown__listboxOptionsWrapper ${disabled === true ? "hidden" : ""}`}>
              {data &&
                data.map((props, idx) => (
                  <Listbox.Option
                    key={idx}
                    className="dropdown__listboxOption"
                    value={props}
                    disabled={props.unavailable}
                    title={props.name}
                  >
                    <p className="flex flex-row">
                    {<img className="dropdown__icons" src={props?.name === 'Halte' ? "/icons/icon-fasilitas/Bus Stop.svg" :
                      props?.name === 'Gerbang Tol' ? "/icons/icon-fasilitas/Toll.svg" :
                      props?.name === 'Stasiun' ? "/icons/icon-fasilitas/Station.svg" :
                      props?.name === 'Sekolah' ? "/icons/icon-fasilitas/School.svg" :
                      props?.name === 'Universitas' ? "/icons/icon-fasilitas/School.svg" :
                      props?.name === 'Taman' ? "/icons/icon-fasilitas/Park.svg" :
                      props?.name === 'Apotek' ? "/icons/icon-fasilitas/Pharmacy.svg" :
                      props?.name === 'Rumah Ibadah' ? "/icons/icon-fasilitas/Rumah Ibadah.svg" :
                      props?.name === 'Bioskop' ? "/icons/icon-fasilitas/Cinema.svg" :
                      props?.name === 'Gym' ? "/icons/icon-fasilitas/Gym.svg" : 
                      props?.name === 'Restoran' ? "/icons/icon-fasilitas/Restaurant.svg":
                      props?.name === 'Pasar' ? "/icons/icon-fasilitas/Market.svg" :
                      props?.name === 'Rumah Sakit' ? "/icons/icon-fasilitas/Hospital.svg" :
                      props?.name === 'Mall' ? "/icons/icon-fasilitas/Mall.svg" :
                      props?.name === 'Kolam Renang' ? "/icons/icon-fasilitas/Swimming Pool.svg"
                     : ""} />}
                    {props.name}
                    </p>
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          )}
          {priceSlider && showPriceSlider ? (
            <DropdownMenuPriceSlider
              classNameWrapper="mt-11"
              minRange={minRangePrice}
              maxRange={maxRangePrice}
              defaultValue={defaultValuePrice}
              value={valuePrice}
              handleChangePrice={handleChangePrice}
              onChangeSlider={onChangePriceSlider}
              onClickReset={onClickResetPrice}
              onClickSave={onClickSavePrice}
            />
          ) : (
            <></>
          )}
        </Listbox>
      </div>
      {warnText && <p className="textbox__invalidTxt">{warnText}</p>}
    </div>
  );
}

DropdownFasilitas.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  showOptions: PropTypes.bool.isRequired,
  topLabel: PropTypes.string.isRequired,
  priceSlider: PropTypes.bool,
  minRangePrice: PropTypes.number,
  maxRangePrice: PropTypes.number,
  defaultValuePrice: PropTypes.array,
  valuePrice: PropTypes.array,
  handleChangePrice: PropTypes.func,
  onChangePriceSlider: PropTypes.func,
  onClickResetPrice: PropTypes.func,
  showPriceSlider: PropTypes.bool,
  onClickSavePrice: PropTypes.func,
  onClickButton: PropTypes.func,
  warnText: PropTypes.string,
};

DropdownFasilitas.defaultProps = {
  value: "Dropdown",
  onChange: [() => {}],
  data: [{ id: 0, name: "Select Dropdown", unavailable: false }],
  showOptions: true,
  topLabel: "",
  priceSlider: false,
  minRangePrice: 100000000,
  maxRangePrice: 10000000000,
  defaultValuePrice: [0, 10000000000],
  valuePrice: [0, 10000000000],
  handleChangePrice: [() => {}],
  onChangePriceSlider: [() => {}],
  onClickResetPrice: [() => {}],
  showPriceSlider: false,
  onClickSavePrice: [() => {}],
  onClickButton: [() => {}],
  warnText: "",
};

export default DropdownFasilitas;
