const express = require("express");
const { addEmployee, getEmployees, deleteEmployee, updateEmployee, searchEmployees } = require("../controllers/employeeController");

const router = express.Router();

router.post("/add-candidate", addEmployee);
router.get("/", getEmployees);
// Update/Edit employee
router.put("/:id", updateEmployee);

// Delete employee
router.delete("/:id", deleteEmployee);

router.get("/search", searchEmployees);

module.exports = router;
