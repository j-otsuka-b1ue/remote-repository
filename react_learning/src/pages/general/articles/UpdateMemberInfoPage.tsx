import { Header } from "../../../components/organisms/Header";
import { UpdateMemberInfo } from "../../../components/organisms/UpdateMemberInfo";
import { Title } from "../../../components/organisms/Title";

export const UpdateMemberInfoPage = () => {
  return (
    <>
      <Header />
        <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20 mt-6">
        <Title>会員情報変更</Title>
        <br></br>
        <UpdateMemberInfo />
      </div>
    </>
   
  )
}