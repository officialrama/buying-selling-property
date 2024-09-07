import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { LabelInputTextbox, TextboxWithoutShadow } from "../../atoms";
import { TextColor } from "../../theme/text/text";

function TextboxDropdownFasilitas({
  value,
  onChange,
  data,
  name,
  valueInput,
  textButtonColor,
  className,
  label,
  placeholder,
  placeholderDropdown,
  maxLength,
  onValueChange,
  invalid,
  invalidTxt,
  showOptions,
  disabled
}) {
  return (
    <div>
      {label !== "" ? <div className="mb-2"><LabelInputTextbox text={label} /></div> : <div></div>}
      <div className={!disabled ? "txtbox-dropdownFasilitas" : "txtbox-dropdownFasilitas__disabled"}>
      <div className="txtbox-dropdownFasilitas__txtbox-wrap">
          <div className="txtbox-dropdownFasilitas__txtbox">
            <TextboxWithoutShadow typeInput="text" name={name} value={valueInput} disablePadding={true} onChange={onValueChange} maxLength={maxLength} disabled={disabled} placeholder={placeholder} />
          </div>
        </div>
        <Listbox value={value} onChange={onChange}>
          <Listbox.Button
            className={classNames(
              "txtbox-dropdownFasilitas__button w-[80px] h-[40px]",
              `text-[#777777] ${disabled === true ? "bg-[#EAEBEB] cursor-not-allowed" : ""}`
            )}
          >
            <div className="txtbox-dropdownFasilitas__dropdown-wrap flex text-start justify-between">
              <p>{value?.name === '' ? placeholderDropdown : value?.name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </Listbox.Button>
          {showOptions && (
            <Listbox.Options className={`txtbox-dropdownFasilitas__option-wrap ${disabled === true ? "hidden" : ""}`}>
              {data?.map((props) => (
                <Listbox.Option
                  className="txtbox-dropdownFasilitas__option"
                  key={props.id}
                  value={props}
                  disabled={props.unavailable}
                >
                  {props.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </Listbox>
      </div>
      {invalid && <p className="textbox__invalidTxt mt-2">{invalidTxt}</p>}
    </div>
  );
}

TextboxDropdownFasilitas.propTypes = {
  label: PropTypes.string.isRequired,
  textButtonColor: PropTypes.string.isRequired,
  showOptions: PropTypes.bool
};

TextboxDropdownFasilitas.defaultProps = {
  label: "",
  textButtonColor: TextColor.blue,
  showOptions: true
};

export default TextboxDropdownFasilitas;
