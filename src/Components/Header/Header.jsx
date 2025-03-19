

import React from 'react'
import styles from "./Header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
// import Head from "next/head";

// import Link from 'next/link';
import SideBar from '../Sidebar/Sidebar';
import { Button } from '@mui/material';
import { BellRing } from 'lucide-react';
import ChatIcon from '@mui/icons-material/Chat';
import NavigationMenu from '../Notification/Notification';
const Header = () => {
  const navigate = useNavigate()
  return <>
                {/* <p>
              <title>GameZone - Book Sports Venues Online</title>
              <meta name="description" content="Find and book sports venues online with PlaySpots." />
              <Link rel="icon" href="/" />
            </p> */}

      {/* Header Section */}
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

    <button onClick={()=>navigate("/auth")} className={styles.button} >Sign Up / Login</button>
    <div style={{marginRight:"1vw",display:"flex",alignItems:"baseline"}}>
    <NavigationMenu/>
    {/* <BellRing size={32} style={{marginRight:"18px",marginLeft:"10px"}} /> */}
    <ChatIcon onClick={()=>navigate("/message")} sx={{fontSize:32}}/>
    </div>
    <SideBar/>
    </div>
  </div>
</header>
  </>
}

export default Header
