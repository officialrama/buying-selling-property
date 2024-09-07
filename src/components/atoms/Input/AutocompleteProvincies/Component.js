import React, { useEffect, useRef, useState } from "react";
import { Textbox, TextboxInfolelang, TextboxLabel } from "../../../molecules";

const Component = ({ ...inputProps }) => {
  return (
    <div className={inputProps.disabled ? "autocompSearch__provTopWrapperDisabled" : " relative flex flex-row bg-[#FFFFFF] border border-solid border-[#CAD0DA] w-auto max-h-[50px] rounded-lg shadow font-normal focus:outline-none focus:shadow-lg focus:shadow-slate-200 shadow-gray-100 overflow-visible"}>
      {inputProps?.selectedItems?.length > 0 && (
        <div className="flex flex-row space-x-3 py-2 pl-3" style={{ maxHeight: "150px", overflowY: "auto" }} ref={inputProps?.containerRef}>
          {inputProps?.selectedItems.map((item) => (
            <div key={item.id} className="flex items-center bg-[#ffff] border-[#1078CA] border-[2px] text-[#292929] text-xs font-medium rounded-full px-2 py-1">
              <span className="whitespace-nowrap">{item?.name}</span>
              <button onClick={() => inputProps.handleDeleteItem(item)} className="ml-2">
                X
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="w-auto place-self-center px-1 py-2">
        <TextboxInfolelang placeholder={`${inputProps?.selectedItems?.length > 0 ? "" : "Contoh: Jawa Barat"}`} value={inputProps?.searchText} onChange={inputProps?.handleSearchChange}></TextboxInfolelang>
      </div>     
    </div>
  );
};

export default Component;
