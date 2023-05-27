'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'

const UserMenu = () => {
  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100"
                onClick={()=>{}}
            >
                Airbnb your home
            </div>
            <div
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                onClick={()=>{}}
            >
             <AiOutlineMenu />   
             <Avatar />
            </div>
        </div>
    </div>
  )
}

export default UserMenu