import React from 'react'
import {RiHome2Fill, RiGroupFill,RiMessage2Fill,
    RiMoneyDollarCircleFill,RiSettings5Fill,RiQuestionnaireFill} from 'react-icons/ri'


const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 bg-gray-900 
    h-screen w-[96px] m-0 flex flex-col text-gray-300 
    shadow-lg'>
        <div className='relative flex items-center justify-center mb-[24px] mt-[20px]'>
        <img src="./assets/logo.png" alt="" className='w-[40px]' />
        </div>
        <SideBarIcon icon = {<RiHome2Fill size="20"/>} text ="Home"/>
        <SideBarIcon icon = {<RiGroupFill size="20"/>} text ="Friends"/>
        <SideBarIcon icon = {<RiMessage2Fill size="20"/>} text ="Chats"/>
        <SideBarIcon icon = {<RiGroupFill size="20"/>} text ="Teams"/>
        <SideBarIcon icon = {<RiMoneyDollarCircleFill size="20"/>} text ="Wallet"/>
        <SideBarIcon icon = {<RiSettings5Fill size="20"/>} text ="Settings"/>
        <SideBarIcon icon = {<RiQuestionnaireFill size="20"/>} text ="Support"/>


    </div>
  )
}

const SideBarIcon = ({icon, text="tooltip"}) => (
    <div className='sidebar-icon group'>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>

);

export default Sidebar