import React from "react";
import "./CustomButton.css";

const CustomButton = ({
  text = "LOGIN",
  type = "button",
  disabled = false,
  onClick,
}: {
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button-container ${disabled ? "disabled" : ""}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
