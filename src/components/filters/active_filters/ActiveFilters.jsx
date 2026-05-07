// ActiveFilters.js
import React from "react";
import "./filters-active.css";

const ActiveFilters = ({ filters }) => {
  const activeFilters = Object.entries(filters).filter(([_, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  });

  const containerClass =
    activeFilters.length > 0
      ? "active-filters-container active"
      : "active-filters-container";

  return (
    <div className={containerClass}>
      <label className="active-filter-title">Active filters</label>
      {activeFilters.map(([key, value]) => (
        <div key={key} className="active-filter">
          <span className="active-filter-name">{key}: </span>
          <span className="active-filter-value">
            {Array.isArray(value) ? value.join(", ") : value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
