import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalProvider from "./context/globalContext.jsx";
import WalletProvider from "./context/walletContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </GlobalProvider>
  </React.StrictMode>
);
