import React from "react";
import styles from "./FindUmpire.module.scss";
import { FaStar, FaMapMarkerAlt, FaCalendar, FaClock, FaThumbsUp } from "react-icons/fa";

const FindUmpire = () => {
  return (
    <div className={styles.mainConatiner}>
    <div className={styles.container}>
      <h2>Find Your Umpire</h2>
<div style={{display:"flex",justifyContent:"space-between"}}>

      <input type="text" className={styles.searchBar} placeholder="Search umpires..." />
      <input type="text" className={styles.searchBar2} placeholder="Search Location..." />
</div>
      <div className={styles.filterButtons}>
        <button className={`${styles.filterButton} ${styles.active}`}>Sport</button>
       
        <button className={styles.filterButton}>Experience</button>
        <button className={styles.filterButton}>Rating</button>
        <button className={styles.filterButton}>Price</button>
        <button className={styles.filterButton}>Availability</button>
      </div>

      <div className={styles.card}>
        <div className={styles.profile}>
          <div className={styles.avatar}>80 × 80</div>
          <div className={styles.info}>
            <p className={styles.name}>John Smith</p>
            <p className={styles.rating}>
              <FaStar color="#f5a623" /> 4.8 (156 reviews)
            </p>
            <p className={styles.location}>
              <FaMapMarkerAlt /> Melbourne
            </p>
            <p className={styles.availability}>
              <FaCalendar /> Weekends
            </p>
          </div>
        </div>

        <div className={styles.details}>
          <p>
            <FaClock /> 8 years
          </p>
          <p>
            <FaThumbsUp /> 342 matches
          </p>
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>Level 2 Certified</span>
          <span className={styles.tag}>ICC Accredited</span>
        </div>

        <p className={styles.price}>$120/match</p>

        <button className={styles.requestButton}>Send Request</button>
      </div>
    </div>
    </div>
  );
};

export default FindUmpire;
