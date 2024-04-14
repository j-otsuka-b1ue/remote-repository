import axios from "axios";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import unknownImg from "../../images/unknown.png";
import { setRegisterInfo } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import { Button } from "../atoms";
import { ImageDisplay } from "../atoms/ImageDisplay";
import { LabelAndTextInput } from "../molecules";

export const UpdateMemberInfo = (): React.JSX.Element => {

  /** storeに保存されている会員登録情報を確認 */
  const registrationInfo = useSelector((state: RootState) => state.user.registrationInfo);

  /** 会員情報変更時に必要な情報の型定義 */
  interface UpdateMemberInfoItem {
    nickname: string;
    email: string;
    nicknameError: string;
    emailError: string;
    fileTypeError: string;
    selectedImage: string | null,
    base64String: string | null,
  }

  /** useStateで初期値を設定 */
  const [formState, setFormState] = useState<UpdateMemberInfoItem>({
    nickname: registrationInfo.nickname ?? "",
    email: registrationInfo.email ?? "",
    nicknameError: "",
    emailError: "",
    fileTypeError: "",
    selectedImage: registrationInfo.representative_image
      ? `data:image/jpeg;base64,${registrationInfo.representative_image}`
      : null,
    base64String: null,
  })

  /** useRef利用フック */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** useNavigate利用フック */
  const navigate = useNavigate();

  /** useDispatch利用フック */
  const dispatch = useDispatch();



  /** ニックネーム変更時のバリデーションチェック */
  const handleNicknameOnchange = useCallback((value: string): void => {
    /** ニックネーム形式確認用正規表現 */
    const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{8,}$/;
    setFormState(prevState => ({
      ...prevState,
      nickname: value,
      nicknameError: !nicknameRegex.test(value) ? "ニックネームは8文字以上で入力してください。" : "",
    }));
  }, [])

  /** ログインID（メールアドレス）変更時のバリデーションチェック */
  const handleEmailChange = useCallback((value: string): void => {
    /** メールアドレス形式確認用正規表現 */
    const mailAddressRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormState(prevState => ({
      ...prevState,
      email: value,
      emailError: !mailAddressRegex.test(value) ? "メールアドレスの形式で入力してください。" : "",
    }));
  }, [])

  /** 画像ファイル変更時の処理 */
  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // ファイル入力フィールドで選択された最初のファイルを取得する。
    const file = e.target.files?.[0];
    // ファイルが存在する場合のみ、以下の処理を実行する。
    if (file) {
      // 選択されたファイルの名前を取得する。
      const fileName = file.name;
      // 選択されたファイルの拡張子を解析する。
      const extension = fileName.split(".").pop()?.toLowerCase();
      // ファイル形式のバリデーションチェック
      const fileTypeError = extension !== "jpg" && extension !== "jpeg" ? "ファイル形式はjpgもしくはjpegにしてください" : "";
      // 選択されたファイルを読み込む。
      const reader = new FileReader();
      // 選択されたファイル情報をstateに保存する。
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.replace(/^data:image\/[a-z]+;base64,/, "");
        setFormState(prevState => ({
          ...prevState,
          selectedImage: result,
          base64String: base64Data,
          fileTypeError: fileTypeError,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  /** 
   * 画像クリック時の処理  
   */
  const handleImageClick = () => {
    if (fileInputRef.current)
      fileInputRef.current.click();
  }

  /** 
   * 「変更する」ボタン押下
   * 
   * 会員情報更新APIを実行する
   */
  const updateMemberInfo = useCallback(async (): Promise<void> => {
    // localStorageから'userInfo'キーでデータを取得
    const userInfoString = localStorage.getItem('userInfo');

    // 取得した文字列がnullでない場合、JSON.parse()でオブジェクトに変換
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    // userInfoオブジェクトからuser_idを取得
    const userId = userInfo ? userInfo.user_id : null;

    try {
      // サーバーへ送信するリクエストボディーを設定。
      const updateMemberInfoRequestBody = {
        nickname: formState.nickname,
        email: formState.email,
        representative_image: formState.base64String,
      }
      await axios.put(`http://localhost:3000/user/${userId}`, updateMemberInfoRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(setRegisterInfo(updateMemberInfoRequestBody));
      // 正常時はマイページに遷移する
      setTimeout(() => {
        navigate("/general/Mypage")
      }, 250);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseStatusCode = error.response ? error.response.status : null;
        switch (responseStatusCode) {
          case (500):
            console.error("予期せぬエラーが発生しました。")
            alert("予期せぬエラーが発生しました。TOPページに移動します。Internal Server Error: 500")
            // TOPページに遷移させる
            navigate("/general");
        }
      }
    }
  }, [formState.email, formState.nickname, formState.base64String, navigate, dispatch])

  /**
   * 「変更する」ボタン必須チェック
   * 
   * @returns true: 非活性, false: 活性
   */
  const isButtonDisabled =
    formState.emailError !== ""
    || formState.nicknameError !== ""
    || formState.fileTypeError !== ""

  return (
    <>
      <div className="form-group">
        <LabelAndTextInput
          labelTitle="ニックネーム（8文字以上）"
          value={formState.nickname}
          placeholder={""}
          onChange={handleNicknameOnchange}
          errorMessage={formState.nicknameError}
        />
      </div>
      <div className="form-group">
        <LabelAndTextInput
          labelTitle="ログインID（メールアドレス）"
          value={formState.email}
          placeholder={""}
          onChange={handleEmailChange}
          errorMessage={formState.emailError}
        />
      </div>
      <div className="my-5">
        <label>ユーザーアイコン画像</label>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileOnChange}
        />
        <div className="rounded-full cursor-pointer justify-center items-center flex" onClick={handleImageClick}>
          <ImageDisplay
            src={formState.selectedImage || unknownImg}
            alt="ユーザーアイコン画像"
          />
        </div>
        {formState.fileTypeError && <span className="text-sm text-red-400 mt-1">{formState.fileTypeError}</span>}
      </div>
      <div className="login-btn">
        <Button
          name="変更する"
          onClick={updateMemberInfo}
          isDisabled={isButtonDisabled}
          additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
        />
      </div>
    </>
  )
}