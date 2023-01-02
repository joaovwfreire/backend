import React from "react";
import { signIn } from "next-auth/react";

const NotSignedInNav = () => {
  return (
    <div className="flex justify-between text-gray-100 items-center h-24 mx-auto bg-gray-900">
      <div className="flex">
        <ul className="flex">
          <li className="p-4">Play</li>
          <li className="p-4">Leaderboards</li>
          <li className="p-4">Blog</li>
        </ul>
      </div>
      <div className="flex items-center mr-[24px]">
        <button
          onClick={() => signIn()}
          className="bg-primary text-gray-900 w-[77px] 
            px-[16px] py-[12px]"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default NotSignedInNav;
