import PropTypes from "prop-types";
import React from "react";

function Component({
  indicator,
  label,
  navigateToStepHandler,
  index,
  isActive,
  isComplete,
  isWarning,
  isError,
  isRightToLeftLanguage,
}) {
  const classes = [''];

  if (isActive) {
    classes.push('is-active');
  }
  if (isComplete) {
    classes.push('is-complete');
  }
  if (isWarning) {
    classes.push('is-warning');
  }
  if (isError) {
    classes.push('is-error');
  }
  if (isRightToLeftLanguage) {
    classes.push('rightToLeft');
  }

  return (
    <div className={`stepper-step ${classes.join(' ')}`}>
      <div className="stepper-indicator"><span className="text-[#ffff]">H</span>
        <span className="stepper-indicator-info">
          {indicator}
        </span>
      </div>
      <div className="stepper-label">{label}</div>
    </div>
  );
};

Component.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.node, PropTypes.number]),
  label: PropTypes.string.isRequired,
  navigateToStepHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  isError: PropTypes.bool,
  isWarning: PropTypes.bool,
  isRightToLeftLanguage: PropTypes.bool,
};

export default Component;