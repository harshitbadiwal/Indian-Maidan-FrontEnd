    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import Drawer from '@mui/material/Drawer';
    import Button from '@mui/material/Button';
    import List from '@mui/material/List';
    import Divider from '@mui/material/Divider';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import InboxIcon from '@mui/icons-material/MoveToInbox';
    import MailIcon from '@mui/icons-material/Mail';
    import MenuIcon from '@mui/icons-material/Menu';
    import axios from "axios";
    import styles from "./SideBar.module.scss"
    import { Calendar, Clock, Users, CreditCard, Wallet } from 'lucide-react';
    import { FaHome, FaUsers, FaBell, FaUserCircle, FaCog } from "react-icons/fa";
    import { MdOutlineMiscellaneousServices, MdOutlineContactSupport } from "react-icons/md";
    import { BsJournalBookmark } from "react-icons/bs";
    import { IoIosArrowDown } from "react-icons/io";
    import { useNavigate } from 'react-router-dom';
    import ChatIcon from '@mui/icons-material/Chat';
    import { useMemo } from 'react';
    import { GoLocation } from 'react-icons/go';
    import mapPinImg from '../../assests/mappreview.png';
    import { FaSignOutAlt } from "react-icons/fa"; //logout functionality
    import { useDispatch } from "react-redux";
  import { getTokenData } from "../../services/tokenUtiles";


  export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = getTokenData();
