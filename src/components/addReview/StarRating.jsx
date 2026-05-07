import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./star-rating.css";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseOver = (selectedRating) => {
    setHoveredRating(selectedRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="review-modal-star-rating" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={
            (hoveredRating ? hoveredRating : rating) >= index
              ? "review-modal-star selected"
              : "review-modal-star"
          }
          onMouseOver={() => handleMouseOver(index)}
          onClick={() => handleClick(index)}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
