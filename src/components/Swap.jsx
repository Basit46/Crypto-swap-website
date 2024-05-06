import React, { useEffect, useState } from "react";
import SwapSection from "./SwapSection";
import { GoArrowDown } from "react-icons/go";
import Steps from "./Steps";
import { useGlobalContext } from "../context/globalContext";
import { useWalletContext } from "../context/walletContext";
import { coinPrices } from "../data/coinPrices";
import { toast } from "react-toastify";

const Swap = () => {
  const {
    fromTokenId,
    setFromTokenId,
    toTokenId,
    setToTokenId,
    setCurrentStep,
    setConnectWallet,
    setProfile,
  } = useGlobalContext();
  const {
    userAddress,
    userBalance,
    setUserBalance,
    userTransactions,
    setUserTransactions,
  } = useWalletContext();

  //Switch tokens upside down
  const switchTokens = () => {
    setFromTokenId(toTokenId);
    setToTokenId(fromTokenId);
  };

  //To manage the fromSection and toSection amount
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const [allowTransfer, setAllowTransfer] = useState(false);
  const [insuficentFund, setInsufficentFund] = useState(false);

  useEffect(() => {
    //Calculate amount of tokens to be received
    if (fromAmount !== "" && fromTokenId !== "" && toTokenId !== "") {
      setToAmount(
        (coinPrices[fromTokenId].price / coinPrices[toTokenId].price) *
          parseFloat(fromAmount)
      );
    } else {
      setToAmount("");
    }

    //Check if appropriate inputs are filled
    if (
      fromAmount !== "" &&
      fromTokenId !== "" &&
      toTokenId !== "" &&
      parseFloat(fromAmount) <= parseFloat(userBalance[fromTokenId].balance)
    ) {
      setAllowTransfer(true);
    } else {
      setAllowTransfer(false);
    }
  }, [fromAmount, fromTokenId, toTokenId]);

  //Set error in case of insufficent funds
  useEffect(() => {
    if (fromAmount !== "") {
      if (
        parseFloat(fromAmount) > parseFloat(userBalance[fromTokenId].balance)
      ) {
        setInsufficentFund(true);
      } else {
        setInsufficentFund(false);
      }
      return;
    }
  }, [fromAmount]);

  //Main function: swap a token
  const swapTokens = async () => {
    await delay(2000); // Delay for 2 seconds

    setCurrentStep(2);
    toast("Crossing Bridge");

    await delay(2000); // Delay for another 2 seconds

    setCurrentStep(3);
    toast("Approving Transfer");

    await delay(2000); // Delay for another 2 seconds

    setCurrentStep(4);
    toast("Swap successful", { autoClose: 4000 });

    setUserBalance(
      userBalance.map((token) => {
        if (token.id == fromTokenId) {
          return {
            id: token.id,
            symbol: token.symbol,
            price: token.price,
            balance: token.balance - parseFloat(fromAmount),
          };
        } else if (token.id == toTokenId) {
          return {
            id: token.id,
            symbol: token.symbol,
            price: token.price,
            balance: token.balance + parseFloat(toAmount),
          };
        } else {
          return token;
        }
      })
    );

    setUserTransactions([
      ...userTransactions,
      {
        fromTokenId: fromTokenId,
        toTokenId: toTokenId,
        fromAmount: fromAmount,
        toAmount: toAmount,
      },
    ]);

    setFromAmount("");
    setCurrentStep(1);
  };

  // Function to create delay
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div className="w-[90%] sm:w-[500px] xl:w-[556px] mt-[30px] vsm:mt-[64px] mb-[100px] mx-auto ">
      <div className="w-full mb-[24px] flex flex-col xl:flex-row xl:items-center justify-between">
        <h1 className="text-[34px] font-bold">Cross Swap</h1>
        <button
          onClick={() => setProfile(true)}
          className="flex gap-[5px] items-center "
        >
          <p className="text-[#637592]">({userTransactions.length})</p>
          <p className="text-[#3D6EFF] font-bold">Recent Transactions</p>
        </button>
      </div>

      <div className="relative bg-[#111318] w-full vsm;min-h-[520px] rounded-[12px] px-[15px] py-[20px] sm:p-[40px]">
        <SwapSection
          title="From"
          tokenId={fromTokenId}
          amount={fromAmount}
          setAmount={setFromAmount}
          insuficentFund={insuficentFund}
        />
        <button
          onClick={switchTokens}
          className="my-[21px] mx-auto h-[30px] w-[30px] grid place-items-center border border-white rounded-full"
        >
          <GoArrowDown className="text-[20px]" />
        </button>
        <SwapSection
          title="To"
          tokenId={toTokenId}
          amount={toAmount}
          setAmount={setToAmount}
        />

        {userAddress ? (
          allowTransfer ? (
            <button
              onClick={swapTokens}
              className="mt-[40px] w-full h-[56px] bg-[#3D6EFF] rounded-[12px] font-bold"
            >
              Transfer
            </button>
          ) : (
            <button className="mt-[40px] w-full h-[56px] bg-[#191D24] text-[#3A4455] cur cursor-not-allowed rounded-[12px] font-bold ">
              Enter An Amount
            </button>
          )
        ) : (
          <button
            onClick={() => setConnectWallet(true)}
            className="mt-[40px] w-full h-[56px] bg-[#3D6EFF] rounded-[12px] font-bold"
          >
            Connect Walllet
          </button>
        )}

        <Steps />
      </div>
    </div>
  );
};

export default Swap;
