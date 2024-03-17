import React, { useEffect, useRef } from "react";
const SelectYearWindow = ({
  currMonthYearDate,
  setCurrMonthYearDate,
  setShouldOpenSelectYearWindow,
}) => {
  const currYearElementRef = useRef();
  useEffect(() => {
    scrollToCurrYear();
  }, []);
  const selectYear = (year) => {
    const tempDate = new Date(currMonthYearDate);
    tempDate.setFullYear(year);
    setCurrMonthYearDate(tempDate);
    setTimeout(() => {
      setShouldOpenSelectYearWindow(false);
    });
  };
  const scrollToCurrYear = () => {
    if (currYearElementRef && currYearElementRef.current) {
      currYearElementRef.current.scrollIntoView();
    }
  };

  return (
    <div className=" max-h-[16rem] overflow-auto">
      <div className="grid grid-cols-3 justify-center h-full gap-2">
        {[...Array(200)].map((val, index) => {
          return (
            <div
              className={`justify-self-center gap-2 py-1 px-2 cursor-pointer rounded-xl ${
                currMonthYearDate.getFullYear() === index + 1900
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 "
              }`}
              key={index + 1900}
              onClick={() => {
                selectYear(index + 1900);
              }}
              {...(index + 1900 === currMonthYearDate.getFullYear()
                ? { ref: currYearElementRef }
                : {})}
            >
              {index + 1900}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectYearWindow;
