import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css";
import "./price-slider.css";

const PriceSlider = ({
  products,
  filteredProducts,
  onPriceChange,
  isFilterReset,
}) => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [values, setValues] = useState([0, 0]);
  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");
  const [minPlaceholder, setMinPlaceholder] = useState("");
  const [maxPlaceholder, setMaxPlaceholder] = useState("");
  const [minInputFocused, setMinInputFocused] = useState(false);
  const [maxInputFocused, setMaxInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const step = 1; // Изменено с 10 на 1

  useEffect(() => {
    if (!isLoading) {
      document.getElementById("slider-container").classList.add("loaded");
    }
  }, [isLoading]);

  // useEffect для определения абсолютных min/max цен из ВСЕХ продуктов
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setValues([min, max]); // Изначально устанавливаем значения слайдера в полный диапазон
      setMinPlaceholder(`${min}`);
      setMaxPlaceholder(`${max}`);
      setIsLoading(false);
    }
  }, [products]);

  // useEffect для сброса значений при isFilterReset
  useEffect(() => {
    if (isFilterReset && minPrice !== 0 && maxPrice !== 0) {
      setValues([minPrice, maxPrice]);
      setMinInputValue("");
      setMaxInputValue("");
      setMinPlaceholder(`${minPrice}`);
      setMaxPlaceholder(`${maxPrice}`);
      onPriceChange({ min: minPrice, max: maxPrice });
    }
  }, [isFilterReset, minPrice, maxPrice]);

  // Обновление плейсхолдеров при изменении values
  useEffect(() => {
    if (!minInputFocused && values[0] !== null) {
      setMinPlaceholder(`${values[0]}`);
    }
  }, [values[0], minInputFocused]);

  useEffect(() => {
    if (!maxInputFocused && values[1] !== null) {
      setMaxPlaceholder(`${values[1]}`);
    }
  }, [values[1], maxInputFocused]);

  const snapToStep = (value, direction = "round") => {
    const remainder = value % step;
    if (remainder === 0) {
      return value;
    }
    if (direction === "floor") {
      return Math.floor(value / step) * step;
    }
    if (direction === "ceil") {
      return Math.ceil(value / step) * step;
    }
    return Math.round(value / step) * step;
  };

  const handleSliderChange = (newValues) => {
    let finalMin, finalMax;

    // Logic for min handle
    if (newValues[0] <= minPrice + step / 2 && minPrice % step !== 0) {
      finalMin = minPrice;
    } else {
      finalMin = snapToStep(newValues[0], "round");
    }

    // Logic for max handle
    if (newValues[1] >= maxPrice - step / 2 && maxPrice % step !== 0) {
      finalMax = maxPrice;
    } else {
      finalMax = snapToStep(newValues[1], "round");
    }

    // Ensure min <= max
    if (finalMin > finalMax) {
      finalMin = finalMax;
    }

    setValues([finalMin, finalMax]);
    onPriceChange({ min: finalMin, max: finalMax });
    setMinInputValue("");
    setMaxInputValue("");
  };

  const handleMinInputChange = (event) => {
    const value = event.target.value;
    setMinInputValue(value);

    const numericValue = parseFloat(value);
    if (
      !isNaN(numericValue) &&
      numericValue >= minPrice &&
      numericValue <= maxPrice
    ) {
      let snappedValue;
      if (numericValue <= minPrice + step / 2 && minPrice % step !== 0) {
        snappedValue = minPrice;
      } else {
        snappedValue = snapToStep(numericValue, "round");
      }
      const finalMin = Math.max(minPrice, Math.min(snappedValue, values[1]));
      setValues([finalMin, values[1]]);
      onPriceChange({ min: finalMin, max: values[1] });
    } else if (value === "") {
      const currentMin = values[0];
      setValues([currentMin, values[1]]);
      onPriceChange({ min: currentMin, max: values[1] });
    }
  };

  const handleMaxInputChange = (event) => {
    const value = event.target.value;
    setMaxInputValue(value);

    const numericValue = parseFloat(value);
    if (
      !isNaN(numericValue) &&
      numericValue >= minPrice &&
      numericValue <= maxPrice
    ) {
      let snappedValue;
      if (numericValue >= maxPrice - step / 2 && maxPrice % step !== 0) {
        snappedValue = maxPrice;
      } else {
        snappedValue = snapToStep(numericValue, "round");
      }
      const finalMax = Math.min(maxPrice, Math.max(snappedValue, values[0]));
      setValues([values[0], finalMax]);
      onPriceChange({ min: values[0], max: finalMax });
    } else if (value === "") {
      const currentMax = values[1];
      setValues([values[0], currentMax]);
      onPriceChange({ min: values[0], max: currentMax });
    }
  };

  const handleArrowClick = (currentInputValue, setter, arrowStep) => {
    let numericValue;
    if (currentInputValue === "") {
      numericValue = setter === setMinInputValue ? values[0] : values[1];
    } else {
      numericValue = parseFloat(currentInputValue);
    }

    let newValue = isNaN(numericValue)
      ? setter === setMinInputValue
        ? minPrice
        : maxPrice
      : numericValue + arrowStep;

    let snappedValue;
    if (setter === setMinInputValue) {
      if (newValue <= minPrice + step / 2 && minPrice % step !== 0) {
        snappedValue = minPrice;
      } else {
        snappedValue = snapToStep(newValue, arrowStep > 0 ? "ceil" : "floor");
      }
      const newMin = Math.min(snappedValue, values[1]);
      const finalMin = Math.max(minPrice, newMin);
      setValues([finalMin, values[1]]);
      onPriceChange({ min: finalMin, max: values[1] });
      setMinInputValue(String(finalMin));
    } else {
      if (newValue >= maxPrice - step / 2 && maxPrice % step !== 0) {
        snappedValue = maxPrice;
      } else {
        snappedValue = snapToStep(newValue, arrowStep > 0 ? "ceil" : "floor");
      }
      const newMax = Math.max(snappedValue, values[0]);
      const finalMax = Math.min(maxPrice, newMax);
      setValues([values[0], finalMax]);
      onPriceChange({ min: values[0], max: finalMax });
      setMaxInputValue(String(finalMax));
    }
  };

  return (
    <div id="slider-container" className="price-slider-container">
      <div className="price-label">Price ($)</div>
      <Slider
        min={minPrice}
        max={maxPrice}
        step={step}
        value={values}
        onChange={handleSliderChange}
        range
      />
      <div className="price-values">
        <div className="input-container">
          <div className="label-input-first">From: </div>
          <input
            className="input-min-price"
            type="number"
            placeholder={minInputFocused ? "" : minPlaceholder}
            value={minInputValue}
            onChange={handleMinInputChange}
            onFocus={() => setMinInputFocused(true)}
            onBlur={() => {
              setMinInputFocused(false);
              if (minInputValue === "" && values[0] !== null) {
                setMinPlaceholder(`${values[0]}`);
              }
            }}
          />
          <div className="arrow-container">
            <div className="arrow-block">
              <FontAwesomeIcon
                icon={faChevronUp}
                className="arrow"
                onClick={() =>
                  handleArrowClick(minInputValue, setMinInputValue, 1)
                }
              />
            </div>
            <div className="arrow-block">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="arrow"
                onClick={() =>
                  handleArrowClick(minInputValue, setMinInputValue, -1)
                }
              />
            </div>
          </div>
        </div>
        <div className="input-container">
          <div className="label-input-second">To: </div>
          <input
            className="input-max-price"
            type="number"
            placeholder={maxInputFocused ? "" : maxPlaceholder}
            value={maxInputValue}
            onChange={handleMaxInputChange}
            onFocus={() => setMaxInputFocused(true)}
            onBlur={() => {
              setMaxInputFocused(false);
              if (maxInputValue === "" && values[1] !== null) {
                setMaxPlaceholder(`${values[1]}`);
              }
            }}
          />
          <div className="arrow-container">
            <div className="arrow-block">
              <FontAwesomeIcon
                icon={faChevronUp}
                className="arrow"
                onClick={() =>
                  handleArrowClick(maxInputValue, setMaxInputValue, 1)
                }
              />
            </div>
            <div className="arrow-block">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="arrow"
                onClick={() =>
                  handleArrowClick(maxInputValue, setMaxInputValue, -1)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
