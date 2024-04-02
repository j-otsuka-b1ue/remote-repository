import { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { Title } from "./Title";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import topImg from "../../images/kinemaPAR513702320_TP_V4.jpg"
import { login, logout } from "../../utils/authSlice";
import { CallImage } from "../atoms/CallImage";

export const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const isAuthenticated = sessionStorage.getItem("is-authenticated") === "true";

  const loginNavigate = () => {
    navigate("/general/Login");
  }

  const registrationNavigate = () => {
    navigate("/general/Registration");
  }

  const checkAuthentication = useCallback(() => {
    if (!isAuthenticated && !isLoggedIn) {
      dispatch(login());
    } else if (isAuthenticated && isLoggedIn) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated, isLoggedIn]); 

  //レンダリングされる度にログイン状態をチェック
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <div className = "topPage-form mt-6">
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
        onClick={registrationNavigate}
        additionalClasses="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded mx-2"
      />
      </div>
      )}
      <div className = "pointer-events-none flex justify-center mt-3 mb-3 opacity-75">
        <CallImage src = {topImg} alt = "洋書を読む画像"/>
      </div>
    </>
  )
}