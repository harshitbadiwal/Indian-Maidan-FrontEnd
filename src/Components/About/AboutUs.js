import React from "react";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.aboutUsCard}>
        <h2 className={styles.title}>About Us</h2>
        <p className={styles.description}>
          Welcome to <span style={{color:"#ff6600",fontWeight:600}}>Indian Maidan</span>, your one-stop solution for all things sports! We are dedicated to providing seamless services that cater to every sports enthusiast. 
          Whether you’re looking to book a turf, find the perfect sports academy, connect with a reliable umpire, or secure a sports ground for your game, we’ve got you covered.
        </p>
        <p className={styles.description}>
          Our platform is designed to help you find the right sports buddy, book facilities, and even plan tournaments or matches whenever needed. 
          We aim to offer top-notch services to make your sports experience effortless and enjoyable.
        </p>
        <button className={styles.knowMoreBtn}>Know More</button>
      </div>
    </div>
  );
};

export default AboutUs;
