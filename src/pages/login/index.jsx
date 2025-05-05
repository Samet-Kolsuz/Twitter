import Form from "../../components/login-Form"
import GoogleButton from "./google-button"


const Login = () => {
  return (
    <div className="h-screen bg-[#242424] text-white place-items-center px-4 grid">
        <div className="bg-black py-16 px-28 rounded-lg flex flex-col gap-10 sm:w-[60%] max-w-[550px]">
            <div className="flex justify-center">
                <img src="/logo.webp" alt="x-logo" className="h-[60px]" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-center">Twitte'a Giris Yap</h1>

            <GoogleButton/>

            <Form/>

        </div>
    </div>
  )
}

export default Login