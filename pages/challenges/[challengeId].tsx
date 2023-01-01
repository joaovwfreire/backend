import { useRouter } from "next/router";
import React from "react";
import { RiTrophyFill, RiArrowDownLine, RiCoinFill } from "react-icons/ri";

const Challenge = () => {
  const router = useRouter();
  const { challengeId } = router.query;

  return (
    <div className="flex h-full flex-col bg-gray-900 text-gray-200 px-6">
      <div className="bg-slate-500 w-full h-[224px] flex flex-col px-6 items-start justify-evenly">
        <div>
          <h2 className="flex flex-row items-center text-white">
            Fortnite Weekly
            <span>
              <RiTrophyFill size="32" color="#FF8A00" />
            </span>
          </h2>
          <div className="flex flex-row justify-evenly space-x-4">
            <button className="bg-black text-red-500 px-4 py-2 w-24 rounded-full">
              {12}
            </button>
            <button className="bg-black text-gray-400 px-4 py-2 rounded-full">
              PC/Xbox/PS5
            </button>
            <button className="bg-black text-blue-500 px-4 py-2 rounded-full">
              Free
            </button>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div>
            <button className="bg-primary text-black px-[20px] py-[12px] w-[114px]">
              JOIN
            </button>{" "}
          </div>
          <button className="flex flex-row items-center space-x-1">
            <RiArrowDownLine size={24} />
            <p className="">DETAILS</p>
          </button>
        </div>
      </div>

      <div className="flex flex-row mt-6 space-x-10">
        <div className="flex flex-col w-[536px]">
          <div className="flex flex-row h-[155px] justify-evenly">
            <div className="bg-blue-400 items-center justify-center flex w-full space-x-1">
              <div>
                <RiTrophyFill size={63} color="orange" />
              </div>
              <div>
                <h3 className="leading-none">
                  PRIZE <br /> POOL
                </h3>
              </div>
            </div>
            <div className="bg-[#FFA800] w-full items-center justify-center flex space-x-1">
              <div>
                <RiCoinFill size={40} color="black" />
              </div>
              <div>
                <h2 className="text-black">2000</h2>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs">Learn more about Challenge prize rules</p>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-x-8">
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">SEASON START</h4>
            </div>
            <p>June 01, 00:00 am EST</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">SKILL LEVEL</h4>
            </div>
            <p>Amateur</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">PLATFORM</h4>
            </div>
            <p>Xbox/PS/PC</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">REGION</h4>
            </div>
            <p>All</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">SEASON END</h4>
            </div>
            <p>June 03, 00:00 am EST</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">ENTRY FEE</h4>
            </div>
            <p>Free</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">TEAM SIZE</h4>
            </div>
            <p>1v1</p>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-primary">PC PLAYERS</h4>
            </div>
            <p>Not Allowed</p>
          </div>
        </div>
      </div>

      <div className="h-screen">Tabs</div>
    </div>
  );
};

export default Challenge;
