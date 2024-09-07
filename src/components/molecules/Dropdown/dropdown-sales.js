import { Listbox } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";
import { DropdownPriceSliderSales } from "..";
import { LabelInputTextbox } from "../../atoms";

function Dropdown({
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
  warnText
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
          <Listbox.Button
            className="dropdown__listboxButton"
            onClick={onClickButton}
          >
            {icons && (
              <img className="dropdown__icons" src={icons} alt="dropdown" />
            )}
            <p className="dropdown__value">{value.name}</p>
            {!notWithArrow && (
              <img
                className="dropdown__arrowDown"
                src="/icons/small-icons/arrow-down.svg"
                alt="dropdown"
              />
            )}
          </Listbox.Button>
          {showOptions && (
            <Listbox.Options className="dropdown__listboxOptionsWrapper">
              {data &&
                data.map((props, idx) => (
                  <Listbox.Option
                    key={idx}
                    className="dropdown__listboxOption"
                    value={props}
                    disabled={props.unavailable}
                  >
                    {props.name}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          )}
          {priceSlider && showPriceSlider ? (
            <DropdownPriceSliderSales
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

Dropdown.propTypes = {
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
  warnText: PropTypes.string
};

Dropdown.defaultProps = {
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
  warnText: ""
};

export default Dropdown;
