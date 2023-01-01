import { Session } from "next-auth";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  session: Session;
}

const Layout = ({ session }: Props) => {
  return (
    <div>
      <Sidebar />
      <Navbar session={session} />
    </div>
  );
};

export default Layout;
