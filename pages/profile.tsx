import Image from "next/image";
import React from "react";
import { SiEpicgames, SiDiscord, SiTwitch } from "react-icons/si";
import { AiFillEdit } from "react-icons/ai";
const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-900 text-gray-200 px-4">
      <div className="bg-[url('/assets/profile_bg.png')] bg-contain bg-no-repeat h-[240px] flex justify-between p-6">
        <div className="flex items-center space-x-4 z-10">
          <div>
            <Image
              src={"/assets/cat.webp"}
              width={150}
              height={150}
              alt="profile"
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <h3>leveltherdrama4urmama</h3>
            <p>+ Add Status</p>
            <div className="flex space-x-2">
              <SiEpicgames size={24} />
              <SiDiscord size={24} />
              <SiTwitch size={24} />
            </div>
          </div>
        </div>
        <div>
          <AiFillEdit size={24} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-3 grid-rows-3 gap-7 text-gray-500">
          <div>
            <p>Friends (200)</p>
            <div className="flex">
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full border-green-500 border-2"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            Followers (15)
            <div className="flex">
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full border-green-500 border-2"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            I follow (8)
            <div className="flex">
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full border-green-500 border-2"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
              <Image
                src={"/assets/cat.webp"}
                width={40}
                height={40}
                alt="friends"
                className="rounded-full"
              />
            </div>
          </div>

          <div>
            <p>Wins / Losses</p>
            <p className="text-gray-200">50 / 15</p>
          </div>
          <div>
            <p>Points</p>
            <p className="text-gray-200">6321</p>
          </div>
          <div>
            <p>Earnings</p>
            <p className="text-gray-200">$ 12332</p>
          </div>
          <div>
            <p>Game Payy Rank</p>
            <p className="text-gray-200">11th</p>
          </div>
          <div>
            <p>Matches Played</p>
            <p className="text-gray-200">65</p>
          </div>
          <div>
            <p>On Game Payy since</p>
            <p className="text-gray-200">15/09/2022</p>
          </div>
        </div>
        <div>Tabs</div>
      </div>
    </div>
  );
};

export default Profile;
