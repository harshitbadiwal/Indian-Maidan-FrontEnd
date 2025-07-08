import { useState, useEffect } from 'react';

export const useUserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    if (!user?._id) return;

    try {
      const res = await fetch(
        `https://indianmadianbackend.onrender.com/api/booking/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
};