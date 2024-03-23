import { Header } from "../../../components/organisms/Header";
import { Title } from "../../../components/organisms/Title";
import { LoginForm } from "../../../components/organisms/Login_Logic";

export const Login = () => {
  return (
    <>
      <Header />
      <div className="justify-center items-center mx-6 max-w-md md:mx-auto text-gray-500 py-20">
        <Title>ログイン</Title>
        <br></br>
        <LoginForm />
      </div>
    </>
  )
}