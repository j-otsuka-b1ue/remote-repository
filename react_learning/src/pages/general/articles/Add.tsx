import React from "react";
import { Title } from "../../../components/organisms/Title";
import { PostForm } from "../../../components/organisms/article/PostForm/Index";
import { Header } from "../../../components/organisms/Header";

export const ArticleAdd: React.FC = () => {
  return (
    <>
    <Header />
    <div className="mx-6 max-w-md md:mx-auto">
      <Title>新規投稿画面</Title>
      <PostForm />
    </div>
    </>
  );
};
