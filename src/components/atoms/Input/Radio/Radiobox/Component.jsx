import React from 'react';
import RadioButtonWithLabel from '../radio-button-with-label';
import PropTypes from "prop-types";

function Component ({ text, checked, onChange, name }) {
  return (
    <div className={checked ? "radiobox__is-active" : "radiobox__is-idle"}>
      <RadioButtonWithLabel text={text} checked={checked} onChange={onChange} name={name} />
    </div>
  );
};

Component.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

Component.defaultProps = {
  text: "",
  checked: false,
  onChange: [() => {}],
};

export default Component;