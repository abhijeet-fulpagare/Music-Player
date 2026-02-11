import "../../css/auth/Input.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useState } from "react";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <label>{label}</label>

      <div className="input-container">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field"
        />

        {type === "password" && (
          <button
            type="button"
            className="input-eye-btn"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <FaRegEye size={22} />
            ) : (
              <FaRegEyeSlash size={22} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
