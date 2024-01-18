import React from "react";
import Carousel from '../components/carousel/Carousel';
import '../styles/App.css'

function Home() {
    return (
        <div className='wrapper_main'>
            <h2>React Website</h2>
            <div className='wrapper_carousel'>
                <Carousel />
            </div>
        </div>
    )
}

export default Home;