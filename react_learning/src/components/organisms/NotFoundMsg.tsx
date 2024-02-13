import React from "react";
import DogImage from "../../../src/images/p330_resize.png"
import { CallImage } from "./callImage";

export const NotFoundMsg = () => {
  return (
    <>
    <div className = "flex justify-center items-center h-screen">
      <div className = "text-center">
        <div className = "text-2xl">
          <h1 className = "font-bold text-gray-500">404</h1>
          <p>NOT FOUND</p>
        </div>
        <br></br>
        <div className = "text-2xl">
          <p>お探しのページは見つかりませんでした。</p>
          <p>Oops, We couldn't find that page.</p>
        </div>
      </div>
      <div className = "pointer-events-none">
        <CallImage src = {DogImage} alt = "困った犬の画像"/>    
      </div>
    </div>
    </>
  );
};