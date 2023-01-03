import { useSession } from "next-auth/react";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NotSignedInNav from "./NotSignedInNav";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        {session ? <Navbar session={session} /> : <NotSignedInNav />}

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
