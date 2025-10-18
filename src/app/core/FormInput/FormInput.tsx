import React from "react";
import styles from "./FormInput.module.css";

interface FormInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  error = "",
  className = "",
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <span>{placeholder}</span>
      <input
        className={styles.formInput}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormInput;