const userInitial = user?.name?.charAt(0).toUpperCase() || "?";
  

  const navigations = (path) => {
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" style={{ height: "100%", color: "white" }}>
      <div className={styles.sidebar}>
        {/* Logo and Title */}
        <div>
          <div className={styles.logoSection}>
            <FaUserCircle className={styles.logo} />
            <h2 className={styles.title}>INDIAN MAIDAN</h2>
          </div>

          {/* Navigation Links */}
          <ul className={styles.navList}>
            <li onClick={() => navigations(" ")} className={styles.navItem}>
              <FaHome className={styles.icon} />
              <span>Home</span>
            </li>
            <li onClick={() => navigations("aboutUs")} className={styles.navItem}>
              <FaUsers className={styles.icon} />
              <span>About</span>
            </li>
            <li onClick={() => setShowServices(!showServices)} className={styles.navItem}>
              <MdOutlineMiscellaneousServices className={styles.icon} />
              <span>Services</span>
              <IoIosArrowDown className={styles.arrow} />
            </li>

            {showServices && (
              <ul className={styles.subMenu}>
                <li onClick={() => navigations("start")} className={styles.subMenuItem}>
                  <span>Book Sports Turf</span>
                </li>
              </ul>
            )}

            <li onClick={() => navigations("myBooking")} className={styles.navItem}>
              <BsJournalBookmark className={styles.icon} />
              <span>My Booking</span>
            </li>
            {/* <li onClick={() => navigations("message")} className={styles.navItem}>
              <ChatIcon className={styles.icon} />
              <span>Messages</span>
            </li> */}
           {/*  <li className={styles.navItem}>
              <FaBell className={styles.icon} />
              <span>Notification</span>
            </li> */}
            <li onClick={() => navigations("contact")} className={styles.navItem}>
              <MdOutlineContactSupport className={styles.icon} />
              <span>Contact Us</span>
            </li>
          </ul>
        </div>
 
        {/* Profile Section + Logout */}
        <div className={styles.profileSection}>
          <div onClick={() => navigations("profile")} className={styles.profileInfo}>
            <FaUserCircle className={styles.profilePic} />
            <div className={styles.profileText}>
              <span className={styles.name}>{user?.name || "Guest User"}</span>
              <span className={styles.viewProfile}>View Profile</span>
            </div>
          </div>
          

          {/* 🚪 Logout Button */}
          <li onClick={handleLogout} className={`${styles.navItem} ${styles.logout}`}>
            <FaSignOutAlt className={styles.icon} />
            <span>Logout</span>
          </li>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: "white" }} fontSize="large" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
      export function SideBar2({ data, disabled }) {
         console.log("SideBar2 Data:", data);
        const [open, setOpen] = useState(false);
        const [selectedSport, setSelectedSport] = useState('football');
        const [selectedDate, setSelectedDate] = useState(new Date()); // default today
      const [valueChange,setValueChange] = useState(true)
      const [agreedToAdvance, setAgreedToAdvance] = useState(false);
      const currentUser = JSON.parse(localStorage.getItem("user")); // User login data
      const latitude = data?.lat;
      const longitude = data?.lng;

      

 

      const getSlotPrice = () => {
    const day = new Date(selectedDate).getDay();
    const isWeekend = day === 0 || day === 6;
    return isWeekend ? data?.weekendRate : data?.weekdayRate;
  };

        const toggleDrawer = (newOpen) => () => {
          setOpen(newOpen);
        };
        function generateTimeSlots(openingTime, closingTime) {
      // First try parsing as ISO format (UTC)
      let startDate = new Date(openingTime);
      let endDate = new Date(closingTime);
      
      // If the dates are invalid (NaN), try parsing as local time strings
      if (isNaN(startDate.getTime())) {
        startDate = parseTimeString(openingTime);
      }
      if (isNaN(endDate.getTime())) {
        endDate = parseTimeString(closingTime);
      }

      // Handle cases where closing time is next day
      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }

      const timeSlots = [];
      let current = new Date(startDate);

      while (current < endDate) {
        const slotStart = new Date(current);
        current.setHours(current.getHours() + 1);
        const slotEnd = new Date(current);
        
        timeSlots.push({
          start: formatTime(slotStart),
          end: formatTime(slotEnd),
          rawStart: slotStart,
          rawEnd: slotEnd
        });
      }

      return timeSlots;
    }
    

    // Helper function to parse time strings like "10:00 AM"
    function parseTimeString(timeStr) {
      const [time, period] = timeStr.split(/(?=[AP]M)/i);
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
      
      const date = new Date();
      date.setHours(hours, minutes || 0, 0, 0);
      return date;
    }

    // Helper function to format time as "HH:MM AM/PM"
    function formatTime(date) {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

        const [selectedSlots, setSelectedSlots] = useState([]);

        // Toggle time slot selection
        const toggleTimeSlot = (slot) => {
          setSelectedSlots(prev => {
            // Check if slot is already selected
            const isSelected = prev.some(
              s => s.start === slot.start && s.end === slot.end
            );
            
            if (isSelected) {
              // Remove from selection
              return prev.filter(
                s => !(s.start === slot.start && s.end === slot.end)
              );
            } else {
              // Add to selection
              return [...prev, slot];
            }
          });
        };

        // Check if a slot is selected
        const isSlotSelected = (slot) => {
          return selectedSlots.some(
            s => s.start === slot.start && s.end === slot.end
          );
        };


    

// …

const timeSlots = useMemo(() => {
  const day = selectedDate.getDay();              // 0 = Sunday, 6 = Saturday
  const isWeekend = (day === 0 || day === 6);

  const { openingTime, closingTime } = isWeekend
    ? data.weekendHours
    : data.weekdayHours;

  return generateTimeSlots(openingTime, closingTime);
}, [selectedDate, data.weekdayHours, data.weekendHours]);


          const [selectedPayment, setSelectedPayment] = useState('');
          const [selectedServices, setSelectedServices] = useState([]);
        
          const services = [
            { id: 'equipment', name: 'Sports Equipment Rental', price: 200 },
            { id: 'trainer', name: 'Professional Trainer', price: 500 },
            { id: 'refreshments', name: 'Refreshments Package', price: 150 }
          ];
        
          const basePrice = 800;
          const totalAmount = basePrice + selectedServices.reduce((sum, service) => 
            sum + services.find(s => s.id === service).price, 0
          );
        

          const isSlotInRange = (slot) => {
          if (selectedSlots.length < 2) return false;
          
          const sortedSlots = [...selectedSlots].sort((a, b) => 
            timeSlots.findIndex(s => s.start === a.start) - 
            timeSlots.findIndex(s => s.start === b.start)
          );
          
          const firstIndex = timeSlots.findIndex(s => s.start === sortedSlots[0].start);
          const lastIndex = timeSlots.findIndex(s => s.start === sortedSlots[sortedSlots.length - 1].start);
          const currentIndex = timeSlots.findIndex(s => s.start === slot.start);
          
          return currentIndex >= firstIndex && currentIndex <= lastIndex;
        };

       const handleBooking = async () => {
  const totalPrice = getSlotPrice() * selectedSlots.length;

  if (!selectedSlots.length) {
    alert("Please select at least one time slot.");
    return;
  }

  // Ensure turfId is correct
  const turfId = data?._id || data?.id;
  if (!turfId) {
    alert("Turf ID missing.");
    return;
  }

  const enrichedSlots = selectedSlots.map(slot => {
    const slotDate = new Date(slot.rawStart);
    const hours = slotDate.getHours();
    const minutes = slotDate.getMinutes();

    const rawStart = new Date(selectedDate);
    rawStart.setHours(hours, minutes, 0, 0);

    const rawEnd = new Date(rawStart.getTime() + 60 * 60 * 1000);

    return {
      ...slot,
      rawStart: toISTISOString(rawStart),
      rawEnd: toISTISOString(rawEnd),
    };
  });

  const bookingDate = new Date(selectedDate);
  bookingDate.setHours(0,0,0,0);

  const payload = {
    userId: currentUser._id,
    turfId,
    sport: selectedSport,
    bookingDate: toISTISOString(bookingDate),
    startTime: enrichedSlots[0]?.rawStart,
    endTime: enrichedSlots[enrichedSlots.length - 1]?.rawEnd,
    selectedSlots: enrichedSlots,
    advancePercentage: data?.advancePayment,
    advancePaid: Math.round(totalPrice * (data?.advancePayment / 100)),
    amountDueAtVenue: Math.round(totalPrice * (1 - data?.advancePayment / 100)),
    totalPrice
  };

  try {
    const res = await axios.post(`https://indianmadianbackend.onrender.com/api/booking/create`, payload);
    if (res.status === 201) {
      alert("Booking Confirmed!");
      window.location.href = "/mybooking";
    }
  } catch (err) {
    console.error("❌ Booking error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Server error while booking");
  }
};



        


        const DrawerList = (
          <Box className={styles.drawerList} role="presentation" onClick={toggleDrawer("right", false)}>
            {disabled && (
              <div style={{ color: "#ff4d4f", fontWeight: "bold", margin: "16px 0", textAlign: "center" }}>
                ⚠️ This turf is not accepting bookings currently
              </div>
            )}
            {valueChange? <div className={styles.sportsArena}>
            <div className={styles.modal}>
      <div className={styles.modalHeader}>
      <h2>{data?.name}</h2>
      <p className={styles.location}>
      <i className={styles.locationIcon} />
      {data?.fullAddress}, {data?.city}, {data?.state} - {data?.pincode}
    </p>
 


      </div>
    {/* Turf Images */}
    <div className={styles.turfImagesContainer}>
    {data?.image?.length==0 ? (
      <p style={{ color: 'white', textAlign: 'center' }}>No images available</p>
    ): (
      data?.image?.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`turf-${index}`}
          className={styles.turfImage}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ))
    ) }
  </div>

      {/* Turf Details */}
      <div className={styles.turfDetailsSection}>
        <p><strong>Surface Type:</strong> {data?.surfaceType}</p>
        <p><strong>Turf Size:</strong> {data?.turfSize}</p>
        <p><strong>Available Sports:</strong> {data?.availableSports?.join(', ')}</p>
        <p><strong>Amenities:</strong> {data?.amenities?.join(', ')}</p>
       <p><strong>Contact:</strong> {data?.contactNumber || "Not available"}</p>
       <p><strong>Email:</strong> {data?.email || "Not available"}</p>
      </div>
        

      {/* Rest of the original code (sports, booking, date picker, slots, etc.) remains as-is */}


              <div className={styles.sportSelection}>
                <h3>Choose Your Sport</h3>
                <div className={styles.sportButtons}>
                {
                  data?.sports.map((sport, index) => (
                  <button
                  className={`${styles.sportBtn} ${selectedSport === sport ? styles.active : ''}`}
                    // className={styles.sportBtn}
                    onClick={() => setSelectedSport(sport)}
                  >
                    {sport}
                  </button>))
                }
                
                </div>
              </div>

              {/* <div className={styles.navigationTabs}>
                <button className={styles.tab} >Book Now</button>
                <button className={styles.tab}>Find Partners</button>
                <button className={styles.tab}>Facilities</button>
                <button className={styles.tab}>Gallery</button>
              </div> */}

              <div className={styles.bookingSection}>
                <h3>Book Your Slot</h3>
              
                <div style={{ marginBottom: "1rem" }}>
    <label style={{ fontWeight: "bold" }}>Select Date:</label>
    <input
      type="date"
      value={selectedDate.toISOString().split("T")[0]}
      onChange={(e) => setSelectedDate(new Date(e.target.value))}
      style={{ padding: "5px", width: "100%", marginTop: "5px" }}
    />
  </div>

                <div className={styles.timeSlots}>
                  <h4>Available Time Slots</h4>
                  {/* <div className={styles.slotsGrid}> */}
                    {/* {timeSlots.map((slot) => ( */}
                      {/* <button  className={styles.timeSlot}>
                        {generateTimeSlots(data?.weekdayHours?.openingTime, data?.weekdayHours?.closingTime)}
                      </button> */}
                    {/* ))} */}


  <div className={styles.slotsGrid}>
    {timeSlots.map((slot, index) => {
      const isSelected = selectedSlots.some(s => s.start === slot.start && s.end === slot.end);
      const isInRange = isSlotInRange(slot);
      const slotPrice = getSlotPrice(); // Get price based on selected date
      
      return (
        <button
          key={index}
          className={`${styles.timeSlot} ${
            isSelected ? styles.selected : ''
          } ${
            isInRange ? styles.inRange : ''
          }`}
          onClick={() => toggleTimeSlot(slot)}
        >
          <div className={styles.slotTime}>{slot.start} - {slot.end}</div>
          <div className={styles.slotPrice}>₹{slotPrice}/hr</div>
        </button>
      )
    })}
  </div>
            
            {/* Display selected slots */}
            {selectedSlots.length > 0 && (
    <div className={styles.selectedSlots}>
      <h4>Selected Time Slots:</h4>
      <ul>
        {selectedSlots.map((slot, index) => (
          <li key={index} className={styles.selectedSlotItem}>
            {slot.start} - {slot.end} 
            <span className={styles.slotPrice}>₹{getSlotPrice()}</span>
          </li>
        ))}
      </ul>
      <div className={styles.totalAmount}>
        Total Amount: ₹{getSlotPrice() * selectedSlots.length}
      </div>
    </div>
  )}
  {/* Enhanced Advance Payment Section */}
  {data?.advancePayment && (
    <div style={{ 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
      border: "2px solid #3b82f6", 
      borderRadius: "12px", 
      padding: "16px", 
      marginTop: "12px", 
      fontSize: "0.95rem",
      color: "#1e293b",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "12px",
        paddingBottom: "8px",
        borderBottom: "1px solid #cbd5e1"
      }}>
        <div style={{ 
          width: "24px", 
          height: "24px", 
          borderRadius: "50%", 
          background: "#3b82f6", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          marginRight: "8px" 
        }}>
          <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>₹</span>
        </div>
        <h4 style={{ 
          margin: "0", 
          color: "#1e293b", 
          fontSize: "1.1rem", 
          fontWeight: "600" 
        }}>
          Payment Breakdown
        </h4>
      </div>

      {/* Payment Details */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "12px", 
        marginBottom: "12px" 
      }}>
        <div style={{ 
          background: "rgba(34, 197, 94, 0.1)", 
          padding: "10px", 
          borderRadius: "8px",
          border: "1px solid rgba(34, 197, 94, 0.2)"
        }}>
          <p style={{ 
            margin: "0", 
            fontSize: "0.85rem", 
            color: "#065f46", 
            fontWeight: "500" 
          }}>
            Advance ({data.advancePayment}%)
          </p>
          <p style={{ 
            margin: "4px 0 0 0", 
            fontSize: "1.1rem", 
            color: "#059669", 
            fontWeight: "700" 
          }}>
            ₹{Math.round((getSlotPrice() * selectedSlots.length) * (data.advancePayment / 100))}
          </p>
        </div>
        
        <div style={{ 
          background: "rgba(168, 85, 247, 0.1)", 
          padding: "10px", 
          borderRadius: "8px",
          border: "1px solid rgba(168, 85, 247, 0.2)"
        }}>
          <p style={{ 
            margin: "0", 
            fontSize: "0.85rem", 
            color: "#581c87", 
            fontWeight: "500" 
          }}>
            At Venue (70%)
          </p>
          <p style={{ 
            margin: "4px 0 0 0", 
            fontSize: "1.1rem", 
            color: "#7c3aed", 
            fontWeight: "700" 
          }}>
            ₹{Math.round((getSlotPrice() * selectedSlots.length) * (1 - data.advancePayment / 100))}
          </p>
        </div>
      </div>

      {/* Info Text */}
      <div style={{ 
        background: "rgba(59, 130, 246, 0.05)", 
        padding: "10px", 
        borderRadius: "6px", 
        marginBottom: "12px",
        border: "1px dashed #3b82f6"
      }}>
        <p style={{ 
          margin: "0", 
          fontSize: "0.9rem", 
          color: "#1e40af", 
          lineHeight: "1.4" 
        }}>
          💡 Pay {data.advancePayment}% now to secure your slot. Remaining amount due at the turf.
        </p>
      </div>

      {/* Checkbox */}
      <label style={{ 
        display: "flex", 
        alignItems: "center", 
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        transition: "background-color 0.2s",
        ":hover": { backgroundColor: "rgba(59, 130, 246, 0.05)" }
      }}>
        <input 
          type="checkbox" 
          checked={agreedToAdvance} 
          onChange={() => setAgreedToAdvance(!agreedToAdvance)} 
          style={{ 
            marginRight: "10px",
            width: "18px",
            height: "18px",
            accentColor: "#3b82f6"
          }}
        />
        <span style={{ 
          fontSize: "0.9rem", 
          color: "#374151", 
          fontWeight: "500" 
        }}>
          I understand and agree to proceed
        </span>
      </label>
    </div>
  )}


                </div>

                <div className={styles.facilityPreview}>
                  {/* <h4>Facility Preview</h4> */}
                  <div className={styles.previewImages}>
                    <div className={styles.previewImages} />
                    <div className={styles.previewImages} />
                  </div>
                </div>
                {/* <button onClick={()=>{}} className={styles.bookNowBtn} style={{marginBottom:"1vw"}}>Find Co-Partner</button> */}
                <button 
  onClick={handleBooking}
  className={styles.bookNowBtn}
  disabled={!agreedToAdvance}
  style={{
    opacity: agreedToAdvance ? 1 : 0.6,
    cursor: agreedToAdvance ? "pointer" : "not-allowed",
    transition: "opacity 0.3s"
  }}
