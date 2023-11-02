import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-center font-bold text-lg">{children}</h1>;
};
