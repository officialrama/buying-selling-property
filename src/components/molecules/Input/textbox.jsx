import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Input, LabelInputTextbox } from '../../atoms';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

function Textbox({ label, typeInput, placeholder, bgColor, borderColor, placeholderColor, name, value, onChange, onBlur, disabled, invalid, invalidTxt, maxLength, isPassword, id, rightBtn, rightBtnChild, rightBtnClick }) {
  const [inputTypeState, setInputTypeState] = useState(typeInput);
  const showPass = () => {
    if (inputTypeState === "password") {
      setInputTypeState("text")
      return;
    }
    setInputTypeState("password")
  }
  return (
    <div>
      {label !== "" ? <div className="mb-2"><LabelInputTextbox text={label} /></div> : <div></div>}
      <div className="flex flex-row gap-3">
        <Input type={inputTypeState} placeholder={placeholder} withShadow bgColor={bgColor} borderColor={borderColor} placeholderColor={placeholderColor} name={name} value={value} onBlur={onBlur} onChange={onChange} disabled={disabled} maxLength={maxLength} isPassword={isPassword} id={id} />
        {isPassword &&
          <div className="textbox__passwordReveal" onClick={showPass}>
            {inputTypeState === "text" ? <MdOutlineVisibility className="" /> : <MdOutlineVisibilityOff />}
          </div>
        }
        {rightBtn &&
          <div className="textbox__passwordReveal" onClick={rightBtnClick}>
            {rightBtnChild}
          </div>
        }
      </div>
      {invalid && <p className="textbox__invalidTxt">{invalidTxt}</p>}
    </div>
  );
};

Textbox.propTypes = {
  label: PropTypes.string,
  typeInput: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidTxt: PropTypes.string,
  maxLength: PropTypes.number,
  isPassword: PropTypes.bool,
  id: PropTypes.string,
  rightBtn: PropTypes.bool,
  rightBtnClick: PropTypes.func
};

Textbox.defaultProps = {
  label: "",
  typeInput: "text",
  placeholder: "",
  name: "",
  disabled: false,
  invalid: false,
  invalidTxt: "",
  maxLength: 255,
  isPassword: false,
  id: "",
  rightBtn: false,
  rightBtnChild: <></>,
  rightBtnClick: [() => {}]
};

export default Textbox;