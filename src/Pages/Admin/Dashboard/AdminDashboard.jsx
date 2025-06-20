// App.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box,
  Card,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Avatar,
  Badge,
  Chip,
  Grid,
  FormControl,
  InputBase,
  Select,
  MenuItem
} from '@mui/material';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DnsIcon from '@mui/icons-material/Dns';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventNoteIcon from '@mui/icons-material/EventNote';

// Import CSS Module
import styles from './AdminDashboard.module.scss';
import UserManagement from '../UserManagement/UserManagement';
import BookingsInterface from '../BookingsInterface/BookingsInterface';
import TurfManagement from '../TurfManagement/TurfManagement';
import ReportsInterface from '../ReportsInterface/ReportsInterface';
import ProfileSettings from '../Settings/Settings';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a2233',
    },
    secondary: {
      main: '#4f7bf7',
    },
    background: {
      default: '#f8f9fb',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function AdminDashboard() {
  const [filterValue, setFilterValue] = useState('All');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('https://indianmadianbackend.onrender.com/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        const data = await response.json();
        setDashboardStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);
  const statsCards = [
    {
      title: 'Total Users',
      value: dashboardStats?.totalUsers || '0',
      icon: <PeopleIcon />,
      color: '#6366f1',
      link: 'View all',
      bgColor: '#EEF2FF'
    },
    {
      title: 'Active Bookings',
      value: dashboardStats?.totalBookings || '0',
      icon: <CalendarTodayIcon />,
      color: '#22c55e',
      link: 'View all',
      bgColor: '#ECFDF5'
    },
    {
      title: 'Registered Turfs',
      value: dashboardStats?.totalTurfs || '0',
      icon: <DnsIcon />,
      color: '#f59e0b',
      link: 'View all',
      bgColor: '#FEF3C7'
    },
    {
      title: 'Total Revenue',
      value: `₹${dashboardStats?.totalRevenue || '0'}`,
      icon: <AttachMoneyIcon />,
      color: '#3b82f6',
      link: 'View all',
      bgColor: '#EFF6FF'
    }
  ];

  // Recent bookings data
  const recentBookings = [
    {
      id: '1',
      title: 'Booking #1 - Turf #',
      time: 'Today at 9:30 PM - 11:30 PM',
      status: 'Confirmed'
    },
    {
      id: '2',
      title: 'Booking #2 - Turf #',
      time: 'Tomorrow at 10:30 PM - 12:30 AM',
      status: 'Pending'
    },
    {
      id: '3',
      title: 'Booking #3 - Turf #',
      time: 'Today at 12:30 AM - 2:30 AM',
      status: 'Cancelled'
    },
    {
      id: '4',
      title: 'Booking #4 - Turf #',
      time: 'Today at 3:30 PM - 5:30 PM',
      status: 'Confirmed'
    }
  ];

  // Activity log data
  const activityLog = [
    {
      id: '1',
      title: 'New booking created',
      description: 'A user booked a turf',
      time: '3 minutes ago'
    },
    {
      id: '2',
      title: 'New booking created',
      description: 'A user booked a turf',
      time: '3 minutes ago'
    },
    {
      id: '3',
      title: 'New booking created',
      description: 'A user booked a turf',
      time: '3 minutes ago'
    },
    {
      id: '4',
      title: 'New booking created',
      description: 'A user booked a turf',
      time: '3 minutes ago'
    }
  ];
  const [tabManagement,setTabManagement] = useState("Dashboard")
  
  // Menu items for the sidebar
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon  />, active:tabManagement=="Dashboard" ?true:false },
    { text: 'User Management', icon: <PeopleIcon />, active:tabManagement=="User Management" ?true:false  },
    { text: 'Bookings', icon: <CalendarTodayIcon />,  active:tabManagement=="Bookings" ?true:false  },
    { text: 'Turf Management', icon: <DnsIcon />,  active:tabManagement=="Turf Management" ?true:false  },
    { text: 'Reports', icon: <AssessmentIcon />, active:tabManagement=="Reports" ?true:false  },
    { text: 'Settings', icon: <SettingsIcon />,  active:tabManagement=="Settings" ?true:false  }
  ];

  const getStatusChipClass = (status) => {
    switch(status) {
      case 'Confirmed':
        return styles.statusConfirmed;
      case 'Pending':
        return styles.statusPending;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.root}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          className={styles.drawer}
          classes={{
            paper: styles.drawerPaper,
          }}
        >
          <div className={styles.drawerHeader}>
            <Typography variant="h6" className={styles.logoText}>
              Turf Admin
            </Typography>
          </div>
          
          <List className={styles.menuList}>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                onClick={()=>setTabManagement(item.text)}
                key={index}
                className={`${styles.menuItem} ${item.active ? styles.activeMenuItem : ''}`}
              >
              
                <ListItemIcon className={styles.menuIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <Avatar className={styles.avatar}>A</Avatar>
              <div className={styles.userText}>
                <Typography variant="subtitle2">Admin User</Typography>
                <Typography variant="body2" className={styles.userRole}>
                  admin
                </Typography>
              </div>
            </div>
            <ListItem button className={styles.logoutButton}>
              <ListItemIcon className={styles.menuIcon}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        </Drawer>

        {/* Main Content */}
        <main className={styles.content}>
          {/* App Bar */}
          <div className={styles.appBar}>
            <div className={styles.searchBar}>
              <SearchIcon className={styles.searchIcon} />
              <InputBase
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>
            <div className={styles.appBarRight}>
              <IconButton className={styles.notificationButton}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar className={styles.headerAvatar}>A</Avatar>
            </div>
          </div>
          {
            tabManagement=="Dashboard"&& 
          <Container className={styles.container}>
            <Typography variant="h5" className={styles.pageTitle}>
              Dashboard
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} className={styles.statsContainer}>
              {statsCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className={styles.statsCard}>
                    <div className={styles.statsContent}>
                      <div 
                        className={styles.iconContainer}
                        style={{ backgroundColor: card.bgColor }}
                      >
                        <span className={styles.statsIcon} style={{ color: card.color }}>
                          {card.icon}
                        </span>
                      </div>
                      <div className={styles.statsInfo}>
                        <Typography variant="subtitle2" className={styles.statsTitle}>
                          {card.title}
                        </Typography>
                        <Typography variant="h5" className={styles.statsValue}>
                          {card.value}
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.statsFooter}>
                      <Typography variant="body2" className={styles.viewLink}>
                        {card.link}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Main Content Sections */}
           <Box className={styles.mainSections}>
              {/* Recent Bookings */}
              <Card className={styles.bookingsCard}>
                <div className={styles.cardHeader}>
                  <Typography variant="h6">Recent Bookings</Typography>
                  <FormControl variant="outlined" size="small" className={styles.filterSelect}>
                    <Select
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className={styles.select}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                
                <div className={styles.bookingsList}>
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingItem}>
                      <div className={styles.bookingNumberContainer}>
                        <div className={styles.bookingNumber}>{booking.id}</div>
                      </div>
                      <div className={styles.bookingInfo}>
                        <Typography variant="subtitle2" className={styles.bookingTitle}>
                          {booking.title}
                        </Typography>
                        <Typography variant="body2" className={styles.bookingTime}>
                          {booking.time}
                        </Typography>
                      </div>
                      <div className={styles.bookingActions}>
                        <Chip 
                          label={booking.status} 
                          className={`${styles.statusChip} ${getStatusChipClass(booking.status)}`}
                          size="small"
                        />
                        <IconButton size="small" className={styles.moreButton}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Activity Log */}
              <Card className={styles.activityCard}>
                <Typography variant="h6" className={styles.cardTitle}>
                  Activity Log
                </Typography>
                <div className={styles.activityList}>
                  {activityLog.map((activity) => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={styles.activityIconContainer}>
                        <EventNoteIcon className={styles.activityIcon} />
                      </div>
                      <div className={styles.activityInfo}>
                        <Typography variant="subtitle2" className={styles.activityTitle}>
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" className={styles.activityDesc}>
                          {activity.description}
                        </Typography>
                        <Typography variant="caption" className={styles.activityTime}>
                          {activity.time}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Box>
            
          
          </Container>
          
          }
          {
            tabManagement=="User Management"&& <UserManagement/>
          }
          {
            tabManagement=="Bookings"&& <BookingsInterface/>
          }
          {
            tabManagement=="Turf Management"&& <TurfManagement/>
          }
          {
            tabManagement=="Reports"&& <ReportsInterface/>
          }
          {
            tabManagement=="Settings"&& <ProfileSettings/>
          }
        </main>
      </div>
    </ThemeProvider>
  );
}

export default AdminDashboard;