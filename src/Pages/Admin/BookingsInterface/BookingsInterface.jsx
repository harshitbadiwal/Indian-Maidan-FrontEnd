import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './BookingsInterface.module.scss';

const BookingsInterface = () => {
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const response = await fetch('https://indianmadianbackend.onrender.com/api/admin/booking/all',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // Function to render status badge with appropriate color
  const renderStatusBadge = (status) => {
    let badgeClass = '';
    
    switch(status) {
      case 'Confirmed':
        badgeClass = styles.statusConfirmed;
        break;
      case 'Pending':
        badgeClass = styles.statusPending;
        break;
      case 'Cancelled':
        badgeClass = styles.statusCancelled;
        break;
      default:
        badgeClass = '';
    }
    
    return <span className={`${styles.statusBadge} ${badgeClass}`}>{status}</span>;
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h1" className={styles.title}>
        Bookings
      </Typography>
      
      <Paper className={styles.bookingsContainer}>
        <Box className={styles.bookingsHeader}>
          <Typography variant="h6" component="h2">
            All Bookings
          </Typography>
          
          <Box className={styles.actionControls}>
            <TextField
              placeholder="Search bookings..."
              variant="outlined"
              className={styles.searchField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                className: styles.searchInput
              }}
              size="small"
            />
            
            <FormControl variant="outlined" size="small" className={styles.statusFilter}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                IconComponent={KeyboardArrowDownIcon}
                className={styles.statusSelect}
              >
                <MenuItem value="All Statuses">All Statuses</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              className={styles.newBookingButton}
            >
              New Booking
            </Button>
          </Box>
        </Box>
        
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell className={styles.headerCell}>ID</TableCell>
                <TableCell className={styles.headerCell}>User ID</TableCell>
                <TableCell className={styles.headerCell}>Turf ID</TableCell>
                <TableCell className={styles.headerCell}>Date & Time</TableCell>
                <TableCell className={styles.headerCell}>Status</TableCell>
                <TableCell className={styles.headerCell}>Total Price</TableCell>
                <TableCell className={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
{loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Loading bookings...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Error: {error}</TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">No bookings found</TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking._id} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>{booking._id}</TableCell>
                    <TableCell className={styles.tableCell}>{booking.userId?.name || 'N/A'}</TableCell>
                    <TableCell className={styles.tableCell}>{booking.turfId?.turfName || 'N/A'}</TableCell>
                    <TableCell className={styles.tableCell}>
                      {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}
                    </TableCell>
                  <TableCell className={styles.tableCell}>
                    {renderStatusBadge(booking.status)}
                  </TableCell>
                    <TableCell className={styles.tableCell}>₹{booking.totalPrice}</TableCell>
                  <TableCell className={styles.tableCell}>
                    <IconButton 
                      className={styles.viewButton}
                      aria-label="view"
                    >
                      <VisibilityIcon className={styles.viewIcon} />
                      <Typography variant="body2" className={styles.viewText}>
                        View
                      </Typography>
                    </IconButton>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
            </Table>
            </TableContainer>
      </Paper>
    </Container>
  );
};

export default BookingsInterface;