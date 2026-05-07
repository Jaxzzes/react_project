import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStar as regularStar,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(solidStar, regularStar);

function useStarRating(averageRating) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = rating;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`star-${i}`}
          icon={solidStar}
          className="filled-star"
        />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon key={`empty-star-${i}`} icon={regularStar} />
      );
    }

    return stars;
  };

  return renderStars(averageRating);
}

export default useStarRating;
