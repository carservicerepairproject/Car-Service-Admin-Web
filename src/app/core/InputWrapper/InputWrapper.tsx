import React from "react";
import "./InputWrapper.css";

const InputWrapper = ({
  placeholder,
  icon,
  value,
  onChange,
  type = "text",
  required = false,
  error = "",
}: {
  placeholder: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
}) => {
  return (
    <div className={`input-container ${error ? "error-border" : ""}`}>
      <span className="icon">{icon}</span>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputWrapper;
