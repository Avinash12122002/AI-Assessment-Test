const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  answers: [
    {
      questionId: String,
      selectedOption: String,
      correct: Boolean
    }
  ],
  score: Number,
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  duration: Number
});

module.exports = mongoose.model("Attempt", attemptSchema);
