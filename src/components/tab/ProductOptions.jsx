import React from 'react';

function ProductOptions({ options }) {
    return (
        <div className="product-options">
            {options.map((option, index) => (
                <div key={index}><h3 className='options-name'><strong>{option.name}:</strong></h3><div className='options-description'>{option.description}</div></div>
            ))}
        </div>
    );
}

export default ProductOptions;