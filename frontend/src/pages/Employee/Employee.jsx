// import React, { useState } from "react";
// import Dashboard from "../Dashboard/Dashboard";
// import Main from "../Main/Main";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   TextField,
//   Menu,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// const Employee = () => {

//   const [newEmployee, setnewEmployee] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     experience: "",
//     resume: null,
//     agree: false,
//   });


//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setnewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, resume: e.target.files[0] }));
//   };

//   const handleCheckboxChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, agree: e.target.checked }));
//   };

//   const handleSubmit = async () => {
//     try {
//       // Create FormData object
//       const formData = new FormData();
//       formData.append("name", newEmployee.name);
//       formData.append("email", newEmployee.email);
//       formData.append("phone", newEmployee.phone);
//       formData.append("position", newEmployee.position);
//       formData.append("experience", newEmployee.experience);
//       if (newEmployee.resume) {
//         formData.append("resume", newEmployee.resume); // must be File object
//       }

//       const response = await fetch("http://localhost:5000/api/candidates", {
//         method: "POST",
//         body: formData, // No headers for JSON — browser sets correct multipart boundary
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCandidates((prev) => [...prev, data]);
//         setnewEmployee({
//           name: "",
//           email: "",
//           phone: "",
//           position: "",
//           experience: "",
//           resume: null,
//           agree: false,
//         });
//         handleClose();
//       } else {
//         console.error("Failed to add candidate:", data.error);
//       }
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//     }
//   };

//   return (
//     <Main
//       title="Employees"
//       apiUrl="http://localhost:5000/api/employees"
//       showStatusFilter={false}
//       tableHeaders={["Name", "Email", "Phone", "Position"]}
//     />

//     // <Dialog open={open} onClose={handleClose}>
//     //   <DialogTitle>Add New Candidate</DialogTitle>
//     //   <DialogContent>
//     //     <TextField
//     //       label="Full Name"
//     //       fullWidth
//     //       margin="dense"
//     //       name="name"
//     //       value={newEmployee.name}
//     //       onChange={handleChange}
//     //     />
//     //     <TextField
//     //       label="Email Address"
//     //       fullWidth
//     //       margin="dense"
//     //       name="email"
//     //       value={newEmployee.email}
//     //       onChange={handleChange}
//     //     />
//     //     <TextField
//     //       label="Phone Number"
//     //       fullWidth
//     //       margin="dense"
//     //       name="phone"
//     //       value={newEmployee.phone}
//     //       onChange={handleChange}
//     //     />
//     //     <FormControl fullWidth margin="dense">
//     //       <InputLabel>Position</InputLabel>
//     //       <Select
//     //         name="position"
//     //         value={newEmployee.position}
//     //         onChange={handleChange}
//     //       >
//     //         <MenuItem value="developer">Developer</MenuItem>
//     //         <MenuItem value="hr">HR</MenuItem>
//     //       </Select>
//     //     </FormControl>
//     //     <TextField
//     //       label="Experience"
//     //       fullWidth
//     //       margin="dense"
//     //       name="experience"
//     //       value={newEmployee.experience}
//     //       onChange={handleChange}
//     //     />
//     //     <input
//     //       type="file"
//     //       accept=".pdf,.doc,.docx"
//     //       onChange={handleFileChange}
//     //     />
//     //     <FormControlLabel
//     //       control={
//     //         <Checkbox
//     //           checked={newEmployee.agree}
//     //           onChange={handleCheckboxChange}
//     //         />
//     //       }
//     //       label="Agree to terms"
//     //     />
//     //   </DialogContent>
//     //   <DialogActions>
//     //     <Button onClick={handleClose} color="secondary">
//     //       Cancel
//     //     </Button>
//     //     <Button
//     //       onClick={handleSubmit}
//     //       color="primary"
//     //       disabled={!newEmployee.agree}
//     //     >
//     //       Save
//     //     </Button>
//     //   </DialogActions>
//     // </Dialog>
//   );
// };

// export default Employee;


// import React, { useState } from "react";
// import Main from "../Main/Main";
// import {
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";

// const Employee = () => {
//   const [open, setOpen] = useState(false); // <-- state for dialog visibility
//   const [candidates, setCandidates] = useState([]); // store employees list

//   const [newEmployee, setnewEmployee] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     experience: "",
//     resume: null,
//     agree: false,
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setnewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, resume: e.target.files[0] }));
//   };

//   const handleCheckboxChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, agree: e.target.checked }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       Object.keys(newEmployee).forEach((key) => {
//         if (newEmployee[key] !== null) {
//           formData.append(key, newEmployee[key]);
//         }
//       });

