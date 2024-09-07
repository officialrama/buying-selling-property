import React from 'react';
import PropTypes from 'prop-types';

function CustomLabelCheckbox ({text, fontSize, fontColor}) {
  return (
    <div className='place-self-center'>
      <p className={`checkbox__label text-[${fontSize}] text-[${fontColor}] ${text === "Hot Deals" ? "rounded-full bg-[#FCE7E7] text-[#E84040] p-1 font-semibold" : ""}`}>
        {text === "Hot Deals" ? "Hot Deal 🔥" : text }
      </p>
    </div>
  );
};

CustomLabelCheckbox.propTypes = {  
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired
}

CustomLabelCheckbox.defaultProps = {
  text: "",
  fontSize: "14px",
  fontColor: "#101C3C"
}

export default CustomLabelCheckbox;