import React, { useState } from "react";
import "./tab-buttons.css";
import ProductFeatures from "./ProductFeatures";
import ProductInfo from "./ProductInfo";
import ProductOptions from "./ProductOptions";
import ProductReviews from "./ProductReviews";

function TabButtons({ activeTab, setActiveTab, onChange, product, productId }) {
  const [contentVisible, setContentVisible] = useState(true);

  const handleTabChange = (tab) => {
    setContentVisible(false);
    setTimeout(() => {
      onChange(tab);
      setContentVisible(true);
    });
  };

  return (
    <div className="popup">
      <div className="tabs">
        <input type="radio" id="tab1" name="tab" />
        <label htmlFor="tab1" onClick={() => handleTabChange("info")}>
          INFO
        </label>
        <input type="radio" id="tab2" name="tab" />
        <label htmlFor="tab2" onClick={() => handleTabChange("features")}>
          FEATURES
        </label>
        <input type="radio" id="tab3" name="tab" />
        <label htmlFor="tab3" onClick={() => handleTabChange("options")}>
          OPTIONS
        </label>
        <input type="radio" id="tab4" name="tab" defaultChecked />
        <label htmlFor="tab4" onClick={() => handleTabChange("reviews")}>
          REVIEWS
        </label>
        <div className="marker">
          <div id="left"></div>
          <div id="right"></div>
        </div>
      </div>
      <div className={`content-block ${contentVisible ? "visible" : ""}`}>
        {activeTab === "info" && <ProductInfo product={product} />}
        {activeTab === "features" && (
          <ProductFeatures features={product.features} />
        )}
        {activeTab === "options" && (
          <ProductOptions options={product.options} />
        )}
        {activeTab === "reviews" && (
          <ProductReviews
            setActiveTab={setActiveTab}
            reviews={product.reviews}
            productId={productId}
          />
        )}
      </div>
    </div>
  );
}

export default TabButtons;
