import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomStylesForSelects from "./customStylesForSelects";
import { NumericFormat } from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./add-product-modal.css";

const MainInfo = ({ onChange, initialData }) => {
  const [brandName, setBrandName] = useState(initialData.brandName || "");
  const [model, setModel] = useState(initialData.model || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [shortDescription, setShortDescription] = useState(
    initialData.shortDescription || ""
  );
  const [categories, setCategories] = useState(initialData.categories || []);
  const [price, setPrice] = useState(initialData.price || null);
  const [brandNameFocused, setBrandNameFocused] = useState(false);
  const [modelFocused, setModelFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [shortDescriptionFocused, setShortDescriptionFocused] = useState(false);
  const [showPlaceholderPrice, setShowPlaceholderPrice] = useState(true);

  const categoryOptions = [
    { value: "invertor", label: "Invertor" },
    { value: "split", label: "Split" },
    { value: "classic", label: "Classic" },
    { value: "testCategory", label: "Test category" },
  ];

  useEffect(() => {
    onChange({
      brandName,
      model,
      description,
      shortDescription,
      categories,
      price,
    });
  }, [brandName, model, description, shortDescription, categories, price]);

  const handlePriceChange = (values) => {
    setPrice(values.floatValue);
  };

  const handlePriceIncrement = () => {
    setPrice((prev) => (prev !== null ? Math.max(0, prev + 10) : 10));
  };

  const handlePriceDecrement = () => {
    setPrice((prev) => (prev !== null ? Math.max(0, prev - 10) : 0));
  };

  return (
    <div className="wrapper-block-tabs">
      <div className="block-fields-item-title align-left">Brand Name</div>
      <input
        type="text"
        placeholder={brandNameFocused ? "" : "Enter brand Name"}
        value={brandName}
        onChange={(e) => {
          setBrandName(e.target.value);
        }}
        onFocus={() => setBrandNameFocused(true)}
        onBlur={() => setBrandNameFocused(false)}
        className="product-modal-input"
      />
      <div className="block-fields-item-title align-left">Model</div>
      <input
        type="text"
        placeholder={modelFocused ? "" : "Enter Model"}
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
        }}
        onFocus={() => setModelFocused(true)}
        onBlur={() => setModelFocused(false)}
        className="product-modal-input"
      />
      <div className="block-fields-item-title align-left">Description</div>
      <textarea
        placeholder={descriptionFocused ? "" : "Enter Description"}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        onFocus={() => setDescriptionFocused(true)}
        onBlur={() => setDescriptionFocused(false)}
        className="product-modal-textarea"
      ></textarea>
      <div className="block-fields-item-title align-left">
        Short description
      </div>
      <textarea
        placeholder={shortDescriptionFocused ? "" : "Enter short description"}
        value={shortDescription}
        onChange={(e) => {
          setShortDescription(e.target.value);
        }}
        onFocus={() => setShortDescriptionFocused(true)}
        onBlur={() => setShortDescriptionFocused(false)}
        className="product-modal-textarea short-textarea"
      ></textarea>
      <div className="block-fields-item-title align-left">Categories</div>
      <Select
        options={categoryOptions}
        value={categories}
        onChange={(selectedCategories) => {
          setCategories(selectedCategories);
        }}
        isMulti
        placeholder="Select categories"
        className="product-modal-select"
        styles={CustomStylesForSelects}
      />
      <div className="block-fields-item-title align-center">Price ($)</div>
      <div className="numeric-input-container">
        <button
          type="button"
          className="decrement-button"
          onClick={handlePriceDecrement}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <NumericFormat
          id="price-input"
          value={price}
          placeholder={showPlaceholderPrice ? "Enter price" : ""}
          onBlur={() => setShowPlaceholderPrice(true)}
          onFocus={() => setShowPlaceholderPrice(false)}
          onValueChange={handlePriceChange}
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale={false}
          allowNegative={false}
          className="product-modal-input-area price-input"
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
          onClick={handlePriceIncrement}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default MainInfo;
