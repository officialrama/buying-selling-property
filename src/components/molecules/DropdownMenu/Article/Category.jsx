import React, { forwardRef } from "react"
import Checkbox from "../../Input/checkbox"

const DropdownCategory = forwardRef((props, ref) => {
    const {data, conditionParams, checkedItem, handleCheckboxChange} = props
    data.all = {
        id: 0,
        name: "All"
    }
    return (
        <div className="dropdown-list__wrapper-2 mt-11 z-40" ref={ref}>
            <div className="dropdown-list__listWrap"
            aria-labelledby="dropdown-homepage"
            >
                {data.map((dataMap, idx) => (
                <div
                    key={idx}
                    className={
                        conditionParams?.nameType === dataMap.name
                            ? "dropdown-list__list-active"
                            : "dropdown-list__list-checkbox"
                    }
                >
                    <Checkbox 
                        name={dataMap.name}
                        label={dataMap.name}
                        checked={checkedItem[dataMap.name].checked}
                        fontColor="#006CC7"
                        onChange={(e) => handleCheckboxChange(dataMap.name, e.target.checked)}
                    />
                </div>
                ))}
            </div>
        </div>
    )
})

export default DropdownCategory