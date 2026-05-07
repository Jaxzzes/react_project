import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import MainInfo from "./mainInfo";
import Features from "./features";
import Options from "./options";
import Images from "./images";
import axios from "axios";
import "./add-product-modal.css";
import { v4 as uuidv4 } from "uuid";

const CLOUDINARY_CLOUD_NAME = "dnkgzy0ua";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_preset";

const AddProductModal = ({
  onClose,
  productData: initialProductData,
  onSaveSuccess,
}) => {
  const [activeTab, setActiveTab] = useState("mainInfo");
  const [productData, setProductData] = useState(() => {
    if (initialProductData) {
      const getFeatureValue = (featureName) =>
        initialProductData.features?.find((f) => f.name === featureName)?.value;
      return {
        brandName: initialProductData.brandName || "",
        model: initialProductData.model || "",
        description: initialProductData.description || "",
        shortDescription: initialProductData.shortDescription || "",
        categories: initialProductData.categories
          ? initialProductData.categories.map((cat) => ({
              value: cat,
              label: cat,
            }))
          : [],
        price: initialProductData.price,
        productColor: getFeatureValue("Color") || "",
        warranty: getFeatureValue("Warranty (months)")
          ? {
              value: getFeatureValue("Warranty (months)"),
              label: getFeatureValue("Warranty (months)"),
            }
          : null,
        compressor: getFeatureValue("Type of compressor")
          ? {
              value: getFeatureValue("Type of compressor"),
              label: getFeatureValue("Type of compressor"),
            }
          : null,
        countryManufacturer: getFeatureValue("Country of manufacture")
          ? {
              value: getFeatureValue("Country of manufacture"),
              label: getFeatureValue("Country of manufacture"),
            }
          : null,
        recommendedArea:
          getFeatureValue("Recommended room area (sq.m.)") || null,
        powerConsumption: getFeatureValue("Power consumption (kW)") || null,
        minTemperature:
          getFeatureValue("Minimum operating ambient temperature (deg)") ||
          null,
        maxTemperature:
          getFeatureValue("Maximum operating ambient temperature (deg)") ||
          null,
        options: initialProductData.options
          ? initialProductData.options.map((opt, idx) => ({
              id: opt.id || uuidv4(),
              name: opt.name,
              description: opt.description,
              index: idx + 1,
            }))
          : [],
        images: initialProductData.images
          ? initialProductData.images.map((url) => ({
              id: uuidv4(),
              preview: url,
              file: null,
            }))
          : [],
      };
    } else {
      return {
        brandName: "",
        model: "",
        description: "",
        shortDescription: "",
        categories: [],
        price: null,
        productColor: "",
        warranty: null,
        compressor: "",
        countryManufacturer: null,
        recommendedArea: null,
        powerConsumption: null,
        minTemperature: null,
        maxTemperature: null,
        options: [],
        images: [],
      };
    }
  });

  const handleMainInfoChange = (data) => {
    setProductData((prev) => ({
      ...prev,
      brandName: data.brandName,
      model: data.model,
      description: data.description,
      shortDescription: data.shortDescription,
      categories: data.categories,
      price: data.price,
    }));
  };

  const handleFeaturesChange = (data) => {
    setProductData((prev) => ({
      ...prev,
      productColor: data.productColor,
      warranty: data.warranty,
      compressor: data.compressor,
      countryManufacturer: data.countryManufacturer,
      recommendedArea: data.recommendedArea,
      powerConsumption: data.powerConsumption,
      minTemperature: data.minTemperature,
      maxTemperature: data.maxTemperature,
    }));
  };

  const handleOptionsChange = (data) => {
    setProductData((prev) => ({
      ...prev,
      options: data,
    }));
  };

  const handleImagesChange = (data) => {
    setProductData((prev) => ({
      ...prev,
      images: data,
    }));
  };

  const handleSave = async () => {
    const requiredMainInfo = [
      "brandName",
      "model",
      "shortDescription",
      "price",
    ];
    const missingMainInfoFields = requiredMainInfo.filter(
      (key) => !productData[key] && productData[key] !== 0
    );

    if (productData.categories.length === 0) {
      missingMainInfoFields.push("Categories");
    }
    if (
      productData.price === null ||
      typeof productData.price !== "number" ||
      isNaN(productData.price) ||
      productData.price < 0
    ) {
      missingMainInfoFields.push("Price");
    }

    const featuresToCheck = [
      { key: "productColor", name: "Color" },
      { key: "warranty", name: "Warranty (months)" },
      { key: "compressor", name: "Type of compressor" },
      { key: "countryManufacturer", name: "Country of manufacture" },
      { key: "recommendedArea", name: "Recommended room area (sq.m.)" },
      { key: "powerConsumption", name: "Power consumption (kW)" },
      {
        key: "minTemperature",
        name: "Minimum operating ambient temperature (deg)",
      },
      {
        key: "maxTemperature",
        name: "Maximum operating ambient temperature (deg)",
      },
    ];

    const missingFeatureFields = featuresToCheck
      .filter(({ key }) => {
        const value = productData[key];
        return (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (typeof value === "object" &&
            value !== null &&
            Object.keys(value).length === 0)
        );
      })
      .map(({ name }) => name);

    if (productData.images.length === 0) {
      missingFeatureFields.push("Images (at least one)");
    }
    if (productData.options.length === 0) {
      missingFeatureFields.push("Options");
    }

    const allMissingFields = [
      ...missingMainInfoFields,
      ...missingFeatureFields,
    ];

    if (allMissingFields.length > 0) {
      alert(
        `Пожалуйста, заполните следующие поля:\n- ${allMissingFields.join(
          "\n- "
        )}`
      );
      return;
    }

    const uploadedImageUrls = [];
    for (const img of productData.images) {
      if (img.file) {
        const formData = new FormData();
        formData.append("file", img.file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          uploadedImageUrls.push(response.data.secure_url);
        } catch (error) {
          console.error(
            "Error uploading image to Cloudinary:",
            error.response ? error.response.data : error.message
          );
          alert(
            "Ошибка при загрузке изображения на Cloudinary. Попробуйте еще раз."
          );
          return;
        }
      } else if (
        img.preview &&
        typeof img.preview === "string" &&
        img.preview.startsWith("http")
      ) {
        uploadedImageUrls.push(img.preview);
      }
    }

    const transformedCategories = productData.categories.map(
      (cat) => cat.label
    );

    const transformedOptions = productData.options.map((opt) => ({
      name: opt.name,
      description: opt.description,
      index: opt.index,
    }));

    const featuresArray = [
      { name: "Color", value: String(productData.productColor || "") },
      {
        name: "Warranty (months)",
        value: String(productData.warranty?.label || ""),
      },
      {
        name: "Type of compressor",
        value: String(productData.compressor?.label || ""),
      },
      {
        name: "Country of manufacture",
        value: String(productData.countryManufacturer?.label || ""),
      },
      {
        name: "Recommended room area (sq.m.)",
        value: String(productData.recommendedArea || ""),
      },
      {
        name: "Power consumption (kW)",
        value: String(productData.powerConsumption || ""),
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: String(productData.minTemperature || ""),
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: String(productData.maxTemperature || ""),
      },
    ].filter(
      (feature) =>
        feature.value !== null &&
        feature.value !== "" &&
        feature.value !== undefined
    );

    const productDataToSend = {
      brandName: productData.brandName,
      model: productData.model,
      description: productData.description,
      shortDescription: productData.shortDescription,
      price: productData.price,
      categories: transformedCategories,
      options: transformedOptions,
      images: uploadedImageUrls,
      features: featuresArray,
      reviews: initialProductData?.reviews || [],
    };

    try {
      let response;
      if (initialProductData && initialProductData._id) {
        response = await axios.put(
          `http://localhost:3000/api/products/${initialProductData._id}`,
          productDataToSend
        );
        if (response.status === 200) {
          alert("Product successfully updated!");
        }
      } else {
        response = await axios.post(
          "http://localhost:3000/api/products",
          productDataToSend
        );
        if (response.status === 201) {
          alert("Product successfully added!");
        }
      }
      console.log("Sent data:", productDataToSend);
      onSaveSuccess();
    } catch (error) {
      console.error(
        "Error saving product:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error saving. Try again. Details: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal-header">
          <div className="product-close-button-text">
            Add Product Form
            <br />
            <span>
              <span className="red-flag">* </span>Please fill in all fields in
              all tabs
            </span>
          </div>
          <div className="product-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div className="product-add-modal-tabs">
          <button
            className={`tab-button main-info ${
              activeTab === "mainInfo" ? "active" : ""
            }`}
            onClick={() => setActiveTab("mainInfo")}
          >
            Main Info
          </button>
          <button
            className={`tab-button feature ${
              activeTab === "features" ? "active" : ""
            }`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button
            className={`tab-button option ${
              activeTab === "options" ? "active" : ""
            }`}
            onClick={() => setActiveTab("options")}
          >
            Options
          </button>
          <button
            className={`tab-button image ${
              activeTab === "images" ? "active" : ""
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
        </div>

        {activeTab === "mainInfo" && (
          <MainInfo
            initialData={{
              brandName: productData.brandName,
              model: productData.model,
              description: productData.description,
              shortDescription: productData.shortDescription,
              categories: productData.categories,
              price: productData.price,
            }}
            onChange={handleMainInfoChange}
          />
        )}

        {activeTab === "features" && (
          <Features
            initialData={{
              productColor: productData.productColor,
              warranty: productData.warranty,
              compressor: productData.compressor,
              countryManufacturer: productData.countryManufacturer,
              recommendedArea: productData.recommendedArea,
              powerConsumption: productData.powerConsumption,
              minTemperature: productData.minTemperature,
              maxTemperature: productData.maxTemperature,
            }}
            onChange={handleFeaturesChange}
          />
        )}

        {activeTab === "options" && (
          <Options
            initialData={productData.options}
            onChange={handleOptionsChange}
          />
        )}

        {activeTab === "images" && (
          <Images
            initialData={productData.images}
            onChange={handleImagesChange}
          />
        )}

        <div className="product-modal-block-save-button">
          <button onClick={handleSave} className="product-modal-save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
