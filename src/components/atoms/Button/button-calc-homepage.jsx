import classNames from "classnames";
import PropTypes from "prop-types";
import { SmallLoading } from "..";

function Button({
  children,
  fullWidth,
  paddingSize,
  buttonColor,
  textColor,
  onClick,
  disabled,
  className,
  isLoading,
  nameUpload,
  onChangeUpload,
  acceptedFiles,
  referenceUpload,
  idUpload,
  btnTypes,
}) {
  const buttonType = (types) => {
    switch (types) {
      case "upload":
        return (
          <>
            <input type="file" id={idUpload} name={nameUpload} onChange={onChangeUpload} accept={acceptedFiles} ref={referenceUpload} hidden />
            <label for={idUpload}>
              <div className={classNames(`basic-button__button-color--${buttonColor}`, { "basic-button__width--full": fullWidth, [`basic-button__padding-size--${paddingSize}`]: paddingSize }, disabled && "cursor-not-allowed", className)}>
                <p className={`basic-button__text-style--${textColor} text-primary text-center`}>{isLoading ? <SmallLoading /> : children}</p>
              </div>
            </label>
          </>
        )
      case "submit":
        return (
          <>
            <button type="submit" disabled={disabled} className={classNames(`basic-button__button-color--${buttonColor}`, { "basic-button__width--full": fullWidth, [`basic-button__padding-size--${paddingSize}`]: paddingSize }, disabled && "cursor-not-allowed", className)} onClick={onClick}>
              <p className={`basic-button__text-style--${textColor} text-primary`}>{isLoading ? <SmallLoading /> : children}</p>
            </button>
          </>
        )
      default:
        return (
          <button disabled={disabled} className={classNames(`bg-[#EAEBEB]`, { "basic-button__width--full": fullWidth, [`basic-button__padding-size--${paddingSize}`]: paddingSize }, disabled && "cursor-not-allowed", className)} onClick={onClick}>
            <p className={`basic-button__text-style--${textColor} text-primary`}>{isLoading ? <SmallLoading /> : children}</p>
          </button>
        )
    }
  }
  return (
    <>
      {buttonType(btnTypes)}
    </>
  );
}

Button.propTypes = {
  fullWidth: PropTypes.bool.isRequired,
  paddingSize: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  acceptedFiles: PropTypes.string.isRequired,
  referenceUpload: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  nameUpload: PropTypes.string.isRequired,
  idUpload: PropTypes.string.isRequired,
  btnTypes: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  fullWidth: false,
  paddingSize: "padding-0",
  buttonColor: "bluefigma",
  textColor: "white",
  disabled: false,
  acceptedFiles: ".jpg,.png,.jpeg,.pdf",
  nameUpload: "",
  idUpload: "upload",
  btnTypes: "",
};

export default Button;
