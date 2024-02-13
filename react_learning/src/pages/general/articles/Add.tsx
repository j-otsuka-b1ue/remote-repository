import React from "react";
import { Title } from "../../../components/organisms/Title";
import { PostForm } from "../../../components/organisms/article/PostForm/Index";
import { Header } from "../../../components/organisms/Header";

export const ArticleAdd = () => {
  return (
    <>
    <Header />
    <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20">
      <Title>新規投稿画面</Title>
      <br></br>
      <PostForm />
    </div>
    </>
  );
};
