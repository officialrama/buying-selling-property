const InputPrefix = ({ title, iconPrefix, withBorder, placeholder, disabled, inputClassName, name, value, onChange, isCurrency }) => {
  return (
    <div>
      <label for="price" className="input-prefix__label">
        {title}
      </label>
      <div className="input-prefix__wrapper">
        <div
          className={`input-prefix__prefix ${withBorder && "input-prefix__prefix--pref-with-b"
            }`}
        >
          <span className="input-prefix__icon-pref">{iconPrefix}</span>
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          id="price"
          disabled={disabled}
          className={`input-prefix__input ${inputClassName} ${disabled && "input-prefix__input--not-allow"
            }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputPrefix;
