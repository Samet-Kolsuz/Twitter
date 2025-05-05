import React from 'react';
import UserAvatar from '../feed-form/user-avatar';
import Buttons from './buttons';
import Content from './Content';
import DropDown from './dropdown';
import UserInfo from './user-info';

const Post = ({tweet}) => {
  return (
    <div className='border-b border-tw-gray p-4 gap2 flex'>
        <UserAvatar photo={tweet.user.photo} name={tweet.user.name}/>

        <div className='w-full'>
            <div className='flex justify-between'>
                <UserInfo tweet={tweet}/>
                <DropDown tweet={tweet}/>
            </div>
           <Content text={tweet.context?.text} image={tweet.context?.image}/>
            <Buttons tweet={tweet}/>
        </div>
    </div>
  )
}

export default Post