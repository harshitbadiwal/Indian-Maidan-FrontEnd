// "use client"
import React, { useState, useMemo } from "react";
import styles from "./Location.module.scss";
import Header from "../../Components/Header/Header";
import { Input } from "@mui/material";
import { SideBar2, SideBar3 } from "../../Components/Sidebar/Sidebar";

const Location = () => {
  // Sample venues data - expanded for filtering demonstration
  const allVenues = [
    {
      id: 1,
      image: "/images/mob.jpg",
      name: "Elite Sports Arena",
      location: "New York, USA",
      sports: ["Football", "Basketball"],
      price: 800,
      city: "New York"
    },
    {
      id: 2,
      image: "/images/football.webp",
      name: "Prime Sports Center",
      location: "Los Angeles, USA",
      sports: ["Tennis", "Swimming"],
      price: 1200,
      city: "Los Angeles"
    },
    {
      id: 3,
      image: "/images/badminton.webp",
      name: "Champion Badminton Club",
      location: "Chicago, USA",
      sports: ["Badminton", "Table Tennis"],
      price: 600,
      city: "Chicago"
    },
    {
      id: 4,
      image: "/images/swimming.jpg",
      name: "Aqua Sports Complex",
      location: "Miami, USA",
      sports: ["Swimming", "Water Polo"],
      price: 1000,
      city: "Miami"
    },
    {
      id: 5,
      image: "/images/mob.jpg",
      name: "Multi-Sport Arena",
      location: "Boston, USA",
      sports: ["Football", "Basketball", "Cricket"],
      price: 900,
      city: "Boston"
    }
  ];

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // Get unique locations and sports for filter options
  const uniqueLocations = [...new Set(allVenues.map(venue => venue.city))];
  const uniqueSports = [...new Set(allVenues.flatMap(venue => venue.sports))];

  // Filtered and sorted venues
  const filteredVenues = useMemo(() => {
    let filtered = allVenues;

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(venue => venue.city === selectedLocation);
    }

    // Filter by sport
    if (selectedSport) {
      filtered = filtered.filter(venue => venue.sports.includes(selectedSport));
    }

    // Sort by price
    if (priceSort === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedLocation, selectedSport, priceSort]);

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedSport("");
    setPriceSort("");
  };

  return (
    <>
      <div style={{ color: "black", marginBottom: "1vw", borderBottom: "1px solid white" }}>
        <Header />
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <span className={styles.filterIcon}>📍</span>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <span className={styles.filterIcon}>⚽</span>
          <select 
            value={selectedSport} 
            onChange={(e) => setSelectedSport(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Choose Sports</option>
            {uniqueSports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <span className={styles.filterIcon}>💰</span>
          <select 
            value={priceSort} 
            onChange={(e) => setPriceSort(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Price Sort</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <button onClick={clearFilters} className={styles.clearButton}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        <p>Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={styles.background}>
          {/* <img src="/images/sports2.png" /> */}
        </div>
        
        <div className={styles.cards}>
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <div key={venue.id} className={styles.card}>
                <div className={styles.images}>
                  <img src={venue.image} className={styles.image} alt={venue.name} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{venue.name}</h3>
                  <p className={styles.location}>{venue.location}</p>
                  <p className={styles.sports}>
                    {venue.sports.join(", ")}
                  </p>
                  <p className={styles.price}>Rs {venue.price} / month</p>
                  <SideBar2 />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>No venues found</h3>
              <p>Try adjusting your filters to find more venues.</p>
              <button onClick={clearFilters} className={styles.clearButton}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Location;