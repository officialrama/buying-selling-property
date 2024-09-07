import React from "react";
import Autocomplete from "react-autocomplete";

const Component = ({ ...inputProps }) => {
  return (
    <div className={inputProps.disabled ? "autocompSearch__neoTopWrapperDisabled" : "autocompSearch__neoTopWrapper"}>
      <div className="textbox-label__textboxWrapper">
        <Autocomplete {...inputProps} />
      </div>
      {/* {inputProps.rightLabel &&
        <span onClick={inputProps.onClickRL} className="textbox-label__labelRightWrapperClick">{inputProps.rightLabel}</span>
      } */}
    </div>
  );
};

export default Component;
