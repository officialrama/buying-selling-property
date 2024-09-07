import React, { Fragment } from "react";
import { TextboxLabel } from "../../molecules";

const Component = ({ title, name, value, onChange, disabled, warnText, maxLength }) => {
  return (
    <Fragment>
      <p className="sellprops__card__title">
        {title}
      </p>
      <TextboxLabel placeholder="Alamat KTP" name={name} value={value} onChange={onChange} disabled={disabled} maxLength={maxLength} />
      {warnText !== "" && (
        <div className="my-2">
          <p className="textbox__invalidTxt">{warnText}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Component;
