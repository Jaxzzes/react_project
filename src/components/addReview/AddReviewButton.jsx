import React from "react";
import "./add-review-button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddReviewButton = ({ onClick }) => {
  return (
    <button className="add-review-button" onClick={onClick}>
      <div className="inner-block-button">
        <div className="text-review-button">Add review</div>
        <div>
          <FontAwesomeIcon icon={faPlus} className="icon-add-review" />
        </div>
      </div>
    </button>
  );
};

export default AddReviewButton;
