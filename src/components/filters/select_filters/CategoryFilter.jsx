import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./filters-select.css";

const CategoryFilter = ({
  categories,
  onSelect,
  isOpen,
  onToggle,
  selectedCategory,
}) => {
  const [selectedCategoryInternal, setSelectedCategoryInternal] =
    useState(null);
  const [resetMode, setResetMode] = useState(false);
  const optionsRef = useRef(null);
  const [optionsHeight, setOptionsHeight] = useState(0);

  useEffect(() => {
    setSelectedCategoryInternal(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (optionsRef.current) {
      const height = optionsRef.current.scrollHeight + 5;
      setOptionsHeight(height);
    }
  }, [categories]);

  const handleToggle = () => {
    onToggle();
  };

  const handleSelect = (category) => {
    setSelectedCategoryInternal(category);
    onSelect(category);
    setResetMode(true);
    onToggle();
  };

  const handleReset = () => {
    setSelectedCategoryInternal(null);
    onSelect(null);
    setResetMode(false);
    onToggle();
  };

  const renderMarker = () => {
    if (resetMode && selectedCategoryInternal) {
      return (
        <div className="reset-marker" onClick={handleReset}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    } else {
      return <FontAwesomeIcon icon={faChevronDown} />;
    }
  };

  return (
    <div className={`filter-select ${isOpen ? "open" : ""}`}>
      <div className="select-container">
        <div className="selected-value" onClick={handleToggle}>
          {selectedCategoryInternal ? selectedCategoryInternal : "Category:"}
          {renderMarker()}
        </div>
        <ul
          className="options"
          ref={optionsRef}
          style={{
            maxHeight: isOpen ? `${optionsHeight}px` : "0px",
          }}
        >
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  handleSelect(category);
                  // onToggle();
                }}
              >
                {category}
              </li>
            ))
          ) : (
            <li>No data</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
