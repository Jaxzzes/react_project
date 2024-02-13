// ModelFilter.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import './filters-select.css';

const ModelFilter = ({ products, selectedBrand, onSelect, isOpen, onToggle }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [filteredModels, setFilteredModels] = useState([]);
  const [resetMode, setResetMode] = useState(false);

  useEffect(() => {
    setFilteredModels(
      products
        .filter((product) => (selectedBrand ? product.brandName === selectedBrand : false))
        .map((product) => product.model)
    );
  }, [products, selectedBrand]);

  const handleSelect = (model) => {
    setSelectedModel(model);
    onSelect(model);
    setResetMode(true);
    onToggle(); // Close all selects
  };

  const handleReset = () => {
    setSelectedModel(null);
    onSelect(null);
    setResetMode(false);
  };

  const renderMarker = () => {
    if (resetMode && !isOpen && selectedModel) {
      return (
        <div className="reset-marker" onClick={handleReset}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    } else {
      return <FontAwesomeIcon icon={faChevronDown} />;
    }
  };

  const marginBottomValue = isOpen ? Math.max(33.3333, filteredModels.length * 33.3333) + 'px' : resetMode ? '33.3333px' : '33.3333px';

  return (
    <div
      className={`filter-select ${isOpen ? 'open' : ''}`}
      style={{ marginBottom: marginBottomValue }}
      onMouseEnter={() => setResetMode(true)}
      onMouseLeave={() => setResetMode(false)}
    >
      <div className={`select-container ${isOpen ? 'open' : ''}`}>
        <div className="selected-value" onClick={onToggle}>
          {selectedModel ? selectedModel : 'Model:'}
          {renderMarker()}
        </div>
        <ul className="options">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <li key={model} onClick={() => handleSelect(model)}>
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