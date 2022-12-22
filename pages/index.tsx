import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


const Home: NextPage = () => {

  const address = useAddress();

  return (
    <div className="flex bg-slate-700 h-screen flex-row">
      <Head>
        <title>Game Payy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Sidebar/>
      </div>

      <div className='flex flex-col w-full'>
        <div>
          <Navbar/>
        </div>
        <div>
          Body
        </div>
      </div>
      

    </div>
  )
}

export default Home
