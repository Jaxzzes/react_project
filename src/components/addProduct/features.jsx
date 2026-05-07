import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import CustomStylesForSelects from "./customStylesForSelects";
import { NumericFormat } from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./add-product-modal.css";

const Features = ({ onChange, initialData }) => {
  const [productColor, setProductColor] = useState(
    initialData.productColor || ""
  );
  const [warranty, setWarranty] = useState(initialData.warranty || null);
  const [compressor, setCompressor] = useState(initialData.compressor || null);
  const [countryManufacturer, setCountryManufacturer] = useState(
    initialData.countryManufacturer || null
  );
  const [recommendedArea, setRecommendedArea] = useState(
    initialData.recommendedArea ?? null
  );
  const [powerConsumption, setPowerConsumption] = useState(
    initialData.powerConsumption ?? null
  );
  const [minTemperature, setMinTemperature] = useState(
    initialData.minTemperature ?? null
  );
  const [maxTemperature, setMaxTemperature] = useState(
    initialData.maxTemperature ?? null
  );

  const [countryManufacturerOptions, setCountryManufacturerOptions] = useState(
    []
  );
  const [productColorFocused, setProductColorFocused] = useState(false);
  const [showPlaceholderAreaInput, setShowPlaceholderAreaInput] =
    useState(true);
  const [showPlaceholderPowerInput, setShowPlaceholderPowerInput] =
    useState(true);
  const [showPlaceholderMinTemperature, setShowPlaceholderMinTemperature] =
    useState(true);
  const [showPlaceholderMaxTemperature, setShowPlaceholderMaxTemperature] =
    useState(true);

  const warrantyOptions = [
    { value: "withoutWarranty", label: "Without" },
    { value: "12", label: "12" },
    { value: "24", label: "24" },
    { value: "36", label: "36" },
    { value: "48", label: "48" },
    { value: "60", label: "60" },
    { value: "72", label: "72" },
  ];

  const compressorOptions = [
    { value: "inverter", label: "Inverter" },
    { value: "coolingOnly", label: "Cooling only" },
    { value: "onOff", label: "On/Off" },
  ];

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/countries");
      const countries = response.data.map((country) => ({
        value: country.code,
        label: country.name,
      }));
      setCountryManufacturerOptions(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    onChange({
      productColor,
      warranty,
      compressor,
      countryManufacturer,
      recommendedArea,
      powerConsumption,
      minTemperature,
      maxTemperature,
    });
  }, [
    productColor,
    warranty,
    compressor,
    countryManufacturer,
    recommendedArea,
    powerConsumption,
    minTemperature,
    maxTemperature,
    onChange,
  ]);

  return (
    <div className="wrapper-block-tabs">
      <div className="block-fields-item-title align-left">
        Country manufacturer
      </div>
      <Select
        options={countryManufacturerOptions}
        value={countryManufacturer}
        onChange={(selectedOption) => {
          setCountryManufacturer(selectedOption);
        }}
        placeholder="Select country of manufacture"
        className="product-modal-select-features"
        classNamePrefix="features-select"
        styles={CustomStylesForSelects}
      />

      <div className="triple-features-block-fields">
        <div className="triple-features-block-fields-item">
          <div className="block-fields-item-title">Recommended Area (м²)</div>
          <div className="numeric-input-container">
            <button
              type="button"
              className="decrement-button"
              onClick={() =>
                setRecommendedArea((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.max(numValue - 1, 0);
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <NumericFormat
              id="recommended-area"
              value={recommendedArea}
              placeholder={showPlaceholderAreaInput ? "Enter number" : ""}
              onBlur={() => setShowPlaceholderAreaInput(true)}
              onFocus={() => setShowPlaceholderAreaInput(false)}
              onValueChange={(values) => {
                setRecommendedArea(values.floatValue ?? null);
              }}
              thousandSeparator=","
              allowNegative={false}
              className="product-modal-input-area"
              style={{
                textAlign: "center",
              }}
            />
            <button
              type="button"
              className="increment-button"
              onClick={() =>
                setRecommendedArea((prev) => {
                  const numValue = Number(prev || 0);
                  return numValue + 1;
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="triple-features-block-fields-item">
          <div className="block-fields-item-title">Product color</div>
          <input
            type="text"
            className="product-color-input"
            id="productColor"
            name="productColor"
            value={productColor}
            onChange={(e) => {
              setProductColor(e.target.value);
            }}
            onFocus={() => setProductColorFocused(true)}
            onBlur={() => setProductColorFocused(false)}
            placeholder={productColorFocused ? "" : "Enter product color"}
            required
          />
        </div>
        <div className="triple-features-block-fields-item">
          <div className="block-fields-item-title">Power consumption (kW)</div>
          <div className="numeric-input-container">
            <button
              type="button"
              className="decrement-button"
              onClick={() =>
                setPowerConsumption((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.max(numValue - 1, 0);
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <NumericFormat
              id="power-consumption"
              value={powerConsumption}
              placeholder={showPlaceholderPowerInput ? "Enter number" : ""}
              onBlur={() => setShowPlaceholderPowerInput(true)}
              onFocus={() => setShowPlaceholderPowerInput(false)}
              onValueChange={(values) => {
                setPowerConsumption(values.floatValue ?? null);
              }}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={3}
              fixedDecimalScale={false}
              allowNegative={false}
              className="product-modal-input-power"
              style={{
                textAlign: "center",
              }}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue === undefined || floatValue >= 0;
              }}
            />
            <button
              type="button"
              className="increment-button"
              onClick={() =>
                setPowerConsumption((prev) => {
                  const numValue = Number(prev || 0);
                  return numValue + 1;
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div className="double-features-block-fields middle-block">
        <div className="double-features-block-fields-item">
          <div className="block-fields-item-title align-left">
            Type of compressor
          </div>
          <Select
            options={compressorOptions}
            value={compressor}
            onChange={(selectedOption) => {
              setCompressor(selectedOption);
            }}
            placeholder="Select type of compressor"
            className="product-modal-select-features"
            classNamePrefix="features-select"
            styles={CustomStylesForSelects}
          />
        </div>
        <div className="double-features-block-fields-item">
          <div className="block-fields-item-title align-left">
            Warranty (months)
          </div>
          <Select
            options={warrantyOptions}
            value={warranty}
            onChange={(selectedOption) => {
              setWarranty(selectedOption);
            }}
            placeholder="Select warranty"
            className="product-modal-select-features"
            classNamePrefix="features-select"
            styles={CustomStylesForSelects}
          />
        </div>
      </div>
      <div className="double-features-block-fields">
        <div className="double-features-block-fields-item">
          <div className="block-fields-item-title">
            Minimum operating ambient temperature (°C)
          </div>
          <div className="numeric-input-container">
            <button
              type="button"
              className="decrement-button"
              onClick={() =>
                setMinTemperature((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.max(numValue - 1, -50);
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <NumericFormat
              id="min-temperature"
              value={minTemperature}
              placeholder={showPlaceholderMinTemperature ? "Enter number" : ""}
              onBlur={() => setShowPlaceholderMinTemperature(true)}
              onFocus={() => setShowPlaceholderMinTemperature(false)}
              onValueChange={(values) => {
                const val = values.floatValue;
                if (val === undefined || val === null) {
                  setMinTemperature(null);
                } else {
                  setMinTemperature(Math.max(Math.min(val, 10), -50));
                }
              }}
              thousandSeparator=","
              allowNegative={true}
              className="product-modal-input-min-temperature"
              style={{
                textAlign: "center",
              }}
            />
            <button
              type="button"
              className="increment-button"
              onClick={() =>
                setMinTemperature((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.min(numValue + 1, 10);
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="double-features-block-fields-item">
          <div className="block-fields-item-title">
            Maximum operating ambient temperature (°C)
          </div>
          <div className="numeric-input-container">
            <button
              type="button"
              className="decrement-button"
              onClick={() =>
                setMaxTemperature((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.max(numValue - 1, 0);
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <NumericFormat
              id="max-temperature"
              value={maxTemperature}
              placeholder={showPlaceholderMaxTemperature ? "Enter number" : ""}
              onBlur={() => setShowPlaceholderMaxTemperature(true)}
              onFocus={() => setShowPlaceholderMaxTemperature(false)}
              onValueChange={(values) => {
                const val = values.floatValue;
                if (val === undefined || val === null) {
                  setMaxTemperature(null);
                } else {
                  setMaxTemperature(Math.max(Math.min(val, 50), 0));
                }
              }}
              thousandSeparator=","
              allowNegative={false}
              className="product-modal-input-max-temperature"
              style={{
                textAlign: "center",
              }}
            />
            <button
              type="button"
              className="increment-button"
              onClick={() =>
                setMaxTemperature((prev) => {
                  const numValue = Number(prev || 0);
                  return Math.min(numValue + 1, 50);
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
