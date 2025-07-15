import React, { useEffect, useState } from "react";
import styles from "./StartPage.module.scss";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 280,
  '& .MuiInputLabel-root': {
    color: '#b0b0b0',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    '&.Mui-focused': {
      color: '#3b82f6',
    },
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    '& fieldset': {
      borderColor: '#404040',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#3b82f6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
    },
  },
  '& .MuiSelect-select': {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    padding: '16px 20px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  '& .MuiSelect-icon': {
    color: '#b0b0b0',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: '#1f1f1f',
  color: '#ffffff',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  padding: '12px 20px',
  '&:hover': {
    backgroundColor: '#2a2a2a',
  },
  '&.Mui-selected': {
    backgroundColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
}));

const StartPage = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://indianmadianbackend.onrender.com/api/turf/approved-cities");
        setCities(res.data.cities);
      } catch (err) {
        console.error("City load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const handleNavigate = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    navigate(`/start/${city}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.heroSection}>
            <div className={styles.iconContainer}>
              <div className={styles.locationIcon}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ef4444"/>
                </svg>
              </div>
            </div>
            
            <div className={styles.textContent}>
              <h1 className={styles.title}>Choose Your Location</h1>
              <p className={styles.subtitle}>
                Select your city to find  nearby sports venues and facilities
              </p>
            </div>
            
            <div className={styles.selectionContainer}>
              <StyledFormControl variant="outlined" fullWidth>
                <InputLabel id="city-select-label">Select Your City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={selectedCity}
                  label="Select Your City"
                  onChange={handleNavigate}
                  disabled={loading}
                >
                  {loading ? (
                    <StyledMenuItem disabled>
                      <div className={styles.loadingItem}>
                        <div className={styles.loadingSpinner}></div>
                        Loading cities...
                      </div>
                    </StyledMenuItem>
                  ) : cities.length === 0 ? (
                    <StyledMenuItem disabled>No cities available</StyledMenuItem>
                  ) : (
                    cities.map((city, index) => (
                      <StyledMenuItem key={index} value={city}>
                        {city}
                      </StyledMenuItem>
                    ))
                  )}
                </Select>
              </StyledFormControl>
            </div>
          </div>
          
          <div className={styles.featuresSection}>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#ff6b35"/>
                  </svg>
                </div>
                <span>Find and book verified venues</span>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h3v6h2v-6s0-2 2-2h3s2 0 2 2v6h2v-6h3v6h2V9s0-2-2-2H9s-2 0-2 2v9H4z" fill="#ff6b35"/>
                  </svg>
                </div>
                <span>Quick & Simple booking process</span>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#ff6b35"/>
                  </svg>
                </div>
                <span>Flexibility with payments </span>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ff6b35"/>
                  </svg>
                </div>
                <span>Regular Venue Audits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StartPage;