import React, { useState } from 'react';
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
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './TurfManagement.module.scss';

const TurfManagement = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Sample data for turf owners
  const owners = [
    { 
      name: 'Jane Cooper', 
      email: 'jane.cooper@example.com', 
      location: 'Manhattan, NY', 
      joined: 'May 2nd, 2025', 
      status: 'Active' 
    },
    { 
      name: 'Michael Johnson', 
      email: 'michael.johnson@example.com', 
      location: 'Brooklyn, NY', 
      joined: 'May 2nd, 2025', 
      status: 'Active' 
    },
    { 
      name: 'Robert Smith', 
      email: 'robert.smith@example.com', 
      location: 'Queens, NY', 
      joined: 'May 2nd, 2025', 
      status: 'Pending' 
    }
  ];

  // Function to render status badges
  const renderStatusBadge = (status) => {
    if (status === 'Active') {
      return <span className={`${styles.statusBadge} ${styles.active}`}>{status}</span>;
    } else if (status === 'Pending') {
      return <span className={`${styles.statusBadge} ${styles.pending}`}>{status}</span>;
    }
    return <span className={styles.statusBadge}>{status}</span>;
  };

  // Function to render action buttons based on status
  const renderActionButtons = (status) => {
    if (status === 'Pending') {
      return (
        <>
          <Button 
            startIcon={<CheckCircleIcon />} 
            className={`${styles.actionButton} ${styles.approveButton}`}
          >
            Approve
          </Button>
          <Button 
            startIcon={<CancelIcon />} 
            className={`${styles.actionButton} ${styles.rejectButton}`}
          >
            Reject
          </Button>
          <Button 
            startIcon={<EditIcon />} 
            className={`${styles.actionButton} ${styles.editButton}`}
          >
            Edit
          </Button>
          <Button 
            startIcon={<DeleteIcon />} 
            className={`${styles.actionButton} ${styles.deleteButton}`}
          >
            Delete
          </Button>
        </>
      );
    }
    
    return (
      <>
        <Button 
          startIcon={<EditIcon />} 
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          Edit
        </Button>
        <Button 
          startIcon={<DeleteIcon />} 
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
            {owners.map((owner, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>{owner.name}</TableCell>
                <TableCell className={styles.tableCell}>{owner.email}</TableCell>
                <TableCell className={styles.tableCell}>{owner.location}</TableCell>
                <TableCell className={styles.tableCell}>{owner.joined}</TableCell>
                <TableCell className={styles.tableCell}>
                  {renderStatusBadge(owner.status)}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Box className={styles.actionButtons}>
                    {renderActionButtons(owner.status)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TurfManagement;