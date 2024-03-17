import {
  faCalendar,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import SelectYearWindow from "./SelectYearWindow";

const DatePicker = () => {
  const [shouldOpenDateDialog, setShouldOpenDateDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const shouldOpenDateDialogRef = useRef(shouldOpenDateDialog);
  const [shouldOpenSelectYearWindow, setShouldOpenSelectYearWindow] =
    useState(false);
  const [currMonthYearDate, setCurrMonthYearDate] = useState(new Date());
  const [dateArray, setDateArray] = useState();
  useEffect(() => {
    shouldOpenDateDialogRef.current = shouldOpenDateDialog;
  }, [shouldOpenDateDialog]);
  const dateDialogRef = useRef();
  const openDateDialog = () => {
    setShouldOpenDateDialog(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickAnywhere);
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);

  useEffect(() => {
    changeDatesInCalendar();
  }, [currMonthYearDate]);

  const handleClickAnywhere = (e) => {
    if (
      shouldOpenDateDialogRef.current &&
      dateDialogRef.current &&
      !dateDialogRef.current.contains(e.target)
    ) {
      handleClickOutsideDateDialog();
    }
  };
  const handleClickOutsideDateDialog = () => {
    setShouldOpenDateDialog(false);
  };

  const incrementMonth = () => {
    const tempDate = new Date(currMonthYearDate);
    tempDate.setMonth(tempDate.getMonth() + 1);
    setCurrMonthYearDate(tempDate);
  };
  const decrementMonth = () => {
    const tempDate = new Date(currMonthYearDate);
    tempDate.setMonth(tempDate.getMonth() - 1);
    setCurrMonthYearDate(tempDate);
  };

  const daysNameArray = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const changeDatesInCalendar = () => {
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    const days = daysInMonth(
      currMonthYearDate.getMonth() + 1,
      currMonthYearDate.getFullYear()
    );
    let dateArray = [{}],
      index = 0;
    for (let i = 1; i <= days; i++) {
      const date = new Date(currMonthYearDate);
      date.setDate(i);
      const day = date.getDay();
      dateArray[index][daysNameArray[day]] = i;
      if (day === 6) {
        dateArray.push({});
        index++;
      }
    }
    setDateArray(dateArray);
  };

  const getMonthName = (date) =>
    date.toLocaleString("default", { month: "long" });
  return (
    <div className="">
      <div className="border rounded flex p-2 max-w-[300px] relative">
        <div className="grow">{selectedDate.toDateString()}</div>
        <div className="">
          <FontAwesomeIcon
            icon={faCalendar}
            className="cursor-pointer text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              openDateDialog();
            }}
          />
          {shouldOpenDateDialog && (
            <div
              className="absolute  top-[48px] left-[0] w-[300px] shadow rounded z-[2] bg-white overflow-hidden"
              ref={dateDialogRef}
            >
              <div className="flex items-center justify-between p-4 pb-0">
                <p className="flex items-center gap-2">
                  <span className="">
                    {getMonthName(currMonthYearDate)},{" "}
                    {currMonthYearDate.getFullYear()}
                  </span>
                  <span className="p-2 hover:bg-gray-100 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={
                        shouldOpenSelectYearWindow ? faChevronUp : faChevronDown
                      }
                      onClick={() => {
                        setShouldOpenSelectYearWindow(
                          !shouldOpenSelectYearWindow
                        );
                      }}
                    />
                  </span>
                </p>
                {shouldOpenSelectYearWindow ? (
                  ""
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className="flex items-center justify-center w-[40px] h-[40px] hover:bg-gray-200 rounded-full cursor-pointer"
                      onClick={decrementMonth}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span
                      className="flex items-center justify-center w-[40px] h-[40px] hover:bg-gray-200 rounded-full cursor-pointer"
                      onClick={incrementMonth}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </div>
                )}
              </div>

              {shouldOpenSelectYearWindow ? (
                <SelectYearWindow
                  currMonthYearDate={currMonthYearDate}
                  setCurrMonthYearDate={setCurrMonthYearDate}
                  setShouldOpenSelectYearWindow={setShouldOpenSelectYearWindow}
                />
              ) : (
                <div className="mt-4 grid grid-cols-7 gap-2 justify-center p-4 pt-0">
                  {daysNameArray.map((val) => {
                    return (
                      <div
                        className="text-gray-500 h-8 w-8 justify-items-center flex items-center justify-center"
                        key={val}
                      >
                        {val}
                      </div>
                    );
                  })}

                  {dateArray.map((val, index) => {
                    return (
                      <>
                        {daysNameArray.map((day) => {
                          return (
                            <div
                              className={`${
                                val[day]
                                  ? `cursor-pointer rounded-full ${
                                      selectedDate.getDate() === val[day] &&
                                      selectedDate.getMonth() ===
                                        currMonthYearDate.getMonth() &&
                                      selectedDate.getFullYear() ===
                                        currMonthYearDate.getFullYear()
                                        ? "bg-blue-500 text-white"
                                        : " hover:bg-blue-100"
                                    } flex items-center justify-center  h-8 w-8`
                                  : ""
                              }`}
                              key={day + index}
                              onClick={() => {
                                if (val[day]) {
                                  const date = new Date(currMonthYearDate);
                                  date.setDate(val[day]);
                                  setSelectedDate(date);
                                  setShouldOpenDateDialog(false);
                                }
                              }}
                            >
                              {val[day] || ""}
                            </div>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
