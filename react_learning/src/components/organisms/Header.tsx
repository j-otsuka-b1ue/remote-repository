import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import unknownImg from "../../images/icons8-ブロガー-48.png"
import { Navigate, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const isAuthenticated = sessionStorage.getItem("is-authenticated") === "true";
  //アイコン押下時にトップページに遷移
  const handleNavTop = () => {
    navigate("/general/TopPage")
  }

  const checkAuthentication = () => {
    if (isAuthenticated && !isLoggedIn) {
      dispatch(login());
    } else if (!isAuthenticated && isLoggedIn) {
      dispatch(logout());
    }
  };

  // ログイン後の経過時間をチェック
  const checkPassedTime = () => {
    const storedTimestamp = localStorage.getItem("last_login_timeStamp");
    const now = new Date();
    if (storedTimestamp) {
    const storedDate = new Date(storedTimestamp);
    const differenceTime = now.getTime() - storedDate.getTime();
      if (differenceTime > 360000) {
        localStorage.removeItem("access_Token");
        localStorage.removeItem("last_login_timeStamp");
        sessionStorage.removeItem("is-authenticated");
        dispatch(logout());
      }
    }
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/general/TopPage");
      }, 250);
      localStorage.removeItem("access_token");
      localStorage.removeItem("last_login_timeStamp");
      sessionStorage.setItem("is-authenticated", "false");
      dispatch(logout());
    } else {
      navigate("/general/Login");
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  useEffect(() => {
    checkPassedTime();
  }, []);

  return (
      <div className="flex justify-evenly items-center p-4 bg-teal-300">
        <div className="rounded-full cursor-pointer" onClick={handleNavTop}>
          <img src = {unknownImg} />
        </div>
          {isLoggedIn && (
            <button className="button">
              新規投稿画面
            </button>
          )}
           {isLoggedIn && (
            <button className="button">
              投稿一覧画面
            </button>
          )}
          {isLoggedIn && (
            <button className="button">
              会員情報変更画面
            </button>
          )}
          {isLoggedIn && (
            <button className="button">
              マイページ
            </button>
          )}
          <button className="button" onClick={handleLoginLogout}>
            {isAuthenticated ? "ログアウト" : "ログイン"}
          </button>
      </div>
  );
};
