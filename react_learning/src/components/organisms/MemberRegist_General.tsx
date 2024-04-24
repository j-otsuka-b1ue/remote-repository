import { ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { LabelAndTextInput } from "../molecules";
import { Button } from "../atoms/Button";
import unknownImg from "../../images/img_1705691905.png"
import { ImageDisplay } from "../atoms/ImageDisplay";
import { useDispatch } from "react-redux";
import { setRegisterInfo } from "../../utils/authSlice";


//メールアドレスの形式を確認する。
const mailAddressRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;
//ニックネームの形式を確認する
const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{8,}$/;

export const MemberRegist = () => {

  interface RegistrationItem {
    email: string,
    password: string,
    matchPassword: string,
    nickname: string,
    emailError: string,
    passwordError: string,
    passwordMatchError: string,
    nicknameError: string,
    fileTypeError: string,
    selectedImage: string,
    base64String: string | null,
  }

  const [formState, setFormState] = useState<RegistrationItem>({
    email: "",
    password: "",
    matchPassword: "",
    nickname: "",
    emailError: "",
    passwordError: "",
    passwordMatchError: "",
    nicknameError: "",
    fileTypeError: "",
    selectedImage: unknownImg,
    base64String: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      email: value,
      emailError: !mailAddressRegex.test(value) ? "メールアドレスの形式で入力してください" : "",
    }));
  }

  const handlePasswordChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      password: value,
      passwordError: !passwordRegex.test(value) ? "8文字以上で入力してください" : "",
    }));
  }

  const handlePasswordMatchChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      matchPassword: value,
      passwordMatchError: value !== prevState.password ? "入力されたパスワードが一致しません" : "",
    }));
  };

  const handleNickNameChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      nickname: value,
      nicknameError: !nicknameRegex.test(value) ? "ニックネームは8文字以上で入力してください" : "",
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split(".").pop()?.toLowerCase();
      const fileTypeError = extension !== "jpg" && extension !== "jpeg" ? "ファイル形式はjpgもしくはjpegにしてください" : "";
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormState(prevState => ({
          ...prevState,
          selectedImage: result,
          base64String: result,
          fileTypeError: fileTypeError,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  // 「登録」ボタン押下時の処理
  const handleSubmit = async () => {
    // リクエストボディーを設定
    const registerRequestBody = {
      nickname: formState.nickname,
      email: formState.email,
      password: formState.password,
      password_confirm: formState.matchPassword,
      representative_image: formState.base64String?.replace(/^data:image\/jpeg;base64,/, "") ?? null
    };
    try {
      await axios.post('http://localhost:3000/user', registerRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      // ログインページに遷移
      navigate("/general/Login");
      // Reduxストアを更新
      dispatch(setRegisterInfo(registerRequestBody));
    } catch (error) {
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
  };

  // バリデーションエラーが発生している場合 もしくは 画像以外の項目が未入力の場合は「登録」ボタン非活性
  const isButtonDisabled = formState.emailError !== ""
    || formState.passwordError !== ""
    || formState.nicknameError !== ""
    || formState.fileTypeError !== ""
    || !formState.email
    || !formState.password
    || !formState.nickname;

  return (
    <>
    <div className = "my-5">
    <LabelAndTextInput
      labelTitle="ログインID(メールアドレス)"
      placeholder=""
      value={formState.email}
      onChange = {handleEmailChange}
      errorMessage = {formState.emailError}
    />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
        labelTitle="パスワード(英数字8文字以上)"
        placeholder=""
        value={formState.password}
        onChange = {handlePasswordChange}
        errorMessage = {formState.passwordError}
        type = "password"
      />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
      labelTitle="パスワード(確認)"
      placeholder=""
      value={formState.matchPassword}
      onChange = {handlePasswordMatchChange}
      errorMessage = {formState.passwordMatchError}
      type = "password"
      />
    </div>
    <div className = "my-5">
      <LabelAndTextInput
      labelTitle="ニックネーム(8文字以上)"
      placeholder=""
      value={formState.nickname}
      onChange = {handleNickNameChange}
      errorMessage = {formState.nicknameError}
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
        <ImageDisplay 
          src = {formState.selectedImage}
          alt = "ユーザーアイコン画像"
        />
      </div>
      {formState.fileTypeError && <span className="text-sm text-red-400 mt-1">{formState.fileTypeError}</span>}
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
