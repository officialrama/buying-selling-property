import React from 'react';
import { CustomCheckbox, CustomLabelCheckbox } from '../../atoms';
import PropTypes from 'prop-types';

function Checkbox({ label, fontSize, fontColor, name, checked, onChange, customStyles, disabled }) {
  return (
    <div className="checkbox__wrapper">
      <CustomCheckbox name={name} checked={checked} onChange={onChange} disabled={disabled} customStyles={customStyles} />
      <CustomLabelCheckbox text={label} fontSize={fontSize} fontColor={fontColor} />
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

Checkbox.defaultProps = {
  text: "",
  fontSize: "14px",
  fontColor: "#101C3C",
  disabled: false
}

export default Checkbox;