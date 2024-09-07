import PropTypes from "prop-types";

function RadioButtonWithLabel({
  text,
  checked,
  onChange,
  name,
  labelClassname,
  checkColor,
}) {
  const radioColor = (formType) => {
    switch (formType) {
      case "blue":
        return "color-blue";
      case "orange":
        return "color-orange";
      case "blueFigma":
        return "color-blueFigma";
      default:
        return "color-blue";
    }
  };

  return (
    <div className="radio-btn-wrap">
      <label className="radio-button-container">
        <p className={`radio-button-text ${labelClassname}`}>{text}</p>
        <input
          type="radio"
          name={name}
          value={name}
          checked={checked}
          onChange={onChange}
        />
        <span className={`checkmark ${radioColor(checkColor)}`}></span>
      </label>
    </div>
  );
}

RadioButtonWithLabel.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  labelClassname: PropTypes.string.isRequired,
  checkColor: PropTypes.string.isRequired,
};

RadioButtonWithLabel.defaultProps = {
  text: "",
  checked: false,
  name: "name",
  onChange: [() => {}],
  labelClassname: "",
  checkColor: "blue",
};

export default RadioButtonWithLabel;
