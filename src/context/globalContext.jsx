import React, { createContext, useState, useContext } from "react";

const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [currNetworkIndex, setCurrNetworkIndex] = useState(0);
  const [fromTokenId, setFromTokenId] = useState("");
  const [toTokenId, setToTokenId] = useState("");

  const [isFromToken, setIsFromToken] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);

  //States to manage the modals' opening ang closing
  const [selectNetwork, setSelectNetwork] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  const [profile, setProfile] = useState(false);
  const [selectToken, setSelectToken] = useState(false);

  return (
    <globalContext.Provider
      value={{
        currNetworkIndex,
        setCurrNetworkIndex,
        isFromToken,
        setIsFromToken,
        selectNetwork,
        setSelectNetwork,
        connectWallet,
        setConnectWallet,
        profile,
        setProfile,
        selectToken,
        setSelectToken,
        fromTokenId,
        setFromTokenId,
        toTokenId,
        setToTokenId,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(globalContext);
};