//       const response = await fetch("http://localhost:5000/api/candidates", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCandidates((prev) => [...prev, data]);
//         setnewEmployee({
//           name: "",
//           email: "",
//           phone: "",
//           position: "",
//           experience: "",
//           resume: null,
//           agree: false,
//         });
//         handleClose();
//       } else {
//         console.error("Failed to add candidate:", data.error);
//       }
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//     }
//   };

//   return (
//     <>
//       {/* Add Employee Button */}
//         {/* <Button
//           variant="contained"
//           color="primary"
//           style={{ marginBottom: "20px" }}
//           onClick={handleOpen}
//         >
//           Add Employee
//         </Button> */}

//       {/* Your main employee table */}
//       <Main
//         title="Employees"
//         apiUrl="http://localhost:5000/api/employees"
//         showStatusFilter={false}
//         tableHeaders={["Name", "Email", "Phone", "Position"]}
//       />

//       {/* Dialog Form */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Candidate</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Full Name"
//             fullWidth
//             margin="dense"
//             name="name"
//             value={newEmployee.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Email Address"
//             fullWidth
//             margin="dense"
//             name="email"
//             value={newEmployee.email}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             margin="dense"
//             name="phone"
//             value={newEmployee.phone}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Position</InputLabel>
//             <Select
//               name="position"
//               value={newEmployee.position}
//               onChange={handleChange}
//             >
//               <MenuItem value="developer">Developer</MenuItem>
//               <MenuItem value="hr">HR</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Experience"
//             fullWidth
//             margin="dense"
//             name="experience"
//             value={newEmployee.experience}
//             onChange={handleChange}
//           />
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={handleFileChange}
//             style={{ marginTop: "10px" }}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newEmployee.agree}
//                 onChange={handleCheckboxChange}
//               />
//             }
//             label="Agree to terms"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             color="primary"
//             disabled={!newEmployee.agree}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Employee;









// import React, { useState } from "react";
// import Main from "../Main/Main";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   FormControlLabel,
//   Button
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const Employee = () => {
//   const [open, setOpen] = useState(false);
//   const [newEmployee, setnewEmployee] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     department: "",
//     dateofjoining: null,
//     agree: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setnewEmployee((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleCheckboxChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, agree: e.target.checked }));
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const formData = new FormData();
//   //     for (let key in newEmployee) {
//   //       formData.append(key, newEmployee[key]);
//   //     }
//   //     console.log(formData, 'form');

//   //     for (let pair of formData.entries()) {
//   //       console.log(pair[0], pair[1], '432');
//   //     }


//   //     const response = await fetch("http://localhost:5000/api/employees/add-candidate", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(newEmployee),
//   //     });

//   //     if (response.ok) {
//   //       setOpen(false);
//   //       setnewEmployee({
//   //         name: "",
//   //         email: "",
//   //         phone: "",
//   //         position: "",
//   //         department: "",
//   //         dateofjoining: null,
//   //         agree: false,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error adding employee:", error);
//   //   }
//   // };


//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...newEmployee,
//         dateofjoining: newEmployee.dateofjoining
//           ? dayjs(newEmployee.dateofjoining).format("DD-MM-YYYY")
//           : null,
//       };

//       const response = await fetch("http://localhost:5000/api/employees/add-candidate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setOpen(false);
//         setnewEmployee({
//           name: "",
//           email: "",
//           phone: "",
//           position: "",
//           department: "",
//           dateofjoining: null,
//           agree: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error adding employee:", error);
//     }
//   };

//   return (
//     <>
//       <Main
//         title="Employees"
//         apiUrl="http://localhost:5000/api/employees"
//         showStatusFilter={false}
//         tableHeaders={["Name", "Email", "Phone", "Position", "Department", "DateofJoining", "Action"]}
//         onAddClick={() => setOpen(true)} // <-- Opens dialog
//       />

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Add New Employee</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Employee Name"
//             fullWidth
//             margin="dense"
//             name="name"
//             value={newEmployee.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Email Address"
//             fullWidth
//             margin="dense"
//             name="email"
//             value={newEmployee.email}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             margin="dense"
//             name="phone"
//             value={newEmployee.phone}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Position</InputLabel>
//             <Select
//               name="position"
//               value={newEmployee.position}
//               onChange={handleChange}
//             >
//               <MenuItem value="intern">Intern</MenuItem>
//               <MenuItem value="full time">Full Time</MenuItem>
//               <MenuItem value="junior">Junior</MenuItem>
//               <MenuItem value="senior">Senior</MenuItem>
//               <MenuItem value="team lead">Team Lead</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Department"
//             fullWidth
//             margin="dense"
//             name="department"
//             value={newEmployee.department}
//             onChange={handleChange}
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Date of Joining"
//               value={newEmployee.dateofjoining}
//               onChange={(newValue) =>
//                 setnewEmployee((prev) => ({ ...prev, dateofjoining: newValue }))
//               }
//               slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
//             />
//           </LocalizationProvider>

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newEmployee.agree}
//                 onChange={handleCheckboxChange}
//               />
//             }
//             label="Agree to terms"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             color="primary"
//             disabled={!newEmployee.agree}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Employee;



