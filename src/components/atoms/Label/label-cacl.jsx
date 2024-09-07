import React from 'react';

const LabelCalc = ({ text, requiredStar }) => {
  return (
    <label className="text-[#101C3C] font-medium text-xs mb-1">
      {text}
      {requiredStar && <span className="sellprops__card__redstar">*</span>}
    </label>
  );
};

export default LabelCalc;