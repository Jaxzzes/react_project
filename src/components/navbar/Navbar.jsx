import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import ModalMobileMenu from '../modal/ModalMobileMenu';
import './Navbar.css';

const Navbar = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className='wrapper_navbar'style={{position:'relative'}}>
      <div className="navbar">
        <div className="logo_navbar">
          <Link to="/home">Logo</Link>
        </div>
        <div className='menu'>
          <Link to="/home">Home</Link>
          <Link to="/inventory">Air Conditioners</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="mobile-icon" onClick={() => setModal(true)} >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <ModalMobileMenu visible={modal} setVisible={setModal}>
      <div className='mobile_menu'>
          <div className='mobile_menu_item'><Link to="/home">Home</Link></div>
          <div className='mobile_menu_item'><Link to="/inventory">Air Conditioners</Link></div>
          <div className='mobile_menu_item'><Link to="/services">Services</Link></div>
          <div className='mobile_menu_item'><Link to="/about">About Us</Link></div>
          <div className='mobile_menu_item'><Link to="/contact">Contact</Link></div>
          <div className='mobile_menu_item'>
            <FontAwesomeIcon style={{fontSize: '22px'}} icon={faInstagram} />
          </div>
        </div>
      </ModalMobileMenu>
    </div>
  );
};

export default Navbar;
