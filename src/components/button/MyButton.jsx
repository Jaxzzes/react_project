import React from 'react';
import './button.css';

const MyButton = ({children, ...props}) => {
    return (
        <a {...props} className='wave-btn'>
            <span className='wave-btn__text'>{children}</span>
            <span className='wave-btn__waves'></span>
        </a>
    );
};

export default MyButton;