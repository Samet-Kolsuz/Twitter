import React from 'react'

const AuthToggle = ({isSignUp, setIsSignUp}) => {
  return (
    <div>
      
      <p className="mt-5 select-none">
            <span className="text-gray-500">
            {isSignUp ? "Hesabiniz Varsa ?": "Hesabiniz Yoksa ?"}
              </span>
            <span className="cursor-pointer ms-2 text-blue-500 hover:underline" onClick={()=> setIsSignUp(!isSignUp)}>
              {isSignUp ? "Giris Yap": "Kayit Ol"}
              </span>
        </p>
    </div>
  )
}

export default AuthToggle