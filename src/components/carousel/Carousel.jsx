import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
// import { useModalContext } from '../../context/ModalContext';

function Carousel({ modalOpen }) {
  // const { modal } = useModalContext();
    const [items, setItems] = useState([
        {
          id: 1,
          name: 'Product 1',
          description: 'This is the description for Product 1.',
          price: 19.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product1-image1.jpg']
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'This is the description for Product 2.',
          price: 29.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product2-image1.jpg']
        },
        {
          id: 3,
          name: 'Product 3',
          description: 'This is the description for Product 3.',
          price: 39.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product3-image1.jpg']
        },
        {
          id: 4,
          name: 'Product 4',
          description: 'This is the description for Product 4.',
          price: 49.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product4-image1.jpg']
        },
        {
          id: 5,
          name: 'Product 5',
          description: 'This is the description for Product 5.',
          price: 59.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product5-image1.jpg']
        },
        {
          id: 6,
          name: 'Product 6',
          description: 'This is the description for Product 6.',
          price: 69.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product6-image1.jpg']
        },
        {
          id: 7,
          name: 'Product 7',
          description: 'This is the description for Product 7.',
          price: 79.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product7-image1.jpg']
        },
        {
          id: 8,
          name: 'Product 8',
          description: 'This is the description for Product 8.',
          price: 89.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product8-image1.jpg']
        },
        {
          id: 9,
          name: 'Product 9',
          description: 'This is the description for Product 9.',
          price: 99.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product9-image1.jpg']
        },
        {
          id: 10,
          name: 'Product 10',
          description: 'This is the description for Product 10.',
          price: 109.99,
          options: ['Option A', 'Option B'],
          images: ['https://example.com/product10-image1.jpg']
        }
      ]);
    const sliderRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(4);
  
    const settings = {
      dots: true,
      dotsClass: 'my-dots',
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
          setSlidesToShow(4);
        } else if (window.innerWidth >= 768) {
          setSlidesToShow(3);
        } else {
          setSlidesToShow(1);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div className='carousel-container'>
        <Slider {...settings} ref={sliderRef}>
          {items.map((item) => (
            <div key={item.id} className="carousel-card">
                <div className="carousel-item">
                    <div className="carousel-images">
                      {item.images.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${item.id}`} />
                      ))}
                    </div>
                    <h3 style={{textAlign: 'center'}}>{item.name}</h3>
                    {/* <p>{item.description}</p> */}
                    <p style={{textAlign: 'center'}}>${item.price}</p>
                    {/* <ul>
                        {item.options.map((option) => (
                        <li key={option}>{option}</li>
                        ))}
                    </ul> */}
                </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;