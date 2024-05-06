import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { networks } from "../data/networks";

const SelectToken = () => {
  const {
    selectToken,
    setSelectToken,
    isFromToken,
    setFromTokenId,
    setToTokenId,
  } = useGlobalContext();

  const handleClick = (index) => {
    if (isFromToken) {
      setFromTokenId(index.toString());
    } else {
      setToTokenId(index.toString());
    }

    // Close Modal
    setSelectToken(false);
  };

  return (
    <div className={`modal-bg ${!selectToken && "hidden"}`}>
      <div className="bg-[#080A0C] w-[556px] h-fit rounded-[12px] p-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[600]">Select Token</p>
          <button onClick={() => setSelectToken(false)}>
            <FaTimes className="text-[red] cursor-pointer" />
          </button>
        </div>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          {networks.map((network, i) => (
            <button
              onClick={() => handleClick(i)}
              className="flex items-center gap-[8px] px-[16px] py-[12px] rounded-[12px] border border-[#191D24] hover:border-[#3D6EFF]"
              key={i}
            >
              <img className="h-[20px]" src={network.img} alt={network.name} />
              <p>{network.symbol}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