>
  Book Now • ₹{getSlotPrice()}/Hr
</button>

{/* Divider and spacing before Google Map */}
<div style={{ marginTop: '24px', marginBottom: '16px' }}>
  <hr style={{
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '0 auto',
    width: '90%',
    opacity: 0.6
  }} />
</div>


   <div
  className={styles.mapPreviewBox}
  onClick={() => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  }}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url, "_blank");
    }
  }}
  style={{ position: 'relative', width: 'fit-content', cursor: 'pointer' }}
>
  <img
    src={mapPinImg}
    alt="Map Icon"
    style={{
      width: '520px',
      height: '190px',
      display: 'block',
      borderRadius: '12px'
    }}
  />
  <div
    style={{
      position: 'absolute',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '6px 14px',
      color: 'white',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '0.85rem'
    }}
  >
    Open in Google Maps
  </div>
</div>

              {/*  <button onClick={()=>{setValueChange(false)}} className={styles.bookNowBtn}>Book Now • ₹500/Hr</button> */}
              </div>
            </div>
          </div>: <div className={styles.bookingConfirmation}>
            <div className={styles.container}>
              <div className={styles.header}>
                <h1>Complete Your Booking</h1>
                <p>Confirm your slot and complete payment</p>
              </div>
              
              <div className={styles.card}>
                <h2>Booking Details</h2>
                <div className={styles.detailRow}>
                  <div className={styles.label}>
                    <Calendar className={styles.icon} />
                    <span>Date</span>
                  </div>
                  <span>January 20, 2025</span>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.label}>
                    <Clock className={styles.icon} />
                    <span>Time</span>
                  </div>
                  <span>06:00 PM (1 hour)</span>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.label}>
                    <Users className={styles.icon} />
                    <span>Players</span>
                  </div>
                  <span>2 players</span>
                </div>
              </div>

              

              <div className={styles.card}>
                <h2>Additional Services</h2>
                {services.map(service => (
                  <label key={service.id} className={styles.serviceOption}>
                    <div className={styles.checkboxGroup}>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, service.id]);
                          } else {
                            setSelectedServices(selectedServices.filter(id => id !== service.id));
                          }
                        }}
                      />
                      <span>{service.name}</span>
                    </div>
                    <span>₹{service.price}</span>
                  </label>
                ))}
              </div>

              <div className="card">
                <h2>Payment Method</h2>
                <div className={styles.paymentMethods}>
                  {['UPI', 'Card', 'Net Banking'].map(method => (
                    <button
                      key={method}
                      className={styles.paymentOption}
                      // className={`payment-option ${selectedPayment === method ? 'selected' : ''}`}
                      onClick={() => setSelectedPayment(method)}
                    >
                      {method === 'UPI' && <Wallet className={styles.icon} />}
                      {method === 'Card' && <CreditCard className={styles.icon} />}
                      {method === 'Net Banking' && <Wallet className={styles.icon} />}
                      <span style={{color:"white"}}>{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h2>Price Details</h2>
                <div className={styles.detailRow}>
                  <span>Base Price</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className={styles.cancellationPolicy}>
                  <div className={styles.policyHeader}>
                    <Calendar className={styles.icon} />
                    <span>Cancellation Policy</span>
                  </div>
                  <p>
                    Free cancellation up to 4 hours before the booking time. 50% refund for cancellations up to 2 hours before.
                  </p>
                </div>
              </div>
              <button onClick={()=>setValueChange(true)} className={styles.confirmButton}>
                Back
              </button>
              <button className={styles.confirmButton}>
                Confirm & Pay
              </button>
            </div>
          </div>}
          
        
          </Box>
        );

      return (
        <div>
          {/* <Button ><MenuIcon style={{color:"white"}}  fontSize="large" /></Button> */}
          <Button
  style={{
    background: "#0077cc",
    color: "white",
    padding: "7px 14px",
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: "550"
  }}
  onClick={() => {
    if (disabled) {
      alert("⚠️ This turf is not accepting bookings currently.");
      return;
    }
    setOpen(true);
  }}
  disabled={disabled}
>
  Book Now
</Button>
          <Drawer open={open} onClose={toggleDrawer(false)} >
            {DrawerList}
          </Drawer>
        </div>
      );
    }



  /*  export  function SideBar3() {
      const [state, setState] = React.useState({
        
        right: false,
      });

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };
      const users = [
        { id: 1, name: "John Doe", preference: "Football", status: "Available" },
        { id: 2, name: "Jane Smith", preference: "Basketball", status: "Available" },
      ];
      const list = (anchor) => (
        <Box className={styles.sportsBackground2}
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
        <h2 style={{color:"white"}}>Co-Partners</h2>
    <div className={styles.container}>
          {users.map((user) => (
            <div key={user.id} className={styles.card}>
              <div className={styles.avatar}>
                <div className={styles.placeholder}>100 x 100</div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{user.name}</h3>
                <p className={styles.preference}>Prefers {user.preference}</p>
                <p className={styles.status}>{user.status}</p>
              </div>
              <div className={styles.actions}>
                <label className={styles.splitCost}>
                  <input type="checkbox" />
                  Split Cost
                </label>
                <button className={styles.button}>Send Request</button>
              </div>
            </div>
          ))}
        </div>
        </Box>
      );

      return (
        <div>
          {[ 'right'].map((anchor) => (
            <React.Fragment key={anchor}>
              {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */
            /*  <button className={styles.bookNowBtn} style={{marginBottom:"1vw"}} onClick={toggleDrawer(anchor, true)}>
                  Find Co-Partnner
                </button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      );
    } */

function toISTISOString(date) {
  // IST offset = +5:30 = 330 minutes
  const offsetMs = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + offsetMs);
  // Remove 'Z' and add '+05:30'
  return istDate.toISOString().replace('Z', '+05:30');
}