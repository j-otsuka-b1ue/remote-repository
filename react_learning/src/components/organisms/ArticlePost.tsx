import { LabelAndTextArea, LabelAndTextInput } from "../molecules";
import { Button } from "../atoms";
import { useCallback, useState } from "react";

export const ArticlePost = (): React.JSX.Element => {

  interface articlePost {
    title: string;
    content: string;
  }

  const [formState, setFormState] = useState<articlePost>({
    title: "",
    content: "",
  })

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

  const errorMsg = "";

  // 記事タイトル もしくは 記事内容が未入力の場合はボタンを非活性にする
  const isPostButtonDisabled = formState.title !== "" || formState.content !== "";

  return (
    <>
      <div className="my-5">
        <LabelAndTextInput
          labelTitle="記事タイトル"
          value=""
          placeholder="タイトル"
          onChange={handleArticleTitleOnChange}
          errorMessage={errorMsg}
        />
      </div>
      <div className="my-5">
        <LabelAndTextArea
          labelTitle="記事内容"
          value=""
          placeholder=""
          onChange={handleArticleContentOnChange}
          errorMessage={errorMsg}
        />
      </div>
      <div className="login-btn">
        <Button
          name="投稿する"
          isDisabled={isPostButtonDisabled}
          additionalClasses="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded mx-2"
        />
      </div>

    </>
  )
}