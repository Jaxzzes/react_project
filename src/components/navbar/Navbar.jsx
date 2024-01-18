// Navbar.js
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ModalMobileMenu from '../modal/ModalMobileMenu';
// import { useModalContext } from '../../context/ModalContext';
import './Navbar.css';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  // const { toggleModal } = useModalContext();

  return (
    <div className='wrapper_navbar'>
      <div className="navbar">
        <div className="logo">
          <a href="/">Logo</a>
        </div>
        <div className='menu'>
          <a href="/">Home</a>
          <a href="/inventory">Air Conditioners</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="mobile-icon" >
          <FontAwesomeIcon icon={faBars} onClick={() => setModal(true)} />
        </div>
      </div>
      <ModalMobileMenu visible={modal} setVisible={setModal}>
        <div>11111</div>
      </ModalMobileMenu>
    </div>
  );
};

export default Navbar;
