import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./review-modal.css";
import StarRating from "./StarRating";

const ReviewModal = ({ onClose, onSave, productId }) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSave = async () => {
    if (!username || !description || !rating) {
      console.error("Incomplete review data");
      return;
    }

    try {
      const newReview = {
        username,
        description,
        rating,
      };

      onSave(newReview);
      onClose();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal-header">
          <div className="review-close-button-text">Add Review</div>
          <div className="review-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <input
          type="text"
          placeholder={usernameFocused ? "" : "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          className="review-modal-input"
        />
        <textarea
          placeholder={descriptionFocused ? "" : "Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setDescriptionFocused(true)}
          onBlur={() => setDescriptionFocused(false)}
          className="review-modal-textarea"
        ></textarea>
        <StarRating onRatingChange={handleRatingChange} />
        <div className="review-modal-block-button">
          <button onClick={handleSave} className="review-modal-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
