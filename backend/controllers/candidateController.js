const Candidate = require("../models/Candidate");
const fs = require("fs");
const path = require("path");

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new candidate

exports.addCandidate = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, email, phone, position, experience } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!name || !email || !phone || !position || !experience || !resumePath) {
      return res.status(400).json({ error: "All fields including resume are required" });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ error: "Candidate with this email already exists" });
    }

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      resume: resumePath
    });

    const savedCandidate = await newCandidate.save();
    console.log("Saved Candidate:", savedCandidate);

    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Update candidate status
exports.updateCandidate = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // If resume exists, delete it from uploads/resumes folder
    if (candidate.resume) {
      const resumePath = path.join(__dirname, "..", candidate.resume);
      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }
    }

    await Candidate.findByIdAndDelete(req.params.id);

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ error: "Server error" });
  }
};

