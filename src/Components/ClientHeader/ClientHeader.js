// components/Header.jsx
import React, { useState } from 'react';
import styles from './ClientHeader.module.scss';

const ClientHeader = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.headerRight}>
          <button className={styles.notificationBtn}>
            <span className={styles.icon}>🔔</span>
          </button>
          <div className={styles.profileContainer}>
            <button 
              className={styles.profileBtn} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className={styles.profileIcon}>t</span>
            </button>
            
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.username}>test</p>
                  <p className={styles.email}>harshbadiwal58@gmail.com</p>
                </div>
                <ul className={styles.dropdownMenu}>
                  <li className={styles.dropdownItem}>
                    <span className={styles.itemIcon}>👤</span>
                    Profile
                  </li>
                  <li className={styles.dropdownItem}>
                    <span className={styles.itemIcon}>⚙️</span>
                    Settings
                  </li>
                  <li className={styles.dropdownItem}>
                    <span className={styles.itemIcon}>🚪</span>
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;