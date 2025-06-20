// UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Import CSS Module
import styles from './UserManagement.module.scss';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://indianmadianbackend.onrender.com/api/admin/getAllUsers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Transform the data to match the table structure
      const formattedUsers = data.map(user => ({
        id: user._id,
        name: user.name,
        username: user.email.split('@')[0],
        email: user.email,
        phone: user.phoneNumber,
        joined: new Date(user.createdAt).toLocaleDateString()
      }));
      setUsers(formattedUsers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // Filter users based on search query
// Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phoneNumber?.toLowerCase().includes(query)
    );
  });
const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

// Handle edit user
  // Handle edit user
  const handleEditUser = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Implementation would go here
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    console.log(`Delete user with ID: ${id}`);
    // Implementation would go here
  };

  // Handle add user
  const handleAddUser = () => {
    console.log('Add new user');
    // Implementation would go here
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.pageTitle}>
        User Management
      </Typography>

      <Card className={styles.userCard}>
        <div className={styles.cardHeader}>
          <Typography variant="h6" className={styles.cardTitle}>
            Users
          </Typography>
          <div className={styles.cardActions}>
            <TextField
              placeholder="Search users..."
              variant="outlined"
              size="small"
              className={styles.searchField}
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={styles.addButton}
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </div>
        </div>

        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell className={styles.tableCell}>ID</TableCell>
                <TableCell className={styles.tableCell}>Name</TableCell>
                <TableCell className={styles.tableCell}>Username</TableCell>
                <TableCell className={styles.tableCell}>Email</TableCell>
                <TableCell className={styles.tableCell}>Phone</TableCell>
                <TableCell className={styles.tableCell}>Joined</TableCell>
                <TableCell className={styles.tableCell} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{user.id}</TableCell>
                  <TableCell className={styles.tableCell}>{user.name}</TableCell>
                  <TableCell className={styles.tableCell}>{user.username}</TableCell>
                  <TableCell className={styles.tableCell}>{user.email}</TableCell>
                  <TableCell className={styles.tableCell}>{user.phone}</TableCell>
                  <TableCell className={styles.tableCell}>{user.joined}</TableCell>
                  <TableCell className={styles.tableCell} align="right">
                    <div className={styles.actionButtons}>
                      <IconButton
                        size="small"
                        className={styles.editButton}
                        onClick={() => handleEditUser(user.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        className={styles.deleteButton}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default UserManagement;