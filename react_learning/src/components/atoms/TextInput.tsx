import React from "react";

type TextInputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const TextInput = ({ value, placeholder, onChange }: TextInputProps) => {
  return (
    <input
      className="form-field-input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

export default TextInput;
