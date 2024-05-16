import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { ShowArticleDetail } from "../../../components/organisms/ArticleDetail";

export const ArticleDetailPage = (): React.JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>記事詳細画面</Title>
        <br></br>
        <ShowArticleDetail></ShowArticleDetail>
      </div>

    </>
  )
};
