import React, { useState, useEffect } from "react";
import {
  Notifications,
  MoreVert,
  Message,
  UploadFile,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const API_URL = import.meta.env.VITE_API_URL;

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];


const Dashboard = () => {
  // const [anchorEl1, setAnchorEl1] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    agree: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    fetch(`${API_URL}/api/candidates`)
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);

  const handleAddCandidateClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewCandidate((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleCheckboxChange = (e) => {
    setNewCandidate((prev) => ({ ...prev, agree: e.target.checked }));
  };


  const handleMenuClick = (event, candidate) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCandidate(candidate);
  };

  const handleMenuClose1 = () => {
    setMenuAnchor(null);
    setSelectedCandidate(null);
  };

  // Example actions
  const handleEdit = () => {
    console.log("Edit candidate:", selectedCandidate);
    handleMenuClose();
  };


  const handleDelete = async () => {
    if (!selectedCandidate?._id) {
      alert("No candidate selected for deletion.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/candidates/${selectedCandidate._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove candidate from state to update UI
        setCandidates((prev) => prev.filter(c => c._id !== selectedCandidate._id));
        alert("Candidate deleted successfully.");
      } else {
        const errorData = await response.json();
        alert("Failed to delete candidate: " + errorData.error);
      }
    } catch (error) {
      alert("Error deleting candidate: " + error.message);
    }

    handleMenuClose1(); // Close the action menu
  };


  const handleDownloadResume = () => {
    if (!selectedCandidate?.resume) {
      alert('No resume available');
      return;
    }
    const normalizedPath = selectedCandidate.resume.replace(/\\/g, '/');
    const fileNameOnly = normalizedPath.split('/').pop();
    const downloadUrl = `http://localhost:5000/api/candidates/download/${fileNameOnly}`;
    window.open(downloadUrl, '_blank');
  };


  const handleSubmit = async () => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("name", newCandidate.name);
      formData.append("email", newCandidate.email);
      formData.append("phone", newCandidate.phone);
      formData.append("position", newCandidate.position);
      formData.append("experience", newCandidate.experience);
      if (newCandidate.resume) {
        formData.append("resume", newCandidate.resume); // must be File object
      }

      const response = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        body: formData, // No headers for JSON — browser sets correct multipart boundary
      });

      const data = await response.json();

      if (response.ok) {
        setCandidates((prev) => [...prev, data]);
        setNewCandidate({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          resume: null,
          agree: false,
        });
        handleClose();
      } else {
        console.error("Failed to add candidate:", data.error);
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesPosition =
      positionFilter === "" ||
      candidate.position.toLowerCase() === positionFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "" ||
      candidate.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesPosition && matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          className="navbar"
        >
          <Toolbar className="navbar-toolbar">
            <div className="candidate-title">Candidates</div>
            <div className="right-icons">
              <IconButton>
                <Message className="icon" />
              </IconButton>
              <IconButton>
                <Notifications className="icon" />
              </IconButton>
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="selected">Selected</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" className="dropdown">
                <InputLabel>Position</InputLabel>
                <Select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  label="Position"
                >
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="right-icons">
              <TextField
                fullWidth
                placeholder="Search"
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
                  "&:hover": { backgroundColor: "#3A0066" },
                }}
                onClick={handleAddCandidateClick}
              >
                Add Candidate
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogContent>
            <TextField
              label="Full Name"
              fullWidth
              margin="dense"
              name="name"
              value={newCandidate.name}
              onChange={handleChange}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="dense"
              name="email"
              value={newCandidate.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="dense"
              name="phone"
              value={newCandidate.phone}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Position</InputLabel>
              <Select
                name="position"
                value={newCandidate.position}
                onChange={handleChange}
              >
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Experience"
              fullWidth
              margin="dense"
              name="experience"
              value={newCandidate.experience}
              onChange={handleChange}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCandidate.agree}
                  onChange={handleCheckboxChange}
                />
              }
              label="Agree to terms"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!newCandidate.agree}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Sr no.</TableCell>
                <TableCell>Candidates Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={candidate._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.phone}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.status}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <div>

                      <IconButton
                        aria-label="more"
                        aria-controls={Boolean(menuAnchor) ? 'row-menu' : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleMenuClick(e, candidate)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="row-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose1}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '15ch',
                          },
                        }}
                      >
                        <MenuItem onClick={handleDownloadResume}>
                          {/* <Button size="small" color="primary" variant="contained"> */}
                          Download Resume
                          {/* </Button> */}
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                          {/* <Button size="small" color="error" variant="contained"> */}
                          Delete Candidate
                          {/* </Button> */}
                        </MenuItem>
                      </Menu>


                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
