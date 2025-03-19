import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown, Info } from "lucide-react";
import styles from "./OwnerAuth.module.scss"; // Import SCSS module

const sportsOptions = [
  "Cricket",
  "Badminton",
  "Volleyball",
  "Football",
  "Tennis",
  "Basketball",
  "Hockey",
  "Table Tennis",
  "Golf",
];

const OwnerAuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);



  const toggleSportSelection = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>INDIAN MAIDAN</h2>
          <p>Book turfs, find academies, and hire local umpires</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={activeTab === "login" ? styles.active : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? styles.active : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input type="tel" placeholder="Phone number" required />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input type="text" placeholder="Your city" required />
              </div>
            </div>

            <div className={styles.formGroup} ref={dropdownRef}>
              <label>Sports Preferences</label>
              <div
                className={styles.dropdown}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <button type="button" className={styles.dropdownBtn}>
                  {selectedSports.length > 0
                    ? selectedSports.join(", ")
                    : "Select Sports"}
                  <ChevronDown size={18} />
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {sportsOptions.map((sport, index) => (
                      <div
                        key={index}
                        className={styles.dropdownItem}
                        onClick={() => toggleSportSelection(sport)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSports.includes(sport)}
                          readOnly
                        />
                        <span>{sport}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>

            <div className={styles.infoSection}>
              <input type="checkbox" id="co-partner" />
              <label htmlFor="co-partner">
                Add my profile to the Co-Partner section
              </label>
              <Info
                className={styles.infoIcon}
                onClick={() => setShowInfo(!showInfo)}
              />
            </div>

            {showInfo && (
              <div className={styles.infoBox}>
                <p>
                  The Co-Partner section allows your profile to be visible when
                  someone books a turf. If a user selects 'Find Co-Partner' while
                  booking, they can invite you to play. Currently, this feature
                  is only available for turf bookings. In the future, we plan to
                  introduce a separate feature where you can find and connect
                  with sports buddies directly, without booking a turf. You will
                  also be able to chat and arrange games at any location of your
                  choice.
                </p>
                <button
                  className={styles.closeInfo}
                  onClick={() => setShowInfo(false)}
                >
                  Close
                </button>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OwnerAuthPage;