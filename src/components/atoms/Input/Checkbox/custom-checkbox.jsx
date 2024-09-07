import React from "react";

const CustomCheckbox = ({ name, customStyles, checked, onChange, disabled }) => {
  return (
    <div className="mr-3">
      <input
        name={name}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className={`checkbox__checker ${customStyles ? customStyles : ''}`}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomCheckbox;
