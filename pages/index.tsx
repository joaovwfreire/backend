import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";

import toast from "react-hot-toast";

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
  const [epicName, setEpicName] = useState("");
  const [score, setScore] = useState("");
  const [matches, setMatches] = useState("");
  const [wins, setWins] = useState("");
  const [kills, setKills] = useState("");
  const [winrate, setWinrate] = useState("");
  const [lastmodified, setLastmodified] = useState("");
  const [showstats, setShowstats] = useState(false);
  const [nomatches, setNomatches] = useState(false);

  const handleChange = (event: any) => {
    setEpicGamesAuthCode(event.target.value);
  };

  const linkAccountToEmail = async () => {
    event?.preventDefault();

    setShowstats(false);

    toast.loading("Fetching account's data");
    await axios({
      method: "post",
      url: "/api/fortnite/epicauth",
      data: {
        key: epicGamesAuthCode,
      },
    })
      .then((response) => {
        setEpicName(response?.data?.userName);
        toast.success(`Succesfully fetched ${epicName}.`);
        toast.loading("Updating database");

        addGameIdToDatabase(response?.data?.id);
        fetchGameData(response?.data?.id);
      })
      .catch((e) => {
        toast.error(
          `${e.message} Please try generating a new authorization code.`
        );
      });
  };

  const addGameIdToDatabase = async (id: String) => {
    await axios({
      method: "post",
      url: `/api/fortnite/link`,
      data: {
        email: session?.user?.email,
        game_id: id,
      },
    })
      .then((res) => {
        toast.success("Succesfully updated credentials");
      })
      .catch((e) => {
        toast.error("Database fail, please contact the admin");
      });
  };

  const fetchGameData = async (id: String) => {
    //id = "7a3f2e1b1c174047abd8130774d4b363";
    await axios({
      method: "post",
      url: `/api/fortnite/stats`,
      data: {
        id: id,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setScore(res.data.overall.score);
          setMatches(res.data.overall.matches);
          setKills(res.data.overall.kills);
          setWins(res.data.overall.wins);
          setWinrate(res.data.overall.winRate);
          setLastmodified(res.data.overall.lastModified);

          setShowstats(true);
        }
        // else {
        //   if (res.message) {
        //     toast.error(res.message);
        //   }
        //   if (res.error) {
        //     toast.error(res.error);
        //   }
        // }
      })
      .catch((e) => {
        toast.error(e);
      });
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
                <h3 className="mb-4">Game Stats</h3>
                {showstats ? (
                  <div className="flex flex-row px-2 space-x-10 items-start">
                    <div>
                      <Image
                        src="/assets/fortnite-cover.jpeg"
                        width={200}
                        height={200}
                        alt=""
                        className="rounded"
                      />
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div>
                        <div className="text-gray-500">win/loss</div>
                        <div>
                          {wins} / {+matches - +wins}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Matches played</div>
                        <div>{matches}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Last Match</div>
                        <div>{lastmodified}</div>
                      </div>
                    </div>
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
