const Employee = require("../models/Employee");

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        console.log(employees, 'ejsfnsn9');

        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { name, email, phone, position, department, dateofjoining } = req.body;

        if (!name || !email || !phone || !position || !department || !dateofjoining) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: "Employee with this email already exists" });
        }

        const newEmployee = new Employee({
            name,
            email,
            phone,
            position,
            department,
            dateofjoining
        });

        const savedEmployee = await newEmployee.save();
        console.log("Saved Candidate:", savedEmployee);

        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error("Error saving candidate:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// Update/Edit employee by ID
exports.updateEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const updateData = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Server error" });
    }
};




// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Search employees by name
exports.searchEmployees = async (req, res) => {
    try {
        const { q } = req.query; // search term

        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Search query is required" });
        }

        const [rows] = await db.execute(
            "SELECT id, name FROM employees WHERE name LIKE ? LIMIT 10",
            [`%${q}%`]
        );

        return res.json(rows);
    } catch (error) {
        console.error("Error searching employees:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
