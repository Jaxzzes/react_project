import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useProductData } from "../../API/DB_data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation, useInView } from "framer-motion";

function Carousel() {
  const { products, loading } = useProductData();
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
  const [errorMessageActive, setErrorMessageActive] = useState(false);

  const settings = {
    dots: true,
    dotsClass: "my-dots",
    appendDots: (dots) => (
      <motion.div initial={{ opacity: 0, y: -12 }} animate={dotsControls}>
        {dots}
      </motion.div>
    ),
    // customPaging: () => <button type="button" aria-label="Go to slide" />,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchSelectedProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/carousel");
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      const selectedProductIds = data.map((product) => product._id);
      setSelectedProducts(selectedProductIds);
      setTempSelectedProducts(selectedProductIds);
    } catch (error) {
      console.error("Error fetching selected products:", error);
    }
  };

  const addProductToCarousel = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/carousel/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to carousel");
      }
      await fetchSelectedProducts();
    } catch (error) {
      console.error("Error adding product to carousel:", error);
    }
  };

  const removeProductFromCarousel = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/carousel/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to remove product from carousel");
      }
      await fetchSelectedProducts();
    } catch (error) {
      console.error("Error removing product from carousel:", error);
    }
  };

  useEffect(() => {
    fetchSelectedProducts();
  }, []);

  useEffect(() => {
    if (showModal) {
      const checkboxes = document.querySelectorAll(
        ".edit-carousel-product-checkbox",
      );
      checkboxes.forEach((checkbox) => {
        const productId = checkbox.dataset.productId;
        tempSelectedProducts.includes(productId);
        if (tempSelectedProducts.includes(productId)) {
          checkbox.classList.add("checked");
        } else {
          checkbox.classList.remove("checked");
        }
      });
    }
  }, [showModal, tempSelectedProducts]);

  const handleCheckboxChange = async (productId) => {
    const updatedProducts = tempSelectedProducts.includes(productId)
      ? tempSelectedProducts.filter((id) => id !== productId)
      : [...tempSelectedProducts, productId];

    setTempSelectedProducts(updatedProducts);

    if (updatedProducts.includes(productId)) {
      await addProductToCarousel(productId);
    } else if (updatedProducts.length < 5) {
      fetchSelectedProducts();
    } else {
      await removeProductFromCarousel(productId);
    }
    setErrorMessageActive(updatedProducts.length < 5);
  };

  const handleSaveClick = () => {
    if (tempSelectedProducts.length >= 5) {
      setSelectedProducts(tempSelectedProducts);
      setShowModal(false);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const totalProducts = products.length;
  const halfTotalProducts = Math.ceil(totalProducts / 2);
  const leftColumnProducts = products.slice(0, halfTotalProducts);
  const rightColumnProducts = products.slice(halfTotalProducts);

  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE_PREMIUM },
    },
  };

  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, {
    amount: 0.12,
    once: false,
    margin: "0px 0px -160px 0px",
  });

  const dotsControls = useAnimation();

  useEffect(() => {
    if (inView) {
      dotsControls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
    } else {
      dotsControls.start({ opacity: 0, y: -12, transition: { duration: 0.2 } });
    }
  }, [inView, dotsControls]);

  return (
    <div className="carousel-container">
      {showModal && (
        <div className="edit-carousel-modal">
          <div className="edit-carousel-modal-content">
            <h3>
              Select the products that will be displayed in the "Top Products"
              block.
            </h3>
            <div className="edit-carousel-product-items">
              <div className="edit-carousel-product-item-left">
                {leftColumnProducts.map((product) => (
                  <div
                    key={product._id}
                    className="edit-carousel-product-content"
                  >
                    <div
                      className="edit-carousel-product-checkbox"
                      data-product-id={product._id}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-product-${product._id}`}
                        checked={tempSelectedProducts.includes(product._id)}
                        onChange={() => handleCheckboxChange(product._id)}
                        className="edit-carousel-checkbox"
                      />
                      <label
                        htmlFor={`checkbox-product-${product._id}`}
                      ></label>
                    </div>
                    <div className="edit-carousel-product-label">
                      {product.brandName} {product.model}
                    </div>
                  </div>
                ))}
              </div>
              <div className="edit-carousel-product-item-right">
                {rightColumnProducts.map((product) => (
                  <div
                    key={product._id}
                    className="edit-carousel-product-content"
                  >
                    <div
                      className="edit-carousel-product-checkbox"
                      data-product-id={product._id}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-product-${product._id}`}
                        checked={tempSelectedProducts.includes(product._id)}
                        onChange={() => handleCheckboxChange(product._id)}
                        className="edit-carousel-checkbox"
                      />
                      <label
                        htmlFor={`checkbox-product-${product._id}`}
                      ></label>
                    </div>
                    <div className="edit-carousel-product-label">
                      {product.brandName} {product.model}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`carousel-error-message ${
                errorMessageActive ? "active" : ""
              }`}
            >
              You have chosen less than 5 products, you need to choose a minimum
              of 5 products!
            </div>

            <div className="edit-carousel-modal-button-block">
              <button
                className="edit-carousel-modal-button"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="header-carousel">
        <button className="edit-carousel-button" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <motion.div
        ref={wrapRef}
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        <Slider {...settings} ref={sliderRef}>
          {products
            .filter((product) => selectedProducts.includes(product._id))
            .map((product) => (
              <motion.div
                key={product._id}
                className="carousel-card"
                variants={cardVariants}
              >
                <div className="carousel-item">
                  <div className="carousel-item-image">
                    <img
                      src={product.images[0]}
                      alt={`${product.brandName} ${product.model}`}
                    />
                  </div>
                  <h3 className="carousel-item-fullname center">
                    {product.brandName} {product.model}
                  </h3>
                  <p className="carousel-item-category center">
                    Category: {product.categories}
                  </p>
                  <p className="carousel-item-price center">
                    {product.price} $
                  </p>
                </div>
              </motion.div>
            ))}
        </Slider>
      </motion.div>
    </div>
  );
}

export default Carousel;
