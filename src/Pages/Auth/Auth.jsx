import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import styles from "./Authpage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import indianMaidanLogo from "../../assests/INDIANMAIDANLOGO.png";

const sportsOptions = ["Football",
    "Basketball",
    "Cricket",
    "Tennis",
    "Hockey",
    "Badminton",
    "Volleyball",
    "Table Tennis",
    "Kabaddi",
    "Kho Kho",
    "Baseball",
    "Rugby",
    "Handball",
    "Golf",
    "Boxing",
    "Athletics",
    "Swimming",
    "Skating",
    "Archery",
    "Shooting",
    "Chess",    ];
const API_BASE_URL = "https://indianmadianbackend.onrender.com/api/user/auth";

const parseJwt = (token) => {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const decoded = atob(base64Payload);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("JWT Decode Error:", e);
    return null;
  }
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "", password: "", name: "", phoneNumber: "", city: "", state: "", confirmPassword: ""
  });
  const [selectedSports, setSelectedSports] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleSportSelection = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === "login") {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        const token = response.data.token;
        const decoded = parseJwt(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({
          
          _id: decoded.id,
          email: formData.email,
          name: decoded.name || "",
        }));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token,
            user: {
              _id: decoded.id,
              email: formData.email,
              name: decoded.name || "",
            },
          },
        });

        window.location.href = "/";

      } else if (activeTab === "signup") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match!");
        }

        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          location: { city: formData.city, state: formData.state },
          sportsPreferences: selectedSports,
        };

        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        const token = response.data.data.token;
        const decoded = parseJwt(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({
          
          _id: decoded.id,
          email: formData.email,
          name: formData.name
        }));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token,
            user: {
              _id: decoded.id,
              email: formData.email,
              name: formData.name,
            },
          },
        });

        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/forgot-password`, { email: resetEmail });
      setOtpSent(true);
      setActiveTab("reset");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/reset-password`, {
        email: resetEmail,
        otp,
        newPassword,
      });
      setActiveTab("login");
      setResetEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrapper}>
            <img src={indianMaidanLogo} alt="Indian Maidan Logo" className={styles.companyLogo} />
            <div className={styles.brandText}>
              <h1>INDIAN MAIDAN</h1>
              <p>Premium Sports Turf Booking Platform</p>
            </div>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "login" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "signup" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className={styles.formContainer}>
          {error && (
            <div className={styles.errorMessage}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {error}
            </div>
          )}

          {activeTab === "login" && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordLabel}>
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("forgot")}
                    className={styles.forgotLink}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="16" r="1" fill="currentColor"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
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
                <label htmlFor="remember">Remember me for 30 days</label>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading || isLoading}
              >
                {loading || isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className={styles.signUpPrompt}>
                Don't have an account? <button type="button" onClick={() => setActiveTab("signup")}>Sign up</button>
              </div>
            </form>
          )}

          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName"
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  autoComplete="name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="emailSignup">Email Address</label>
                <input 
                  type="email" 
                  id="emailSignup"
                  name="email" 
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  autoComplete="email"
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phoneNumber" 
                    placeholder="Enter 10-digit phone number" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required 
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city" 
                    placeholder="Enter your city" 
                    value={formData.city}
                    onChange={handleChange}
                    required 
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <input 
                  type="text" 
                  id="state"
                  name="state" 
                  placeholder="Enter your state" 
                  value={formData.state}
                  onChange={handleChange}
                  required 
                  autoComplete="address-level1"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="passwordSignup">Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwordSignup"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup} ref={dropdownRef}>
                <label htmlFor="sportsPreferences">Sports Preferences</label>
                <div className={styles.dropdown}>
                  <button 
                    type="button" 
                    className={styles.dropdownBtn}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedSports.length > 0
                      ? selectedSports.join(", ")
                      : "Select your favorite sports"}
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

              <div className={styles.signUpPrompt}>
                Already have an account? <button type="button" onClick={() => setActiveTab("login")}>Sign in</button>
              </div>
            </form>
          )}
         
          {activeTab === "forgot" && (
            <form onSubmit={handleForgotPassword} className={styles.form}>
              <div className={styles.formHeader}>
                <h3>Reset Password</h3>
                <p>Enter your email address and we'll send you a verification code</p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="resetEmail">Email Address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <input 
                    type="email" 
                    id="resetEmail"
                    placeholder="Enter your email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required 
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Send Verification Code"}
              </button>
              
              <div className={styles.signUpPrompt}>
                Remember your password? <button type="button" onClick={() => setActiveTab("login")}>Sign in</button>
              </div>
            </form>
          )}

          {activeTab === "reset" && (
            <form onSubmit={handleResetPassword} className={styles.form}>
              <div className={styles.formHeader}>
                <h3>Enter Verification Code</h3>
                <p>We've sent a verification code to {resetEmail}</p>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="otpCode">Verification Code</label>
                <input 
                  type="text" 
                  id="otpCode"
                  placeholder="Enter 6-digit verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required 
                  maxLength="6"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="newPasswordReset">New Password</label>
                <div className={styles.inputWrapper}>
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    id="newPasswordReset"
                    placeholder="Create a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
              
              <div className={styles.signUpPrompt}>
                Back to <button type="button" onClick={() => setActiveTab("login")}>Sign in</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;