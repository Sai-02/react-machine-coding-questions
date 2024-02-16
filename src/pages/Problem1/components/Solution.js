import React, { useEffect, useState } from "react";
import Box from "./Box";

const Solution = () => {
  const arr = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
  ];
  const [stackArray, setStackArray] = useState([]);
  const [isExecutingReset, setIsExecutingReset] = useState(false);

  useEffect(() => {
    if (stackArray.length === 7) {
      executeReset();
    }
  }, [stackArray]);

  const executeReset = () => {
    setIsExecutingReset(true);
    const interval = setInterval(() => {
      setStackArray((prevStackArray) => {
        if (prevStackArray.length > 0) {
          const newArr = [...prevStackArray];
          newArr.pop();
          if (newArr.length === 0) {
            clearInterval(interval);
            setIsExecutingReset(false);
          }
          return newArr;
        }
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        {arr.slice(0, 3).map((val) => {
          return (
            <Box
              key={val.id}
              text={val.id}
              isExecutingReset={isExecutingReset}
              stackArray={stackArray}
              setStackArray={setStackArray}
            />
          );
        })}
      </div>
      <div className="flex gap-4">
        <Box
          key={4}
          text={4}
          isExecutingReset={isExecutingReset}
          stackArray={stackArray}
          setStackArray={setStackArray}
        />
      </div>
      <div className="flex gap-4">
        {arr.slice(6).map((val) => {
          return (
            <Box
              key={val.id}
              text={val.id}
              isExecutingReset={isExecutingReset}
              stackArray={stackArray}
              setStackArray={setStackArray}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Solution;
