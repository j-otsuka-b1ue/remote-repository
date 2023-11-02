import React from "react";

interface ErrorMsgProps  {
  children: string;
}

export const ErrorMsg = ({ children }: ErrorMsgProps) => {
  return <p className="text-sm text-red-400 mt-1">{children}</p>;
};
