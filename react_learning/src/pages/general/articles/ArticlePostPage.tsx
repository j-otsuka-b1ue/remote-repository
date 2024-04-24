import React from "react";
import { Title } from "../../../components/organisms/Title";
import { Header } from "../../../components/organisms/Header";
import { ArticlePost } from "../../../components/organisms/ArticlePost";

export const ArticlePostPage = () => {
  return (
    <>
      <Header />
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>新規投稿画面</Title>
        <br></br>
        <ArticlePost />
      </div>
    </>
  );
};
