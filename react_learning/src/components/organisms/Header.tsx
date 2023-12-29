import React from "react";

export const Header = () => {
  return (
      <div className="flex justify-evenly items-center p-4 bg-teal-300">
        <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"></div>
          <button className="button">新規登録画面</button>
          <button className="button">投稿一覧画面</button>
          <button className="button">会員情報変更画面</button>
          <button className="button">マイページ</button>
          <button className="button">ログイン</button>
      </div>
  );
};