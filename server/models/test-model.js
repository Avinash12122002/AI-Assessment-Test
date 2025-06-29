const mongoose = require("mongoose");

// Option schema for each question
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

// Question schema
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
});

// Full Test schema
const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    duration: Number, // in minutes
    passingScore: Number,
    accessType: {
      type: String,
      enum: ["invited", "public"],
      default: "invited",
    },
    enableProctoring: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
