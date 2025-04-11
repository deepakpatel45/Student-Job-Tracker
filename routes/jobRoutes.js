const express = require("express");
const {
  getJobs,
  addJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController"); // Use "JobController" with the correct capitalization

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getJobs); // Get all jobs
router.post("/", protect, addJob); // Add a new job
router.patch("/:id", updateJobStatus); // Update job status
router.delete("/:id",protect, deleteJob); // Delete a job
router.post("/", protect);

module.exports = router;