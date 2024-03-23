import { useEffect, useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { login, logout } from "../../utils/authSlice";
import unknownImg from "../../images/icons8-ブロガー-48.png"
import { useNavigate } from "react-router-dom";
import { CallImage } from "../atoms/callImage";
import { FiMenu } from "react-icons/fi";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const isAuthenticated = sessionStorage.getItem("is-authenticated") === "true";
  const [isSpMenuOpen, setIsSpMenuOpen] = useState(false);
  //アイコン押下時にトップページに遷移
  const handleNavTop = () => {
    navigate("/general")
  }

  // SP表示時のハンバーガーメニュー開閉ファンクション
  const toggleMenu = useCallback(() => {
    setIsSpMenuOpen(!isSpMenuOpen);
  }, [isSpMenuOpen])

  const checkAuthentication = useCallback(() => {
    if (!isAuthenticated && !isLoggedIn) {
      dispatch(login());
    } else if (isAuthenticated && isLoggedIn) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated, isLoggedIn]); 

  // ログイン後の経過時間をチェック
  const checkPassedTime = useCallback(() => {
    const storedTimestamp = localStorage.getItem("last_login_timeStamp");
    const now = new Date();
    if (storedTimestamp) {
    const storedDate = new Date(storedTimestamp);
    const differenceTime = now.getTime() - storedDate.getTime();
      if (differenceTime > 360000) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("last_login_timeStamp");
        sessionStorage.removeItem("is-authenticated");
        dispatch(logout());
      }
    }
  }, [dispatch]); 


  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/general");
      }, 250);
      localStorage.removeItem("access_token");
      localStorage.removeItem("last_login_timeStamp");
      localStorage.removeItem("userInfo");
      sessionStorage.setItem("is-authenticated", "false");
      dispatch(logout());
    } else {
      navigate("/general/Login");
    }
  };

  // マイページ押下時の遷移処理
  const handleMypageNavigate = () => {
    setTimeout(() => {
      navigate("/general/Mypage");
    }, 250);
  }

  // ログアウト状態でヘッダーの会員登録ボタンをクリックした場合の挙動
  const handleRegistrationPageNavigate = () => {
    navigate("/general/Registration")
  }

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  useEffect(() => {
    checkPassedTime();
  }, [checkPassedTime]);

  return (
    <div className="flex mx-auto justify-between items-center p-4 bg-teal-300 lg:justify-center">
      <div className="md:hidden">
          <FiMenu className="text-2xl cursor-pointer" onClick={toggleMenu}/>
      </div>

    {/* メニュー内容。md:flex-row に修正し、PC表示で項目が横並びになるようにする */}
    <div className={`${isSpMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center md:justify-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4`}>
        {isLoggedIn ? 
          <div className="rounded-full cursor-pointer" onClick={handleNavTop}>
            <CallImage src={unknownImg} alt="ブログアイコン"/>
          </div>
          : 
          <button className="button" onClick={handleRegistrationPageNavigate}>
            会員登録
          </button>
        }
        {isLoggedIn && <button className="button">新規投稿画面</button>}
        {isLoggedIn && <button className="button">投稿一覧画面</button>}
        {isLoggedIn && <button className="button">会員情報変更画面</button>}
        {isLoggedIn && <button className="button" onClick={handleMypageNavigate}>マイページ</button>}
        <button className="button" onClick={handleLoginLogout}>
          {isAuthenticated ? "ログアウト" : "ログイン"}
        </button>
    </div>
  </div>
  );
};
