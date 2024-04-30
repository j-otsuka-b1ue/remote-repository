import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ShowArticleDetail = (): React.JSX.Element => {

  /** 記事タイトル、記事内容のstate */
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [articleContent, setArticleContent] = useState<string>("");
  const [articleNickName, setArticleNickName] = useState<string>("");


  /**
   * 初期表示処理
   */

  // useParamsフックを使ってURLのパラメータを取得する
  const { articleId } = useParams<{ articleId?: string }>();

  // 記事詳細取得APIを実行する
  const fetchArticleDetail = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3000/articles/${articleId}`);
      console.log(response.data);

      const articleIdFromResponse = response.data.id;

      console.log(articleIdFromResponse);
      console.log(articleId);
      if (articleId !== undefined) {
        if (parseInt(articleId) === articleIdFromResponse) {
          // レスポンスデータの中からタイトルを取得する
          const articleTitleData = response.data.title;
          setArticleTitle(articleTitleData);

          // レスポンスデータの中から内容を取得する
          const articleContentData = response.data.content;
          setArticleContent(articleContentData);

          // レスポンスデータの中からユーザネームを取得する
          const articleUserNameData = response.data.nickname;
          setArticleNickName(articleUserNameData);
        } else {
          console.error("記事が見つかりませんでした");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** 
   * 初期処理を実行する
   */

  useEffect(() => {
    if (articleId) {
      fetchArticleDetail();
    } else {
      console.log("No article ID provided");
    }
  }, [articleId]);


  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {articleTitle}
        </Typography>
        <Typography align="right" component="div">
          記事作成者 : {articleNickName}
        </Typography>
        <br></br>
        <br></br>
        <Typography align="center" component="div">
          {articleContent}
        </Typography>
      </CardContent>
    </Card>
  )
}