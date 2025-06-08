import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown, Info } from "lucide-react";
import styles from "./Authpage.module.scss"; // Import SCSS module
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/actions/loginAction";

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

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [loginCreads, setLoginCreads] = useState({});

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

  const handleChange = (e) => {
    setLoginCreads({ ...loginCreads, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect if already authenticated
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      dispatch(loginRequest(loginCreads));
    } else {
      // Handle signup logic
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Left side - Features */}
      <div className={styles.featureSection}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <div className={styles.globeIcon}></div>
          </div>
          <div className={styles.brandText}>
            <h1>INDIAN MAIDAN</h1>
            <p>Premium Sports Turf Booking Platform</p>
          </div>
        </div>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className={styles.featureContent}>
              <h3>Easy Booking</h3>
              <p>Book your favorite sports turf with just a few clicks. No hassle, no waiting.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className={styles.featureContent}>
              <h3>Real-time Availability</h3>
              <p>Check real-time availability of all sports turfs and book instantly.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className={styles.featureContent}>
              <h3>Premium Facilities</h3>
              <p>Access to world-class sports facilities with premium amenities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className={styles.formSection}>
        <div className={styles.authCard}>
          <div className={styles.cardHeader}>
            <img src="/logo-icon.svg" alt="Logo" className={styles.logoIcon} />
            <h2>Welcome</h2>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "login" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "signup" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup2}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup2}>
                <div className={styles.passwordLabel}>
                  <label>Password</label>
                  <a href="#" className={styles.forgotLink}>Forgot password?</a>
                </div>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
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

              <div className={styles.rememberMe}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <button type="submit" className={styles.submitButton}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className={styles.signUpPrompt}>
                Don't have an account? <span onClick={() => setActiveTab("signup")}>Sign up</span>
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className={styles.form}>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSportSelection(sport);
                          }}
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
                    is only available for turf bookings.
                  </p>
                  <button
                    className={styles.closeInfo}
                    onClick={() => setShowInfo(false)}
                  >
                    Close
                  </button>
                </div>
              )}

              <button type="submit" className={styles.submitButton}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;