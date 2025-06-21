// components/TemporaryDrawer.js

import * as React from 'react';
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
import { useState } from 'react';
import styles from "./SideBar.module.scss"
import { Calendar, Clock, Users, CreditCard, Wallet } from 'lucide-react';
import { FaHome, FaUsers, FaBell, FaUserCircle, FaCog } from "react-icons/fa";
import { MdOutlineMiscellaneousServices, MdOutlineContactSupport } from "react-icons/md";
import { BsJournalBookmark } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const navigations=(path)=>{
    console.log(path)
    navigate(`/${path}`)
  }
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)} style={{height:"100%",color:"white"}}>
      
 <div className={styles.sidebar}>
      {/* Logo and Title */}
      <div>
      <div className={styles.logoSection}>
        <FaUserCircle className={styles.logo} />
        <h2 className={styles.title}>INDIAN MAIDAN</h2>
      </div>

      {/* Navigation Links */}
      <ul  className={styles.navList}>
        <li onClick={()=>navigations(" ")} className={styles.navItem}>
          <FaHome className={styles.icon} />
          <span>Home</span>
        </li>
        <li className={styles.navItem}>
          <FaUsers className={styles.icon} />
          <span>About</span>
        </li>
        <li className={styles.navItem}>
          <MdOutlineMiscellaneousServices className={styles.icon} />
          <span>Services</span>
          <IoIosArrowDown className={styles.arrow} />
        </li>
        <li onClick={()=>navigations("myBooking")} className={styles.navItem}>
          <BsJournalBookmark className={styles.icon} />
          <span>My Booking</span>
        </li>
        <li onClick={()=>navigations("message")} className={styles.navItem}>
          <ChatIcon className={styles.icon} />
          <span>Messages</span>
        </li>
        <li className={styles.navItem}>
          <FaBell className={styles.icon} />
          <span>Notification</span>
        </li>
        <li className={styles.navItem}>
          <MdOutlineContactSupport className={styles.icon} />
          <span>Contact Us</span>
        </li>
      </ul>
</div>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div onClick={()=>navigations("profile")}  on className={styles.profileInfo}>
          <FaUserCircle className={styles.profilePic} />
          <div className={styles.profileText}>
            <span className={styles.name}>Happy Badiwal</span>
            <span className={styles.viewProfile}>View Profile</span>
          </div>
        </div>
        <FaCog className={styles.settingsIcon} />
      </div>
    </div>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true) }><MenuIcon style={{color:"white"}}  fontSize="large" /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  );
}
export  function SideBar2({data}) {
  console.log("data in sidebar",data)
  const [open, setOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedDate, setSelectedDate] = useState('');
const [valueChange,setValueChange] = useState(true)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  function generateTimeSlots(openingTime, closingTime) {
  // Convert time strings to Date objects for easier manipulation
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(/(?=[AP]M)/);
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const date = new Date();
    date.setHours(hours, minutes || 0, 0, 0);
    return date;
  };

  const start = parseTime(openingTime);
  const end = parseTime(closingTime);
  
  // Handle cases where closing time is next day (e.g., 2 AM)
  if (end <= start) end.setDate(end.getDate() + 1);

  const timeSlots = [];
  let current = new Date(start);

  while (current < end) {
    const slotStart = new Date(current);
    current.setHours(current.getHours() + 1); // Add 1 hour
    const slotEnd = new Date(current);
    
    // Format back to AM/PM
    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    timeSlots.push({
      start: formatTime(slotStart),
      end: formatTime(slotEnd)
    });
  }

  return timeSlots;
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


const timeSlots = generateTimeSlots(data.weekdayHours.openingTime, data.weekdayHours.closingTime);

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


  const DrawerList = (
    <Box  className={styles.drawerList} role="presentation"  onClick={toggleDrawer("right", false)}>
    {valueChange? <div className={styles.sportsArena}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{data?.name}</h2>
          <p className={styles.location}>
            <i className={styles.locationIcon}/> {data?.fullAddress}, {data?.city}, {data?.state}
          </p>
          <div className={styles.statusBar}>
            <span className={styles.openNow}>Open Now</span>
            <span className={styles.rating}>4.5/5 Rating</span>
          </div>
        </div>

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

        <div className={styles.navigationTabs}>
          <button className={styles.tab} >Book Now</button>
          <button className={styles.tab}>Find Partners</button>
          <button className={styles.tab}>Facilities</button>
          <button className={styles.tab}>Gallery</button>
        </div>

        <div className={styles.bookingSection}>
          <h3>Book Your Slot</h3>
          <div className={styles.datePicker}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Select Date"
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
          
          return (<button
            key={index}
           className={`${styles.timeSlot} ${
                isSelected ? styles.selected : ''
              } ${
                isInRange ? styles.inRange : ''
              }`}
            onClick={() => toggleTimeSlot(slot)}
          >
            {slot.start} - {slot.end}
          </button>
        )})}
      </div>
      
      {/* Display selected slots */}
      {selectedSlots.length > 0 && (
        <div className={styles.selectedSlots}>
          <h4>Selected Time Slots:</h4>
          <ul>
            {selectedSlots.map((slot, index) => (
              <li key={index}>
                {slot.start} - {slot.end}
              </li>
            ))}
          </ul>
        </div>
      )}
          </div>

          <div className={styles.facilityPreview}>
            <h4>Facility Preview</h4>
            <div className={styles.previewImages}>
              <div className={styles.previewImages} />
              <div className={styles.previewImages} />
            </div>
          </div>
          {/* <button onClick={()=>{}} className={styles.bookNowBtn} style={{marginBottom:"1vw"}}>Find Co-Partner</button> */}
              <SideBar3 />
          <button onClick={()=>{setValueChange(false)}} className={styles.bookNowBtn}>Book Now • ₹500/Hr</button>
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
      <Button style={{background:"#0077cc",color:"white",padding:"7px 14px",borderRadius:"5px",fontSize:"13px",fontWeight:"550"}} onClick={toggleDrawer(true) } >
              Book Now
            </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  );
}



export  function SideBar3() {
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
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <button className={styles.bookNowBtn} style={{marginBottom:"1vw"}} onClick={toggleDrawer(anchor, true)}>
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
}