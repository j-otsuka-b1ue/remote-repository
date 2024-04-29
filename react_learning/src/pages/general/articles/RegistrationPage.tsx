import React from "react";
import { MemberRegist } from "../../../components/organisms/MemberRegistGeneral"
import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";

export const Registration = () => {
  return (
    <>
      <Header />
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>会員登録</Title>
        <br></br>
        <MemberRegist />
      </div>
    </>
  );
}