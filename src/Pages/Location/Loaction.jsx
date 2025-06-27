// "use client"
import React, { useState, useMemo, useEffect } from "react";
import styles from "./Location.module.scss";
import Header from "../../Components/Header/Header";
import { Input } from "@mui/material";
import { SideBar2 } from "../../Components/Sidebar/Sidebar";
import { RequestTrufbyCity } from "../../services/User/Trufs";
import { useParams } from "react-router-dom";

const Location = () => {
  const params = useParams();
  const { id } = params;

  const [allVenues, setAllVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // ✅ This function moved to TOP to fix price: undefined
 const getDynamicPrice = (venue) => {
  const today = new Date().getDay();
  const isWeekend = today === 0 || today === 6;

  const weekday = venue.weekdayRate || 0;
  const weekend = venue.weekendRate || 0;

  return isWeekend ? weekend : weekday;
};


  const getTurfByCity = async () => {
    try {
      const payload = { city: id };
      const response = await RequestTrufbyCity(payload);

      if (response.error) throw new Error(response.error);

      if (response.success) {
        console.log("📦 Raw backend response:", response.data);

        const transformedData = response.data.map((venue) => ({
          id: venue._id,
          name: venue.turfName,
          location: `${venue.location.city}, ${venue.location.state}`,
          city: venue.location.city,
          state: venue.location.state,
          sports: venue.availableSports,
          price: getDynamicPrice(venue), // ✅ Now works fine
          weekdayRate: venue.weekdayRate,
          weekendRate: venue.weekendRate,
          image: venue.facilityImages || ["/default-turf-image.jpg"],
          amenities: venue.amenities,
          cancellationPolicy: venue.cancellationPolicy,
          fullAddress: venue.fullAddress,
          turfSize: venue.turfSize,
          weekendHours: venue.weekendHours,
          advancePayment: venue.advancePayment,
          surfaceType: venue.surfaceType,
          weekdayHours: venue.weekdayHours,
        }));

        console.log("✅ Transformed Data:", transformedData);
        setAllVenues(transformedData);
      }
    } catch (error) {
      console.error("❌ Error fetching turf data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTurfByCity();
  }, [id]);

  const uniqueLocations = [...new Set(allVenues.map((venue) => venue.city))];
  const uniqueSports = [...new Set(allVenues.flatMap((venue) => venue.sports))];

  const filteredVenues = useMemo(() => {
    let filtered = allVenues;

    if (selectedLocation) {
      filtered = filtered.filter((venue) => venue.city === selectedLocation);
    }

    if (selectedSport) {
      filtered = filtered.filter((venue) => venue.sports.includes(selectedSport));
    }

    if (priceSort === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [allVenues, selectedLocation, selectedSport, priceSort]);

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
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
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
            <option value="">All Sports</option>
            {uniqueSports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
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

        <button onClick={clearFilters} className={styles.clearButton}>
          Clear Filters
        </button>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        <p>Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? "s" : ""}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.background}></div>
        {loading ? (
          <div className={styles.noResults}>
            <p>Loading venues...</p>
          </div>
        ) : (
          <div className={styles.cards}>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <div key={venue.id} className={styles.card}>
                  <div className={styles.images}>
                    <img
                      src={venue?.image[0]}
                      className={styles.image}
                      alt={venue.name}
                      onError={(e) => {
                        e.target.src = "/default-turf-image.jpg";
                      }}
                    />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.name}>{venue.name}</h3>
                    <p className={styles.location}>{venue.location}</p>
                    <p className={styles.sports}>{venue.sports.join(", ")}</p>
                    <p className={styles.price}>
                       <span className={styles.priceTag}></span>
                      ₹{venue.price} / hour&nbsp;
                      <span style={{ fontSize: "0.85em", color: "#aaa" }}>
                        ({new Date().getDay() === 0 || new Date().getDay() === 6
                          ? "Weekend Rate"
                          : "Weekday Rate"})
                      </span>
                    </p>
                    <div className={styles.amenities}>
                      {venue.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className={styles.amenity}>
                          {amenity},{" "}
                        </span>
                      ))}
                    </div>
                    <SideBar2 data={venue} />
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
        )}
      </div>
    </>
  );
};

export default Location;
