import React from "react";
import { TextboxLabel } from "../../molecules";

const SearchHomepage = ({ handleKeyDown, handleInputChange, enableLabelClick }) => {
  return (
    <TextboxLabel
      placeholder="* Cari lokasi, nama properti atau nama developer"
      rightLabel={<img alt="icons" src="/icons/search_btn.svg" />}
      labelOnCLick={handleKeyDown}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      rightLabelBorder={true}
      enableLabelClick={enableLabelClick}
    />
  );
};

export default SearchHomepage;
