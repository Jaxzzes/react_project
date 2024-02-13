import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './price-slider.css';

const PriceSlider = ({ products, onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    const prices = products.map((product) => product.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setMinPrice(min);
    setMaxPrice(max);
    setValues([min, max]);
  }, [products]);

  const handleSliderChange = (newValues) => {
    setValues(newValues);
    onPriceChange({ min: newValues[0], max: newValues[1] });
  };

  return (
    <div>
      <label style={{ display: 'block' }}>Filtered by price</label>
      <Slider
        min={minPrice}
        max={maxPrice}
        step={0.01}
        value={values}
        onChange={handleSliderChange}
        range
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>${values[0].toFixed(2)}</span>
        <span>${values[1].toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
