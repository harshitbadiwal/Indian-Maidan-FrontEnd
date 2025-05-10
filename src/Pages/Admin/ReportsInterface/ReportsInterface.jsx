import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Tabs, 
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './ReportsInterface.module.scss';

const ReportsInterface = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('Weekly');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Sample data for booking status distribution
  const bookingStatusData = [
    { name: 'Confirmed', value: 50, color: '#5e66f9' },
    { name: 'Pending', value: 25, color: '#1ec993' },
    { name: 'Cancelled', value: 25, color: '#f59e0b' }
  ];

  return (
    <Container className={styles.container} maxWidth={false}>
      <Typography variant="h4" component="h1" className={styles.title}>
        Reports
      </Typography>
      
      <Box className={styles.contentWrapper}>
        <Box className={styles.tabsContainer}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            className={styles.tabs}
            TabIndicatorProps={{ className: styles.tabIndicator }}
          >
            <Tab label="Bookings" className={`${styles.tab} ${tabValue === 0 ? styles.activeTab : ''}`} />
            <Tab label="Revenue" className={`${styles.tab} ${tabValue === 1 ? styles.activeTab : ''}`} />
            <Tab label="Turf Owners" className={`${styles.tab} ${tabValue === 2 ? styles.activeTab : ''}`} />
          </Tabs>

          <FormControl className={styles.timeRangeSelect}>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              className={styles.select}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className={styles.reportsGrid}>
          <Paper className={styles.reportCard}>
            <Typography variant="h6" component="h2" className={styles.cardTitle}>
              Booking Status Distribution
            </Typography>
            
            <Box className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <Box className={styles.legend}>
                {bookingStatusData.map((entry, index) => (
                  <Box key={index} className={styles.legendItem}>
                    <Box 
                      className={styles.legendColor} 
                      style={{ backgroundColor: entry.color }}
                    />
                    <Typography className={styles.legendText}>
                      {entry.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          <Paper className={styles.reportCard}>
            <Typography variant="h6" component="h2" className={styles.cardTitle}>
              Booking Trends
            </Typography>
            <Box className={styles.comingSoon}>
              <Typography variant="body1">
                Booking trends chart will appear here.
              </Typography>
            </Box>
          </Paper>

          <Paper className={styles.reportCard}>
            <Typography variant="h6" component="h2" className={styles.cardTitle}>
              Revenue Distribution
            </Typography>
            <Box className={styles.comingSoon}>
              <Typography variant="body1">
                Revenue distribution chart will appear here.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ReportsInterface;