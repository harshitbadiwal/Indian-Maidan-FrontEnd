// UserManagement.jsx
import React, { useState } from 'react';
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
  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      username: 'user1',
      email: 'john@example.com',
      phone: '123-456-7890',
      joined: 'May 2, 2025',
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'user2',
      email: 'jane@example.com',
      phone: '987-654-3210',
      joined: 'May 2, 2025',
    },
  ]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query)
    );
  });

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