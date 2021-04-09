import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Spinner = ({ size }) => {
  return (
    <div className="flex justify-center items-center absolute mx-auto h-full w-full">
      <PulseLoader color={"#1f2937"} loading={true} size={size} />
    </div>
  );
};
export default Spinner;
