import "./TextBox.scss";
import React from "react";

export default function TextBox({
  type,
  placeholder,
  name,
  className,
  onChange,
  value,
  readOnly = false,
  onKeyDown,
  onBlur,
}) {
  return (
    <input
      className={`text-box ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      readOnly={readOnly}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
