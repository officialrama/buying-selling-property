import PropTypes from "prop-types";
import React from "react";
import { Step } from "../../index";

function Component({
  stepperContent,
  navigateToStepHandler,
  isVertical,
  isInline,
  isRightToLeftLanguage,
  currentTabIndex,
}) {
  return (
    <div
      className={`${!window.location.pathname.includes('/kpr/approval') ? "stepper-head" : "neostepper-head"} ${isVertical ? "vertical-stepper-head" : ""} ${
        isInline ? "inline-stepper-head" : ""
      }`}
    >
      {stepperContent.map((el, i) => (
        <Step
          key={i}
          index={i}
          navigateToStepHandler={navigateToStepHandler}
          isActive={i === currentTabIndex}
          isComplete={el.isComplete}
          isWarning={el.isWarning}
          isError={el.isError}
          isRightToLeftLanguage={isRightToLeftLanguage}
          indicator={i + 1}
          label={el.label}
        />
      ))}
    </div>
  );
}

Component.propTypes = {
  stepperContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      clicked: PropTypes.func,
      isWarning: PropTypes.bool,
      isError: PropTypes.bool,
      isComplete: PropTypes.bool,
      isLoading: PropTypes.bool,
    })
  ),
  navigateToStepHandler: PropTypes.func.isRequired,
  currentTabIndex: PropTypes.number.isRequired,
  isInline: PropTypes.bool,
  isVertical: PropTypes.bool,
  isRightToLeftLanguage: PropTypes.bool,
};

export default Component;
