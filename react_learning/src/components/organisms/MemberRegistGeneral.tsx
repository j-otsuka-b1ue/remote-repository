import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import unknownImg from "../../images/img_1705691905.png";
import { setRegisterInfo } from "../../utils/authSlice";
import { CommonButton } from "../atoms/Button";
import { ComboboxOptionsOfGender } from "../atoms/ComboboxOptions";
import useDspErrorMessage from "../atoms/DspErrorMessage";
import { ImageDisplay } from "../atoms/ImageDisplay";
import { TextLabel } from "../atoms/TextLabel";
import { LabelAndTextInput } from "../molecules";
import { LabelAndCheckBox } from "../molecules/LabelAndCheckBox";

//メールアドレスの形式を確認する。
const mailAddressRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//パスワードの形式を確認する
const passwordRegex = /^[A-Za-z0-9]{8,}$/;
//ニックネームの形式を確認する
const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{8,}$/;


export const MemberRegist = (): React.JSX.Element => {

  // エラーメッセージ利用フック
  const getErrorMessage = useDspErrorMessage();

  // デートピッカー状態管理
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  interface RegistrationItem {
    email: string,
    password: string,
    matchPassword: string,
    nickname: string,
    emailError: string,
    passwordError: string,
    passwordMatchError: string,
    nicknameError: string,
    birthYear: string,
    birthMonth: string,
    birthDay: string,
    fileTypeError: string,
    selectedImage: string,
    base64String: string | null,
  }

  const [formState, setFormState] = useState<RegistrationItem>({
    email: "",
    password: "",
    matchPassword: "",
    nickname: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    emailError: "",
    passwordError: "",
    passwordMatchError: "",
    nicknameError: "",
    fileTypeError: "",
    selectedImage: unknownImg,
    base64String: null,
  });

  // モーダルウィンドウ開閉状態
  const [open, setOpen] = useState(false);
  // モーダルを開く
  const handleModalOpen = () => setOpen(true);
  // モーダルを閉じる
  const hadnleModalClose = () => {
    // 開閉状態の更新
    setOpen(false);
    // ログインページへ遷移
    navigate("/general/Login");
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      email: value,
      emailError: !mailAddressRegex.test(value)
        ? getErrorMessage({ messageID: "m02E", firstReplaceElement: "メールアドレス" })
        : "",
    }));
  }

  const handlePasswordChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      password: value,
      passwordError: !passwordRegex.test(value)
        ? getErrorMessage({ messageID: "m03E", firstReplaceElement: "8" })
        : "",
    }));
  }

  const handlePasswordMatchChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      matchPassword: value,
      passwordMatchError: value !== prevState.password
        ? getErrorMessage({ messageID: "m04E", firstReplaceElement: "パスワード" })
        : "",
    }));
  };

  const handleNickNameChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      nickname: value,
      nicknameError: !nicknameRegex.test(value)
        ? getErrorMessage({
          messageID: "m05E",
          firstReplaceElement: "ニックネーム",
          secondReplaceElement: "8"
        })
        : "",
    }));
  };

  const handleBirthYearOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormState(prevState => ({
      ...prevState,
      birthYear: value,
    }))
  }

  const handleBirthMonthOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFormState(prevState => ({
      ...prevState,
      birthMonth: value,
    }))
  }

  const handleBirthDayOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFormState(prevState => ({
      ...prevState,
      birthDay: value,
    }))
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
      birthYear: formState.birthYear,
      birthMonth: formState.birthMonth,
      birthDay: formState.birthDay,
      representative_image: formState.base64String?.replace(/^data:image\/jpeg;base64,/, "") ?? null
    };
    try {
      await axios.post('http://localhost:3000/user', registerRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      // モーダルウィンドウを開く
      handleModalOpen();
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
      <div className="my-5">
        <span style={{ color: "red" }}>*</span>
        <LabelAndTextInput
          labelTitle="ログインID(メールアドレス)"
          placeholder=""
          value={formState.email}
          onChange={handleEmailChange}
          errorMessage={formState.emailError}
        />
      </div>
      <div className="my-5">
        <span style={{ color: "red" }}>*</span>
        <LabelAndTextInput
          labelTitle="パスワード(英数字8文字以上)"
          placeholder=""
          value={formState.password}
          onChange={handlePasswordChange}
          errorMessage={formState.passwordError}
          type="password"
        />
      </div>
      <div className="my-5">
        <span style={{ color: "red" }}>*</span>
        <LabelAndTextInput
          labelTitle="パスワード(確認)"
          placeholder=""
          value={formState.matchPassword}
          onChange={handlePasswordMatchChange}
          errorMessage={formState.passwordMatchError}
          type="password"
        />
      </div>
      <div className="my-5">
        <span style={{ color: "red" }}>*</span>
        <LabelAndTextInput
          labelTitle="ニックネーム(8文字以上)"
          placeholder=""
          value={formState.nickname}
          onChange={handleNickNameChange}
          errorMessage={formState.nicknameError}
        />
      </div>
      <div className="my-5">
        <div>
          <TextLabel
            labelTitle="生年月日 ※公開されません"
          />
        </div>
        <Box display="flex" alignItems="center">
          <TextField
            type='number'
            value={formState.birthYear}
            InputProps={{
              style: {
                width: 100,
                height: 40,
                textAlign: "center",
              }
            }}
            inputProps={{
              textAlign: "center",
            }}
            onChange={handleBirthYearOnChange}
          />
          <label style={{ margin: "0 10px", alignSelf: "center" }}>年</label>
          <TextField
            type='number'
            value={formState.birthMonth}
            InputProps={{
              style: {
                width: 65,
                height: 40,
                textAlign: "center",
              }
            }}
            inputProps={{
              textAlign: "center",
            }}
            onChange={handleBirthMonthOnChange}
          />
          <label style={{ margin: "0 10px", alignSelf: "center" }}>月</label>
          <TextField
            type='number'
            value={formState.birthDay}
            InputProps={{
              style: {
                width: 65,
                height: 40,
                textAlign: "center",
              }
            }}
            inputProps={{
              textAlign: "center",
            }}
            onChange={handleBirthDayOnChange}
          />
          <label style={{ margin: "0 10px", alignSelf: "center" }}>日</label>
        </Box>
      </div>

      <div className="my-5">
        <label>ユーザーアイコン画像</label>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="rounded-full cursor-pointer justify-center items-center flex" onClick={handleImageClick}>
          <ImageDisplay
            src={formState.selectedImage}
            alt="ユーザーアイコン画像"
          />
        </div>
        {formState.fileTypeError && <span className="text-sm text-red-400 mt-1">{formState.fileTypeError}</span>}
      </div>
      <div>
        <LabelAndCheckBox
          labelTitle="新機能やアップデートに関するお知らせを受け取る。"
        />
      </div>
      <div>
        <LabelAndCheckBox
          labelTitle="投稿が完了した際に通知を受け取る。"
        />
      </div>
      <div className="login-btn">
        <CommonButton
          name="登録"
          onClick={handleSubmit}
          isDisabled={isButtonDisabled}
          additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
        />
      </div>
      <Modal
        open={open}
        onClose={hadnleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              <Typography id="modal-title" variant="h6" component="h2" sx={{ ml: 1 }}>
                Registration Successfully
              </Typography>
            </Box>
            <Typography id="modal-description" sx={{ mt: 3, textAlign: "center" }}>
              会員登録に成功しました。<br></br>
              ログイン画面に遷移します。
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Button variant="contained" color="primary" onClick={hadnleModalClose}>
                閉じる
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};