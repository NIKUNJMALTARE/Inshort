const mongoose = require("mongoose");

const customNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true }, // Stores image path
  category: { type: String, required: true },
  by: { type: String, default: "Admin" }, // Default source is Admin
}, { timestamps: true });

module.exports = mongoose.model("CustomNews", customNewsSchema);
