const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"], default: "Applied" },
  date: { type: Date, required: true },
  link: { type: String },
});

module.exports = mongoose.model("Job", jobSchema);