import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./reviews.css";
import AddReviewButton from "../addReview/AddReviewButton.jsx";
import ReviewModal from "../addReview/ReviewModal.jsx";
import useStarRating from "../../hooks/useStarRating.js";

function ProductReviews({ reviews, productId }) {
  const [productReviews, setProductReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortByDateAscending, setSortByDateAscending] = useState(false);
  const [sortByRatingAscending, setSortByRatingAscending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const renderStars = useStarRating;

  useEffect(() => {
    setSortedReviews(reviews);
    setProductReviews(reviews);
  }, [reviews]);

  const sortByDate = () => {
    const newAscending = !sortByDateAscending;
    setSortByDateAscending(newAscending);
    setSortByRatingAscending(false);
    setSortBy(newAscending ? "dateAscending" : "dateDescending");

    const sortedByDate = [...productReviews].sort((a, b) => {
      const dateA = new Date(a.datePublication);
      const dateB = new Date(b.datePublication);
      return newAscending ? dateA - dateB : dateB - dateA;
    });

    setSortedReviews(sortedByDate);
  };

  const sortByRating = () => {
    const newAscending = !sortByRatingAscending;
    setSortByRatingAscending(newAscending);
    setSortByDateAscending(false);
    setSortBy(newAscending ? "ratingAscending" : "ratingDescending");

    const sortedByRating = [...productReviews].sort((a, b) => {
      return newAscending ? a.rating - b.rating : b.rating - a.rating;
    });

    setSortedReviews(sortedByRating);
  };

  const formatTimeDifference = (date) => {
    const now = new Date();
    const publicationDate = new Date(date);
    const difference = now.getTime() - publicationDate.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    switch (true) {
      case years > 0:
        return `${years} year${years > 1 ? "s" : ""} ago`;
      case months > 0:
        return `${months} month${months > 1 ? "s" : ""} ago`;
      case days > 0:
        return `${days} day${days > 1 ? "s" : ""} ago`;
      case hours > 0:
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      case minutes > 0:
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      case seconds > 0:
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
      default:
        return "now";
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${productId}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setProductReviews(data);
        setSortedReviews(data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleSaveReview = (newReview) => {
    if (!newReview.username || !newReview.description || !newReview.rating) {
      console.error("Incomplete review data");
      return;
    }

    fetch(`http://localhost:3000/api/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add review");
        }
        return res.json();
      })
      .then((data) => {
        setProductReviews(data);
        setSortedReviews(data);
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  const handleDeleteReview = (reviewId) => {
    fetch(
      `http://localhost:3000/api/products/${productId}/reviews/${reviewId}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (res.ok) {
          const updatedReviews = productReviews.filter(
            (review) => review._id !== reviewId
          );
          setProductReviews(updatedReviews);
          setSortedReviews(updatedReviews);
        } else {
          throw new Error("Failed to delete review");
        }
      })
      .catch((error) => console.error("Error deleting review:", error));
    setShowDeleteModal(false);
  };

  const handleAddReview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteModal(true);
  };

  return (
    <div className="product-reviews">
      <div className="reviews-sort-buttons">
        <button
          onClick={sortByDate}
          className={`sort-button ${
            sortBy === "dateAscending" ? "active" : ""
          }`}
        >
          <div className="text-button">Sort by Date</div>
          <div className="sort-icons">
            <div className="icon-up">
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`arrow-icon ${
                  sortBy === "dateAscending" ? "active" : ""
                }`}
              />
            </div>
            <div className="icon-bottom">
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`arrow-icon ${
                  sortBy === "dateDescending" ? "active" : ""
                }`}
              />
            </div>
          </div>
        </button>
        <button
          onClick={sortByRating}
          className={`sort-button ${
            sortBy === "ratingAscending" ? "active" : ""
          }`}
        >
          <div className="text-button">Sort by Rating</div>
          <div className="sort-icons">
            <div className="icon-up">
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`arrow-icon ${
                  sortBy === "ratingDescending" ? "active" : ""
                }`}
              />
            </div>
            <div className="icon-bottom">
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`arrow-icon ${
                  sortBy === "ratingAscending" ? "active" : ""
                }`}
              />
            </div>
          </div>
        </button>
        <AddReviewButton onClick={handleAddReview} />
      </div>
      {sortedReviews.map((review) => (
        <div className="reviews-card" key={review._id}>
          <div className="reviews-header">
            <div className="reviews-username">
              <strong>{review.username}</strong>
            </div>

            <div className="star-rating">{renderStars(review.rating)}</div>
          </div>

          <div className="reviews-content">
            <div>
              <p className="reviews-description">{review.description}</p>

              <div className="reviews-date">
                Date publication: {formatTimeDifference(review.datePublication)}
              </div>
            </div>
            <div className="reviews-delete">
              <button
                className="delete-review-button"
                onClick={() => openDeleteModal(review._id)}
              >
                <FontAwesomeIcon icon={faTimes} className="delete-icon" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {showModal && (
        <ReviewModal
          onClose={handleCloseModal}
          onSave={handleSaveReview}
          productId={productId}
        />
      )}
      {showDeleteModal && (
        <div
          className="delete-modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <p className="delete-modal-text">
              Are you sure you want to remove this review?
            </p>
            <div className="delete-modal-buttons">
              <button
                className="delete-modal-button-yes"
                onClick={() => handleDeleteReview(reviewToDelete)}
              >
                Yes
              </button>
              <button
                className="delete-modal-button-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
