import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import LabelInputTextbox from "../../Label/label-input-textbox";

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 2, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const Component = ({ maskOptions, warnText, topLabel, requiredStar, rightLabelBorder, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  return (
    <div>
      <div className={inputProps.disabled ? "textbox-label__wrapperDisabled" : inputProps.invalid ? "textbox-label__wrapperWarn" : "textbox-label__wrapper"}>
        <div className="textbox-label__textboxWrapper">
          <MaskedInput mask={currencyMask} {...inputProps} />
        </div>
        {inputProps.rightLabel &&
          <span
            className={classNames(
              {
                "textbox-label__labelRightWrapper text-xs text-[#777777]": rightLabelBorder === true,
                "textbox-label__labelRightWithoutBorderWrapper text-xs text-[#777777]": rightLabelBorder === false,
              }
            )}
          >
            {inputProps.rightLabel}
          </span>
        }
      </div>
      {warnText && <p className="textbox__invalidTxt">{warnText}</p>}
    </div>
  );
};

Component.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
  warnText: "",
  requiredStar: false,
  rightLabelBorder: true
}

Component.propTypes = {
  inputmode: PropTypes.string,
  requiredStar: PropTypes.bool,
  rightLabelBorder: PropTypes.bool,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
    warnText: PropTypes.string
  }),
}

export default Component;
