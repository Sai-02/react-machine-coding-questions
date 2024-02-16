import React from "react";

const Box = ({ text, isExecutingReset, setStackArray, stackArray }) => {
  const handleClick = () => {
    if (isExecutingReset) return;
    if (stackArray.includes(text)) return;
    setStackArray([...stackArray, text]);
  };
  return (
    <div
      className={`w-20 h-20 border ${isExecutingReset ? "" : "cursor-pointer"}
      ${stackArray.includes(text) ? "bg-green-600" : "bg-yellow-500"}
       flex items-center justify-center`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

export default Box;
