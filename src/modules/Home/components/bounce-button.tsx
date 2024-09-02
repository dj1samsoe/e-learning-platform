import React from "react";
import { FaAnglesDown } from "react-icons/fa6";

const onClick = () => {
  window.scrollTo({
    top: 850,
    behavior: "smooth",
  });
};

const BounceButton = () => {
  return (
    <div
      className="animate-bounce text-white flex flex-col space-y-3 items-center cursor-pointer"
      onClick={onClick}
    >
      <FaAnglesDown size={50} />
      <p className="italic text-md">Gulir ke bawah</p>
    </div>
  );
};

export default BounceButton;
