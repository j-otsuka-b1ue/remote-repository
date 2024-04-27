import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../utils/store";
import { useState } from "react";

export const ShowArticleDetail = (): React.JSX.Element => {

  /** 記事タイトル、記事内容のstate */
  const [articleTitle, setArticleTitle] = useState<String>("");
  const [articleContent, setArticleContent] = useState<String>("");
  const [articleNickName, setArticleNickName] = useState<String>("");

  /**
   * 初期表示処理
   */
  // 前画面で発行されたarticle_idを取得する
  const article_id = useSelector((state: RootState) => state.article.article_id);
  // 記事詳細取得APIを実行する
  const fetchArticleDetail = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3000/articles/${article_id}`);
      console.log(response.data);

      // レスポンスデータの中からタイトルを取得する
      const articleTitleData = response.data.title;
      setArticleTitle(articleTitleData);

      // レスポンスデータの中から内容を取得する
      const articleContentData = response.data.content;
      setArticleContent(articleContentData);

      // レスポンスデータの中からユーザネームを取得する
      const articleUserNameData = response.data.nickname;
      setArticleNickName(articleUserNameData);

    } catch (error) {
      console.log(error);
    }
  }

  /** 
   * 初期処理を実行する
   */

  useEffect(() => {
    if (article_id) {
      fetchArticleDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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