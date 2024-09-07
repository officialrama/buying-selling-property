import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CurrencyInputField from "react-currency-input-field";
import { LabelInputTextbox, TextboxWithoutShadow } from "../../../atoms";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

function TextboxInfolelang({
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
        <div className={disabled ? "textbox-label__wrapperDisabled" : "textbox-label__lelang-wrapper"}>
          {leftLabel !== "" && (
            <span className="textbox-label__labelLeftWrapper">{leftLabel}</span>
          )}
          <div className="textbox-label__textboxWrapper">
            {!currencyMode ?
              <TextboxWithoutShadow
                disabled={disabled}
                bgColor={bgColor}
                className={className}
                placeholder={placeholder}
                name={name}
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={value}
                typeInput={inputTypeState}
                disablePadding={disablePadding}
                maxLength={maxLength}
                required={required}
              />
              :
              <CurrencyInputField {...inputProps} />
            }
          </div>
          {rightLabel !== "" && (
            <span
              onClick={labelOnCLick}
              className={classNames(
                {
                  "textbox-label__labelRightWrapper": rightLabelBorder === true,
                  "textbox-label__labelRightWithoutBorderWrapper": rightLabelBorder === false,
                  "textbox-label__labelRightWrapper--enabled": rightLabelBorder === true && enableLabelClick === true
                }
              )}
            >
              {rightLabel}
            </span>
          )}
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

TextboxInfolelang.propTypes = {
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

TextboxInfolelang.defaultProps = {
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

export default TextboxInfolelang
