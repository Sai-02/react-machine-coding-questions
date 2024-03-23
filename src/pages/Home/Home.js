import React from "react";
import { Link } from "react-router-dom";
import { URL_PATHS } from "../../constants";

const Home = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl text-center ">React Questions</h1>
      <div className="mt-4 flex flex-col gap-3 text-blue-500">
        <Link to={URL_PATHS.PROBLEM1} className="hover:underline">
          Problem 1
        </Link>
        <Link to={URL_PATHS.PROBLEM2} className="hover:underline">
          Problem 2 (Stop Watch)
        </Link>
        <Link to={URL_PATHS.PROBLEM3} className="hover:underline">
          Problem 3 (Date Picker)
        </Link>
        <Link to={URL_PATHS.PROBLEM4} className="hover:underline">
          Problem 4 (Tooltip)
        </Link>
      </div>
    </div>
  );
};

export default Home;
