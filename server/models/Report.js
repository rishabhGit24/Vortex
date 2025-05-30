const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  abuseType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
