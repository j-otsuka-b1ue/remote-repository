import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { MyPageLogic } from "../../../components/organisms/MyPage";

export const MyPage = () => {
  return (
    <>
      <Header />
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>マイページ</Title>
        <br></br>
        <br></br>
        <MyPageLogic />
      </div>
    </>
  )
}