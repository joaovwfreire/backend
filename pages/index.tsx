import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";


const Home: NextPage = () => {

  const address = useAddress();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Game Payy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectWallet/>

    </div>
  )
}

export default Home
