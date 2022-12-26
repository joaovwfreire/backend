import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NotSignedInNav from "./components/NotSignedInNav";
import Link from "next/link";

import axios from "axios";

const Home: NextPage = () => {
  const address = useAddress();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email as string;
  const [epicGamesAuthCode, setEpicGamesAuthCode] = useState("");
  const [score, setScore] = useState("");
  const [matches, setMatches] = useState("");
  const [wins, setWins] = useState("");
  const [kills, setKills] = useState("");
  const [winrate, setWinrate] = useState("");
  const [lastmodified, setLastmodified] = useState("");
  const [showstats, setShowstats] = useState(false);

  const handleChange = (event) => {
    setEpicGamesAuthCode(event.target.value);
  };

  const linkAccountToEmail = async () => {
    event?.preventDefault();
    console.log(epicGamesAuthCode);

    setShowstats(false);

    let gameIdData = await axios({
      method: "post",
      url: "/api/fortnite/epicauth",
      data: {
        key: epicGamesAuthCode,
      },
    });
    console.log(gameIdData);
    let response = await axios({
      method: "post",
      url: `/api/fortnite/link`,
      data: {
        email: session?.user?.email,
        game_id: gameIdData.data,
      },
    });
    console.log(response);

    let gameStats = await axios({
      method: "post",
      url: `/api/fortnite/stats`,
      data: {
        id: gameIdData.data,
      },
    });

    setScore(gameStats.data.overall.score);
    setMatches(gameStats.data.overall.matches);
    setKills(gameStats.data.overall.kills);
    setWins(gameStats.data.overall.wins);
    setWinrate(gameStats.data.overall.winRate);
    setLastmodified(gameStats.data.overall.lastModified);

    setShowstats(true);
  };

  const renderHeader = () => {
    if (session)
      return (
        <div className="flex bg-gray-900 h-screen flex-row">
          <Head>
            <title>Game Payy</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div>
            <Sidebar />
          </div>

          <div className="flex flex-col w-full">
            <div>
              <Navbar session={session} />
            </div>
            <div className="text-white justify-content">
              <h1>Link Epic games account</h1>
              <p>To link your account, first login with your google account</p>
              <p>Retrieve the Authorization code at the following link:</p>
              <Link
                className="text-teal-300 mb-5"
                href="https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253D3446cd72694c4a4485d81b77adbb2141%2526responseType%253Dcode"
                target="blank"
              >
                Authorization code generator
              </Link>
              <p>Then paste it in the following field:</p>
              <br />
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  <form onSubmit={linkAccountToEmail}></form>
                  <input
                    type="email"
                    className="
        form-control
        mb-3
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="exampleFormControlInput5"
                    placeholder={session?.user?.email || undefined}
                    aria-label="Disabled input example"
                    disabled
                  />
                  <input
                    value={epicGamesAuthCode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    type="text"
                    className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="exampleEmail01"
                    placeholder="Epic games auth key"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Authorization key{" "}
                  </div>
                  <span className="">
                    <button
                      type="submit"
                      onClick={linkAccountToEmail}
                      className="inline-block px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
                    >
                      Link account
                    </button>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <h3>Game Stats</h3>
                {showstats ? (
                  <div className="text-lg">
                    <p>
                      Score: <span className="text-primary">{score}</span>
                    </p>
                    <p>
                      Matches: <span className="text-primary">{matches}</span>
                    </p>
                    <p>
                      Wins: <span className="text-primary">{wins}</span>
                    </p>
                    <p>
                      Kills: <span className="text-primary">{kills}</span>
                    </p>
                    <p>
                      Winrate: <span className="text-primary">{winrate}</span>
                    </p>
                    <p>
                      Last Modifed:{" "}
                      <span className="text-primary">{lastmodified}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-primary">
                    Link your account to see the stats
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    return (
      <div className="flex bg-gray-900 h-screen flex-row">
        <Head>
          <title>Game Payy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <Sidebar />
        </div>

        <div className="flex flex-col w-full">
          <div>
            <NotSignedInNav />
          </div>
          <div>Body</div>
        </div>
      </div>
    );
  };
  return <>{renderHeader()}</>;
};

export default Home;
