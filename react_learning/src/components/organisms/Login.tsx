import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLoggedIn } from "../../utils/authSlice";
import { LabelAndTextInput } from "../molecules";
import { CommonButton } from "../atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

//メールアドレスの形式を確認する。
const mailAddressRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registrationInfo = useSelector((state: RootState) => state.user.registrationInfo);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!mailAddressRegex.test(value)) {
      setEmailError("メールアドレスの形式で入力してください");
    } else {
      setEmailError("");
    }
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!passwordRegex.test(value)) {
      setPasswordError("8文字以上で入力してください");
    } else {
      setPasswordError("");
    }
  }

  const handleLogin = async () => {
    // ログイン成功時
    try {
      // ログイン成功時に新たに設定するリクエストボディー
      const loginRequestBody = {
        email: email,
        password: password,
      }
      // 会員登録時に作成したリクエストボディーとログイン成功時に作成したリクエストボディーを合わせる
      const requestBody = {
        ...registrationInfo,
        ...loginRequestBody,
      }
      const response = await axios.post("http://localhost:3000/login", requestBody);
      const responseUserInfo = response.data.user;
      const responseLoginInfo = response.data.loginResponseJSON;
      const convertResponseUserInfo = JSON.stringify(responseUserInfo);
      const accessToken = response.data.user.token;

      // 入力したログイン情報と、会員登録時のログイン情報が合致した場合のみログイン処理を行う
      if (registrationInfo.email === responseLoginInfo.email
        && registrationInfo.password === responseLoginInfo.password) {
        // バリデーションエラーの初期化を行う。
        setEmailError("");
        setPasswordError("");
        // ローカルストレージにアクセストークンを設定
        localStorage.setItem("access_token", accessToken);
        // ローカルストレージにレスポンスデータを設定
        localStorage.setItem("userInfo", convertResponseUserInfo);
        // セッションストレージ内のキー "is-authenticated" を "true" に設定
        sessionStorage.setItem("is-authenticated", "true");

        dispatch(setLoggedIn(true));

        // ログイン時のタイムスタンプを記録
        const now = new Date();
        const timeStamp = now.toLocaleString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        // ローカルストレージにタイムスタンプを記録
        localStorage.setItem("last_login_timeStamp", timeStamp);


        // マイページへ遷移時に遅延を発生させる
        setTimeout(() => {
          navigate("/general/Mypage");
        }, 250);
      } else {
        // メールアドレスのチェック
        if (registrationInfo.email !== responseLoginInfo.email) {
          setEmailError("メールアドレスが正しくありません。入力内容を確認してください。");
        } else {
          setEmailError("");
        }
      }
      if (registrationInfo.password !== responseLoginInfo.password) {
        setPasswordError("パスワードが正しくありません。入力内容を確認してください。");
      } else {
        setPasswordError("");
      }
    }
    //ログイン失敗時
    catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response ? error.response.status : null;
        switch (statusCode) {
          case 400:
            console.error("Bad Request:400 サーバーがリクエストを処理できませんでした。");
            break;
          case 401:
            setTimeout(() => navigate("/general/Login"), 250);
            alert("アクセス権限がありません。ログインしていない場合は、ログインしてください。")
            break;
          case 404:
            navigate("/general/articles/NotFound")
            break;
          case 500:
            console.error("Internal Server Error: 500");
            alert("サーバーエラーが起きました。TOPページに遷移します。(500)");
            // 1秒後にトップページに遷移
            setTimeout(() => navigate("/general"), 1000);
            break;
          default:
            console.error("予期せぬエラーが発生しました。");
        }
      } else {
        console.error("エラーが発生しました。", error);
      }
    }
  }

  // バリデーションエラーが発生している場合 もしくは　　項目が未入力の場合、ログインボタンは非活性
  const isButtonDisabled = emailError !== "" || passwordError !== "" || !email || !password;

  return (
    <>
      <div className="form-group">
        <LabelAndTextInput
          labelTitle="ログインID(メールアドレス)"
          placeholder=""
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailError}
        />
      </div>
      <div className="form-group">
        <LabelAndTextInput
          labelTitle="パスワード"
          placeholder=""
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordError}
          type="password"
        />
      </div>
      <div className="login-btn">
        <CommonButton
          name="ログイン"
          onClick={handleLogin}
          isDisabled={isButtonDisabled}
          additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
        />
      </div>
    </>
  )
}