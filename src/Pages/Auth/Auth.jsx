import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown, Info } from "lucide-react";
import styles from "./Authpage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/actions/loginAction";
import axios from "axios";

const sportsOptions = [
  "Football",
  "Basketball",
  "Cricket",
  "Tennis",
  "Hockey",
  "Badminton"
];

const API_BASE_URL = "https://indianmadianbackend.onrender.com/api/user/auth";

const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1];
    return JSON.parse(atob(base64Payload));
  } catch (e) {
    return null;
  }
};

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    city: "",
    state: "",
    confirmPassword: ""
  });

  const toggleSportSelection = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === "login") {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password
        });
        
        const token = response.data.token;
        const decoded = parseJwt(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ 
          _id: decoded.id,
          email: formData.email,
          name: decoded.name || ""
        }));

        dispatch({ 
          type: "LOGIN_SUCCESS", 
          payload: { 
            token,
            user: {
              _id: decoded.id,
              email: formData.email
            }
          }
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match!");
        }

        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          location: {
            city: formData.city,
            state: formData.state,
          },
          sportsPreferences: selectedSports,
        };

        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        const token = response.data.token;
        const decoded = parseJwt(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({
          _id: decoded.id,
          email: formData.email,
          name: formData.name
        }));

        dispatch(loginRequest({
          email: formData.email,
          password: formData.password
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
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

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

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
                    value={formData.email}
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
                    value={formData.password}
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

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading || isLoading}
              >
                {loading || isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className={styles.signUpPrompt}>
                Don't have an account? <span onClick={() => setActiveTab("signup")}>Sign up</span>
              </div>
            </form>
          )}

          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    placeholder="Phone number (10 digits)" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="Your city" 
                    value={formData.city}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>State</label>
                  <input 
                    type="text" 
                    name="state" 
                    placeholder="Your state" 
                    value={formData.state}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
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

              <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
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