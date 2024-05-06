import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { useWalletContext } from "../context/walletContext";
import { networks } from "../data/networks";

const SelectNetwork = () => {
  const {
    currNetworkIndex,
    setCurrNetworkIndex,
    selectNetwork,
    setSelectNetwork,
  } = useGlobalContext();
  const { switchNetwork } = useWalletContext();

  const setNetwork = (index, network) => {
    setCurrNetworkIndex(index);
    switchNetwork(network);

    //Close Network modal
    setSelectNetwork(false);
  };
  return (
    <div className={`modal-bg ${!selectNetwork && "hidden"}`}>
      <div className="bg-[#080A0C] w-[556px] h-fit rounded-[12px] p-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[600]">Switch Network</p>
          <button onClick={() => setSelectNetwork(false)}>
            <FaTimes className="text-[red] cursor-pointer" />
          </button>
        </div>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          {networks.map((network, i) => (
            <button
              onClick={() => setNetwork(i, network)}
              className={`${
                currNetworkIndex == i ? "border-[#3D6EFF]" : "border-[#191D24]"
              } flex items-center gap-[8px] px-[16px] py-[12px] rounded-[12px] border hover:border-[#3D6EFF]`}
              key={i}
            >
              <img className="h-[20px]" src={network.img} alt={network.name} />
              <p>{network.name} Mainnet</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectNetwork;
