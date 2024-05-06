import React from "react";
import { MdKeyboardArrowDown as Arrow } from "react-icons/md";
import { useGlobalContext } from "../context/globalContext";
import { useWalletContext } from "../context/walletContext";
import { networks } from "../data/networks";

const SwapSection = ({ title, tokenId, amount, setAmount, insuficentFund }) => {
  const { setSelectToken, setIsFromToken } = useGlobalContext();
  const { userBalance } = useWalletContext();

  const handleClick = () => {
    //open modal
    setSelectToken(true);

    //select the section where change will be made to
    setIsFromToken(title === "From" ? true : false);
  };

  const setMax = () => {
    if (tokenId !== "") {
      setAmount(userBalance[tokenId].balance.toFixed(2));
    } else {
      alert("Select a token");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-[600] text-[#637592]">
          {title}: {tokenId ? `${networks[tokenId].name} Mainnet` : "--"}
        </p>
        <button onClick={handleClick} className="flex gap-[12px] items-center">
          {tokenId ? (
            <div className="flex gap-[5px] items-center">
              <img
                className="h-[15px]"
                src={networks[tokenId].img}
                alt={networks[tokenId].name}
              />
              <p className="font-[600]">{networks[tokenId].symbol}</p>
            </div>
          ) : (
            <p className="font-[600] text-[14px] vsm:text-[1rem]">
              Select Token
            </p>
          )}
          <Arrow />
        </button>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`${
          insuficentFund && "border border-[red]"
        } bg-[#191D24] outline-none mt-[8px] mb-[11px] w-full text-center rounded-[12px] px-[16px] py-[15px] vsm:py-[20px]`}
        placeholder="0.00"
      />
      <div className="flex gap-[8px] items-center">
        <p className="text-[14px] text-[#637592]">
          Balance:{" "}
          {tokenId !== "" ? userBalance[tokenId].balance.toFixed(2) : "0.00"}{" "}
        </p>
        <button
          onClick={setMax}
          className="text-[14px] text-[#3D6EFF] font-bold"
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default SwapSection;
