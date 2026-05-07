import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./filters-checkbox.css";

const CheckboxFilter = ({
  products,
  onFilterChange,
  appliedFilters = {},
  selectedBrand,
  selectedModel,
  selectedCategory,
  minPrice,
  maxPrice,
}) => {
  const [openAccordion, setOpenAccordion] = useState(-1);
  const [uniqueFeatures, setUniqueFeatures] = useState([]);
  const contentRefs = useRef([]);
  const [contentHeights, setContentHeights] = useState([]);

  useEffect(() => {
    const heights = uniqueFeatures.map((_, idx) => {
      const el = contentRefs.current[idx];
      return el ? el.scrollHeight + 5 : 0;
    });
    setContentHeights(heights);
  }, [uniqueFeatures, products]);

  useEffect(() => {
    const featuresMap = new Map();

    products.forEach((product) => {
      product.features.forEach((feature) => {
        if (!featuresMap.has(feature.name)) {
          featuresMap.set(feature.name, new Set());
        }
        featuresMap.get(feature.name).add(feature.value);
      });
    });

    const uniqueFeaturesArray = Array.from(featuresMap.entries()).map(
      ([name, values]) => ({
        name,
        values: Array.from(values).sort((a, b) => a - b),
      }),
    );

    setUniqueFeatures(uniqueFeaturesArray);
  }, [products]);

  const toggleAccordion = (index) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleCheckboxChange = (featureName, value) => {
    const newFilters = { ...appliedFilters };
    if (newFilters[featureName]) {
      if (newFilters[featureName].includes(value)) {
        newFilters[featureName] = newFilters[featureName].filter(
          (item) => item !== value,
        );
      } else {
        newFilters[featureName] = [...newFilters[featureName], value];
      }
    } else {
      newFilters[featureName] = [value];
    }
    onFilterChange(newFilters);
  };

  const isCheckboxDisabled = (featureName, value) => {
    const filteredProducts = products.filter((product) => {
      for (const feature in appliedFilters) {
        if (appliedFilters[feature] && appliedFilters[feature].length > 0) {
          if (
            !appliedFilters[feature].includes(
              product.features.find((feat) => feat.name === feature)?.value,
            )
          ) {
            return false;
          }
        }
      }
      return true;
    });

    const priceFilteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    if (
      filteredProducts.length === 0 ||
      !priceFilteredProducts.some((product) =>
        product.features.find(
          (feat) => feat.name === featureName && feat.value === value,
        ),
      ) ||
      !filteredProducts.some((product) =>
        product.features.find(
          (feat) => feat.name === featureName && feat.value === value,
        ),
      ) ||
      (selectedBrand &&
        !filteredProducts.some(
          (product) => product.brandName === selectedBrand,
        )) ||
      (selectedModel &&
        !filteredProducts.some((product) => product.model === selectedModel)) ||
      (selectedCategory &&
        !filteredProducts.some((product) =>
          product.categories.includes(selectedCategory),
        )) ||
      (selectedBrand &&
        !filteredProducts.some((product) =>
          product.features.find(
            (feat) =>
              feat.name === featureName &&
              feat.value === value &&
              product.brandName === selectedBrand,
          ),
        )) ||
      (selectedModel &&
        !filteredProducts.some((product) =>
          product.features.find(
            (feat) =>
              feat.name === featureName &&
              feat.value === value &&
              product.model === selectedModel,
          ),
        )) ||
      (selectedCategory &&
        !filteredProducts.some((product) =>
          product.features.find(
            (feat) =>
              feat.name === featureName &&
              feat.value === value &&
              product.categories.includes(selectedCategory),
          ),
        ))
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="accordion-filters">
      {uniqueFeatures.map((feature, index) => (
        <div
          key={index}
          className={`accordion-item ${openAccordion === index ? "open" : ""}`}
        >
          <div
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            <span className="feature-name">{feature.name}:</span>
            <span
              className={`accordion-arrow ${
                openAccordion === index ? "open" : ""
              }`}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
          <div
            className={`accordion-content ${
              openAccordion === index ? "open" : ""
            }`}
            ref={(el) => (contentRefs.current[index] = el)}
            style={{
              maxHeight:
                openAccordion === index ? `${contentHeights[index]}px` : "0px",
            }}
          >
            {feature.values.map((value, idx) => {
              const isChecked = appliedFilters[feature.name]
                ? appliedFilters[feature.name].includes(value)
                : false;
              const isDisabled = isCheckboxDisabled(feature.name, value);
              return (
                <div key={idx} className="checkbox-item">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`${feature.name}-${idx}`}
                      onChange={() => handleCheckboxChange(feature.name, value)}
                      checked={isChecked}
                      disabled={isDisabled}
                    />
                    <span className="checkmark"></span>
                    <span
                      className="checkbox-label"
                      style={{ color: isDisabled ? "#ccc" : "inherit" }}
                    >
                      {value}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxFilter;
