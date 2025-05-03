// App.jsx
import React, { useState } from 'react';
import styles from './DashBoard.module.scss';
import Sidebar from '../../../Components/ClientSidebar/ClientSidebar';
import Header from '../../../Components/ClientHeader/ClientHeader'
import { useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  
  return (
    <div className={styles.app}>
      <Sidebar isOpen={sidebarOpen} />
      <div className={styles.mainContent}>
        <Header toggleSidebar={toggleSidebar} />
        <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      
      <div onClick={()=>navigate("/owner/register")} className={styles.content}>
        <div className={styles.emptyState}>
          <div className={styles.icon}>📅</div>
          <h3 className={styles.heading}>No facilities registered yet</h3>
          <p className={styles.description}>
            Get started by registering your first sports turf facility to begin
            managing bookings and tracking revenue.
          </p>
          <button className={styles.registerBtn}>
            <span className={styles.btnIcon}>+</span>
            Register Facility
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}

export default ClientDashboard;