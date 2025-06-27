// src/Pages/MyBooking/MyBooking.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Search, ChevronDown, Loader2 } from 'lucide-react';
import styles from './Mybooking.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const BookingCard = ({ venue, status, date, time, sport, players, price, bookingId, onCancel, onReschedule }) => (
  <div className={styles.bookingCard}>
    <div className={styles.cardHeader}>
      <div>
        <h3 className={styles.venueName}>{venue}</h3>
        <span className={`${styles.statusLabel} ${
          status.toLowerCase() === 'confirmed'
            ? styles.confirmed
            : status.toLowerCase() === 'cancelled'
            ? styles.cancelled
            : styles.pending
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <span className={styles.bookingId}>
        Booking ID<br />{bookingId}
      </span>
    </div>

    <div className={styles.bookingDetails}>
      <div className={styles.infoGroup}>
        <Calendar size={16} />
        <span>{new Date(date).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        })}</span>
      </div>
      <div className={styles.infoGroup}>
        <MapPin size={16} />
        <span>{sport || 'Football'}</span>
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
        {status.toLowerCase() !== 'cancelled' && (
          <>
            <button
              className={styles.rescheduleBtn}
              onClick={() => onReschedule(bookingId)}
            >
              Reschedule
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => onCancel(bookingId)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!user?._id || !token) {
        alert("Please login to view your bookings.");
        window.location.href = "/login";
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://indianmadianbackend.onrender.com/api/booking/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          throw new Error(res.status === 401
            ? 'Session expired. Please login again.'
            : 'Failed to fetch bookings');
        }

        const payload = await res.json();
        const arr = Array.isArray(payload)
          ? payload
          : payload.bookings || [];

        const formatted = arr.map(b => ({
          bookingId: b._id,
          venue: b.turfId?.turfName || 'Unknown Venue',
          status: b.status || 'confirmed',
          date: b.startTime,
          time: `${b.startTime.split('T')[1].substring(0,5)} - ${b.endTime.split('T')[1].substring(0,5)}`,
          sport: b.sport || 'Football',
          players: b.totalPlayers || 10,
          price: b.totalPrice || 0,
        }));

        setBookings(formatted);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://indianmadianbackend.onrender.com/api/booking/${bookingId}/cancel`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) {
        setBookings(bs => bs.map(b =>
          b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b
        ));
      } else throw new Error(data.message || 'Failed to cancel booking');
    } catch (err) {
      console.error("Cancel error:", err);
      alert(err.message);
    }
  };

  const handleReschedule = (bookingId) => {
    alert(`Reschedule booking ${bookingId} - Feature coming soon!`);
  };

  const filtered = bookings
    .filter(b =>
      b.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(b =>
      filter === 'all' ? true :
      filter === 'upcoming' ? b.status === 'confirmed' :
      filter === 'cancelled' ? b.status === 'cancelled' : true
    );

  return (
    <div className={styles.mainContainer}>
      <div style={{ borderBottom: "2px solid white" }}><Header /></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Bookings</h1>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filters}>
          {['all', 'upcoming', 'cancelled'].map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} <ChevronDown size={16} />
            </button>
          ))}
        </div>

        <div className={styles.bookingsList}>
          {loading ? (
            <div className={styles.loadingState}>
              <Loader2 className={styles.spinner} size={32} />
              <p>Loading your bookings...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p>{searchTerm ? 'No matching bookings' : 'No bookings yet'}</p>
              <button className={styles.bookNowBtn} onClick={() => window.location.href = '/book'}>
                Book Now
              </button>
            </div>
          ) : (
            filtered.map((b, i) => (
              <BookingCard
                key={i}
                {...b}
                onCancel={handleCancel}
                onReschedule={handleReschedule}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBooking;
