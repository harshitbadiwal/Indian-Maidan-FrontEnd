import React, { useState } from 'react';
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
  
  // Sample booking data
  const bookings = [
    { id: 1, dateTime: 'May 2, 2025 9:30 PM - 11:30 PM', status: 'Confirmed', price: 150.00 },
    { id: 2, dateTime: 'May 3, 2025 10:30 PM - 12:30 AM', status: 'Pending', price: 140.00 },
    { id: 3, dateTime: 'May 2, 2025 12:30 AM - 2:30 AM', status: 'Cancelled', price: 120.00 },
    { id: 4, dateTime: 'May 2, 2025 3:30 PM - 5:30 PM', status: 'Confirmed', price: 180.00 },
  ];
  
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
              {bookings.map((booking) => (
                <TableRow key={booking.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{booking.id}</TableCell>
                  <TableCell className={styles.tableCell}></TableCell>
                  <TableCell className={styles.tableCell}></TableCell>
                  <TableCell className={styles.tableCell}>{booking.dateTime}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {renderStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className={styles.tableCell}>${booking.price.toFixed(2)}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default BookingsInterface;