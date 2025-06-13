import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../features/attendance/attendanceSlice";

const UserList = () => {
  // const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);


  const dispatch = useDispatch();
  const users = useSelector((state) => state.attendance.attendances);

 

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

 
 
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUserRequest(userToDelete));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "" });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  

  const handleUpdate = (id) => {
    dispatch(updateUserRequest({ id, data: editForm }));

    setEditingId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* <Typography variant="h4" sx={{ mb: 3 }}>
        User List
      </Typography> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <TextField
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        size="small"
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <TextField
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        size="small"
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleUpdate(user.id)}
                          sx={{ mr: 1 }}
                        >
                          Update
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(user)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => confirmDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        disableEnforceFocus
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
