import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import TabButtons from "../components/tab/TabButtons";
import "../styles/product-details.css";
import useStarRating from "../hooks/useStarRating.js";
import { useProductData } from "../API/DB_data.js";
import PurchaseForm from "../forms/PurchaseForm.jsx";
import { Link } from "react-scroll";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState("reviews");
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { products, loading } = useProductData();

  useEffect(() => {
    if (!slug || products.length === 0) {
      setProduct(null);
      return;
    }

    const parts = slug.split("-");

    const productId = parts[0];

    const foundProduct = products.find((p) => p._id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      const expectedBrandModelSlug =
        (foundProduct.brandName
          ? foundProduct.brandName.toLowerCase().replace(/\s+/g, "-")
          : "") +
        "-" +
        (foundProduct.model
          ? foundProduct.model.toLowerCase().replace(/\s+/g, "-")
          : "");

      const actualBrandModelSlug = parts.slice(1).join("-");

      if (expectedBrandModelSlug !== actualBrandModelSlug) {
        console.warn(
          `URL slug mismatch for product ID ${productId}. Expected: ${expectedBrandModelSlug}, Actual: ${actualBrandModelSlug}`
        );
      }
    } else {
      console.warn(`Product with ID ${productId} not found for slug: ${slug}`);
      setProduct(null);
    }
  }, [slug, products]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round(totalRating / reviews.length);
  };

  const averageRating = product ? calculateAverageRating(product.reviews) : 0;

  const starAvgRendering = useStarRating(averageRating);

  if (loading) {
    return "Loading...";
  }

  if (!product) {
    return "Product not found";
  }

  return (
    <div className="wrapper_main">
      <div className="top-block-details">
        <div className="left-block">
          <ImageGallery
            items={product.images.map((image) => ({
              original: image,
              thumbnail: image,
            }))}
            autoPlay={true}
            slideInterval={4000}
            showPlayButton={false}
          />
        </div>
        <div className="right-block">
          <h1 className="title-product">
            {product.brandName} {product.model}
          </h1>
          <p className="price-product">
            <span className="price-text">Price:</span> {product.price} $
          </p>
          <p className="description-product">
            <span className="description-title">Description: </span>
            {product.shortDescription}
          </p>
          <div className="last-block">
            <div className="category-product">
              <span className="last-block-title">Category: </span>
              {product.categories.join(", ")}
            </div>
            <div className="review-rating">
              <span className="last-block-title">Reviews avg rating: </span>
              <span className="star-rating">{starAvgRendering}</span>
            </div>
          </div>
          <Link
            className="buy-button"
            to="purchase-form"
            smooth={true}
            duration={700}
          >
            <p className="buy-button-block">Buy</p>
          </Link>
        </div>
      </div>
      <div className="tab-block">
        <TabButtons
          activeTab={activeTab}
          onChange={handleTabChange}
          product={product}
          productId={product._id}
        />
      </div>
      <PurchaseForm brandName={product.brandName} model={product.model} />
    </div>
  );
}

export default ProductDetails;
