import React, { Fragment } from "react";
import { Button } from "../../../atoms";

const Component = ({ title, setModalGmaps, dataAddress, disabled }) => {
  return (
    <Fragment>
      <p className="sellprops__card__title">
        {title} <span className="sellprops__card__redstar">*</span>
      </p>
      <div className={`gmaps-pinbox__wrapper ${disabled && "bg-[#F2F5F7]"}`}>
        <p className="gmaps-pinbox__txt">
          {dataAddress?.address ? dataAddress?.address : "Pin Lokasi Anda!"}
        </p>
        <Button
          buttonColor="bluefigma"
          textColor="white"
          fullWidth={false}
          onClick={setModalGmaps}
          paddingSize={"padding-0"}
          disabled={disabled}
        >
          PIN LOKASI
        </Button>
      </div>
    </Fragment>
  );
};

export default Component;
