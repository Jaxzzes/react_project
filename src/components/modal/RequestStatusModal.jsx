import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./RequestStatusModal.css";

function RequestStatusModal({ isOpen, type, title, text, onClose }) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="request-status-backdrop" onClick={onClose}>
      <div
        className="request-status-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`request-status-icon ${isSuccess ? "success" : "error"}`}
        >
          {isSuccess ? <FaCheck /> : <FaTimes />}
        </div>

        <h3 className="request-status-title">{title}</h3>
        <p className="request-status-text">{text}</p>

        <button
          type="button"
          className="request-status-button"
          onClick={onClose}
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
}

export default RequestStatusModal;
