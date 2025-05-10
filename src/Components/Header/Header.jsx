import React from 'react'
import styles from "./Header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar';
import { Button, Avatar } from '@mui/material';
import { BellRing } from 'lucide-react';
import ChatIcon from '@mui/icons-material/Chat';
import NavigationMenu from '../Notification/Notification';
import { useSelector } from 'react-redux';
import { getTokenData } from '../../services/tokenUtiles';

const Header = () => {
  const userName = getTokenData()
  const navigate = useNavigate()
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);  console.log(useSelector((state) => state.auth))
  const initial = userName?.name?.charAt(0).toUpperCase() || "?";
  return <>
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h3 onClick={()=>navigate("/")} className={styles.logo}>INDIAN MAIDAN</h3>
          <p className={styles.tagline}>Play Bold - Achieve Goal - Get Gold</p>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
          </ul>
        </nav>
        <div style={{display:"flex", alignItems:"center"}}>
          {!isAuthenticated ? (
            <button onClick={()=>navigate("/auth")} className={styles.button}>Sign Up / Login</button>
          ) : (
            <div className={styles.profileMenu}>
            <div 
            onClick={() => navigate('/profile')}
            style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#007bff",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: 20
    }}>
      {initial}
    </div>
            </div>
          )}
          
          <div style={{marginRight:"1vw",display:"flex",alignItems:"baseline"}}>
            <NavigationMenu/>
            <ChatIcon onClick={()=>navigate("/message")} sx={{fontSize:32}}/>
          </div>
          <SideBar/>
        </div>
      </div>
    </header>
  </>
}

export default Header