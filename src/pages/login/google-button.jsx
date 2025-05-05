import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../../firebase"

const GoogleButton = () => {
  const navigate = useNavigate()
  const handleToggle = ()=>{
    signInWithPopup(auth, provider)
    .then(()=>{
      navigate("/feed")
    })
    toast.success("Giris yapildi")
    
  }
  return (
    <button onClick={handleToggle} className="bg-white flex items-center justify-center py-2 px-10 rounded-full text-black hover:bg-gray-300 whitespace-nowrap gap-x-3 transition cursor-pointer">
        <img src="/google-logo.png" alt="google-logo" className="h-[20px]" />
        <span>Google ile Giris Yap</span>
    </button>
  )
}

export default GoogleButton