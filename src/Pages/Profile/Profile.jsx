import React, { useState } from "react";
import styles from "./Profile.module.scss";
import {Award , Bell, Settings, BarChart2, Clock, Users, Mail, Phone, MapPin, Calendar, Activity  } from 'lucide-react';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const StatCard = ({ icon: Icon, title, value }) => (
    <div className={styles.statCard}>
      <Icon className={styles.icon} size={20} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  );

  const InfoItem = ({ icon: Icon, text }) => (
    <div className={styles.infoItem}>
      <Icon className={styles.infoIcon} size={18} />
      <span className={styles.infoText}>{text}</span>
    </div>
  );
  
  const ActivityItem = ({ type, venue, status, date }) => (
    <div className={styles.activityItem}>
      <Activity className={styles.activityIcon} size={18} />
      <div className={styles.activityContent}>
        <div className={styles.activityMain}>
          <h4 className={styles.activityType}>{type}</h4>
          <span className={`${styles.activityStatus} ${styles[status.toLowerCase()]}`}>
            {status}
          </span>
        </div>
        <p className={styles.activityVenue}>{venue}</p>
      </div>
      <span className={styles.activityDate}>{date}</span>
    </div>
  );

  const ProgressBar = ({ sport, count, maxValue = 15 }) => {
    const progress = (count / maxValue) * 100;
    
    return (
      <div className={styles.progressWrap}>
        <div className={styles.progressHeader}>
          <span className={styles.sportName}>{sport}</span>
          <span className={styles.sportCount}>
            {count} {count === 1 ? 'game' : 'games'}
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };
  
  const StatItem = ({ label, value }) => (
    <div className={styles.statRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
  
  const Badge = ({ title, description, color }) => (
    <div className={`${styles.badgeCard} ${styles[color]}`}>
      <Award className={styles.badgeIcon} size={20} />
      <div className={styles.badgeInfo}>
        <h4 className={styles.badgeTitle}>{title}</h4>
        <p className={styles.badgeDesc}>{description}</p>
      </div>
    </div>
  );
const Profile = () => {
    const [nav,setNav] = useState("overview")

    const activities = [
        { type: 'Booking', venue: 'Sports Arena', status: 'Confirmed', date: '2025-02-01' },
        { type: 'Payment', venue: 'Green Valley', status: 'Success', date: '2025-01-28' },
        { type: 'Cancellation', venue: 'City Sports', status: 'Refunded', date: '2025-01-25' }
      ];
    const stats = [
        { icon: Activity, title: 'Total Bookings', value: '24' },
        { icon: Calendar, title: 'Upcoming', value: '2' },
        { icon: Clock, title: 'Hours Played', value: '48' },
        { icon: Users, title: 'Avg. Players', value: '12' }
      ];
      const sports = [
        { name: 'Football', count: 15 },
        { name: 'Cricket', count: 8 },
        { name: 'Badminton', count: 1 }
      ];
      const stats2 = [
        { label: 'Total Hours Played', value: '48 hours' },
        { label: 'Favorite Time Slot', value: 'Evening' },
        { label: 'Average Players', value: '12' },
        { label: 'Favorite Venue', value: 'Green Valley Turf' }
      ];
    
      const achievements = [
        { title: 'Regular Player', description: 'Completed 20+ bookings', color: 'blue' },
        { title: 'Team Captain', description: 'Led 5+ team matches', color: 'green' },
        { title: 'Multi-Sport Player', description: 'Played 3+ different sports', color: 'purple' }
      ];
  return (
    <div className={styles.mainContainer}>
    <div style={{borderBottom:"2px solid white"}}>
    <Header/>
    </div>
    <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <h1>Alex Johnson</h1>
          <span>Premium Member</span>
        </div>
      </div>
      {/* <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
          Notifications
        </button>
        <button className={styles.iconButton}>
          <Settings size={20} />
          Settings
        </button>
      </div> */}
    </header>

    <nav className={styles.nav}>
      <button className={ nav=="overview"?styles.active:""} onClick={()=>setNav("overview")}>Overview</button>
      <button className={nav=="activity"?styles.active:""} onClick={()=>setNav("activity")}>Activity</button>
      <button className={nav=="statics"?styles.active:""} onClick={()=>setNav("statics")}>Statistics</button>
    </nav>

  </div>
  {
    nav=="overview"?( <div> <div className={styles.stats}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div> <div className={styles.wrapper}>
      <section className={styles.profileInfo}>
        <h3 className={styles.sectionTitle}>Profile Information</h3>
        <div className={styles.infoContent}>
          <InfoItem icon={Mail} text="alex.johnson@example.com" />
          <InfoItem icon={Phone} text="+91 98765 43210" />
          <InfoItem icon={MapPin} text="Mumbai, India" />
          <InfoItem icon={Calendar} text="Member since January 2024" />
        </div>
      </section>

      <section className={styles.activitySection}>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        <div className={styles.activityList}>
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </section>
    </div>
    </div>):""
  }
  {
    nav=="activity"?
    <div className={styles.mainProgressContainer}><div className={styles.progressContainer}>
      <h3 className={styles.title}>Sports Activity</h3>
      <div className={styles.progressList}>
        {sports.map(sport => (
          <ProgressBar 
            key={sport.name}
            sport={sport.name}
            count={sport.count}
          />
        ))}
      </div>
    </div>
    </div>:""}
    {
        nav=="statics"?(  <div className={styles.root}>
      <div className={styles.statsBox}>
        <h3 className={styles.boxTitle}>Playing Statistics</h3>
        <div className={styles.statsGrid}>
          {stats2.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>

      <div className={styles.achieveBox}>
        <h3 className={styles.boxTitle}>Achievements</h3>
        <div className={styles.badgeGrid}>
          {achievements.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </div>
      </div>
    </div>):""
    }
    <Footer/>
</div>
  );
};

export default Profile;