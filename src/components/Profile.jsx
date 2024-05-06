import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { IoCopyOutline } from "react-icons/io5";
import { useWalletContext } from "../context/walletContext";
import { toast } from "react-toastify";
import { networks } from "../data/networks";

const Profile = () => {
  const { profile, setProfile } = useGlobalContext();
  const { userAddress, setUserAddress, userTransactions } = useWalletContext();

  const handleLogOut = () => {
    setUserAddress("");
    setProfile(false);
  };

  function copyToClipboard() {
    navigator.clipboard
      .writeText(userAddress)
      .then(() => {
        toast("Address copied");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  }

  console.log(userTransactions);

  return (
    <div className={`modal-bg ${!profile && "hidden"}`}>
      <div className="bg-[#080A0C] w-[556px] h-fit rounded-[12px] p-[40px]">
        <div className="flex items-center justify-between">
          <p className="font-[600]">Address</p>
          <button onClick={() => setProfile(false)}>
            <FaTimes className="text-[red] cursor-pointer" />
          </button>
        </div>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          <div className="px-[16px] py-[12px] rounded-[12px] border border-[#191D24] font-sans">
            <p>
              {userAddress !== "" &&
                userAddress.slice(0, 6) + "..." + userAddress.slice(-4)}
            </p>

            <button
              onClick={copyToClipboard}
              className="my-[20px] flex gap-[10px] items-center text-[#3D6EFF] text-[14px] font-medium"
            >
              <IoCopyOutline />
              <p>Copy Address</p>
            </button>

            <button
              onClick={handleLogOut}
              className="border border-[red] rounded-[12px] px-[16px] py-[6px] text-[red]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-[20px]">
          {userTransactions.length > 0 ? (
            <div>
              <h1 className="mb-[10px]">Transactions:</h1>
              {userTransactions.map((transaction, i) => (
                <div
                  key={i}
                  className="flex gap-[4px] items-center text-[13px]"
                >
                  <p>{parseFloat(transaction.fromAmount).toFixed(2)}</p>
                  <img
                    className="h-[15px]"
                    src={networks[transaction.fromTokenId].img}
                    alt="crypto logo"
                  />
                  <p className="mx-[10px]">TO</p>
                  <p>{parseFloat(transaction.toAmount).toFixed(2)}</p>
                  <img
                    className="h-[15px]"
                    src={networks[transaction.toTokenId].img}
                    alt="crypto logo"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-center text-[#637592]">
              Your transactions will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
