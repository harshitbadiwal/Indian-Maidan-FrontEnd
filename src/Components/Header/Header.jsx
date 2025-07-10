import React from 'react'
import styles from "./Header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { getTokenData } from '../../services/tokenUtiles';

const Header = () => {
  const userName = getTokenData()
  const navigate = useNavigate()
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const initial = userName?.name?.charAt(0).toUpperCase() || "?";
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <h1 onClick={() => navigate("/")} className={styles.logo}>
            INDIAN MAIDAN
          </h1>
          <p className={styles.tagline}>Play Bold - Achieve Goals - Get Gold</p>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* Navigation items removed as requested */}
          </ul>
        </nav>
        
        <div className={styles.userSection}>
          {!isAuthenticated ? (
            <button 
              onClick={() => navigate("/auth")} 
              className={styles.authButton}
            >
              Sign Up / Login
            </button>
          ) : (
            <div className={styles.profileSection}>
              <div 
                onClick={() => navigate('/profile')}
                className={styles.profileAvatar}
                title="View Profile"
              >
                {initial}
              </div>
            </div>
          )}
          
          <SideBar />
        </div>
      </div>
    </header>
  )
}

export default Header