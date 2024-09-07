import React from "react";
import { TextboxLabel } from "../../molecules";
import { FiSearch } from "react-icons/fi";

const SearchNeo = ({ handleKeyDown, handleInputChange, value }) => {
  return (
    <TextboxLabel
      placeholder="Cari lokasi, nama properti atau nama developer"
      labelOnCLick={handleKeyDown}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      rightLabelBorder={false}
      value={value}
      // leftLabel={<FiSearch color={"#777777"} />}
      rightLabel={<FiSearch color={"#777777"} />}
    />
  );
};

export default SearchNeo;