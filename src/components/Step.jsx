import React, { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

const Step = ({ id, name }) => {
  const { currentStep } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="step relative pl-[30px] ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          currentStep == id && "bg-[#3D6EFF]"
        } absolute bg-[#080a0c] cursor-pointer top-0 left-[-14px] h-[28px] w-[28px] border-[1px] border-white grid place-items-center rounded-full duration-500`}
      >
        {id}
      </button>
      <h1
        className={`${
          id !== 4 && id !== 1 && "mb-[40px]"
        }  font-medium text-center`}
      >
        {name}
      </h1>
      {id == 1 && (
        <div
          style={{
            height: isOpen ? "250px" : "40px",
          }}
          className="relative overflow-hidden text-center duration-200"
        >
          <li>Minimum Crosschain Amount is 0.08 BNB</li>
          <li>Maximum Crosschain Amount is 12,000 BNB</li>
          <li>Estimated Time of Crosschain Arrival is 10-30 min</li>
          <li>
            Crosschain amount larger than 2,100 BNB could take up to 12 hours
          </li>

          <div
            style={{
              opacity: isOpen ? "0" : "1",
              height: !isOpen ? "230px" : "40px",
            }}
            className="absolute left-0 top-0 w-full h-[40px] bg-[#080a0c]"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Step;
