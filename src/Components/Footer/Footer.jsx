import React from "react";
import styles from "./Footer.module.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
        {/* <div className={styles.logo}>
          <div className={styles.logoShape}></div>
        </div> */}
          <h2 className={styles.title}>Book your sports with us!</h2>

          <div className={styles.contact}>
            <p className={styles.label}>Phone</p>
            <p className={styles.info}>(123) 456 7890</p>
          </div>

          <div className={styles.contact}>
            <p className={styles.label}>Email</p>
            <p className={styles.info}>hello@reallygreatsite.com</p>
          </div>

          <div className={styles.social}>
            <p className={styles.label}>Get Social</p>
            <div className={styles.icons}>
              <FaFacebookF className={styles.icon} />
              <FaInstagram className={styles.icon} />
            </div>
          </div>
        </div>
          <p style={{ width:"100%",border:"2px solid white"}}></p>
      </div>
    </footer>
  );
};

export default Footer;
