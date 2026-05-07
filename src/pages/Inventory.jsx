import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import MyInput from "../components/input/MyInput";
import PriceSlider from "../components/filters/price_slider/PriceSlider";
import BrandFilter from "../components/filters/select_filters/BrandFilter";
import ModelFilter from "../components/filters/select_filters/ModelFilter";
import CategoryFilter from "../components/filters/select_filters/CategoryFilter";
import CheckboxFilter from "../components/filters/checkbox_filters/CheckboxFilter";
import ActiveFilters from "../components/filters/active_filters/ActiveFilters";
import LoadMoreButton from "../components/pagination/LoadMoreButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotate,
  faTriangleExclamation,
  faFilter,
  faMagnifyingGlass,
  faPenToSquare,
  faTimes,
  faGear,
  faBolt,
  faTemperatureEmpty,
  faTemperatureFull,
  faClockRotateLeft,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { useProductData } from "../API/DB_data.js";
import "../styles/App.css";
import "../styles/Inventory.css";
import { useMediaQuery } from "react-responsive";
import AddProductButton from "../components/addProduct/addProductButton.jsx";
import AddProductModal from "../components/addProduct/addProductModal.jsx";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx";

function Inventory() {
  const isMobile = useMediaQuery({ maxDeviceWidth: 768 });
  const isTablet = useMediaQuery({ maxDeviceWidth: 1200 });
  const isDesktop = useMediaQuery({ maxDeviceWidth: 1920 });

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandIsOpen, setBrandIsOpen] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [productsPerPage] = useState(12);
  const [isFilterReset, setIsFilterReset] = useState(false);
  const [error, setError] = useState(false);
  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [sortPriceOrder, setSortPriceOrder] = useState("asc");
  const [sortButtonText, setSortButtonText] = useState("Sort by price");
  const [totalItems, setTotalItems] = useState(0);
  const [showFilters, setShowFilters] = useState(isMobile ? false : true);
  const [showSearchInput, setShowSearchInput] = useState(
    isMobile ? false : true,
  );
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const { products, loading, refetchProducts } = useProductData();
  const hasLoadedOnceRef = useRef(false);
  const showLoading =
    loading || (!hasLoadedOnceRef.current && products.length === 0);

  useEffect(() => {
    if (!loading) {
      hasLoadedOnceRef.current = true;
    }
  }, [loading]);

  useEffect(() => {
    const uniqueBrands = [
      ...new Set(products.map((product) => product.brandName)),
    ];
    const uniqueCategories = Array.from(
      new Set(products.flatMap((product) => product.categories)),
    );
    setBrands(uniqueBrands);
    setCategories(uniqueCategories);
  }, [products]);

  const memoizedFilteredProducts = useCallback(() => {
    return products
      .filter(
        (product) =>
          product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
      .filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max,
      )
      .filter(
        (product) => !selectedBrand || product.brandName === selectedBrand,
      )
      .filter((product) => !selectedModel || product.model === selectedModel)
      .filter(
        (product) =>
          !selectedCategory || product.categories.includes(selectedCategory),
      )
      .filter((product) => {
        for (const featureName in appliedFilters) {
          if (
            appliedFilters[featureName] &&
            appliedFilters[featureName].length > 0
          ) {
            if (
              !product.features.find(
                (feature) =>
                  feature.name === featureName &&
                  appliedFilters[featureName].includes(feature.value),
              )
            ) {
              return false;
            }
          }
        }
        return true;
      });
  }, [
    products,
    searchQuery,
    priceRange,
    selectedBrand,
    selectedModel,
    selectedCategory,
    appliedFilters,
  ]);

  useEffect(() => {
    if (loading) {
      setError(false);
      setFilteredProducts([]);
      return;
    }

    const filtered = memoizedFilteredProducts();
    setFilteredProducts(filtered);
    setIsFilterReset(false);

    if (!hasLoadedOnceRef.current) {
      setError(false);
      return;
    }

    setError(filtered.length === 0);
  }, [memoizedFilteredProducts]);

  useEffect(() => {
    if (isFilterReset) {
      setStartIndex(0);
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedCategory("");
    }
  }, [isFilterReset]);

  const toggleBrandFilter = () => {
    setBrandIsOpen(!brandIsOpen);
    setModelIsOpen(false);
    setCategoryIsOpen(false);
  };

  const toggleModelFilter = () => {
    setModelIsOpen(!modelIsOpen);
    setBrandIsOpen(false);
    setCategoryIsOpen(false);
  };

  const toggleCategoryFilter = () => {
    setCategoryIsOpen(!categoryIsOpen);
    setModelIsOpen(false);
    setBrandIsOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedCategory("");
    setBrandIsOpen(false);
    setModelIsOpen(false);
    setCategoryIsOpen(false);
    setAppliedFilters({});
    setResetAnimation(true);
    setIsFilterReset(true);
    setPriceRange({ min: 0, max: 999999 });
    setMinInputValue("");
    setMaxInputValue("");
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedCategory(null);
    setSortPriceOrder("asc");
    setSortButtonText("Sort by price");
    setTimeout(() => setResetAnimation(false), 1500);
  };

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + productsPerPage);
  };

  const handleSortClick = () => {
    const newSortOrder = sortPriceOrder === "asc" ? "desc" : "asc";
    setSortPriceOrder(newSortOrder);

    const sortedProducts = [...products].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sortedProducts);

    if (newSortOrder === "asc") {
      setSortButtonText("lowest to highest");
    } else {
      setSortButtonText("highest to lowest");
    }
  };

  useEffect(() => {
    const quantityProducts = products.length;
    const quantityFilteredProducts = filteredProducts.length;

    if (filteredProducts.length > 0) {
      setTotalItems(quantityFilteredProducts);
    } else {
      setTotalItems(quantityProducts);
    }
  }, [products, filteredProducts]);

  const filtersOverlay = document.getElementById("filter-overlay");
  const filters = document.getElementById("block-filters");
  const searchInput = document.getElementById("search_block");

  const handleFilterClick = () => {
    setShowFilters(true);
    filtersOverlay.classList.remove("disactive");
    filtersOverlay.classList.add("active");
    filters.classList.remove("disactive");
    filters.classList.add("active");
  };

  const handleOverlayClick = () => {
    setShowFilters(false);
    filtersOverlay.classList.remove("active");
    filtersOverlay.classList.add("disactive");
    filters.classList.remove("active");
    filters.classList.add("disactive");
  };

  const handleSearchClick = () => {
    setShowSearchInput((prev) => !prev);
    if (showSearchInput === true) {
      searchInput.classList.remove("active");
      searchInput.classList.add("disactive");
    } else if (showSearchInput === false) {
      searchInput.classList.remove("disactive");
      searchInput.classList.add("active");
    }
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToEdit(null);
    if (refetchProducts) {
      refetchProducts();
    } else {
      console.warn("refetchProducts is not available.");
    }
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${productId}`);
        alert("Товар успешно удален!");
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
        alert("Ошибка при удалении товара.");
      }
    }
  };

  const handleProductSaved = () => {
    if (refetchProducts) {
      refetchProducts();
    } else {
      console.warn("refetchProducts is not available.");
    }
    handleCloseModal();
  };

  const formatForUrl = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="wrapper_main">
      <div className="wrapper_inventory">
        <div
          className="filter-overlay"
          id="filter-overlay"
          onClick={handleOverlayClick}
        >
          <div
            className="block-filters"
            id="block-filters"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filter-header">
              <div>
                <h2>Filters</h2>
              </div>
              <div className="button-sort-block">
                <button className="button-sort-price" onClick={handleSortClick}>
                  <strong>{sortButtonText}</strong>
                </button>
              </div>
              <div className="reset-button" onClick={clearFilters}>
                <div
                  className={`reset-icon ${
                    resetAnimation ? "rotate-animation" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faRotate} />
                </div>
              </div>
            </div>
            <BrandFilter
              brands={brands}
              onSelect={setSelectedBrand}
              isOpen={brandIsOpen}
              onToggle={toggleBrandFilter}
              selectedBrand={selectedBrand}
            />
            <ModelFilter
              products={products}
              selectedBrand={selectedBrand}
              onSelect={setSelectedModel}
              isOpen={modelIsOpen}
              onToggle={toggleModelFilter}
              selectedModel={selectedModel}
            />
            <CategoryFilter
              categories={categories}
              onSelect={setSelectedCategory}
              isOpen={categoryIsOpen}
              onToggle={toggleCategoryFilter}
              selectedCategory={selectedCategory}
            />
            <PriceSlider
              products={products}
              filteredProducts={filteredProducts}
              onPriceChange={handlePriceChange}
              isFilterReset={isFilterReset}
              minInputValue={minInputValue}
              maxInputValue={maxInputValue}
              setMinInputValue={setMinInputValue}
              setMaxInputValue={setMaxInputValue}
            />
            <CheckboxFilter
              products={products}
              appliedFilters={appliedFilters}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              selectedCategory={selectedCategory}
              onFilterChange={handleFilterChange}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
            />
            <ActiveFilters
              filters={{
                Brand: selectedBrand,
                Model: selectedModel,
                Category: selectedCategory,
                ...appliedFilters,
              }}
            />
          </div>
        </div>
        <div className="main_block">
          <div
            className={`header-main-block ${showSearchInput ? "active" : ""}`}
          >
            <div className="search_block" id="search_block">
              <MyInput
                placeholder={inputFocused ? "" : "Search"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
            </div>
            <div className="icon-filter-block" onClick={handleFilterClick}>
              <div>Filters </div>
              <div>
                <FontAwesomeIcon icon={faFilter} className="icon-filter" />
              </div>
            </div>
            <div className="icon-search-block" onClick={handleSearchClick}>
              <div>Search </div>
              <div>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="icon-search"
                />
              </div>
            </div>
            <div className="add-product-block">
              <AddProductButton onClick={handleAddProduct} />
            </div>
            <div className="quantity-products-block">
              <span className="quantity-products-text">Total:{"  "}</span>
              <span className="quantity-products-number">{totalItems}</span>
            </div>
          </div>

          <div className="products-block-wrapper">
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="error-icon"
                />
                <h3 className="title-error">Products not found</h3>
                <p className="text-error">
                  No products matching your criteria were found. Please try to
                  reset the filters or refresh the page by pressing Ctrl + F5,
                  if the problem persists please contact us to resolve the
                  problem as soon as possible.
                </p>
              </div>
            ) : (
              [...filteredProducts.slice(0, startIndex + productsPerPage)].map(
                (product) => {
                  const brandNameSlug = formatForUrl(product.brandName);
                  const modelSlug = formatForUrl(product.model);

                  const productUrl = `/air-conditioners/${product._id}-${brandNameSlug}-${modelSlug}`;

                  return (
                    <div className="product_card_wrapper" key={product._id}>
                      <div className="product_actions">
                        <button
                          className="edit_button"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "white" }}
                          />
                        </button>
                        <button
                          className="delete_button"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            style={{ color: "red" }}
                          />
                        </button>
                      </div>

                      <Link to={productUrl} className="link-product-details">
                        <div className="product_card">
                          <div className="product_image">
                            <img
                              src={product.images[0]}
                              alt={`${product.brandName} ${product.model}`}
                            />
                          </div>
                          <div className="product_info">
                            <h3>
                              {product.brandName} {product.model}
                            </h3>
                            <p className="product_price">{product.price} $</p>

                            <div className="product_features_grid">
                              <div className="features_column">
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faGear}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) => f.name === "Type of compressor",
                                    )?.value || "-"}
                                  </span>
                                </div>
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faBolt}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) =>
                                        f.name === "Power consumption (kW)",
                                    )?.value || "-"}
                                    <span className="feature_unit"> kW</span>
                                  </span>
                                </div>
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faTemperatureEmpty}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) =>
                                        f.name ===
                                        "Minimum operating ambient temperature (deg)",
                                    )?.value || "-"}
                                    <span className="feature_unit"> °C</span>
                                  </span>
                                </div>
                              </div>

                              <div className="features_column">
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faClockRotateLeft}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) => f.name === "Warranty (months)",
                                    )?.value || "-"}
                                    <span className="feature_unit">
                                      {" "}
                                      months
                                    </span>
                                  </span>
                                </div>
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faExpand}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) =>
                                        f.name ===
                                        "Recommended room area (sq.m.)",
                                    )?.value || "-"}
                                    <span className="feature_unit"> m²</span>
                                  </span>
                                </div>
                                <div className="feature_item">
                                  <FontAwesomeIcon
                                    icon={faTemperatureFull}
                                    className="feature_icon"
                                  />
                                  <span className="feature_text">
                                    {product.features.find(
                                      (f) =>
                                        f.name ===
                                        "Maximum operating ambient temperature (deg)",
                                    )?.value || "-"}
                                    <span className="feature_unit"> °C</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="product_description">
                              {product.shortDescription.length > 177
                                ? `${product.shortDescription.substring(
                                    0,
                                    177,
                                  )}...`
                                : product.shortDescription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                },
              )
            )}
          </div>
          {startIndex + productsPerPage < filteredProducts.length && (
            <LoadMoreButton onClick={handleLoadMore} />
          )}
          {showModal && (
            <AddProductModal
              onClose={handleCloseModal}
              productData={productToEdit}
              onSaveSuccess={handleProductSaved}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
