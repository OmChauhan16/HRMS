const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateofjoining: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
