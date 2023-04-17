import React from "react";

export const ErrorMessage: React.FC = ({ children }) => {
  return <p className="text-sm text-red-400 mt-1">{children}</p>;
};
