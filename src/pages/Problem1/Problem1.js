import React from "react";
import Solution from "./components/Solution";

const Problem1 = () => {
  return (
    <div className="p-4">
      <h1 className="">Problem 1</h1>
      <p className="">
        <ol className="">
          <li className="">
            The UI should look like shown with 7 boxes shaped in C shape.
          </li>
          <li className="">On clicking the box, its color changes to green.</li>
          <li className="">
            When all boxes are green, they should again go back to the previous
            color yellow, one by one, by a 1-second delay, in the same order as
            they were clicked.
          </li>
        </ol>
      </p>
      <Solution />
    </div>
  );
};

export default Problem1;
