import React from "react";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span>IM</span>
            </div>
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.mainTitle}>
              About <span className={styles.highlight}>Indian Maidan</span>
            </h1>
            <p className={styles.subtitle}>
              Your Ultimate Sports Partner for Excellence
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Venues</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50K+</span>
                <span className={styles.statLabel}>Players</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Coaches</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Mission Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <h2>Our Mission</h2>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.missionGrid}>
              <div className={styles.missionText}>
                <p>
                  Indian Maidan was founded with a simple yet powerful vision - to create an all-in-one platform
                  for sports enthusiasts. Whether you're looking to book venues, connect with fellow players,
                  or enhance your game, we're here to support your sporting journey.
                </p>
                <p>
                  We understand the challenges that sports lovers face—finding the right place to play, connecting with
                  like-minded players, or the pursuit of excellence. That's why we created Indian Maidan to be an
                  inclusive sports ecosystem, meticulously designed to make sports accessible and enjoyable for all.
                </p>
              </div>
              <div className={styles.missionHighlight}>
                <h3>Our Vision</h3>
                <p>To revolutionize the way sports are played, managed, and experienced across India</p>
                <ul className={styles.visionList}>
                  <li>Seamless access to sports facilities</li>
                  <li>Foster abilities to engage and compete</li>
                  <li>Cutting-edge skill development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <h2>What We Offer</h2>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.offeringsGrid}>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>📍</div>
                <h3>Premium Booking</h3>
                <p>Reserve sports turf, courts, and stadiums with ease</p>
              </div>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>🏆</div>
                <h3>Pro Certified Coaches</h3>
                <p>Access top play instructions and competitive games</p>
              </div>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>👥</div>
                <h3>Team Management</h3>
                <p>Find players, organize matches, and track team progress</p>
              </div>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>📊</div>
                <h3>Performance Analytics</h3>
                <p>Track your progress and enhance your game</p>
              </div>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>⭐</div>
                <h3>Exclusive Benefits</h3>
                <p>Enjoy exclusive pricing, knowledge, and premium services</p>
              </div>
              <div className={styles.offeringCard}>
                <div className={styles.cardIcon}>🤝</div>
                <h3>Social Network</h3>
                <p>Connect with fellow sports enthusiasts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
              <h2>Why Choose Indian Maidan?</h2>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🌟</div>
                <div className={styles.benefitContent}>
                  <h3>Community</h3>
                  <p>Connect with passionate sports enthusiasts, coaches, and professionals</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🚀</div>
                <div className={styles.benefitContent}>
                  <h3>Innovation</h3>
                  <p>Cutting-edge technology for enhanced sports experience</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔒</div>
                <div className={styles.benefitContent}>
                  <h3>Reliability</h3>
                  <p>Safe, secure, and hassle-free sport insights</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>♿</div>
                <div className={styles.benefitContent}>
                  <h3>Accessibility</h3>
                  <p>Designed for everyone, from beginners to seasoned athletes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision Section */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.futureVision}>
              <div className={styles.futureText}>
                <h2>Our Future Vision</h2>
                <p>
                  As we continue to grow, our goal is to expand our platform to cater to more sports, integrate an
                  extensive coaching network, and ensure that your experience with us is more seamless and rewarding
                  than ever before.
                </p>
                <p>
                  We envision Indian Maidan as India's most comprehensive sports ecosystem, empowering
                  millions to transform their every play into perfection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Ready to Join the Revolution?</h2>
            <p>Because every game deserves the perfect start!</p>
            <button className={styles.ctaButton}>
              Join Indian Maidan Today
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;