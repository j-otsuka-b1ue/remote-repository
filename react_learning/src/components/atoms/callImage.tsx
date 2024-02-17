import React from "react";

interface ImageProps {
  src: string;
  alt: string;
}

export const CallImage = ({ src, alt }:ImageProps) => {
  return <img src={src} alt={alt} />;
}