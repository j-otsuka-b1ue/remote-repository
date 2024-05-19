import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  name?: string;
  type?: string;
  InputProps?: object;
};

export const TextInput = ({ value, placeholder, onChange, name, type = "text", InputProps }: Props) => {
  return (
    <TextField
      className="border border-gray rounded-sm w-full"
      type={type}
      value={value}
      InputProps={InputProps}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};