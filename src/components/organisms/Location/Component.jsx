import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { TextboxLabel } from "../../molecules";
import { inquiryKodePos } from "./../../../store/actions/fetchData/sellPropState";
import PropTypes from "prop-types";
import { invalidNumRegex } from "../../../helpers/regex";

const Component = ({ title, dataAddress, onChangeText, setDataAddress, disabled }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <p className="sellprops__card__title">
        {title} <span className="sellprops__card__redstar"></span>
      </p>
      <div className="grid grid-cols-2 grid-flow-row gap-4 mt-2">
      <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-[#292929] flex flex-row">Provinsi<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          placeholder="Provinsi"
          name="province"
          value={dataAddress?.province || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.province === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.province?.length < 3 || dataAddress?.province === "0" ? "Provinsi tidak valid" : ""}
          maxLength={50}
        />
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Kabupaten/Kota<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          name="district"
          placeholder="Kabupaten/Kota"
          value={dataAddress?.district || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.district === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.district?.length < 3 || dataAddress?.district === "0" ? "Kabupaten/Kota tidak valid" : ""}
          maxLength={50}
        />
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Kecamatan<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          name="subDistrict"
          placeholder="Kecamatan"
          value={dataAddress?.subDistrict || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.subDistrict === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.subDistrict?.length < 3 || dataAddress?.subDistrict === "0" ? "Kecamatan tidak valid" : ""}
          maxLength={50}
        />
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Kelurahan<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          name="urbanVillage"
          placeholder="Kelurahan"
          value={dataAddress?.urbanVillage || ""}
          rightLabelBorder={false}
          disabled={
            dataAddress?.urbanVillage === "Loading..."
              ? true
              : disabled
                ? true
                : false
          }
          onChange={(e) =>
            onChangeText(
              e.target.name,
              e.target.value.replace(/[^a-zA-Z ]/i, "")
            )
          }
          warnText={dataAddress?.urbanVillage?.length < 3 || dataAddress?.urbanVillage === "0" ? "Kelurahan tidak valid" : ""}
          maxLength={50}
        />
        </div>
      </div>
      <div className="flex flex-row mobile:flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2 w-full">
      <p className="text-xs font-semibold text-[#292929] flex flex-row">RT<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          placeholder="Masukkan RT"
          name="rt"
          value={dataAddress?.rt || ""}
          rightLabelBorder={false}
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={3}
          disabled={disabled}
          warnText={dataAddress?.rt?.length <= 1 || dataAddress?.rt === "0" ? "RT tidak valid" : ""}
        />
        </div>
        <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">RW<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          placeholder="Masukkan RW"
          name="rw"
          value={dataAddress?.rw || ""}
          rightLabelBorder={false}
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={3}
          disabled={disabled}
          warnText={dataAddress?.rw?.length <= 1 || dataAddress?.rw === "0" ? "RW tidak valid" : ""}
        />
        </div>
        <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-semibold text-[#292929] flex flex-row">Kode Pos<p className="text-[#E84040]">*</p></p>
        <TextboxLabel
          placeholder="Masukkan Kode Pos"
          name="posCode"
          value={dataAddress?.posCode || ""}
          rightLabelBorder={false}
          rightLabel={
            <button onClick={(e) => dispatch(inquiryKodePos(dataAddress?.posCode, dataAddress, setDataAddress))}>
              Cari
            </button>
          }
          onChange={(e) =>
            onChangeText(e.target.name, e.target.value.replace(invalidNumRegex, ""))
          }
          maxLength={5}
          disabled={disabled}
          warnText={dataAddress?.posCode?.length !== 5 || dataAddress?.posCode === "0" ? "Kode Pos tidak valid" : ""}
        />
        </div>
      </div>
    </Fragment>
  );
};

Component.propTypes = {
  disabled: PropTypes.bool,
};

Component.defaultProps = {
  disabled: false,
};

export default Component;
