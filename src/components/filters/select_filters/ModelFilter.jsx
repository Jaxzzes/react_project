import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./filters-select.css";

const ModelFilter = ({
  products,
  selectedBrand,
  onSelect,
  isOpen,
  onToggle,
  selectedModel,
}) => {
  const [selectedModelInternal, setSelectedModelInternal] = useState(null);
  const [filteredModels, setFilteredModels] = useState([]);
  const [resetMode, setResetMode] = useState(false);
  const optionsRef = useRef(null);
  const [optionsHeight, setOptionsHeight] = useState(0);

  useEffect(() => {
    setSelectedModelInternal(selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    setFilteredModels(
      products
        .filter((product) =>
          selectedBrand ? product.brandName === selectedBrand : false
        )
        .map((product) => product.model)
    );
  }, [products, selectedBrand]);

  useEffect(() => {
    if (optionsRef.current) {
      const height = optionsRef.current.scrollHeight + 5;
      setOptionsHeight(height);
    }
  }, [filteredModels]);

  const handleToggle = () => {
    onToggle();
  };

  const handleSelect = (model) => {
    setSelectedModelInternal(model);
    onSelect(model);
    setResetMode(true);
    onToggle();
  };

  const handleReset = () => {
    setSelectedModelInternal(null);
    onSelect(null);
    setResetMode(false);
    onToggle();
  };

  const renderMarker = () => {
    if (resetMode && selectedModelInternal) {
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
          {selectedModelInternal ? selectedModelInternal : "Model:"}
          {renderMarker()}
        </div>
        <ul
          className="options"
          ref={optionsRef}
          style={{
            maxHeight: isOpen ? `${optionsHeight}px` : "0px",
          }}
        >
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <li
                key={model}
                onClick={() => {
                  handleSelect(model);
                  // onToggle();
                }}
              >
                {model}
              </li>
            ))
          ) : (
            <li>Select a brand to choose models</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModelFilter;
