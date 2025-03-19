import React from 'react';
import styles from './AcedemyInfo.module.scss';
// import backgroundImage from './background.jpg';

const AcedemyInfo = () => {
    return (
        <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Champion Sports Academy</h1>
          <p className={styles.location}>New York, USA</p>
          <p className={styles.contact}>+91 2568 26562</p>
        </div>
        <div className={styles.sportsTabs}>
          <button className={styles.tabButton}>Cricket</button>
          <button className={styles.tabButton}>Football</button>
          <button className={styles.tabButton}>Badminton</button>
        </div>
      </header>

      {/* Navigation Section */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Overview</li>
          <li className={styles.navItem}>Sports</li>
          <li className={styles.navItem}>Coaches</li>
          <li className={styles.navItem}>Facilities</li>
          <li className={styles.navItem}>Pricing</li>
          <li className={styles.navItem}>Gallery</li>
        </ul>

        
      </nav>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <div className={styles.textContent}>
          <h3 className={styles.subTitle}>Our Mission</h3>
          <p className={styles.text}>
            To develop exceptional athletes through world-class training,
            holistic development, and personalized coaching. We believe in
            nurturing not just athletic skills, but also character, discipline,
            and life skills.
          </p>

          <h3 className={styles.subTitle}>Our Vision</h3>
          <p className={styles.text}>
            To be the premier sports development center that produces
            well-rounded athletes who excel both in sports and personal growth.
          </p>
        </div>
      </section>
    </div>
      );
};

export default AcedemyInfo;