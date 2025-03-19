import React from "react";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <div className={styles.logoPlaceholder}>
                Your Logo Here
              </div>
              <div className={styles.illustration}>
                {/* Player illustrations rendered here */}
              </div>
              <h1 className={styles.mainTitle}>About Indian Maidan</h1>
              <p className={styles.subtitle}>
                Welcome to Indian Maidan - Your Ultimate Sports Partner
              </p>
            </div>
            <div className={styles.content}>
            <section className={styles.missionSection}>
              <p>
                Indian Maidan was founded with a simple yet powerful vision - to create an all-in-one platform
                for sports enthusiasts. Whether you're looking to book venues, connect with fellow players,
                or enhance your game, we're here to support your sporting journey.
              </p>
              <p>
                We understand that numerous sports lovers face—finding the right place to play, connecting with
                like-minded players, or the pursuit of excellence. That's why we created Indian Maidan to be an
                inclusive sports ecosystem, meticulously designed to make sports accessible and enjoyable for all.
              </p>
              <p>
                At Indian Maidan, our mission is to revolutionize the way sports are played, managed, and
                experienced across India:
              </p>
              <ul>
                <li>Seamless access to sports facilities, venues, and coaching</li>
                <li>Foster abilities to engage, train, and compete with ease</li>
                <li>Provide cutting-edge skill development, mentoring, analytics, and performance tracking</li>
              </ul>
            </section>
    
            <section className={styles.offeringsSection}>
              <h2>What We Offer</h2>
              <ul className={styles.offeringsList}>
                <li>Premium Booking - Reserve sports turf, courts, and stadiums with ease</li>
                <li>Pro Certified Coaches - Access top play instructions and competitive games</li>
                <li>Team Management - Find players, organize matches, and track team progress</li>
                <li>Performance Analytics - Track your progress and enhance your game</li>
                <li>Exclusive Member Benefits - Enjoy exclusive pricing, knowledge, and premium services</li>
                <li>Professional Match Support - Team management and scoring system</li>
                <li>Social Sports Network - Connect with fellow sports enthusiasts</li>
              </ul>
            </section>
    
            <section className={styles.whyChooseSection}>
              <h2>Why Choose Indian Maidan?</h2>
              <ul className={styles.benefitsList}>
                <li>Community - Connect with passionate sports enthusiasts, coaches, and professionals</li>
                <li>Innovation - Cutting-edge technology for enhanced sports experience</li>
                <li>Reliability - Safe, secure, and hassle-free sport insights</li>
                <li>Accessibility - Designed for everyone, from beginners to seasoned athletes</li>
              </ul>
            </section>
    
            <section className={styles.futureSection}>
              <p>
                As we continue to grow, our goal is to expand our platform to cater to more sports, integrate an
                extensive coaching network, and ensure that your experience with us is more seamless and rewarding
                than ever before.
              </p>
              <p>
                We envision Indian Maidan as India's most comprehensive sports ecosystem, empowering
                millions to transform their every play into perfection.
              </p>
            </section>
    
            <div className={styles.cta}>
              <button className={styles.ctaButton}>
                Join the Indian Maidan revolution
              </button>
              <p>Because every game deserves the perfect start! ⭐</p>
            </div>
          </div>
          </div>
    
          {/* Main Content */}
          
        </div>
  );
};

export default AboutUs;
