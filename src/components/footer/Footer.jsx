import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper ">
      <div className="top-block">
        <div className="contact-info">
          <div className="contact-title">Follow us on</div>
          <div className="contact-icons">
            <button>
              <FontAwesomeIcon icon={faInstagram} className="instagram-icon" />
            </button>
            <button>
              <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
            </button>
            <button>
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </button>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div>
                <FontAwesomeIcon icon={faPhone} className="phone-icon" />
              </div>
              <div style={{ paddingLeft: "10px" }}>xxx-xxx-xxxx</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div>
                <FontAwesomeIcon icon={faPhone} className="phone-icon" />
              </div>
              <div style={{ paddingLeft: "10px" }}>xxx-xxx-xxxx</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div style={{ paddingTop: "5px" }}>
                <FontAwesomeIcon icon={faEnvelope} className="mail-icon" />
              </div>
              <div style={{ paddingLeft: "10px" }}>example@example.com</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div style={{ paddingRight: "10px" }}>
                <FontAwesomeIcon icon={faMapMarker} className="location-icon" />
              </div>
              <div>
                <div>123 Main St, City</div>
                <div>Work Schedule: Mon-Fri, 9am-5pm</div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo_footer">Logo</div>
      </div>
      <div className="bottom-block">
        <div className="signature">
          <div style={{ paddingRight: "10px", paddingBottom: "5px" }}>
            Made by Ivan Gunko
          </div>
          <div>
            <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
          </div>
        </div>
        <div className="login-link">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
