import { ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { LabelAndTextInput } from "../molecules";
import { Button } from "../atoms/Button";
import unknownImg from "../../images/img_1705691905.png"
import { CallImage } from "../atoms/callImage";


//メールアドレスの形式を確認する。
const mailAddressRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;
//ニックネームの形式を確認する
const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{8,}$/;

export const MemberRegist = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[matchPassword, setMatchPassword] = useState("");
  const[nickname, setNickname] = useState("");
  const[emailError, setEmailError] = useState("");
  const[passwordError, setPasswordError] = useState("");
  const[nicknameError, setNicknameError] = useState("");
  const[fileTypeError, setFileTypeError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(unknownImg);
  const [base64String, setBase64String] = useState<string | null>(null);
  const navigate = useNavigate();
  // パスワード一致確認
  const[passwordMatchError, setPasswordMatchError] = useState("");
  // const[userIconError, setIconError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

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

  const handleImageClick = () => {
    if (fileInputRef.current)
    fileInputRef.current.click();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg") {
        setFileTypeError("ファイル形式はjpgもしくはjpegにしてください");
      } else {
        setFileTypeError("");
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setSelectedImage(result);
          setBase64String(result); // 画像のBase64文字列を設定
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
      name: nickname,
      email: email,
      password: password,
      password_confirm: matchPassword,
      representative_image: base64String
    };
    try {
      await axios.post('http://localhost:3000/user', requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });  
      navigate("/general/Login");
    } catch (error) {
      console.error("Internal Server Error: 500");
      alert("サーバーエラーが起きました。TOPページに遷移します。(500)");
      setTimeout(() => navigate("/general"), 1000);
    }
  };

  const isButtonDisabled = emailError !== "" 
  || passwordError !== "" 
  || nicknameError !== "" 
  || fileTypeError !== ""
  || !email 
  || !password
  || !nickname
  ;


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
        onChange={handleFileChange}
      />
      <div className = "rounded-full cursor-pointer justify-center items-center flex" onClick = {handleImageClick}> 
        <CallImage 
          src = {selectedImage}
          alt = "ユーザーアイコン画像"
        />
      </div>
      {fileTypeError && <span className="text-sm text-red-400 mt-1">{fileTypeError}</span>}
    </div>
     <div className = "login-btn">
     <Button 
     name = "登録"
     onClick = {handleSubmit}
     isDisabled = {isButtonDisabled}
     additionalClasses = "bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
     />
     </div>
    </>
  )
}
