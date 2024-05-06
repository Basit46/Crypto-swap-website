import { ethers } from "ethers";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { useWalletContext } from "../context/walletContext";

const ConnectWallet = () => {
  const { connectWallet, setConnectWallet } = useGlobalContext();
  const { connectwalletHandler } = useWalletContext();

  const handleClick = () => {
    connectwalletHandler();

    //Close Modal
    setConnectWallet(false);
  };

  return (
    <div className={`modal-bg ${!connectWallet && "hidden"}`}>
      <div className="bg-[#080A0C] w-[556px] h-fit rounded-[12px] p-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[600]">Connect Wallet</p>
          <button onClick={() => setConnectWallet(false)}>
            <FaTimes className="text-[red] cursor-pointer" />
          </button>
        </div>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          <button
            onClick={handleClick}
            className="flex items-center gap-[8px] px-[16px] py-[12px] rounded-[12px] border border-[#191D24] hover:border-[#3D6EFF]"
          >
            <img
              className="h-[20px]"
              src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
              alt="metamask logo"
            />
            <p>Metamask</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
