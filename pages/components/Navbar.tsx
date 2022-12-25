import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import {HiBell} from 'react-icons/hi'
import {GoChevronDown} from 'react-icons/go'
import { Session } from 'next-auth'
import {signIn, signOut} from 'next-auth/react'


interface Props {
  session: Session
}

const Navbar = ({session}: Props) => {

  const userImage = session?.user?.image as string
  const userName = session?.user?.name as string
  return (
    <div className='flex justify-between text-gray-100 items-center h-24 mx-auto'>
        <div className='flex'>
        <ul className='flex'>
            <li className='p-4'>Play</li>
            <li className='p-4'>Leaderboards</li>
            <li className='p-4'>Blog</li>
        </ul>
        </div>
        <div className='flex items-center mr-[24px]'>
            <HiBell size="24" className='mr-[16px]'/>
            
            <div className='flex space-x-[8px]'>
            <div className='flex space-x-[6px]'>
            <img src={userImage} alt={userName} className='w-[24px] rounded-full'/>
            <p>
            {session?.user?.email}
            </p>
            </div>
            <GoChevronDown size={24} onClick={()=>signOut()}/>
            </div>
        </div>
    </div>

  )
}

export default Navbar