import React from 'react';

function ProductInfo({ product }) {
    return (
        <div className="product-info">
            <p>{product.description}</p>
        </div>
    );
}

export default ProductInfo;