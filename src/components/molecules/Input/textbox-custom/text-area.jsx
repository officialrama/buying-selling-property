import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CurrencyInputField from "react-currency-input-field";
import { LabelInputTextbox, Textarea } from "../../../atoms";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

function Textareas({
  topLabel,
  warnText,
  leftLabel,
  rightLabel,
  rightLabelBorder,
  placeholder,
  disabled,
  className,
  bgColor,
  name,
  onChange,
  onKeyDown,
  value,
  typeInput,
  disablePadding,
  maxLength,
  labelOnCLick,
  enableLabelClick,
  invalid,
  currencyMode,
  required,
  requiredStar,
  isPassword,
  rows,
  ...inputProps
}) {
  const [inputTypeState, setInputTypeState] = useState(typeInput);
  const showPass = () => {
    if (inputTypeState === "password") {
      setInputTypeState("text")
      return;
    }
    setInputTypeState("password")
  }
  return (
    <div className="w-full">
      {topLabel !== "" && (
        <div className="mb-2">
          <LabelInputTextbox text={topLabel} />
          {requiredStar && <span className="sellprops__card__redstar">*</span>}
        </div>
      )}
      <div className="flex flex-row gap-3">
        <div className={disabled ? "textbox-label__wrapperDisabled" : "textarea__wrap"}>
          <div className="textarea__textareaboxWrapper">
            <Textarea
                name={name}
                disabled={disabled}
                value={value}
                required={required}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                rows={rows}
                resize={false}
            />
          </div>
        </div>
        {isPassword &&
          <div className={`textbox__passwordReveal ${disabled && "bg-[#F2F5F7]"}`} onClick={disabled ? null : showPass}>
            {inputTypeState === "text" ? <MdOutlineVisibility className="" /> : <MdOutlineVisibilityOff />}
          </div>
        }
      </div>
      {warnText !== "" && (
        <div className="my-2">
          <p className="textbox__invalidTxt">{warnText}</p>
        </div>
      )}
    </div>
  );
}

Textarea.propTypes = {
  topLabel: PropTypes.string,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  placeholder: PropTypes.string,
  rightLabelBorder: PropTypes.bool,
  typeInput: PropTypes.string,
  disablePadding: PropTypes.bool,
  warnText: PropTypes.string,
  currencyMode: PropTypes.bool,
  enableLabelClick: PropTypes.bool,
  requiredStar: PropTypes.bool,
  isPassword: PropTypes.bool
};

Textarea.defaultProps = {
  topLabel: "",
  leftLabel: "",
  rightLabel: "",
  placeholder: "",
  rightLabelBorder: true,
  typeInput: "text",
  disablePadding: true,
  warnText: "",
  currencyMode: false,
  enableLabelClick: false,
  requiredStar: false,
  isPassword: false
};

export default Textareas;
