import React, { useState } from 'react'
import { AiOutlineEye as Open } from "react-icons/ai"
import { AiOutlineEyeInvisible as Closed } from "react-icons/ai"

const PasswordInput = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div className="mt-5">
      <label htmlFor="password">Sifre</label>
      <div className="relative w-full">
        <input 
          type={isShow ? "text" : "password"} 
          id="password"
          name="password" 
          className="input" 
        />
        <button
          type="button"
          className="absolute end-3 top=[50%] -translate-y-[-40%] text-zinc-700 text-2xl cursor-pointer"
          onClick={() => setIsShow(!isShow)}
          aria-label={isShow ? "Şifreyi gizle" : "Şifreyi göster"}
        >
          {isShow ? <Closed /> : <Open />}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput