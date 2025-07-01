// src/Pages/MyBooking/MyBooking.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Search, ChevronDown, Loader2 } from 'lucide-react';
import styles from './Mybooking.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const BookingCard = ({
  venue, venueAddress, venueImage, surfaceType,
  status, date, endTime, time, sport, price, bookingId,
  advancePaid, amountDueAtVenue, selectedSlots, createdAt,
  onCancel, onReschedule
}) => {
  // Calculate if booking is past
  const isPastBooking = new Date(date) < new Date();

  // Show "Completed" if past and not cancelled, else show actual status
  const displayStatus =
    status.toLowerCase() === 'cancelled'
      ? 'Cancelled'
      : isPastBooking
      ? 'Completed'
      : 'Confirmed';

  return (
    <div className={styles.bookingCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.venueName}>{venue}</h3>
          {/* Venue image optional */}
          {venueImage && <img src={venueImage} alt="Venue" className={styles.venueImg} />}
          {/* Venue address and surface type in small font */}
          {venueAddress && (
            <span className={styles.venueAddress}>
              Address: {venueAddress}
            </span>
          )}
          {surfaceType && (
            <span className={styles.surfaceType}>
              Surface Type: {surfaceType}
            </span>
          )}
          <span className={`${styles.statusLabel} ${
            displayStatus.toLowerCase() === 'confirmed'
              ? styles.confirmed
              : displayStatus.toLowerCase() === 'cancelled'
              ? styles.cancelled
              : styles.completed // Add this class in SCSS for green/blue
          }`}>
            {displayStatus}
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
          <Clock size={16} />
          <span>
            {new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
            {" - "}
            {new Date(endTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <span>Sport: {sport}</span>
        </div>
        <div className={styles.infoGroup}>
          <span>Advance Paid: ₹{advancePaid}</span>
        </div>
        <div className={styles.infoGroup}>
          <span>Due at Venue: ₹{amountDueAtVenue}</span>
        </div>
        <div className={styles.infoGroup}>
          <span>
            Selected Slots:{" "}
            {selectedSlots.length
              ? selectedSlots.map(s =>
                  `${s.start}${s.end ? `-${s.end}` : ''}`
                ).join(', ')
              : 'N/A'}
          </span>
        </div>
      </div>
      {/* Created field ko footer ke upar chhote font me dikhayein */}
      <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.5rem" }}>
        Created: {new Date(createdAt).toLocaleString()}
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.price}>₹{price}</span>
        <div className={styles.actions}>
          {/* Sirf tab dikhaye jab booking cancel nahi hai aur past nahi hai */}
          {status.toLowerCase() !== 'cancelled' && !isPastBooking && (
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
};

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

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
          venueAddress: b.turfId?.fullAddress || '',
          venueImage: b.turfId?.image?.[0] || '',
          surfaceType: b.turfId?.surfaceType || '',
          status: b.status || 'confirmed',
          date: b.startTime, // startTime as date
          endTime: b.endTime, // endTime as date
          time: '', // ab iski zarurat nahi, UI me format karo
          sport: b.sport || 'Football',
          price: b.totalPrice || 0,
          advancePaid: b.advancePaid,
          amountDueAtVenue: b.amountDueAtVenue,
          selectedSlots: b.selectedSlots || [],
          createdAt: b.createdAt,
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
    .filter(b => {
      const search = searchTerm.toLowerCase();
      return (
        b.venue.toLowerCase().includes(search) ||
        b.bookingId.toLowerCase().includes(search) ||
        b.sport.toLowerCase().includes(search) ||
        new Date(b.date).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        }).toLowerCase().includes(search)
      );
    })
    .filter(b => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') {
        return (
          b.status.toLowerCase() === 'confirmed' &&
          new Date(b.date) >= new Date()
        );
      }
      if (filter === 'cancelled') return b.status.toLowerCase() === 'cancelled';
      return true;
    })
    .filter(b => {
      if (!dateFilter) return true;
      // Compare only date part
      const bookingDate = new Date(b.date);
      const filterDate = new Date(dateFilter);
      return (
        bookingDate.getFullYear() === filterDate.getFullYear() &&
        bookingDate.getMonth() === filterDate.getMonth() &&
        bookingDate.getDate() === filterDate.getDate()
      );
    });

  return (
    <div className={styles.mainContainer}>
      <div style={{ borderBottom: "2px solid white" }}><Header /></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Bookings</h1>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <div className={styles.searchBox} style={{
              display: "flex",
              alignItems: "center",
              background: "#f1f5f9",
              borderRadius: "8px",
              padding: "6px 14px",
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
              margin: "12px 0",
              border: "1.5px solid #e2e8f0",
              maxWidth: 350,
              width: "100%"
            }}>
              <Search size={18} className={styles.searchIcon} style={{ color: "#64748b", marginRight: 8 }} />
              <input
                type="text"
                placeholder="Search by venue, ID, date, sport..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "1rem",
                  color: "#1e293b",
                  width: "100%"
                }}
              />
            </div>
            {/* Date Filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1.5px solid #e2e8f0",
                background: "#f1f5f9",
                fontSize: "1rem",
                color: "#1e293b",
                margin: "12px 0"
              }}
              max={new Date(2100, 0, 1).toISOString().split("T")[0]}
              min="2020-01-01"
              placeholder="Filter by date"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                style={{
                  background: "#e2e8f0",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  marginLeft: "4px",
                  cursor: "pointer",
                  color: "#334155"
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className={styles.filters}>
          {[
            { key: 'all', label: 'All' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
              onClick={() => setFilter(f.key)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loader}>
            <Loader2 className={styles.spinner} />
            Loading bookings...
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.noResults}>
            No bookings found. Try adjusting your search or filter.
          </div>
        ) : (
          <div className={styles.bookingsList}>
            {filtered.map((booking, idx) => (
              <BookingCard
                key={booking.bookingId}
                {...booking}
                onCancel={handleCancel}
                onReschedule={handleReschedule}
              />
            ))}
          </div>
        )}
      </div>
      <div style={{ borderTop: "2px solid white" }}><Footer /></div>
    </div>
  );
};

export default MyBooking;