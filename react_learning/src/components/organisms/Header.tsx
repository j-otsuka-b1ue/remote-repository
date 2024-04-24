import { useEffect, useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { login, logout } from "../../utils/authSlice";
import unknownImg from "../../images/icons8-ブロガー-48.png"
import { useNavigate } from "react-router-dom";
import { ImageDisplay } from "../atoms/ImageDisplay";
import { FiMenu, FiX } from "react-icons/fi";

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
  const toggleMenu = () => {
    setIsSpMenuOpen(prevState => !prevState);
  };

  const checkAuthentication = useCallback((): void => {
    if (!isAuthenticated && !isLoggedIn) {
      dispatch(login());
    } else if (isAuthenticated && isLoggedIn) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated, isLoggedIn]);

  // ログイン後の経過時間をチェック
  const checkPassedTime = useCallback((): void => {
    const storedTimestamp = localStorage.getItem("last_login_timeStamp");
    const now = new Date();
    if (storedTimestamp) {
      const storedDate = new Date(storedTimestamp);
      const differenceTime = now.getTime() - storedDate.getTime();
      if (differenceTime > 60 * 60 * 1000) {
        // アクセストークンを削除
        localStorage.removeItem("access_token");
        // ログイン時に記録したタイムスタンプを削除
        localStorage.removeItem("last_login_timeStamp");
        // ユーザー情報を削除
        localStorage.removeItem("userInfo");
        // 認証情報をfalseに設定
        sessionStorage.setItem("is-authenticated", "false");
        dispatch(logout());
      }
    }
  }, [dispatch]);


  const handleLoginLogout = (): void => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/general");
      }, 250);
      // アクセストークンを削除
      localStorage.removeItem("access_token");
      // ログイン時に記録したタイムスタンプを削除
      localStorage.removeItem("last_login_timeStamp");
      // ユーザー情報を削除
      localStorage.removeItem("userInfo");
      // 認証情報をfalseに設定
      sessionStorage.setItem("is-authenticated", "false");
      dispatch(logout());
      setIsSpMenuOpen(false);
    } else {
      navigate("/general/Login");
    }
  };

  // マイページ押下時の遷移処理
  const handleMypageNavigate = (): void => {
    setTimeout(() => {
      navigate("/general/Mypage");
    }, 0.25 * 1000);
    setIsSpMenuOpen(false);
  }

  // 会員情報変更画面の遷移処理
  const handleUpdateMemberInfoNavigate = (): void => {
    setTimeout(() => {
      navigate("/general/UpdateMemberInfo");
    }, 0.25 * 1000);
    setIsSpMenuOpen(false);
  }

  // 新規投稿画面の遷移処理
  const handleArticlePostNavigate = (): void => {
    setTimeout(() => {
      navigate("/general/article/post");
    }, 0.25 * 1000);
  }

  // ログアウト状態でヘッダーの会員登録ボタンをクリックした場合の挙動
  const handleRegistrationPageNavigate = (): void => {
    navigate("/general/Registration")
    setIsSpMenuOpen(false);
  }

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  useEffect(() => {
    checkPassedTime();
  }, [checkPassedTime]);

  return (
    <nav className="bg-teal-300 p-4 fixed top-0 left-0 h-20 w-full z-30">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div onClick={handleNavTop} className="cursor-pointer">
          <ImageDisplay src={unknownImg} alt="ブログアイコン" />
        </div>
        <div className="z-40 md:hidden">
          {isSpMenuOpen ? (
            <FiX className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FiMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        {/* PC表示時に表示されるナビゲーションメニュー */}
        <div className="hidden md:flex items-center justify-center flex-grow-0">
          {isLoggedIn ? (
            <>
              <button className="button my-5 mx-3" onClick={handleArticlePostNavigate}>新規投稿画面</button>
              <button className="button my-5 mx-3">投稿一覧画面</button>
              <button className="button my-5 mx-3" onClick={handleUpdateMemberInfoNavigate}>会員情報変更画面</button>
              <button className="button my-5 mx-3" onClick={handleMypageNavigate}>マイページ</button>
              <button className="button my-5 mx-3" onClick={handleLoginLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <button className="button my-5 mx-3" onClick={handleRegistrationPageNavigate}>会員登録</button>
              <button className="button my-5 mx-3" onClick={handleLoginLogout}>ログイン</button>
            </>
          )}
        </div>
      </div>

      {/* SP表示時のハンバーガーメニューのオーバーレイ */}
      {isSpMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-full bg-opacity-90 z-20 flex flex-col items-center justify-start md:hidden bg-white pt-24">
          {/*ログイン、もしくはログアウト状態の時に該当項目と罫線を表示させる*/}
          {isLoggedIn && (
            <>
              <button className="button mt-16" onClick={handleMypageNavigate}>マイページ</button>
              <hr className="border-t border-black w-full"></hr>
            </>
          )}
          {!isLoggedIn && (
            <>
              <button className="button my-2" onClick={handleRegistrationPageNavigate}>会員登録</button>
              <hr className="border-t border-black w-full"></hr>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="button my-2" onClick={handleArticlePostNavigate}>新規投稿画面</button>
              <hr className="border-t border-black w-full"></hr>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="button my-2">投稿一覧画面</button>
              <hr className="border-t border-black w-full"></hr>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="button my-2">会員情報変更画面</button>
              <hr className="border-t border-black w-full"></hr>
            </>
          )}
          <button className="button mt-2" onClick={handleLoginLogout}>
            {isAuthenticated ? "ログアウト" : "ログイン"}
          </button>
        </div>
      )}
    </nav>
  );
};
