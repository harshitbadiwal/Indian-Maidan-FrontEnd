// BookingsList.jsx
import React from 'react';
import { Calendar, MapPin, Clock, Users, Search, ChevronDown } from 'lucide-react';
import styles from './Mybooking.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const BookingCard = ({ venue, status, date, time, sport, players, price, bookingId }) => (
  <div className={styles.bookingCard}>
    <div className={styles.cardHeader}>
      <div>
        <h3 className={styles.venueName}>{venue}</h3>
        <span className={`${styles.status} ${styles.upcoming}`}>{status}</span>
      </div>
      <span className={styles.bookingId}>Booking ID<br/>{bookingId}</span>
    </div>

    <div className={styles.bookingDetails}>
      <div className={styles.infoGroup}>
        <Calendar size={16} />
        <span>{date}</span>
      </div>
      <div className={styles.infoGroup}>
        <MapPin size={16} />
        <span>{sport}</span>
      </div>
      <div className={styles.infoGroup}>
        <Clock size={16} />
        <span>{time}</span>
      </div>
      <div className={styles.infoGroup}>
        <Users size={16} />
        <span>{players} players</span>
      </div>
    </div>

    <div className={styles.cardFooter}>
      <span className={styles.price}>₹{price}</span>
      <div className={styles.actions}>
        <button className={styles.viewBtn}>View Details</button>
        <button className={styles.rescheduleBtn}>Reschedule</button>
        <button className={styles.cancelBtn}>Cancel</button>
      </div>
    </div>
  </div>
);

const MyBooking = () => {
  const bookings = [
    {
      venue: 'Green Valley Turf',
      status: 'Upcoming',
      date: '2025-02-01',
      time: '18:00-19:00',
      sport: 'Football',
      players: 10,
      price: 1200,
      bookingId: 'BK001'
    },
    {
      venue: 'Sports Arena',
      status: 'Upcoming',
      date: '2025-02-03',
      time: '19:00-20:00',
      sport: 'Cricket',
      players: 12,
      price: 1500,
      bookingId: 'BK002'
    }
  ];

  return (
    <div className={styles.mainContainer}>
    <div style={{borderBottom:"2px solid white"}}>
    <Header/>
    </div>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Bookings</h1>
        <div className={styles.searchBox}>
          <Search size={18} style={{color:"black"}} />
          <input type="text" placeholder="Search bookings..." />
        </div>
      </div>

      <div className={styles.filters}>
        <button className={styles.filterBtn}>
          All Bookings 
          <ChevronDown size={16} />
        </button>
        <button className={styles.filterBtn}>
          Date
          <ChevronDown size={16} />
        </button>
        <button className={styles.filterBtn}>
          Ascending
          <ChevronDown size={16} />
        </button>
      </div>

      <div className={styles.bookingsList}>
        {bookings.map((booking, index) => (
          <BookingCard key={index} {...booking} />
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default MyBooking;