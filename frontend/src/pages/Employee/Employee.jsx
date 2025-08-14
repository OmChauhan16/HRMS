import React, { useState, useEffect } from "react";
import Main from "../Main/Main";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const API_URL = import.meta.env.VITE_API_URL;

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setnewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    dateofjoining: null,
    agree: false,
    _id: null, // For edit
  });

  const apiUrl = `${API_URL}/api/employees`;

  // Fetch employees
  const fetchData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setnewEmployee((prev) => ({ ...prev, agree: e.target.checked }));
  };

  // Open form for edit
  const handleEdit = (employee) => {
    setnewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      dateofjoining: dayjs(employee.dateofjoining),
      agree: employee.agree,
      _id: employee._id,
    });
    setOpen(true);
  };

  // Delete employee
  const handleDelete = async (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const response = await fetch(`${apiUrl}/${employeeId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Deleted successfully!");
        setEmployees((prev) => prev.filter(emp => emp._id !== employeeId)); // remove instantly
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  };

  // Submit add/edit form
  const handleSubmit = async () => {
    try {
      const payload = {
        ...newEmployee,
        dateofjoining: newEmployee.dateofjoining
          ? dayjs(newEmployee.dateofjoining).format("DD-MM-YYYY")
          : null,
      };

      const method = newEmployee._id ? "PUT" : "POST";
      const url = newEmployee._id ? `${apiUrl}/${newEmployee._id}` : `${apiUrl}/add-candidate`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed");

      const updatedEmployee = await response.json();

      if (newEmployee._id) {
        // Edit: update state immediately
        setEmployees((prev) =>
          prev.map(emp => emp._id === updatedEmployee._id ? updatedEmployee : emp)
        );
      } else {
        // Add: append new employee
        setEmployees((prev) => [...prev, updatedEmployee]);
      }

      setOpen(false);
      setnewEmployee({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        dateofjoining: null,
        agree: false,
        _id: null,
      });
    } catch (error) {
      console.error(error);
      alert("Error adding/updating employee");
    }
  };

  const positions = ["Intern", "Junior", "Senior", "Team Lead", "Full Time"];

  return (
    <>
      <Main
        title="Employees"
        employees={employees}          // <- pass employees state here
        apiUrl={apiUrl}
        tableHeaders={["Name", "Email", "Phone", "Position", "Department", "DateofJoining", "Action"]}
        onAddClick={() => setOpen(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        positionOptions={positions}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{newEmployee._id ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Name"
            fullWidth
            margin="dense"
            name="name"
            value={newEmployee.name}
            onChange={handleChange}
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="dense"
            name="email"
            value={newEmployee.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="dense"
            name="phone"
            value={newEmployee.phone}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Position</InputLabel>
            <Select
              name="position"
              value={newEmployee.position}
              onChange={handleChange}
            >
              <MenuItem value="intern">Intern</MenuItem>
              <MenuItem value="full time">Full Time</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
              <MenuItem value="team lead">Team Lead</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Department"
            fullWidth
            margin="dense"
            name="department"
            value={newEmployee.department}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Joining"
              value={newEmployee.dateofjoining}
              onChange={(newValue) =>
                setnewEmployee((prev) => ({ ...prev, dateofjoining: newValue }))
              }
              slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!newEmployee.agree}
                onChange={handleCheckboxChange}
              />
            }
            label="Agree to terms"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!newEmployee.agree}
          >
            {newEmployee._id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employee;
