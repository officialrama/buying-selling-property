import classNames from "classnames";
import LabelInputTextbox from "../../Label/label-input-textbox";
import PropTypes from "prop-types";

function Textarea({ topLabel, placeholder, resize, rows, disabled, name, value, onChange, maxLength, requiredStar, warnText, invalid }) {
  return (
    <div className="textarea__wrap">
      {topLabel !== "" ? (
        <div className="textarea__label">
          <LabelInputTextbox text={topLabel} />
          {requiredStar && <span className="sellprops__card__redstar">*</span>}
        </div>
      ) : (
        <div></div>
      )}
      <textarea
        disabled={disabled}
        className={classNames(
          `${invalid ? 'textarea__comp-failed' : 'textarea__comp'} ${
            disabled && "textarea__disable"
          }`,
          { "textarea__not-resize": resize === false }
        )}
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      {warnText && <p className="textbox__invalidTxt">{warnText}</p>}
    </div>
  );
}

Textarea.propTypes = {
  topLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  resize: PropTypes.bool.isRequired,
  rows: PropTypes.number.isRequired,
  maxLength: PropTypes.number,
  requiredStar: PropTypes.bool,
  warnText: PropTypes.string
};

Textarea.defaultProps = {
  topLabel: "",
  placeholder: "",
  resize: true,
  rows: 4,
  maxLength: 255,
  requiredStar: false,
  warnText: ""
};

export default Textarea;
