import React, { useState } from "react";

const Tooltip = ({ children, title, position }) => {
  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const showTooltip = () => {
    setTooltipVisibility(true);
  };
  const hideTooltip = () => {
    setTooltipVisibility(false);
  };

  const getPositionStyles = () => {
    switch (position) {
      case "bottom":
        return `top-[calc(100%+10px)] left-[50%] translate-x-[-50%]`;

      case "top":
        return `bottom-[calc(100%+10px)] left-[50%] translate-x-[-50%]`;

      case "right":
        return `top-[50%] left-[calc(100%+10px)] translate-y-[-50%]`;

      case "left":
        return `top-[50%] right-[calc(100%+10px)] translate-y-[-50%]`;

      default:
        return `top-[calc(100%+10px)] left-[0] `;
    }
  };
  return (
    <>
      <div
        className="relative"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
        {tooltipVisibility && (
          <div
            className={`absolute bg-gray-500 text-white rounded px-1 text-sm py-[2px] ${getPositionStyles()} z-[2] w-max`}
          >
            {title || ""}
          </div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
