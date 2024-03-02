import React from "react";
import { Button } from "../../components/atoms/Button";
import { ReturnImages } from "../../components/organisms/ImportAllTrumpImages";

export const BlackJack = () => {
  return (
    <>
    <div>
      <ReturnImages></ReturnImages>
      <Button name={"ゲームスタート"} additionalClasses="bg-blue-600 text-white font-bold" />
      <Button name={"リセット"} additionalClasses="bg-red-600 text-white font-bold" />
    </div>
    </>
  )
}
