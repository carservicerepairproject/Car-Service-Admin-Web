"use client";
import "./FormInput.css";

interface InputProbs {
  label: string;
  id: string;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
}

export default function FormInput({
  label,
  id,
  description,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  errorMsg,
}: InputProbs) {
  return (
      <div className="input-group">
        <input
          className="form-input"
          placeholder=""
          type={type}
          name={id}
          id={id}
          required={required}
          pattern={pattern}
          minLength={minLength}
          min={min}
          max={max}
        />
        <label className="form-label">{label}</label>
      </div>
  );
}
