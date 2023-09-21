import React from "react";

interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const Button = ({ name, onClick, isDisabled = false }: ButtonProps) => {
  const className = isDisabled
    ? "text-white bg-blue-600 rounded w-full py-1 opacity-50"
    : "text-white bg-blue-600 rounded w-full py-1";

  return (
    <button className = {className} onClick={onClick} disabled={isDisabled}>
      {name}
    </button>
  );
};
