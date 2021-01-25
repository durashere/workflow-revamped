import classNames from 'classnames';

const Input = ({
  type = 'text',
  leftIcon,
  rightIcon,
  disabled,
  readOnly,
  value,
  onChange,
  onFocus,
  label,
  placeholder,
  className,
}) => {
  const icon = <span className="text-coolGray-600 material-icons">{leftIcon || rightIcon}</span>;

  return (
    <div className={`${className}`}>
      <label className="text-sm font-medium text-coolGray-600">{label}</label>
      <div className="flex items-center gap-4 p-4 border border-coolGray-600 rounded-xl">
        {leftIcon && icon}
        <input
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full bg-transparent placeholder-coolGray-400 text-coolGray-600"
        />
        {rightIcon && icon}
      </div>
    </div>
  );
};

export default Input;
