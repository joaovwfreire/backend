import "../styles/globals.css";
import type { AppProps } from "next/app";

// Thirweb
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/Footer";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import Layout from "./components/Layout";

// Polygon Mumbai
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Game Payy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <footer>
          <Footer />
        </footer>
      </SessionProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
