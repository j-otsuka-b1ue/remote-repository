import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { CallImage } from "../../../components/atoms/callImage";
import unknownImg from "../../../images/unknown.png";

export const MyPage = () => {
  return (
    <>
    <Header/>
    <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20">
      <Title>マイページ</Title>
      <br></br>
    </div>
    <CallImage src = {unknownImg} alt = "unknown.png" />
    </>
  )
}