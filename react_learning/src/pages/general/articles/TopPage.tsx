import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../utils/store';
import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { Button } from "../../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import topImg from "../../../images/kinemaPAR513702320_TP_V4.jpg";
import { setLoggedIn } from "../../../utils/authSlice";

export const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    // ローカルストレージからログイン状態を読み込む
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    if (savedLoginStatus === "true") {
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false)); // ログイン状態がない場合は明示的に false を設定
    }
  }, [dispatch]);
  const loginNavigate = () => {
    navigate("/general/articles/Login");
  }

  return (
    <>
      <Header />
      <div className = "topPage-form">
        <Title>ブログサービス課題</Title>
      </div>
      <div className = "topPage-detail">
        <Title>React.jsを使用したブログサービス課題です</Title>
      </div>
      {!isLoggedIn && (
      <div className = "topPageBtn-box">
      <Button
        name="ログイン"
        onClick={loginNavigate}
        additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
      />
      <Button
        name="会員登録"
        onClick={loginNavigate}
        additionalClasses="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded mx-2"
      />
      </div>
      )}
      <div className = "pointer-events-none flex justify-center mt-3 mb-3 opacity-75">
        <img src = {topImg} alt = "洋書を読む画像"></img>
      </div>
    </>
  )
}