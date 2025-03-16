import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const StarRating = () => {
  const STARS = 5;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const showShowSelected = (index) => {
    if (hoverRating > 0) {
      return hoverRating >= index + 1;
    }
    return rating >= index + 1;
  };
  return (
    <div className="flex items-center gap-3 mt-4">
      {[...Array(STARS)].map((_, index) => {
        return (
          <div className="">
            <FontAwesomeIcon
              icon={faStar}
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className={`text-gray-600 cursor-pointer ${
                showShowSelected(index) ? "text-yellow-500" : ""
              } hover:text-yellow-600 hover:scale-[1.5]`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
