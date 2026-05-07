import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./filters-select.css";

const BrandFilter = ({ brands, onSelect, isOpen, onToggle, selectedBrand }) => {
  const [selectedBrandInternal, setSelectedBrandInternal] = useState(null);
  const [resetMode, setResetMode] = useState(false);
  const optionsRef = useRef(null);
  const [optionsHeight, setOptionsHeight] = useState(0);

  useEffect(() => {
    setSelectedBrandInternal(selectedBrand);
  }, [selectedBrand]);

  useEffect(() => {
    if (optionsRef.current) {
      const height = optionsRef.current.scrollHeight + 5;
      setOptionsHeight(height);
    }
  }, [brands]);

  const handleToggle = () => {
    onToggle();
  };

  const handleSelect = (brand) => {
    setSelectedBrandInternal(brand);
    onSelect(brand);
    setResetMode(true);
    onToggle();
  };

  const handleReset = () => {
    setSelectedBrandInternal(null);
    onSelect(null);
    setResetMode(false);
    onToggle();
  };

  const renderMarker = () => {
    if (resetMode && selectedBrandInternal) {
      return (
        <div className="reset-marker" onClick={handleReset}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      );
    }
  };

  return (
    <div className={`filter-select ${isOpen ? "open" : ""}`}>
      <div className="select-container">
        <div className="selected-value" onClick={handleToggle}>
          {selectedBrandInternal ? selectedBrandInternal : "Brand:"}
          {renderMarker()}
        </div>
        <ul
          className="options"
          ref={optionsRef}
          style={{
            maxHeight: isOpen ? `${optionsHeight}px` : "0px",
            transition: "max-height 0.3s ease-in-out",
            overflow: "hidden",
          }}
        >
          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <li
                key={brand}
                onClick={() => {
                  handleSelect(brand);
                  // onToggle();
                }}
              >
                {brand}
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

export default BrandFilter;
