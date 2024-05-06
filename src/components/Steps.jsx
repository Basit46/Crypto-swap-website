import React from "react";
import Step from "./Step";

const Steps = () => {
  return (
    <div className="absolute  left-[20px] top-[105%] xl:top-0 xl:left-[105%] h-fit w-[80%] sm:w-[290px] border-l-[1px] border-[#637592]">
      <Step id={1} name="Starting Swap" />
      <Step id={2} name="Crossing Bridge" />
      <Step id={3} name="Approving Transfer" />
      <Step id={4} name="Complete" />
      <div className="xl:hidden h-[100px] w-full bg-[#080a0c] ml-[-3px]" />
    </div>
  );
};

export default Steps;
