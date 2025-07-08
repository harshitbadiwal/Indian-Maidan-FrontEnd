import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { Clock, Mail, Phone, MapPin, Calendar, Activity, XCircle, Hourglass, TrendingUp, Trophy, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getTokenData } from "../../services/tokenUtiles";
import { useUserBookings } from "../../hooks/useUserBookings";

const formatTimeToNow = (date) => {
  const seconds = Math.floor((new Date(date) - new Date()) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  if (seconds < 60) return "in less than a minute";
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `in ${interval} ${unit}${interval === 1 ? '' : 's'}`;
    }
  }
  return "soon";
};

const StatCard = ({ icon: Icon, title, value, isCancelled = false, totalBookings = 0, children, gradient = false }) => (
  <div className={`${styles.statCard} ${isCancelled ? styles.cancelledCard : ''} ${gradient ? styles.gradientCard : ''}`}>
    <div className={styles.statCardHeader}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} size={20} color={isCancelled ? '#ef4444' : gradient ? '#fff' : '#6366f1'} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value} style={isCancelled ? { color: '#ef4444' } : gradient ? { color: '#fff' } : {}}>
          {value}
        </h3>
        {isCancelled && totalBookings > 0 && (
          <p className={styles.cancellationRate}>
            {Math.round((value / totalBookings) * 100)}% cancellation rate
          </p>
        )}
        {children}
      </div>
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, text, label }) => (
  <div className={styles.infoItem}>
    <div className={styles.infoIconWrapper}>
      <Icon className={styles.infoIcon} size={18} />
    </div>
    <div className={styles.infoContent}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoText}>{text}</span>
    </div>
  </div>
);

const Profile = () => {
  const user = getTokenData();
  const initial = user?.name?.charAt(0).toUpperCase() || "?";
  const [nav, setNav] = useState("overview");

  const { bookings, loading } = useUserBookings();

  // Calculate stats from bookings
  const getBookingStats = () => {
    const now = new Date();
    
    const totalBookings = bookings.length;
    const totalCancelled = bookings.filter(
      b => b.status.toLowerCase() === 'cancelled'
    ).length;
    const upcomingBookings = bookings.filter(
      b => new Date(b.startTime) > now && b.status === 'Confirmed'
    ).length;
    const hoursPlayed = bookings
      .filter(b => new Date(b.endTime) < now && b.status !== 'Cancelled')
      .reduce((sum, b) => {
        const durationHours = (new Date(b.endTime) - new Date(b.startTime)) / (1000 * 60 * 60);
        return sum + durationHours;
      }, 0);

    return [
      { icon: Activity, title: 'Total Bookings', value: totalBookings, gradient: true },
      { icon: Calendar, title: 'Upcoming', value: upcomingBookings },
      { icon: Clock, title: 'Hours Played', value: `${Math.round(hoursPlayed)} hrs` },
      { icon: XCircle, title: 'Cancelled', value: totalCancelled, isCancelled: true }
    ];
  };

  // Next booking calculation
  const nextBooking = bookings
    .filter(b => new Date(b.startTime) > new Date())
    .sort((a,b) => new Date(a.startTime) - new Date(b.startTime))[0];

  // Monthly booking data for chart
  const monthlyData = Array(12).fill(0).map((_, i) => ({
    name: new Date(2023, i).toLocaleString('default', { month: 'short' }),
    bookings: bookings.filter(b => new Date(b.startTime).getMonth() === i).length
  }));

  // Favorite sport calculation with fallback
  const favoriteSport = bookings.reduce((acc, booking) => {
    if (booking.sport) {
      acc[booking.sport] = (acc[booking.sport] || 0) + 1;
    }
    return acc;
  }, {});

  const favoriteSportName = Object.keys(favoriteSport).length > 0 
    ? Object.entries(favoriteSport).sort((a,b) => b[1]-a[1])[0][0] 
    : "No bookings yet";

  const stats = loading ? [
    { icon: Activity, title: 'Total Bookings', value: 'Loading...', gradient: true },
    { icon: Calendar, title: 'Upcoming', value: 'Loading...' },
    { icon: Clock, title: 'Hours Played', value: 'Loading...' },
    { icon: XCircle, title: 'Cancelled', value: 'Loading...', isCancelled: true }
  ] : getBookingStats();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  <span className={styles.firstName}>{initial}</span>
                </div>
                <div className={styles.statusBadge}>
                  <Star size={12} />
                  <span>Active</span>
                </div>
              </div>
              
              <div className={styles.profileInfo}>
                <h1 className={styles.userName}>{user?.name}</h1>
                <p className={styles.userRole}>Sports Enthusiast</p>
                
                <div className={styles.contactInfo}>
                  <InfoItem 
                    icon={Mail} 
                    text={user?.email || "Not provided"} 
                    label="Email"
                  />
                  <InfoItem 
                    icon={Phone} 
                    text={user?.phoneNumber ? `+91 ${user.phoneNumber}` : "Not provided"} 
                    label="Phone"
                  />
                  <InfoItem 
                    icon={MapPin} 
                    text={
                      user?.location?.city && user?.location?.state 
                        ? `${user.location.city}, ${user.location.state}` 
                        : "Location not set"
                    }
                    label="Location"
                  />
                </div>
              </div>
            </div>
          </div>

          <nav className={styles.nav}>
            <button 
              className={nav === "overview" ? styles.active : ""} 
              onClick={() => setNav("overview")}
            >
              <TrendingUp size={16} />
              Overview
            </button>
          </nav>
        </div>

        {nav === "overview" && (
          <div className={styles.overviewContent}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <StatCard 
                  key={index} 
                  {...stat} 
                  totalBookings={stats.find(s => s.title === 'Total Bookings')?.value || 0}
                />
              ))}
            </div>
            
            <div className={styles.additionalStats}>
              <StatCard
                icon={Hourglass}
                title="Next Booking"
                value={loading ? 'Loading...' : nextBooking ? formatTimeToNow(nextBooking.startTime) : "None"}
              >
                <p className={styles.subtext}>
                  {loading ? '' : nextBooking ? `at ${nextBooking.turfId?.turfName || 'Unknown Venue'}` : "Book a session!"}
                </p>
              </StatCard>

              <StatCard
                icon={Trophy}
                title="Favorite Sport"
                value={loading ? 'Loading...' : favoriteSportName}
              >
                {!loading && favoriteSportName !== "No bookings yet" && (
                  <p className={styles.subtext}>
                    {Object.entries(favoriteSport).sort((a,b) => b[1]-a[1])[0][1]} bookings
                  </p>
                )}
              </StatCard>
            </div>

            <div className={styles.chartSection}>
              <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Monthly Booking Trends</h3>
                  <div className={styles.chartBadge}>
                    <TrendingUp size={14} />
                    <span>Analytics</span>
                  </div>
                </div>
                {monthlyData.some(month => month.bookings > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <Bar 
                        dataKey="bookings" 
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className={styles.noDataContainer}>
                    <Activity size={48} className={styles.noDataIcon} />
                    <p className={styles.noDataText}>No booking data available</p>
                    <p className={styles.noDataSubtext}>Start booking to see your trends</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;