// src/Pages/RescheduleBooking/RescheduleBooking.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RescheduleBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [bookingInfo, setBookingInfo] = useState(null);
  const [turfInfo, setTurfInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get booking detail
        const bookingRes = await axios.get(`https://indianmadianbackend.onrender.com/api/booking/${bookingId}`);
        const booking = bookingRes.data;

        setBookingInfo(booking);
        const turfId = booking.turfId._id || booking.turfId;

        // Step 2: Get turf detail
        const turfRes = await axios.get(`https://indianmadianbackend.onrender.com/api/turf/${turfId}`);
        setTurfInfo(turfRes.data);

        setError('');
      } catch (err) {
        setError('Something went wrong while fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Reschedule Booking</h2>
      <p>Turf Name: {turfInfo?.turfName}</p>
      <p>Address: {turfInfo?.fullAddress}</p>

      {/* Here we will show slot grid later */}

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default RescheduleBooking;
