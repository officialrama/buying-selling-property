import React from "react";
import { Input } from "..";

const TextboxWithoutShadow = ({
  typeInput,
  placeholder,
  disabled,
  className,
  bgColor,
  value,
  name,
  disablePadding,
  fontSemiBold,
  onChange,
  onKeyDown,
  maxLength,
  required
}) => {
  return (
    <div>
      <Input
        type={typeInput}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        withoutShadow
        className={className}
        bgColor={bgColor}
        onKeyDown={onKeyDown}
        borderColor="none"
        placeholderColor="gray"
        disablePadding={disablePadding}
        fontSemiBold={fontSemiBold}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
};

export default TextboxWithoutShadow;
