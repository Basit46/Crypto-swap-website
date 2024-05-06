import React from "react";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import Profile from "./components/Profile";
import SelectNetwork from "./components/SelectNetwork";
import SelectToken from "./components/SelectToken";
import Swap from "./components/Swap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Header />
      <Swap />

      {/* Modals */}
      <SelectNetwork />
      <ConnectWallet />
      <Profile />
      <SelectToken />

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Layout;
