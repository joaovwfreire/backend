import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Sidebar from './components/Sidebar';


const Home: NextPage = () => {

  const address = useAddress();

  return (
    <div className="flex bg-slate-700 h-screen">
      <Head>
        <title>Game Payy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>

      <div className='ml-[100px]'>
        <h1>1234</h1>
      </div>
      

    </div>
  )
}

export default Home
