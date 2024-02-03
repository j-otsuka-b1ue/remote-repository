import React, { ChangeEvent, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLoggedIn } from "../../utils/authSlice";
import { LabelAndTextInput } from "../molecules";
import { Button } from "../atoms/Button";
import unknownImg from "../../images/img_1705691905.png"


//メールアドレスの形式を確認する。
const mailAddressRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;
//ニックネームの形式を確認する
const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{8,}$/;
// ユーザーアイコン画像の拡張子を確認する
const imgTypeRegex = /\.(jpg|jpeg)$/;

export const MemberRegist = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[matchPassword, setMatchPassword] = useState("");
  const[nickname, setNickname] = useState("");
  const[emailError, setEmailError] = useState("");
  const[passwordError, setPasswordError] = useState("");
  const[nicknameError, setNicknameError] = useState("");
  // パスワード一致確認
  const[passwordMatchError, setPasswordMatchError] = useState("");
  const[userIconError, setIconError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handlePasswordMatchChange = (value: string) => {
    setMatchPassword(value);
    if(value !== password) {
      setPasswordMatchError("入力されたパスワードが一致しません");
    } else {
      setPasswordMatchError("");
    }
  }

  const handleNickNameChange = (value: string) => {
    setNickname(value);
    if(!nicknameRegex.test(value)) {
      setNicknameError("ニックネームは8文字以上で入力してください");
    } else {
      setNicknameError("");
    }
  }

  const handleRegister = async () => {
    // ログイン成功時
    try {
      const response = await axios.post("http://localhost:3000/login", {email, password});
      const accessToken = response.data.access_token;
      localStorage.setItem("access_Token", accessToken);
      sessionStorage.setItem("is-authenticated", "true");
      dispatch(setLoggedIn(true));
      navigate("/general/TopPage");
      console.log(response.data);
    } //ログイン失敗時
      catch(error) {
      console.error(error);
    }
  }

  const isButtonDisabled = emailError !== "" || passwordError !== "" || !email || !password;

  const handleImageClick = () => {
    if (fileInputRef.current)
    fileInputRef.current.click();
  }

  return (
    <>
    <div className = "my-5">
    <LabelAndTextInput
      labelTitle="ログインID(メールアドレス)"
      placeholder=""
      value={email}
      onChange = {handleEmailChange}
      errorMessage = {emailError}
     />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
        labelTitle="パスワード(英数字8文字以上)"
        placeholder=""
        value={password}
        onChange = {handlePasswordChange}
        errorMessage = {passwordError}
        type = "password"
      />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
      labelTitle="パスワード(確認)"
      placeholder=""
      value={matchPassword}
      onChange = {handlePasswordMatchChange}
      errorMessage = {passwordMatchError}
      type = "password"
      />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
      labelTitle="ニックネーム(8文字以上)"
      placeholder=""
      value={nickname}
      onChange = {handleNickNameChange}
      errorMessage = {nicknameError}
      type = "password"
      />
    </div>
    <div className = "my-5">
      <label>ユーザーアイコン画像</label>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={(e) => console.log(e.target.files)}
      />
      <div className = "rounded-full cursor-pointer justify-center items-center flex"> 
        <img 
        src = {unknownImg}
        onClick = {handleImageClick}
        />
      </div>
    </div>
     <div className = "login-btn">
     <Button 
     name = "登録"
     onClick = {handleRegister}
     isDisabled = {isButtonDisabled}
     additionalClasses = "bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
     />
     </div>
    </>
  )
}
