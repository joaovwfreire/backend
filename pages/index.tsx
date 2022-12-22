import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import {useSession, signIn, signOut} from 'next-auth/react'

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NotSignedInNav from './components/NotSignedInNav';


const Home: NextPage = () => {

  const address = useAddress();
  const {data: session, status} = useSession();

  const renderHeader = () => {
    if (session) return (
      <div className="flex bg-gray-900 h-screen flex-row">
        <Head>
          <title>Game Payy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div>
          <Sidebar/>
        </div>
  
        <div className='flex flex-col w-full'>
          <div>
            <Navbar session={session}/>
          </div>
          <div>
            Body
          </div>
        </div>
      </div>
    )
    return (
      <div className="flex bg-gray-900 h-screen flex-row">
      <Head>
        <title>Game Payy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Sidebar/>
      </div>

      <div className='flex flex-col w-full'>
        <div>
          <NotSignedInNav/>
        </div>
        <div>
          Body
        </div>
      </div>
    </div>
    )


  }
  return (
    <>
    {renderHeader()}
    </>
  )
}

export default Home
