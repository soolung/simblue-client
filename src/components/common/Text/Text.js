import "./Text.scss";
import { forwardRef } from 'react';

const TextRef = ({
                   className,
                   onChange,
                   onKeyUp,
  onFocus,
                   value,
                   name,
                   id,
                   placeholder,
                   readOnly
                 }, ref) => {
  return (
    <input
      ref={ref}
      className={`text ${className}`}
      type="text"
      onChange={onChange}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  )
}

const Text = forwardRef(TextRef);
export default Text;
