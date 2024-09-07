import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { LabelInputTextbox, TextboxWithoutShadow } from "../../atoms";
import { TextColor } from "../../theme/text/text";

function TextboxDropdown({
  value,
  onChange,
  data,
  name,
  valueInput,
  textButtonColor,
  className,
  label,
  placeholder,
  disabled,
  maxLength,
  onValueChange,
  invalid,
  invalidTxt,
  showOptions
}) {
  return (
    <div>
      {label !== "" ? <div className="mb-2"><LabelInputTextbox text={label} /></div> : <div></div>}
      <div className={!disabled ? "txtbox-dropdown" : "txtbox-dropdown__disabled"}>
        <Listbox value={value} onChange={onChange}>
          <Listbox.Button
            className={classNames(
              "txtbox-dropdown__button",
              `text-[${textButtonColor}]`
            )}
          >
            <div className="txtbox-dropdown__dropdown-wrap">
              <p>{value?.value}</p>
              <img src="/icons/small-icons/arrow-down.svg" alt="dropdown" />
            </div>
          </Listbox.Button>
          {showOptions && (
            <Listbox.Options className="txtbox-dropdown__option-wrap">
              {data.map((props) => (
                <Listbox.Option
                  className="txtbox-dropdown__option"
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
        <div className="txtbox-dropdown__txtbox-wrap">
          <div className="txtbox-dropdown__txtbox">
            <TextboxWithoutShadow typeInput="text" name={name} value={valueInput} disablePadding={true} onChange={onValueChange} maxLength={maxLength} disabled={disabled} placeholder={placeholder} />
          </div>
        </div>
      </div>
      {invalid && <p className="textbox__invalidTxt mt-2">{invalidTxt}</p>}
    </div>
  );
}

TextboxDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  textButtonColor: PropTypes.string.isRequired,
  showOptions: PropTypes.bool
};

TextboxDropdown.defaultProps = {
  label: "",
  textButtonColor: TextColor.blue,
  showOptions: true
};

export default TextboxDropdown;
