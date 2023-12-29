import React from "react";

interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  additionalClasses?: string;
};

export const Button = ({ name, onClick, isDisabled = false, additionalClasses = "" }: ButtonProps) => {
  const className = `${isDisabled
    ? "rounded px-3 py-2 opacity-50"
    : "rounded px-3 py-2"} ${additionalClasses}`;

  return (
    <button className = {className} onClick={onClick} disabled={isDisabled}>
      {name}
    </button>
  );
};
