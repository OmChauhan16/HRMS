const express = require("express");
const path = require('path');
const fs = require('fs');

const {
  getCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");
const upload = require("../middleware/upload"); // <-- Import it
const router = express.Router();

router.get("/", getCandidates);
router.post('/', upload.single('resume'), addCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads/resumes', req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // Automatically sets headers and sends file
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

module.exports = router;