import { BaseUrl } from '../../../services/utiles';
import React, { useState, useEffect } from 'react';

import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './TurfManagement.module.scss';
import { AdminGetAllTruf } from '../../../services/Admin/Truf';

const TurfManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New State for Modal
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchTurfs = async () => {
    try {
      const payload = {};
      const response = await AdminGetAllTruf(payload);
      setTurfs(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleApproveTurf = async (turfId) => {
    try {
      const response = await fetch(`${BaseUrl}/api/turf/${turfId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchTurfs();
      } else {
        setError('Failed to approve turf');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRejectTurf = async (turfId) => {
    try {
      await fetch(`${BaseUrl}/api/turf/${turfId}/reject`, {
        method: 'POST'
      });
      fetchTurfs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewTurf = (turf) => {
    setSelectedTurf(turf);
    setViewModalOpen(true);
  };
const handleDeleteTurf = async (turfId) => {
  //if (!window.confirm("Are you sure you want to delete this turf?")) return;

  try {
    const response = await fetch(`${BaseUrl}/api/admin/turf/${turfId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchTurfs(); // Refresh list
    } else {
      const err = await response.json();
      alert('Failed to delete turf: ' + err.message);
    }
  } catch (err) {
    alert('Something went wrong: ' + err.message);
  }
};

  const handleCloseModal = () => {
    setSelectedTurf(null);
    setViewModalOpen(false);
  };

  const renderStatusBadge = (status) => {
    if (status === 'Active') {
      return <span className={`${styles.statusBadge} ${styles.active}`}>{status}</span>;
    } else if (status === 'Pending') {
      return <span className={`${styles.statusBadge} ${styles.pending}`}>{status}</span>;
    }
    return <span className={styles.statusBadge}>{status}</span>;
  };

  const renderActionButtons = (turf) => {
    return (
      <>
        {turf?.status === 'pending' && (
          <>
            <Button 
              startIcon={<CheckCircleIcon />}
              onClick={() => handleApproveTurf(turf._id)} 
              className={`${styles.actionButton} ${styles.approveButton}`}
            >
              Approve
            </Button>
            <Button 
              startIcon={<CancelIcon />} 
              onClick={() => handleRejectTurf(turf._id)}
              className={`${styles.actionButton} ${styles.rejectButton}`}
            >
              Reject
            </Button>
          </>
        )}
        <Button 
          onClick={() => handleViewTurf(turf)} 
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          View
        </Button>
        <Button 
          startIcon={<DeleteIcon />} 
          onClick={() => handleDeleteTurf(turf._id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          Delete
        </Button>
      </>
    );
  };

  return (
    <Container className={styles.container} maxWidth={false}>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h4" component="h1" className={styles.title}>
            Turf Management
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Manage turf owners, approve turf listings, and oversee all turf operations
          </Typography>
        </Box>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          className={styles.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            className: styles.searchInput
          }}
        />
      </Box>

      <Paper className={styles.tabsContainer}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          className={styles.tabs}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Owners" className={styles.tab} />
          <Tab label="All Turfs" className={styles.tab} />
          <Tab label="Pending Owners" className={styles.tab} icon={<Box className={styles.badge}>1</Box>} iconPosition="end" />
          <Tab label="Pending Turfs" className={styles.tab} />
        </Tabs>
      </Paper>

      <Box className={styles.sectionHeader}>
        <Typography variant="h5" component="h2" className={styles.sectionTitle}>
          Turf Owners
        </Typography>
        <Typography variant="body1" className={styles.sectionSubtitle}>
          Manage all turf owners, their accounts, and permissions
        </Typography>
      </Box>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell className={styles.headerCell}>Name</TableCell>
              <TableCell className={styles.headerCell}>Email</TableCell>
              <TableCell className={styles.headerCell}>Location</TableCell>
              <TableCell className={styles.headerCell}>Joined</TableCell>
              <TableCell className={styles.headerCell}>Status</TableCell>
              <TableCell className={styles.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turfs && turfs.map((owner, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>{owner?.turfName}</TableCell>
                <TableCell className={styles.tableCell}>{owner?.email}</TableCell>
                <TableCell className={styles.tableCell}>{owner?.location?.city} {owner?.location?.state}</TableCell>
                <TableCell className={styles.tableCell}>{new Date(owner?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className={styles.tableCell}>
                  {renderStatusBadge(owner?.status)}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Box className={styles.actionButtons}>
                    {renderActionButtons(owner)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Turf View Modal */}
      <Dialog open={viewModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Turf Details</DialogTitle>
        <DialogContent>
          {selectedTurf && (
            <Box
  sx={{
    backgroundColor: '#fff',
    p: 4,
    borderRadius: 3,
    boxShadow: 3,
    maxWidth: 720,
    mx: 'auto',
    fontFamily: 'Segoe UI, sans-serif',
  }}
>
  <Typography variant="h5" fontWeight={600} mb={2} color="primary.dark">
    Turf Details
  </Typography>

  <Typography variant="h6" fontWeight={500} mb={1}>
    Turf Name: {selectedTurf.turfName}
  </Typography>
  <Typography color="text.secondary" mb={0.5}>Email: {selectedTurf.email || 'N/A'}</Typography>
  <Typography color="text.secondary" mb={0.5}>Contact: {selectedTurf.contactNumber}</Typography>
  <Typography color="text.secondary" mb={0.5}>
    Location: {selectedTurf.location?.city}, {selectedTurf.location?.state}
  </Typography>
  <Typography color="text.secondary" mb={0.5}>Address: {selectedTurf.fullAddress}</Typography>

  <Typography
    sx={{
      display: 'inline-block',
      px: 2,
      py: 0.5,
      borderRadius: '16px',
      backgroundColor: selectedTurf.status === 'approved' ? '#d1fae5' : '#fee2e2',
      color: selectedTurf.status === 'approved' ? '#065f46' : '#b91c1c',
      fontWeight: 500,
      fontSize: 14,
      mt: 1,
      mb: 2,
    }}
  >
    Status: {selectedTurf.status}
  </Typography>

  <Typography fontWeight={500} mb={1}>Rate: ₹{selectedTurf.hourlyRate}</Typography>

  <Typography fontWeight={500}>Amenities:</Typography>
  <Box display="flex" flexWrap="wrap" gap={1} mb={2} mt={0.5}>
    {selectedTurf.amenities?.map((item, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: '#f3f4f6',
          color: '#374151',
          fontSize: 13,
          px: 2,
          py: 0.5,
          borderRadius: '12px',
        }}
      >
        {item}
      </Box>
    ))}
  </Box>

  <Typography fontWeight={500}>Sports:</Typography>
  <Box display="flex" flexWrap="wrap" gap={1} mb={2} mt={0.5}>
    {selectedTurf.availableSports?.map((sport, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: '#e0f2fe',
          color: '#0369a1',
          fontSize: 13,
          px: 2,
          py: 0.5,
          borderRadius: '12px',
        }}
      >
        {sport}
      </Box>
    ))}
  </Box>

  <Typography fontWeight={500} mb={0.5}>
    Weekdays: <span style={{ fontWeight: 400 }}>{selectedTurf.weekdayHours?.openingTime} - {selectedTurf.weekdayHours?.closingTime}</span>
  </Typography>
  <Typography fontWeight={500} mb={2}>
    Weekends: <span style={{ fontWeight: 400 }}>{selectedTurf.weekendHours?.openingTime} - {selectedTurf.weekendHours?.closingTime}</span>
  </Typography>

  <Typography fontWeight={500} mb={1}>Images:</Typography>
  <Box display="flex" flexWrap="wrap" gap={2}>
    {selectedTurf.facilityImages?.length > 0 ? (
      selectedTurf.facilityImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Facility ${index + 1}`}
          width={100}
          height={80}
          style={{
            borderRadius: 6,
            objectFit: 'cover',
            border: '1px solid #e5e7eb',
          }}
        />
      ))
    ) : (
      <Typography color="text.secondary">No images available.</Typography>
    )}
  </Box>
</Box>

          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TurfManagement;
