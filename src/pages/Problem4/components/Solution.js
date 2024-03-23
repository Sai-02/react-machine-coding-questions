import React from "react";
import Tooltip from "./Tooltip";

const Solution = () => {
  return (
    <div className="p-4 flex items-center gap-10 justify-center">
      <Tooltip title="This is tooltip" position={"bottom"}>
        <button className="bg-blue-500 py-1 px-2 rounded text-white">
          Bottom
        </button>
      </Tooltip>

      <Tooltip title="This is tooltip" position={"top"}>
        <button className="bg-blue-500 py-1 px-2 rounded text-white">
          Top
        </button>
      </Tooltip>
      <Tooltip title="This is tooltip" position={"left"}>
        <button className="bg-blue-500 py-1 px-2 rounded text-white">
          Left
        </button>
      </Tooltip>
      <Tooltip title="This is tooltip" position={"right"}>
        <button className="bg-blue-500 py-1 px-2 rounded text-white">
          Right
        </button>
      </Tooltip>
    </div>
  );
};

export default Solution;
