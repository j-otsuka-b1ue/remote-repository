import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { ShowArticleLists } from "../../../components/organisms/ArticleLists";

export const ArticleShowListsPage = (): React.JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>投稿一覧画面</Title>
        <br></br>
        <ShowArticleLists></ShowArticleLists>
      </div>
    </>
  )
}