// import React, { useState, useEffect } from "react";
// import Main from "../Main/Main";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   FormControlLabel,
//   Button
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const Employee = () => {
//   const [open, setOpen] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [newEmployee, setnewEmployee] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     department: "",
//     dateofjoining: null,
//     agree: false,
//     _id: null, // For edit
//   });

//   const apiUrl = "http://localhost:5000/api/employees";

//   // Fetch employees
//   const fetchData = () => {
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setnewEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     setnewEmployee((prev) => ({ ...prev, agree: e.target.checked }));
//   };

//   // Open form for edit
//   const handleEdit = (employee) => {
//     setnewEmployee({
//       name: employee.name,
//       email: employee.email,
//       phone: employee.phone,
//       position: employee.position,
//       department: employee.department,
//       dateofjoining: dayjs(employee.dateofjoining),
//       agree: employee.agree,
//       _id: employee._id,
//     });
//     setOpen(true);
//   };

//   // Delete employee
//   const handleDelete = async (employeeId) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;
//     try {
//       const response = await fetch(`${apiUrl}/${employeeId}`, { method: "DELETE" });
//       if (response.ok) {
//         alert("Deleted successfully!");
//         fetchData();
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error deleting employee");
//     }
//   };

//   // Submit add/edit form
//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...newEmployee,
//         dateofjoining: newEmployee.dateofjoining
//           ? dayjs(newEmployee.dateofjoining).format("DD-MM-YYYY")
//           : null,
//       };

//       const method = newEmployee._id ? "PUT" : "POST";
//       const url = newEmployee._id ? `${apiUrl}/${newEmployee._id}` : `${apiUrl}/add-candidate`;

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setOpen(false);
//         setnewEmployee({
//           name: "",
//           email: "",
//           phone: "",
//           position: "",
//           department: "",
//           dateofjoining: null,
//           agree: false,
//           _id: null,
//         });
//         fetchData();
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error adding/updating employee");
//     }
//   };

//   return (
//     <>
//       <Main
//         title="Employees"
//         apiUrl={apiUrl}
//         tableHeaders={["Name", "Email", "Phone", "Position", "Department", "DateofJoining", "Action"]}
//         onAddClick={() => setOpen(true)}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onEditSubmit={handleEditSubmit} // pass the submit function

//       />

//       {/* Add/Edit Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>{newEmployee._id ? "Edit Employee" : "Add Employee"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Employee Name"
//             fullWidth
//             margin="dense"
//             name="name"
//             value={newEmployee.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Email Address"
//             fullWidth
//             margin="dense"
//             name="email"
//             value={newEmployee.email}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Phone Number"
//             fullWidth
//             margin="dense"
//             name="phone"
//             value={newEmployee.phone}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Position</InputLabel>
//             <Select
//               name="position"
//               value={newEmployee.position}
//               onChange={handleChange}
//             >
//               <MenuItem value="intern">Intern</MenuItem>
//               <MenuItem value="full time">Full Time</MenuItem>
//               <MenuItem value="junior">Junior</MenuItem>
//               <MenuItem value="senior">Senior</MenuItem>
//               <MenuItem value="team lead">Team Lead</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Department"
//             fullWidth
//             margin="dense"
//             name="department"
//             value={newEmployee.department}
//             onChange={handleChange}
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Date of Joining"
//               value={newEmployee.dateofjoining}
//               onChange={(newValue) =>
//                 setnewEmployee((prev) => ({ ...prev, dateofjoining: newValue }))
//               }
//               slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
//             />
//           </LocalizationProvider>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={!!newEmployee.agree}
//                 onChange={handleCheckboxChange}
//               />
//             }
//             label="Agree to terms"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
//           <Button
//             onClick={handleSubmit}
//             color="primary"
//             disabled={!newEmployee.agree}
//           >
//             {newEmployee._id ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Employee;



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

  const apiUrl = "http://localhost:5000/api/employees";

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
