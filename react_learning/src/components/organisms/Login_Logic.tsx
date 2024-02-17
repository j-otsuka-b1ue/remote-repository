import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLoggedIn } from "../../utils/authSlice";
import { LabelAndTextInput } from "../molecules";
import { Button } from "../atoms/Button";


//メールアドレスの形式を確認する。
const mailAddressRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;

export const LoginForm = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[emailError, setEmailError] = useState("");
  const[passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if(!mailAddressRegex.test(value)) {
      setEmailError("メールアドレスの形式で入力してください");
    } else {
      setEmailError("");
    }
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if(!passwordRegex.test(value)) {
      setPasswordError("8文字以上で入力してください");
    } else {
      setPasswordError("");
    }
  }
  const handleLogin = async () => {
    // ログイン成功時
    try {
      const response = await axios.post("http://localhost:3000/login", {email, password});
      const accessToken = response.data.access_token;
      localStorage.setItem("access_token", accessToken)
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

      setTimeout(() => {
      navigate("/general/Mypage");
      console.log(response.data);
      }, 250);
    } //ログイン失敗時
      catch(error) {
      console.error(error);
    } 
  }

  const isButtonDisabled = emailError !== "" || passwordError !== "" || !email || !password;

  return (
    <>
    <div className = "form-group">
    <LabelAndTextInput
      labelTitle="ログインID(メールアドレス)"
      placeholder=""
      value={email}
      onChange = {handleEmailChange}
      errorMessage = {emailError}
     />
    </div>
    <div className = "form-group">
    <LabelAndTextInput
      labelTitle="パスワード"
      placeholder=""
      value={password}
      onChange = {handlePasswordChange}
      errorMessage = {passwordError}
      type = "password"
     />
     </div>
     <div className = "login-btn">
     <Button 
     name = "ログイン"
     onClick = {handleLogin}
     isDisabled = {isButtonDisabled}
     additionalClasses = "bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
     />
     </div>
    </>
  )
}