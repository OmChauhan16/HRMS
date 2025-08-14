import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@mui/material";

const AddLeaveForm = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: ""
    });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/leaves", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        onSave();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Leave</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Employee</InputLabel>
                        <Select
                            value={formData.employeeId}
                            onChange={handleChange("employeeId")}
                            required
                        >
                            <MenuItem value="">Select Employee</MenuItem>
                            {employees.map((emp) => (
                                <MenuItem key={emp._id} value={emp._id}>
                                    {emp.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        type="date"
                        label="Start Date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.startDate}
                        onChange={handleChange("startDate")}
                        required
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#4B0082" }}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddLeaveForm;
