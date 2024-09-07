import React from "react";
import CurrencyInputField from "react-currency-input-field";
import LabelInputTextbox from "../../Label/label-input-textbox";

const Component = ({ invalid = false, invalidTxt = "", warnText = "", topLabel = "", ...inputProps }) => {
  return (
    <div>
      {topLabel && <div className="mb-2">
        <LabelInputTextbox text={topLabel} />
      </div>}
      <div className={inputProps.disabled ? "textbox-label__wrapperDisabled" : inputProps.invalid ? "textbox-label__wrapperWarn" : "textbox-label__wrapper"}>
        <span className="textbox-label__labelLeftWrapperCurrency">Rp</span>
        <div className="textbox-label__textboxWrapper">
          <CurrencyInputField {...inputProps} />
        </div>
      </div>
      {warnText && <p className="textbox__invalidTxt">{warnText}</p>}
    </div>
  );
};

export default Component;
