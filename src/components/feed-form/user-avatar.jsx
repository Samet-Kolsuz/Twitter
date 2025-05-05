import React from "react"


const UserAvatar = ({photo,name,desing}) => {
  return (
    <img src={photo} alt={name}  className={`size-[35px] md:size-[45px] rounded-full ${desing}`}/>
  )
}

export default React.memo(UserAvatar)