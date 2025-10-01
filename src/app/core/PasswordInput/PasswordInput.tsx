import React, { useState } from "react";
import "./PasswordInput.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordInput = ({
  placeholder,
  icon,
  value,
  onChange,
  required = false,
  error = "",
}: {
  placeholder: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`input-container ${error ? "error-border" : ""}`}>
      <span className="icon">{icon}</span>
      <input
        type={showPassword ? "text" : "password"}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <span className="end-icon" onClick={togglePassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};
