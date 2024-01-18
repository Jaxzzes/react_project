import React from 'react';
import './styles/App.css';
import Carousel from './components/carousel/Carousel';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
      <div className="App">
          <Navbar />
        <div className='wrapper'>
     
          <h2>React Website</h2>
          <div className='wrapper_carousel'>
            <Carousel />
          </div>
        </div>
      </div>
  );
}

export default App;
