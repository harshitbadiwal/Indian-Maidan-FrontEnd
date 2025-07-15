import React from "react";
import styles from "./Footer.module.scss";
import { 
  FaInstagram, 
  FaTwitter, 
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import { Link } from "react-router-dom";
import indianMaidanLogo from "../../assests/INDIANMAIDANLOGO.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <img 
                src={indianMaidanLogo} 
                alt="Indian Maidan Logo" 
                className={styles.logoImage}
              />
              <h3 className={styles.brandName}>Indian Maidan</h3>
            </div>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/indian_maidan/" 
                className={styles.socialLink} 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <FaTwitter />
              </a>
              <a 
                href="mailto:info@indianmaidan.com" 
                className={styles.socialLink} 
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li><Link to="/aboutUs" className={styles.footerLink}>About</Link></li>
              <li><Link to="/start" className={styles.footerLink}>Services</Link></li>
              <li><Link to="/myBooking" className={styles.footerLink}>My Booking</Link></li>
              <li><Link to="/profile" className={styles.footerLink}>Profile</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <p><FaPhone />+91 6367791580</p>
              <p><FaEnvelope />info@indianmaidan.com</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;