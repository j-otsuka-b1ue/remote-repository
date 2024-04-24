import { LabelAndTextArea, LabelAndTextInput } from "../molecules";
import { Button } from "../atoms";
import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ArticlePost = (): React.JSX.Element => {

  interface articlePost {
    title: string;
    content: string;
  }

  const [formState, setFormState] = useState<articlePost>({
    title: "",
    content: "",
  })

  /** ナビゲート関数利用フック */
  const navigate = useNavigate();

  // 記事タイトル変更時の処理
  const handleArticleTitleOnChange = useCallback((value: string): void => {
    setFormState(prevState => ({
      ...prevState,
      title: value,
    }))
  }, []);

  // 記事内容変更時の処理
  const handleArticleContentOnChange = useCallback((value: string): void => {
    setFormState(prevState => ({
      ...prevState,
      content: value,
    }))
  }, []);

  // 記事作成APIを実行する
  const createArticlePost = useCallback(async (): Promise<void> => {
    // サーバーへ送信するリクエストボディーの設定
    const articleRequestBody = {
      title: formState.title,
      content: formState.content,
    }
    try {
      await axios.post("http://localhost:3000/articles", articleRequestBody, {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseStatusCode = error.response ? error.response.status : null;
        switch (responseStatusCode) {
          case (401):
            setTimeout(() => navigate("/general/Login"), 250);
            alert("アクセス権限がありません。ログインしていない場合は、ログインしてください。")
            break;
          case (400):
            console.error("Bad Request:400 サーバーがリクエストを処理できませんでした。");
            break;
          case (404):
            navigate("/general/articles/NotFound")
            break;
          case (500):
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
  }, [formState.content, formState.title, navigate]);

  const errorMsg = "";

  // 記事タイトル もしくは 記事内容が未入力の場合はボタンを非活性にする
  const isPostButtonDisabled = formState.title === "" || formState.content === "";

  return (
    <>
      <div className="my-5">
        <LabelAndTextInput
          labelTitle="記事タイトル"
          value={formState.title}
          placeholder="タイトル"
          onChange={handleArticleTitleOnChange}
          errorMessage={errorMsg}
        />
      </div>
      <div className="my-5">
        <LabelAndTextArea
          labelTitle="記事内容"
          value={formState.content}
          placeholder=""
          onChange={handleArticleContentOnChange}
          errorMessage={errorMsg}
        />
      </div>
      <div className="login-btn">
        <Button
          name="投稿する"
          onClick={createArticlePost}
          isDisabled={isPostButtonDisabled}
          additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
        />
      </div>

    </>
  )
}