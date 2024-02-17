import React, { useEffect, useRef, useState } from "react";

const Solution = () => {
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [hours, setHours] = useState(0);

  const minsRef = useRef(mins);
  const secsRef = useRef(secs);
  const hoursRef = useRef(hours);

  useEffect(() => {
    minsRef.current = mins;
  }, [mins]);
  useEffect(() => {
    secsRef.current = secs;
  }, [secs]);
  useEffect(() => {
    hoursRef.current = hours;
  }, [hours]);

  const [intervalID, setIntervalID] = useState("");
  const handleStart = () => {
    const intervalID = setInterval(() => {
      let newSec = secsRef.current + 1,
        newHour = hoursRef.current,
        newMin = minsRef.current;
      if (newSec === 60) {
        newSec = 0;
        newMin++;
        if (newMin === 60) {
          newMin = 0;
          newHour++;
        }
      }
      setHours(newHour);
      setMins(newMin);
      setSecs(newSec);
    }, 1000);
    setIntervalID(intervalID);
  };

  const stop = () => {
    clearInterval(intervalID);
    setIntervalID("");
  };

  const reset = () => {
    stop();
    setHours(0);
    setMins(0);
    setSecs(0);
  };

  return (
    <div className="flex flex-col gap-2 mt-10 text-center justify-center">
      <div className="flex items-center gap-4 justify-center">
        {intervalID ? (
          <button
            className="bg-red-400 text-white rounded p-1 px-2"
            onClick={stop}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white rounded p-1 px-2"
            onClick={handleStart}
          >
            Start
          </button>
        )}

        <button
          className="bg-gray-400 text-white rounded p-1 px-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <div className="text-3xl">
        {hours} : {mins} : {secs}
      </div>
    </div>
  );
};

export default Solution;
