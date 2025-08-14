const express = require("express");
const router = express.Router();
const { submitLeaveForm } = require("../controllers/leaveController")
const upload = require("../middleware/upload"); 

router.post("/submit-leave", upload.single("documents"), submitLeaveForm);

module.exports = router;
