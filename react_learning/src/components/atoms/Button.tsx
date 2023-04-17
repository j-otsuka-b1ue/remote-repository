import React from "react";

type Props = {
  name: string;
  onClick: () => void;
  isDisabled?: boolean;
};

export const Button: React.FC<Props> = ({ name, onClick, isDisabled = false }) => {
  const className = isDisabled
    ? "text-white bg-blue-600 rounded w-full py-1 opacity-50"
    : "text-white bg-blue-600 rounded w-full py-1";

  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {name}
    </button>
  );
};
