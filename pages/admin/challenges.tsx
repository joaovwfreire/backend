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
import { extractMinimalProxyImplementationAddress } from "@thirdweb-dev/sdk";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email as string;
  const [gameId, setGameId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prize, setPrize] = useState("");
  const [statusChangeAttribute, setStatusChangeAttribute] = useState("");
  const [statusChangeAmount, setStatusChangeAmount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleGameIdChange = (event: any) => {
    setGameId(event.target.value);
  };
    const handleDifficultyChange = (event: any) => {
     setDifficulty(event.target.value);
    };
    const handleDurationChange = (event: any) => {  
       setDuration(event.target.value);
    };
    const handleEntryFeeChange = (event: any) => {
        setEntryFee(event.target.value);
    };

    const handlePrizeChange = (event: any) => {
        setPrize(event.target.value);
    };

    const handleStatusChangeAttributeChange = (event: any) => {
        setStatusChangeAttribute(event.target.value);
    };

    const handleStatusChangeAmountChange = (event: any) => {
        setStatusChangeAmount(event.target.value);
    };

    const handleExpiryChange = (event: any) => {
        setExpiry(event.target.value);
    };

  const fetchAdmin = async (email: string) => {
    await axios({
        method: "post",
        url: `/api/admin/getAdmin`,
        data: {
          email: userEmail,
        },
      })
        .then((res: any) => {
          if (res.status == 200) {
            setAdmin(true);
          }}).catch((e) => { 
            console.log(e)
            toast.error(e);
            });
  }
 

  const startChallenge = async () => {
    event?.preventDefault();

    toast.loading("Creating challenge");
    await axios({
      method: "post",
      url: "/api/admin/createChallenge",
      data: {
        email: userEmail,
        game_id: gameId,
        difficulty: difficulty,
        duration: duration,
        entry_fee: entryFee,
        prize: prize,
        stats: {[statusChangeAttribute]: statusChangeAmount},
        expiry: expiry
      },
    })
      .then((response) => {
        //setEpicName(response?.data?.userName);
        console.log(response);
        toast.success(`Challenge succesfully created`);
      })
      .catch((e) => {
        console.log(e);
        toast.error(`${e.message}`);
      });
  };


  return (
    <>
      {session ? (
        <div className="text-white justify-content bg-gray-900 px-4 h-full">
          <h1>Create a new challenge</h1>
          <p>Steps to create a new challenge:</p>
          <p>1. Pick a game from the list</p>
          <p>2. Select a challenge difficulty</p>
          <p>3. Type the entry fee</p>
          <p>4. Type the prize</p>  
          <p>5. Pick a stats update as the task</p>
          <p>6. Type the amount of time the challenge will last</p>
          <p>7. Type the amount of time the challenge will be open for entries</p>
          <p>8. Click the button</p>
          
          <br />
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <form onSubmit={startChallenge}></form>
              <input
                value={gameId}
                onChange={(e) => {
                  handleGameIdChange(e);
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
      mb-3
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
                id="gameId"
                placeholder="Game ID"
              /><input
              value={difficulty}
              onChange={(e) => {
                handleDifficultyChange(e);
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
    mb-3
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  "
              id="difficulty"
              placeholder="Difficulty"
            /><input
            value={duration}
            onChange={(e) => {
                handleDurationChange(e);
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
  mb-3
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
            id="duration"
            placeholder="Duration"
          /><input
        value={entryFee}
        onChange={(e) => {
            handleEntryFeeChange(e);
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
mb-3
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
        id="entry"
        placeholder="Entry free"
      />
              <input
                value={prize}
                onChange={(e) => {
                    handlePrizeChange(e);
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
      mb-3
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
                id="prize"
                placeholder="Prize"
              />
        <input
                value={statusChangeAttribute}
                onChange={(e) => {
                    handleStatusChangeAttributeChange(e);
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
      mb-3
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
                id="scattribute"
                placeholder="Status Change Attribute"
              />

<input
                value={statusChangeAmount}
                onChange={(e) => {
                    handleStatusChangeAmountChange(e);
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
      mb-3
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
                id="scamount"
                placeholder="Status Change Amount"
              />
<input
                value={expiry}
                onChange={(e) => {
                    handleExpiryChange(e);
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
      mb-3
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
                id="expiry"
                placeholder="Expiry"
              />
              
              <span className="space-x-2 ">
                <button
                  type="submit"
                  onClick={startChallenge}
                  className="inline-block px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
                >
                  Create new challenge
                </button>
               
              </span>
            </div>
          </div>
        
        </div>
      ) : (
        <div className="flex bg-gray-900 h-screen flex-row">
          <div className="flex flex-col w-full">
            <div className="text-gray-200">Login to see admin panel</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
