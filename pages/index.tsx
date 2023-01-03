import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useSession, getSession } from "next-auth/react";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { RiSwordFill, RiCoinFill, RiTrophyFill } from "react-icons/ri";
import Link from "next/link";

import axios from "axios";

const Home: NextPage = ({ facts }: any) => {
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
  const [count, setCount] = useState("");
  const [userId, setUserId] = useState("");

  const startChallenge = async () => {
    event?.preventDefault();

    toast.loading("Starting challenge");
    await axios({
      method: "post",
      url: "/api/fortnite/startChallenge",
      data: {
        game_id: userId,
        challenge_id: 1,
      },
    })
      .then((response) => {
        //setEpicName(response?.data?.userName);
        console.log(response);
        toast.success(`${response.data.message}.`);
        toast.loading("Updating database");
      })
      .catch((e) => {
        console.log(e);
        toast.error(`${e.message}`);
      });
  };

  const finishChallenge = async () => {
    event?.preventDefault();

    toast.loading("Checking challenge completion");
    await axios({
      method: "post",
      url: "/api/fortnite/finishChallenge",
      data: {
        game_id: userId,
        challenge_id: 1,
      },
    })
      .then((response) => {
        //setEpicName(response?.data?.userName);
        console.log(response);
        toast.success(`${response.data.message}.`);
      })
      .catch((e) => {
        console.log(e);
        toast.error(`${e.response.data.message}`);
      });
  };

  var countDownDate = new Date("Jan 5, 2023 15:37:25").getTime();
  // Counter
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCount(hours + ":" + minutes + ":" + seconds);
    if (distance < 0) {
      clearInterval(x);
      setCount("Started");
    }
  }, 1000);

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
        setUserId(response?.data?.id);
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
    await axios({
      method: "post",
      url: `/api/fortnite/stats`,
      data: {
        id: id,
      },
    })
      .then((res: any) => {
        if (res.status == 200) {
          setScore(res.data.overall.score);
          setMatches(res.data.overall.matches);
          setKills(res.data.overall.kills);
          setWins(res.data.overall.wins);
          setWinrate(res.data.overall.winRate);
          setLastmodified(res.data.overall.lastModified);

          setShowstats(true);
        } else {
          if (res.message) {
            toast.error(res.message);
          }
          if (res.error) {
            toast.error(res.error);
          }
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const checkUser = async () => {
    await axios({
      method: "post",
      url: `/api/fortnite/getId`,
      data: {
        email: session?.user?.email,
      },
    })
      .then((res: any) => {
        if (res.status == 200) {
          return res.data;
        } else {
          if (res.message) {
            toast.error(res.message);
          }
          if (res.error) {
            toast.error(res.error);
          }
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.request({
  //         method: "post",
  //         url: `/api/fortnite/getId`,
  //         data: {
  //           email: session?.user?.email,
  //         },
  //       });

  //       setAccountLinked(response.data);
  //     } catch (error: any) {
  //       // setError(error.message);
  //     } finally {
  //       // setLoaded(true);
  //     }
  //   })();
  // }, [accountLinked]);

  return (
    <>
      {session ? (
        <div className="text-white justify-content bg-gray-900 px-4 h-screen">
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
                <button type="submit" onClick={checkUser}>
                  Check
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <h3>Game Stats</h3>
            {showstats ? (
              <div className="flex flex-col">
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
                <div>
                  <h2>Challenges</h2>
                </div>
                <div className="grid grid-cols-2 px-6 gap-x-3">
                  {/* card1 */}
                  <Link href={"/"}>
                    <div className="backdrop-blur-md bg-no-repeat bg-[url('/assets/cover.png')] h-[230px] w-full bg-cover">
                      <div className="flex flex-row justify-between p-6 h-full">
                        <div className="flex flex-col justify-between">
                          <h3 className="flex flex-row items-center text-white">
                            First ever Challenge!{"Reach top6 squads."}
                            <span>
                              <RiSwordFill size="24" color="#FF6AF6" />
                            </span>
                          </h3>
                          <div className="flex flex-row justify-evenly items-start">
                            <button className="bg-black text-primary px-4 py-2 rounded-full">
                              Started
                            </button>
                            <button className="bg-black text-gray-400 px-4 py-2 rounded-full">
                              PC
                            </button>
                            <button className="bg-black text-blue-500 px-4 py-2 rounded-full">
                              Free
                            </button>
                          </div>

                          <div className="grid grid-cols-2 grid-rows-2">
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Entry Fee</div>
                              <div>Free</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Skill Level</div>
                              <div>All</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Team Size</div>
                              <div>Squad</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Region</div>
                              <div>All</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <button
                              className="bg-transparent border-2 border-primary px-[20px] py-[12px] w-[114px] hover:bg-green-400/20"
                              onClick={startChallenge}
                            >
                              JOIN
                            </button>
                            <button
                              className="bg-transparent border-2 border-primary px-[20px] py-[12px] w-[114px] hover:bg-green-400/20 mt-2"
                              onClick={finishChallenge}
                            >
                              Finish
                            </button>
                          </div>
                          <div className="flex flex-col items-end">
                            <div>PRIZE POOL</div>
                            <div>
                              <h2 className="flex flex-row items-center text-white">
                                <span>
                                  <RiCoinFill size={24} color="FFC700" />
                                </span>
                                1st badge
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* card 2 */}
                  <Link href={"/challenges/2"}>
                    <div className="backdrop-blur-md bg-no-repeat bg-[url('/assets/cover1.png')] h-[230px] w-full bg-cover">
                      <div className="flex flex-row justify-between p-6 h-full">
                        <div className="flex flex-col justify-between">
                          <h3 className="flex flex-row items-center text-white">
                            Fortnite summer challenge{" "}
                            <span>
                              <RiTrophyFill size="24" color="#FF8A00" />
                            </span>
                          </h3>
                          <div className="flex flex-row justify-evenly items-start">
                            <button className="bg-black text-red-500 px-4 py-2 w-24 rounded-full">
                              {count}
                            </button>
                            <button className="bg-black text-gray-400 px-4 py-2 rounded-full">
                              PC/Xbox/PS5
                            </button>
                            <button className="bg-black text-blue-500 px-4 py-2 rounded-full">
                              Free
                            </button>
                          </div>

                          <div className="grid grid-cols-2 grid-rows-2">
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Entry Fee</div>
                              <div>Free</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Skill Level</div>
                              <div>All</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Team Size</div>
                              <div>All</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[#AAB4BF]">Region</div>
                              <div>All</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <button className="bg-transparent border-2 border-primary px-[20px] py-[12px] w-[114px] hover:bg-green-400/20">
                              JOIN
                            </button>
                          </div>
                          <div className="flex flex-col items-end">
                            <div>PRIZE POOL</div>
                            <div>
                              <h2 className="flex flex-row items-center text-white">
                                <span>
                                  <RiCoinFill size={24} color="FFC700" />
                                </span>
                                3000
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-primary">Link your account to see the stats</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex bg-gray-900 h-screen flex-row">
          <div className="flex flex-col w-full">
            <div className="text-gray-200">No linked account</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
