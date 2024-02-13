// CategoryFilter.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import './filters-select.css';

const CategoryFilter = ({ categories, onSelect, isOpen, onToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [resetMode, setResetMode] = useState(false);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    onSelect(category);
    setResetMode(true);
    onToggle(); // Close all selects
  };

  const handleReset = () => {
    setSelectedCategory(null);
    onSelect(null);
    setResetMode(false);
  };

  const renderMarker = () => {
    if (resetMode && !isOpen && selectedCategory) {
      return (
        <div className="reset-marker" onClick={handleReset}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    } else {
      return <FontAwesomeIcon icon={faChevronDown} />;
    }
  };

  const marginBottomValue = isOpen ? Math.max(33.3333, categories.length * 33.3333) + 'px' : resetMode ? '33.3333px' : '33.3333px';

  return (
    <div
      className={`filter-select ${isOpen ? 'open' : ''}`}
      style={{ marginBottom: marginBottomValue }}
      onMouseEnter={() => setResetMode(true)}
      onMouseLeave={() => setResetMode(false)}
    >
      <div className={`select-container ${isOpen ? 'open' : ''}`}>
        <div className="selected-value" onClick={onToggle}>
          {selectedCategory ? selectedCategory : 'Category:'}
          {renderMarker()}
        </div>
        <ul className="options">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <li key={category} onClick={() => handleSelect(category)}>
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