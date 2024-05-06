import React from "react";
import logo from "../assets/logo.png";
import logoMobile from "../assets/logo-mobile.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { networks } from "../data/networks";
import { useGlobalContext } from "../context/globalContext";
import { useWalletContext } from "../context/walletContext";
import { toast } from "react-toastify";

const Header = () => {
  const { currNetworkIndex, setSelectNetwork, setConnectWallet, setProfile } =
    useGlobalContext();
  const { userAddress, userBalance } = useWalletContext();

  return (
    <header className="sticky top-0 z-[2] w-full bg-[#111318] px-[20px] lg:px-[100px] h-[80px] flex justify-between items-center">
      <a href="#">
        <img className="hidden md:block" src={logo} alt="logo" />
        <img className="block md:hidden" src={logoMobile} alt="logo" />
      </a>

      <div className="flex gap-[16px] items-center">
        <button className="hidden xmd:block mr-[8px] text-[#3D6EFF] text-[14px]">
          Cross Swap
        </button>

        <button
          onClick={() => toast("Coming soon")}
          className="hidden xmd:flex items-center gap-[10px]"
        >
          <p className="text-[#637592] text-[14px]">Explorer</p>
          <MdKeyboardArrowDown />
        </button>

        <button
          onClick={() => setSelectNetwork(true)}
          className="bg-[#191D24] text-white w-fit md:w-[143px] px-[10px] md:px-0 py-[8px] vsm:py-[12px] rounded-[12px] flex justify-center items-center gap-[11px] "
        >
          <img
            src={networks[currNetworkIndex].img}
            className="w-[18px]"
            alt={`${networks[currNetworkIndex].name} logo`}
          />
          <p className="hidden md:block font-[600]">
            {networks[currNetworkIndex].name}
          </p>
        </button>

        {userAddress == "" ? (
          <button
            onClick={() => setConnectWallet(true)}
            className="bg-[#3D6EFF] text-white px-[16px] py-[10px] vsm:py-[12px] rounded-[12px] font-bold"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="bg-[#191D24] flex gap-[10px] items-center pl-[12px] rounded-[12px] overflow-hidden">
            <p className="text-[14px] font-bold uppercase">
              {userBalance[currNetworkIndex].balance.toFixed(2)}{" "}
              {networks[currNetworkIndex].symbol}
            </p>
            <button
              onClick={() => setProfile(true)}
              className="bg-[#3D6EFF] text-white px-[16px] py-[10px] vsm:py-[12px] rounded-[12px] font-bold font-sans"
            >
              {userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
