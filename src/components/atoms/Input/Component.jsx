import classNames from "classnames";
import PropTypes from "prop-types";

const Input = ({
  disabled,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  withShadow,
  withoutShadow,
  bgColor,
  borderColor,
  placeholderColor,
  onKeyDown,
  className,
  disablePadding,
  fontSemiBold,
  name,
  maxLength,
  required,
  id,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      name={name}
      maxLength={maxLength}
      required={required}
      id={id}
      className={classNames(
        {
          textbox__shape__withShadow: withShadow,
          textbox__shape__withoutShadow: withoutShadow,
          textbox__shape__disablePadding: disablePadding,
          textbox__shape__semiBold: fontSemiBold,
        },
        `textbox__color__bg__${bgColor}`,
        `textbox__color__border__${borderColor}`,
        `textbox__color__placeholder__${placeholderColor}`,
        className
      )}
      autoComplete="new-password"
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  id: PropTypes.string,
};

Input.defaultProps = {
  bgColor: "transparent",
  borderColor: "gray",
  placeholderColor: "gray",
  disablePadding: false,
  semiBold: false,
  name: "",
  required: false,
  maxLength: 255,
  id: "",
};

export default Input;
