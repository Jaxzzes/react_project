import React from 'react';
import './styles/App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </div>
  );
}

export default App;
