import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import unknownImg from "../../images/img_1705691905.png"
import { ImageDisplay } from "../atoms/ImageDisplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/** レスポンスデータの中身の型注釈 */
interface UserData {
  userId: string;
  email: string;
  name: string;
  representative_image: string;
}

export const MyPageLogic = () => {
  /** ナビゲート関数利用フック */
  const navigate = useNavigate();

  /** レスポンスデータ用の状態定義 */
  const [userData, setUserData] = useState<UserData | null>(null);

  // 会員登録時にストアに保持した情報を引き出す
  const registrationInfo = useSelector((state: RootState) => state.user.registrationInfo);

  // レスポンスデータ内の画像データの中身をチェックする。
  // representative_imageが空でない場合、data:image/jpeg;base64 を先頭に付けて返す。
  // representative_imageが空の場合、nullを返す。
  const imageData = registrationInfo.representative_image
  ? `data:image/jpeg;base64,${registrationInfo.representative_image}`
  : null;

  // localStorageから'userInfo'キーでデータを取得
  const userInfoString = localStorage.getItem('userInfo');

  // 取得した文字列がnullでない場合、JSON.parse()でオブジェクトに変換
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  // userInfoオブジェクトからuser_idを取得
  const userId = userInfo ? userInfo.user_id : null;

  // 会員情報取得API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserData(response.data);
      } catch(error) {
        if(axios.isAxiosError(error)) {
          const statusCode = error.response ? error.response.status : null;
          switch(statusCode) {
            case(404):
            navigate("/general/articles/NotFound")
            break;
    
            default:
            console.error("予期せぬエラーが発生しました。")
          }
        }
      }  
    }
    // userIdが存在する場合のみ、会員情報取得APIを実行する
    if(userId) {
      fetchUserInfo();
      }
  }, [userId, navigate]); 

  return (
    <>
    <div className="flex items-center">
      <div className="object-cover w-40 h-40">
        <ImageDisplay src={imageData || unknownImg} alt="会員登録時の画像" />
      </div>
      <div className="flex-grow">
        <p className="ml-32">{userData ? userData.email : null}</p>
      </div>
    </div>
    </>
  )
}