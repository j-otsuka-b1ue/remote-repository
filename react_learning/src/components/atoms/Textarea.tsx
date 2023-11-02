import React from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const Textarea = ({ value, placeholder, onChange }: Props) => {
  return (
    <textarea
      className="border border-gray rounded-sm w-full"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
