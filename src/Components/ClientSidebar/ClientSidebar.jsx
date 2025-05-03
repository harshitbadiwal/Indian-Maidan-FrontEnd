// components/Sidebar.jsx
import React from 'react';
import styles from './ClientSidebar.module.scss';

const ClientSidebar = ({ isOpen }) => {
  const sidebarClass = isOpen ? styles.sidebar : `${styles.sidebar} ${styles.collapsed}`;
  
  return (
    <div className={sidebarClass}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⚽</span>
        <span className={styles.logoText}>TurfBook</span>
      </div>
      
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>◻️</span>
            <span className={styles.navText}>Overview</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>📅</span>
            <span className={styles.navText}>Bookings</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>💰</span>
            <span className={styles.navText}>Revenue</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>🏟️</span>
            <span className={styles.navText}>Facility</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>👥</span>
            <span className={styles.navText}>Customers</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>🏷️</span>
            <span className={styles.navText}>Promotions</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ClientSidebar;