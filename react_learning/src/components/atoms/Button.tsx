import React from "react";

interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
<<<<<<< HEAD
}

export const Button = ({ name, onClick, isDisabled = false }: ButtonProps) => {
  const className = isDisabled
    ? "text-white bg-blue-600 rounded w-full p-2 px-4 py-2 opacity-50"
    : "text-white bg-blue-600 rounded w-full p-2 px-4 py-2";
=======
  additionalClasses?: string;
};

export const Button = ({ name, onClick, isDisabled = false, additionalClasses = "" }: Props) => {
  const className = `${isDisabled
    ? "rounded px-3 py-2 opacity-50"
    : "rounded px-3 py-2"} ${additionalClasses}`;
>>>>>>> 0b7b6c9 (first_commit_loggedInPage)

  return (
    <button className = {className} onClick={onClick} disabled={isDisabled}>
      {name}
    </button>
  );
};
