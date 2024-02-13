// Inventory.jsx
import React, { useState, useEffect } from 'react';
import { products } from '../API/data.js';
import MyInput from '../components/input/MyInput.jsx';
import PriceSlider from '../components/filters/price_slider/PriceSlider.jsx';
import BrandFilter from '../components/filters/select_filters/BrandFilter';
import ModelFilter from '../components/filters/select_filters/ModelFilter';
import CategoryFilter from '../components/filters/select_filters/CategoryFilter';
import '../styles/App.css';
import '../styles/Inventory.css';

function Inventory() {
  const [productsToShow, setProductsToShow] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openSelect, setOpenSelect] = useState(null);

  useEffect(() => {
    const uniqueBrands = [...new Set(products.map((product) => product.brandName))];
    setBrands(uniqueBrands);
  }, []);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.flatMap((product) => product.categories))
    );
    setCategories(uniqueCategories);
  }, [products]);

  const loadMoreProducts = () => {
    setProductsToShow((prevCount) => prevCount + 5);
  };

  const handleToggle = (selectName) => {
    setOpenSelect(openSelect === selectName ? null : selectName);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categories.some((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)
    .filter((product) => !selectedBrand || product.brandName === selectedBrand)
    .filter((product) => !selectedModel || product.model === selectedModel)
    .filter((product) => !selectedCategory || product.categories.includes(selectedCategory))
    .slice(0, productsToShow);

  return (
    <div className="wrapper_main">
      <div className="wrapper_inventory">
        <div className="block_filters">
          <h2>Filters</h2>
          <BrandFilter brands={brands} onSelect={setSelectedBrand} isOpen={openSelect === 'Brand'} onToggle={() => handleToggle('Brand')} />
          <ModelFilter products={products} selectedBrand={selectedBrand} onSelect={setSelectedModel} isOpen={openSelect === 'Model'} onToggle={() => handleToggle('Model')} />
          <CategoryFilter categories={categories} onSelect={setSelectedCategory} isOpen={openSelect === 'Category'} onToggle={() => handleToggle('Category')} />
          <PriceSlider products={products} onPriceChange={setPriceRange} />
        </div>
        <div className="main_block">
          <div className="search_block">
            <MyInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredProducts.map((product) => (
            <div className="product_card" key={product.id}>
              <div className="product_image">
                <img src={product.images[0]} alt={[product.brandName, product.model]} />
              </div>
              <div className="product_info">
                <h3>{product.brandName} {product.model}</h3>
                <p>Price: ${product.price}</p>
                <p>{product.shortDescription}</p>
                <p>
                  Categories:{' '}
                  {product.categories.map((category) => (
                    <span key={category}>{category}, </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
          {productsToShow < products.length && (
            <button onClick={loadMoreProducts} className="load-more-button">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;