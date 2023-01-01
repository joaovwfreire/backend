import { useSession } from "next-auth/react";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar session={session!} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
