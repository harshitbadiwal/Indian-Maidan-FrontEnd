import React from 'react';
import { 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import styles from './Settings.module.scss';

const ProfileSettings = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        // id={tabpanel-${index}}
      >
        {value === index && (
          <Box className={styles.tabPanelContent}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <div className={styles.settingsContainer}>
      <Typography variant="h5" className={styles.settingsTitle}>
        Settings
      </Typography>
      
      <Paper className={styles.settingsCard}>
        <Box className={styles.tabsContainer}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            className={styles.tabs}
            indicatorColor="primary"
          >
            <Tab label="Profile" className={styles.tab} />
            <Tab label="Password" className={styles.tab} />
            <Tab label="Notifications" className={styles.tab} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <div className={styles.profileSection}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Profile
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Update your personal information and profile details.
            </Typography>
            
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <Typography variant="body1" className={styles.fieldLabel}>Name</Typography>
                  <TextField
                    fullWidth
                    defaultValue="Admin User"
                    className={styles.textField}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className={styles.formField}>
                  <Typography variant="body1" className={styles.fieldLabel}>Email</Typography>
                  <TextField
                    fullWidth
                    defaultValue="admin@example.com"
                    className={styles.textField}
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              
              <div className={styles.formField}>
                <Typography variant="body1" className={styles.fieldLabel}>Username</Typography>
                <TextField
                  fullWidth
                  defaultValue="admin"
                  className={styles.textField}
                  variant="outlined"
                  size="small"
                  disabled
                />
                <Typography variant="caption" className={styles.helperText}>
                  Username cannot be changed.
                </Typography>
              </div>
              
              <div className={styles.formField}>
                <Typography variant="body1" className={styles.fieldLabel}>Bio</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Tell us a little bit about yourself"
                  className={styles.textField}
                  variant="outlined"
                />
              </div>
              
              <div className={styles.buttonContainer}>
                <Button 
                  variant="contained" 
                  color="primary"
                  className={styles.saveButton}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Password tab content would go here */}
          <div className={styles.passwordSection}>
            <Typography variant="h6">Password</Typography>
            <Typography variant="body2">Change your password here.</Typography>
            {/* Password fields would go here */}
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {/* Notifications tab content would go here */}
          <div className={styles.notificationsSection}>
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="body2">Manage your notification preferences.</Typography>
            {/* Notification settings would go here */}
          </div>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default ProfileSettings;