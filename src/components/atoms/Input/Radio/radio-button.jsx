import PropTypes from "prop-types";

function Radio({ checked, onChange, disabled }) {
  return (
    <div className="flex items-center">
      <label className="radio-button-container">
        <input
          type="radio"
          name="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="checkmark color-blue"></span>
      </label>
    </div>
  );
}

Radio.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Radio.defaultProps = {
  text: "",
  checked: false,
  onChange: [() => {}],
  disabled: false
};

export default Radio;
