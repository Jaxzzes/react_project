
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import './filters-select.css';

const BrandFilter = ({ brands, onSelect, isOpen, onToggle }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [resetMode, setResetMode] = useState(false);

  const handleSelect = (brand) => {
    setSelectedBrand(brand);
    onSelect(brand);
    setResetMode(true);
    onToggle();
  };

  const handleReset = () => {
    setSelectedBrand(null);
    onSelect(null);
    setResetMode(false);
    onToggle();
  };

  const renderMarker = () => {
    if (resetMode && !isOpen && selectedBrand) {
      return (
        <div className="reset-marker" onClick={() => { handleReset(); onToggle(); }}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    } else {
      return <FontAwesomeIcon icon={faChevronDown} />;
    }
  };

  const marginBottomValue = isOpen ? Math.max(33.3333, brands.length * 33.3333) + 'px' : resetMode ? '33.3333px' : '33.3333px';

  return (
    <div
      className={`filter-select ${isOpen ? 'open' : ''}`}
      style={{ marginBottom: marginBottomValue }}
      onMouseEnter={() => setResetMode(true)}
      onMouseLeave={() => setResetMode(false)}
    >
      <div className={`select-container ${isOpen ? 'open' : ''}`}>
        <div className="selected-value" onClick={onToggle}>
          {selectedBrand ? selectedBrand : 'Brand:'}
          {renderMarker()}
        </div>
        <ul className="options">
          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <li key={brand} onClick={() => handleSelect(brand)}>
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