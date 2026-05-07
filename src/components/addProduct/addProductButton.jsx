import React from "react";
import "./add-product-button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddProductButton = ({ onClick }) => {
  return (
    <button className="add-product-button" onClick={onClick}>
      <div className="inner-block-button">
        <div className="text-product-button">Add product</div>
        <div>
          <FontAwesomeIcon icon={faPlus} className="icon-add-product" />
        </div>
      </div>
    </button>
  );
};

export default AddProductButton;
