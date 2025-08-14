import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  InputAdornment
} from "@mui/material";
import { Message, Notifications, MoreVert, UploadFile } from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Search } from "@mui/icons-material";
const Main = ({
  title,
  employees = [], // safe default
  tableHeaders,
  onEdit,
  onDelete,
  positionOptions = []
}) => {
  const [positionFilter, setPositionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for Add Leave
  const [leaveForm, setLeaveForm] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: ""
  });

  const filteredData = employees.filter((item) => {
    const matchesPosition =
      positionFilter === "" ||
      item.position?.toLowerCase() === positionFilter.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate =
      !selectedDate ||
      (item.startdate &&
        new Date(item.startdate).toDateString() === selectedDate.toDateString()) ||
      (item.date &&
        new Date(item.date).toDateString() === selectedDate.toDateString());

    return matchesPosition && matchesSearch && matchesDate;
  });

  const handleMenuOpen = (event, item) => {
    setMenuAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLeaveFormChange = (field, value) => {
    setLeaveForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeaveSubmit = async () => {
    try {
      await fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveForm)
      });
      alert("Leave added successfully!");
      setShowAddForm(false);
      setLeaveForm({ employeeId: "", leaveType: "", startDate: "", endDate: "" });
      // Refresh the list (fetch from API again if needed)
    } catch (err) {
      console.error(err);
      alert("Error adding leave");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <AppBar position="static" color="transparent" elevation={0} className="navbar">
          <Toolbar className="navbar-toolbar">
            <div className="candidate-title">{title}</div>
            <div className="right-icons">
              <IconButton><Message className="icon" /></IconButton>
              <IconButton><Notifications className="icon" /></IconButton>
              <img
                src={`${import.meta.env.PUBLIC_URL}/image.png`}
                alt="Profile"
                className="profile-pic"
              />
            </div>
          </Toolbar>
          <Toolbar className="navbar-toolbar">
            <div className="filters">
              <FormControl variant="outlined" size="small" className="dropdown">
                <InputLabel>Position</InputLabel>
                <Select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  label="Position"
                >
                  <MenuItem value="">All</MenuItem>
                  {positionOptions.map((pos) => (
                    <MenuItem key={pos} value={pos.toLowerCase()}>
                      {pos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="right-icons">
              <TextField
                fullWidth
                placeholder="Search by Name"
                variant="outlined"
                size="small"
                className="search-candidate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4B0082",
                  "&:hover": { backgroundColor: "#3A0066" }
                }}
                onClick={() => setShowAddForm(true)}
              >
                Add {title}
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {/* Table */}
          <TableContainer component={Paper} className="table-container" style={{ flex: 3 }}>
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  {tableHeaders.map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item._id || index} hover>
                    <TableCell>{index + 1}</TableCell>
                    {tableHeaders.map((header) => (
                      <TableCell key={header}>
                        {header === "Action" ? (
                          <IconButton onClick={(e) => handleMenuOpen(e, item)}>
                            <MoreVert />
                          </IconButton>
                        ) : (
                          item[header.toLowerCase()] || "-"
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Action Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onEdit(selectedItem);
              handleMenuClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(selectedItem?._id);
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>

        <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add {title}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">

              <Autocomplete
                options={employees}
                getOptionLabel={(option) => option.name}
                value={employees.find(emp => emp._id === leaveForm.employeeId) || null}
                onChange={(event, newValue) => {
                  handleLeaveFormChange("employeeId", newValue ? newValue._id : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />


            </FormControl>

            <TextField
              label="Designation"
              type="text"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={leaveForm.designation || ""}
              onChange={(e) => handleLeaveFormChange("designation", e.target.value)}
            />
            <TextField
              label="Leave Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={leaveForm.leaveDate || ""}
              onChange={(e) => handleLeaveFormChange("leaveDate", e.target.value)}
            />
           

            <TextField
              label="Documents"
              type="text"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={leaveForm.documents?.name || ""}
              placeholder="Upload Document"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton component="label">
                      <UploadFile /> {/* You can change this to AttachFile or UploadFile icon */}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleLeaveFormChange("documents", e.target.files[0])}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Reason"
              type="text"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={leaveForm.reason || ""}
              onChange={(e) => handleLeaveFormChange("reason", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button
              onClick={handleLeaveSubmit}
              variant="contained"
              sx={{ backgroundColor: "#4B0082" }}
              disabled={
                !leaveForm.employeeId ||
                !leaveForm.designation ||
                !leaveForm.leaveDate ||
                !leaveForm.documents ||
                !leaveForm.reason
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
};

export default Main;
