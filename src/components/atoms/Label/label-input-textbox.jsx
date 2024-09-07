import React from 'react';

const LabelInputTextbox = ({ text, requiredStar }) => {
  return (
    <label className="label-input-txtbox">
      {text}
      {requiredStar && <span className="sellprops__card__redstar">*</span>}
    </label>
  );
};

export default LabelInputTextbox;