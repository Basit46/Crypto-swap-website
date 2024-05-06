import { ethers } from "ethers";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { networks } from "../data/networks";
import { useGlobalContext } from "./globalContext";

const walletContext = createContext();

const WalletProvider = ({ children }) => {
  const { setCurrNetworkIndex } = useGlobalContext();

  //Store and retrieve user address from localstorage
  const storedAddress = localStorage.getItem("address")
    ? localStorage.getItem("address")
    : "";
  const [userAddress, setUserAddress] = useState(storedAddress);
  useEffect(() => {
    localStorage.setItem("address", userAddress);
  }, [userAddress]);

  //Store and retrieve user balance from localstorage
  const storedBalance = localStorage.getItem("balance")
    ? JSON.parse(localStorage.getItem("balance"))
    : [
        {
          id: 0,
          symbol: "ETH",
          price: 3145.13,
          balance: 100.0,
        },
        {
          id: 1,
          symbol: "BNB",
          price: 591.99,
          balance: 100.0,
        },
        {
          id: 2,
          symbol: "MATIC",
          price: 0.7358,
          balance: 100.0,
        },
        {
          id: 3,
          symbol: "FTM",
          price: 0.7087,
          balance: 100.0,
        },
        {
          id: 4,
          symbol: "CRO",
          price: 0.131853,
          balance: 100.0,
        },
      ];
  const [userBalance, setUserBalance] = useState(storedBalance);
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(userBalance));
  }, [userBalance]);

  //Store and retrieve user transactions from localstorage
  const storedTransactions = localStorage.getItem("transactions")
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];
  const [userTransactions, setUserTransactions] = useState(storedTransactions);
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(userTransactions));
  }, [userTransactions]);

  //To store the current network
  const [userNetwork, setUserNetwork] = useState({ name: null, chainId: null });

  let signer = null;

  //Connect wallet with site
  const connectwalletHandler = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      toast("MetaMask not installed");
      toast("Best used on a desktops", { autoClose: 5000 });
      provider = ethers.getDefaultProvider();
    } else {
      let provider = new ethers.BrowserProvider(window.ethereum);
      await getUserDetails();
    }
  };

  //Get user's address, network and balance
  const getUserDetails = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const address = await signer.getAddress();
    setUserAddress(address);

    const network = await provider.getNetwork();
    setUserNetwork({ name: network.name, chainId: network.chainId });

    setCurrNetworkIndex(
      networks.findIndex((data) => data.chainId == network.chainId)
    );
  };

  //Add a network to user's wallet if network is not in user's wallet
  const addNetwork = async (network) => {
    let provider = new ethers.BrowserProvider(window.ethereum);

    const { chainId, rpcUrls, chainName, nativeCurrency, blockExplorerUrls } =
      network;

    await provider.send(
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId,
            rpcUrls,
            chainName,
            nativeCurrency,
            blockExplorerUrls,
          },
        ],
      })
    );
  };

  //Change a network to another network
  const switchNetwork = async (network) => {
    let provider = new ethers.BrowserProvider(window.ethereum);

    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: network.chainId },
      ]);

      await getUserDetails();
      console.log("changed network");
    } catch (error) {
      await addNetwork(network);
      await getUserDetails();
      console.log("Added new network");
    }
  };

  return (
    <walletContext.Provider
      value={{
        userAddress,
        setUserAddress,
        userBalance,
        setUserBalance,
        connectwalletHandler,
        userNetwork,
        setUserNetwork,
        switchNetwork,
        userTransactions,
        setUserTransactions,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

export default WalletProvider;

export const useWalletContext = () => {
  return useContext(walletContext);
};
