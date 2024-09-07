import Checkbox from "../../Input/checkbox"
import React, { useState, useEffect, forwardRef } from 'react'


const DropdownProperti = forwardRef((props, ref) => {
    const { data, filterDataLoc, type, checkedItem, handleCheckboxChange } = props
    return (
        <div className="dropdown-list__wrapper-2 mt-11" ref={ref}>
            <div
                className="dropdown-list__listWrap"
                aria-labelledby="dropdown-homepage"
            >
                {data.map((dataMap, idx) => (
                <div
                    key={idx}
                    className={
                        filterDataLoc?.nameType === dataMap.name
                            ? "dropdown-list__list-active"
                            : "dropdown-list__list-checkbox"
                    }
                >
                    <Checkbox 
                        name={dataMap.value}
                        label={dataMap.name}
                        checked={checkedItem[dataMap.value]}
                        fontColor="#006CC7"
                        // customStyles={"checkbox__checker-2"}
                        onChange={(e) => handleCheckboxChange(type, dataMap.value, e.target.checked)}
                    />
                </div>
                ))}
            </div>
        </div>
    )
})

export default DropdownProperti